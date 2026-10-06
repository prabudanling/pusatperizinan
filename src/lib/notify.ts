import { db } from "@/lib/db";

// ============================================================
// PUSATPERIZINAN.COM — REAL-TIME NOTIFICATION ENGINE
// Tiap lead baru masuk → kirim Telegram + WhatsApp seketika.
//
// Kanal didukung:
//  1. Telegram Bot API (resmi, gratis): token dari @BotFather + chat_id
//  2. WhatsApp via gateway populer Indonesia:
//     - Fonnte  → POST https://api.fonnte.com/send
//     - Wablas  → POST https://console.wablas.com/api/send-message
//  Fallback konfigurasi lewat env: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID,
//  FONNTE_TOKEN + WHATSAPP_TARGET (dipakai bila DB masih kosong).
//
// Prinsip: NOTIFIKASI TIDAK PERNAH MELEDAKKAN REQUEST USER.
// Semua fungsi fire-and-forget, error dicatat ke NotificationLog.
// ============================================================

export interface LeadPayload {
  leadId?: string;
  name: string;
  whatsapp: string;
  businessType?: string | null;
  package?: string | null;
  source: string; // landing | chat | roadmap | test
  estimatedValue?: number;
  notes?: string | null;
  createdAt?: Date;
}

export const DEFAULT_TEMPLATE = `🔥 LEAD BARU MASUK!

👤 Nama: {{nama}}
📱 WhatsApp: {{wa}}
💼 Jenis usaha: {{jenis}}
📦 Paket diminati: {{paket}}
💰 Nilai estimasi: {{nilai}}
📡 Sumber: {{sumber}}
🕐 {{waktu}} WIB

💬 "{{pesan}}"

⚡️ Follow-up sekarang: wa.me/{{wa}}`;

export const TEMPLATE_TOKENS = [
  { token: "{{nama}}", desc: "Nama lead" },
  { token: "{{wa}}", desc: "Nomor WhatsApp lead" },
  { token: "{{jenis}}", desc: "Jenis/bidang usaha" },
  { token: "{{paket}}", desc: "Paket yang diminati" },
  { token: "{{nilai}}", desc: "Estimasi nilai kontrak" },
  { token: "{{sumber}}", desc: "Sumber lead (landing/chat/roadmap)" },
  { token: "{{waktu}}", desc: "Waktu masuk (WIB)" },
  { token: "{{pesan}}", desc: "Catatan / konteks dari lead" },
] as const;

interface EffectiveSettings {
  telegramEnabled: boolean;
  telegramBotToken: string | null;
  telegramChatId: string | null;
  whatsappEnabled: boolean;
  whatsappProvider: "fonnte" | "wablas";
  whatsappApiToken: string | null;
  whatsappTarget: string | null;
  templateNewLead: string;
}

type DbSettings = {
  id: string;
  telegramEnabled: boolean;
  telegramBotToken: string | null;
  telegramChatId: string | null;
  whatsappEnabled: boolean;
  whatsappProvider: string;
  whatsappApiToken: string | null;
  whatsappTarget: string | null;
  templateNewLead: string | null;
};

// ---------- cache settings 10 dtk (hindari query tiap lead) ----------
let settingsCache: { at: number; row: DbSettings | null } = { at: 0, row: null };
const CACHE_MS = 10_000;

async function loadSettingsRow(force = false): Promise<DbSettings | null> {
  if (!force && Date.now() - settingsCache.at < CACHE_MS) return settingsCache.row;
  const rows = await db.notificationSetting.findMany({ take: 1, orderBy: { updatedAt: "desc" } });
  settingsCache = { at: Date.now(), row: rows[0] ?? null };
  return settingsCache.row;
}

export function invalidateSettingsCache() {
  settingsCache = { at: 0, row: null };
}

/** Gabungan DB + env fallback. Token DB diutamakan, env sebagai cadangan. */
export async function getEffectiveSettings(): Promise<EffectiveSettings> {
  const row = await loadSettingsRow().catch(() => null);
  const envTgToken = process.env.TELEGRAM_BOT_TOKEN || null;
  const envTgChat = process.env.TELEGRAM_CHAT_ID || null;
  const envWaToken = process.env.FONNTE_TOKEN || null;
  const envWaTarget = process.env.WHATSAPP_TARGET || null;

  const tgToken = row?.telegramBotToken || envTgToken;
  const tgChat = row?.telegramChatId || envTgChat;
  const waToken = row?.whatsappApiToken || envWaToken;
  const waTarget = row?.whatsappTarget || envWaTarget;

  // Bila belum ada row sama sekali: env lengkap = aktif otomatis
  const tgAuto = !row && !!envTgToken && !!envTgChat;
  const waAuto = !row && !!envWaToken && !!envWaTarget;

  return {
    telegramEnabled: (row?.telegramEnabled ?? tgAuto) && !!tgToken && !!tgChat,
    telegramBotToken: tgToken,
    telegramChatId: tgChat,
    whatsappEnabled:
      (row?.whatsappEnabled ?? waAuto) && !!waToken && !!waTarget,
    whatsappProvider: row?.whatsappProvider === "wablas" ? "wablas" : "fonnte",
    whatsappApiToken: waToken,
    whatsappTarget: waTarget,
    templateNewLead: row?.templateNewLead || DEFAULT_TEMPLATE,
  };
}

// ---------- util ----------
function rupiah(n?: number): string {
  if (!n || n <= 0) return "Belum ditentukan";
  return "Rp " + n.toLocaleString("id-ID");
}

function waktuWIB(d: Date): string {
  return (
    d.toLocaleDateString("id-ID", {
      timeZone: "Asia/Jakarta",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) +
    " " +
    d.toLocaleTimeString("id-ID", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  );
}

function sumberLabel(s: string): string {
  const map: Record<string, string> = {
    landing: "🌐 Form Website",
    chat: "🤖 Chat AI RIZKI",
    roadmap: "🗺️ AI Roadmap (premium)",
    checker: "🔍 AI Cek Izin",
    popup: "✨ Popup Website",
    konsultasi: "📅 Booking Konsultasi",
    test: "🧪 UJI COBA",
  };
  return map[s] ?? s;
}

export function renderTemplate(tpl: string, lead: LeadPayload): string {
  const waDigits = lead.whatsapp.replace(/[^0-9]/g, "").replace(/^0/, "62");
  const createdAt = lead.createdAt ?? new Date();
  const pesan =
    lead.notes?.trim() ||
    lead.businessType?.trim() ||
    "Tidak ada catatan tambahan";
  const map: Record<string, string> = {
    "{{nama}}": lead.name,
    "{{wa}}": waDigits,
    "{{jenis}}": lead.businessType || "Tidak disebutkan",
    "{{paket}}": lead.package || "Belum dipilih",
    "{{nilai}}": rupiah(lead.estimatedValue),
    "{{sumber}}": sumberLabel(lead.source),
    "{{waktu}}": waktuWIB(createdAt),
    "{{pesan}}": pesan.slice(0, 400),
  };
  return Object.entries(map).reduce(
    (acc, [k, v]) => acc.split(k).join(v),
    tpl
  );
}

// ---------- sender: Telegram Bot API ----------
async function sendTelegram(
  botToken: string,
  chatId: string,
  text: string
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: text.slice(0, 4000),
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(12_000),
    });
    const json = (await res.json().catch(() => null)) as
      | { ok: boolean; description?: string }
      | null;
    if (res.ok && json?.ok) return { ok: true };
    return { ok: false, error: json?.description || `HTTP ${res.status}` };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Jaringan gagal" };
  }
}

// ---------- sender: WhatsApp gateway ----------
async function sendWhatsapp(
  provider: "fonnte" | "wablas",
  apiToken: string,
  target: string,
  text: string
): Promise<{ ok: boolean; error?: string }> {
  try {
    if (provider === "fonnte") {
      const res = await fetch("https://api.fonnte.com/send", {
        method: "POST",
        headers: { Authorization: apiToken, "Content-Type": "application/json" },
        body: JSON.stringify({ target, message: text.slice(0, 4000) }),
        signal: AbortSignal.timeout(15_000),
      });
      const json = (await res.json().catch(() => null)) as
        | { status?: boolean | string; reason?: string }
        | null;
      const okFlag = json?.status === true || json?.status === "true" || res.ok;
      if (okFlag) return { ok: true };
      return { ok: false, error: json?.reason || `Fonnte HTTP ${res.status}` };
    }
    // wablas
    const res = await fetch("https://console.wablas.com/api/send-message", {
      method: "POST",
      headers: { Authorization: apiToken, "Content-Type": "application/json" },
      body: JSON.stringify({ phone: target, message: text.slice(0, 4000) }),
      signal: AbortSignal.timeout(15_000),
    });
    const json = (await res.json().catch(() => null)) as
      | { status?: boolean | string; message?: string }
      | null;
    const okFlag = json?.status === true || json?.status === "true" || res.ok;
    if (okFlag) return { ok: true };
    return { ok: false, error: json?.message || `Wablas HTTP ${res.status}` };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Jaringan gagal" };
  }
}

async function writeLog(entry: {
  leadId?: string | null;
  leadName: string;
  leadWa: string;
  source: string;
  channel: "telegram" | "whatsapp";
  status: "sent" | "failed";
  message?: string;
  error?: string;
}) {
  try {
    await db.notificationLog.create({
      data: {
        leadId: entry.leadId ?? null,
        leadName: entry.leadName.slice(0, 120),
        leadWa: entry.leadWa.slice(0, 20),
        source: entry.source,
        channel: entry.channel,
        status: entry.status,
        message: entry.message?.slice(0, 4000),
        error: entry.error?.slice(0, 400),
      },
    });
  } catch (e) {
    console.error("[notify] gagal menulis log:", e);
  }
}

// ---------- MAIN: dipanggil tiap lead baru ----------
/** Fire-and-forget — tidak perlu di-await, tidak pernah melempar error. */
export async function notifyNewLead(lead: LeadPayload): Promise<void> {
  try {
    const s = await getEffectiveSettings();
    if (!s.telegramEnabled && !s.whatsappEnabled) return;

    const text = renderTemplate(s.templateNewLead, lead);
    const jobs: Promise<void>[] = [];

    if (s.telegramEnabled && s.telegramBotToken && s.telegramChatId) {
      jobs.push(
        sendTelegram(s.telegramBotToken, s.telegramChatId, text).then((r) =>
          writeLog({
            leadId: lead.leadId,
            leadName: lead.name,
            leadWa: lead.whatsapp,
            source: lead.source,
            channel: "telegram",
            status: r.ok ? "sent" : "failed",
            message: text,
            error: r.error,
          })
        )
      );
    }

    if (s.whatsappEnabled && s.whatsappApiToken && s.whatsappTarget) {
      jobs.push(
        sendWhatsapp(s.whatsappProvider, s.whatsappApiToken, s.whatsappTarget, text).then((r) =>
          writeLog({
            leadId: lead.leadId,
            leadName: lead.name,
            leadWa: lead.whatsapp,
            source: lead.source,
            channel: "whatsapp",
            status: r.ok ? "sent" : "failed",
            message: text,
            error: r.error,
          })
        )
      );
    }

    await Promise.allSettled(jobs);
  } catch (e) {
    // Keamanan absolut: notifikasi tidak boleh mengganggu alur lead
    console.error("[notify] notifyNewLead error:", e);
  }
}

// ---------- Uji coba dari dashboard ----------
export async function sendTest(
  channel: "telegram" | "whatsapp",
  override?: {
    botToken?: string;
    chatId?: string;
    apiToken?: string;
    target?: string;
    provider?: "fonnte" | "wablas";
  }
): Promise<{ ok: boolean; error?: string }> {
  const s = await getEffectiveSettings();
  const lead: LeadPayload = {
    name: "UJI COBA — Cek HP Kamu!",
    whatsapp: "6281269999910",
    businessType: "Kafe / Kuliner",
    package: "Bisnis",
    source: "test",
    estimatedValue: 7_500_000,
    notes: "Ini pesan uji coba dari Mission Control. Bila kamu menerima ini, kanal notifikasi SUDAH SIAP! 🎉",
  };
  const text = renderTemplate(s.templateNewLead, lead);

  if (channel === "telegram") {
    const token = override?.botToken || s.telegramBotToken;
    const chatId = override?.chatId || s.telegramChatId;
    if (!token || !chatId) return { ok: false, error: "Token bot & Chat ID wajib diisi dulu" };
    return sendTelegram(token, chatId, text);
  }

  const token = override?.apiToken || s.whatsappApiToken;
  const target = override?.target || s.whatsappTarget;
  const provider = override?.provider || s.whatsappProvider;
  if (!token || !target) return { ok: false, error: "Token API & nomor tujuan wajib diisi dulu" };
  return sendWhatsapp(provider, token, target, text);
}

// ---------- Retry pengiriman yang gagal ----------
export async function retryNotification(
  logId: string
): Promise<{ ok: boolean; error?: string }> {
  const log = await db.notificationLog.findUnique({ where: { id: logId } });
  if (!log) return { ok: false, error: "Log tidak ditemukan" };
  const s = await getEffectiveSettings();
  const text = log.message || "🔔 Follow-up lead PusatPerizinan.com";

  let result: { ok: boolean; error?: string };
  if (log.channel === "telegram") {
    if (!s.telegramBotToken || !s.telegramChatId)
      return { ok: false, error: "Telegram belum dikonfigurasi" };
    result = await sendTelegram(s.telegramBotToken, s.telegramChatId, text);
  } else {
    if (!s.whatsappApiToken || !s.whatsappTarget)
      return { ok: false, error: "WhatsApp belum dikonfigurasi" };
    result = await sendWhatsapp(s.whatsappProvider, s.whatsappApiToken, s.whatsappTarget, text);
  }

  // catat attempt baru (jangan timpa riwayat lama — audit trail utuh)
  await writeLog({
    leadId: log.leadId,
    leadName: log.leadName,
    leadWa: log.leadWa,
    source: log.source,
    channel: log.channel,
    status: result.ok ? "sent" : "failed",
    message: text,
    error: result.ok ? undefined : result.error,
  });
  return result;
}

// ---------- Deteksi chat_id Telegram otomatis ----------
/** Baca getUpdates bot → kembalikan daftar chat yang pernah kirim pesan ke bot. */
export async function detectTelegramChats(
  botToken: string
): Promise<{ ok: boolean; chats?: { id: string; title: string; type: string }[]; error?: string }> {
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${botToken}/getUpdates?limit=50`,
      { signal: AbortSignal.timeout(12_000) }
    );
    const json = (await res.json().catch(() => null)) as
      | { ok: boolean; description?: string; result?: unknown[] }
      | null;
    if (!json?.ok) return { ok: false, error: json?.description || `HTTP ${res.status}` };

    const seen = new Map<string, { id: string; title: string; type: string }>();
    for (const upd of json.result ?? []) {
      const u = upd as {
        message?: { chat?: { id: number; title?: string; username?: string; first_name?: string; type?: string } };
        channel_post?: { chat?: { id: number; title?: string; type?: string } };
      };
      const chat = u.message?.chat ?? u.channel_post?.chat;
      if (!chat) continue;
      const id = String(chat.id);
      if (!seen.has(id)) {
        seen.set(id, {
          id,
          title: chat.title || chat.first_name || chat.username || `Chat ${id}`,
          type: chat.type || "unknown",
        });
      }
    }
    return { ok: true, chats: [...seen.values()] };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Jaringan gagal" };
  }
}
