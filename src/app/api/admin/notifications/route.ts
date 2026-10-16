import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { ADMIN_COOKIE, verifyToken } from "@/lib/admin-auth";
import {
  DEFAULT_TEMPLATE,
  detectTelegramChats,
  getEffectiveSettings,
  invalidateSettingsCache,
  retryNotification,
  sendTest,
} from "@/lib/notify";

// ============================================================
// /api/admin/notifications — pusat kendali notifikasi real-time
//  GET  → settings (token dimask) + log terbaru + statistik
//  GET  ?since=ISO → hanya log baru (untuk watcher real-time)
//  PUT  → simpan pengaturan kanal Telegram/WhatsApp + template
//  POST → aksi: test-telegram | test-whatsapp | retry | detect-telegram
// ============================================================

async function guard(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(ADMIN_COOKIE)?.value);
}

function maskToken(t?: string | null): string | null {
  if (!t) return null;
  if (t.length <= 10) return "••••••";
  return `${t.slice(0, 6)}••••••••${t.slice(-4)}`;
}

/** Nilai token dari body: undefined/kirim-mask → pertahankan; "" → hapus; lainnya → nilai baru */
function resolveSecret(incoming: unknown, current: string | null): string | null {
  if (incoming === undefined) return current;
  if (typeof incoming !== "string") return current;
  const v = incoming.trim();
  if (v === "") return null;
  if (v.includes("•")) return current; // echo mask dari UI
  return v;
}

function startOfWibDay(): Date {
  const now = new Date();
  const wib = new Date(now.getTime() + 7 * 3_600_000);
  wib.setUTCHours(0, 0, 0, 0);
  return new Date(wib.getTime() - 7 * 3_600_000);
}

function startOfDaysAgoWib(days: number): Date {
  return new Date(startOfWibDay().getTime() - days * 86_400_000);
}

export async function GET(req: NextRequest) {
  if (!(await guard())) {
    return NextResponse.json({ success: false, error: "Tidak terautentikasi" }, { status: 401 });
  }
  try {
    const since = req.nextUrl.searchParams.get("since");
    if (since) {
      const d = new Date(since);
      const fresh = Number.isFinite(d.getTime())
        ? await db.notificationLog.findMany({
            where: { createdAt: { gt: d } },
            orderBy: { createdAt: "desc" },
            take: 20,
          })
        : [];
      return NextResponse.json({ success: true, data: { fresh } });
    }

    const [rows, logs, today, week] = await Promise.all([
      db.notificationSetting.findMany({ take: 1, orderBy: { updatedAt: "desc" } }),
      db.notificationLog.findMany({ orderBy: { createdAt: "desc" }, take: 60 }),
      db.notificationLog.groupBy({
        by: ["channel", "status"],
        where: { createdAt: { gte: startOfWibDay() } },
        _count: true,
      }),
      db.notificationLog.groupBy({
        by: ["status"],
        where: { createdAt: { gte: startOfDaysAgoWib(7) } },
        _count: true,
      }),
    ]);
    const row = rows[0] ?? null;
    const eff = await getEffectiveSettings();

    return NextResponse.json({
      success: true,
      data: {
        settings: {
          telegramEnabled: row?.telegramEnabled ?? false,
          telegramBotToken: maskToken(row?.telegramBotToken),
          telegramChatId: row?.telegramChatId ?? "",
          telegramActive: eff.telegramEnabled, // aktif nyata (DB atau env)
          telegramFromEnv: !row?.telegramBotToken && !!process.env.TELEGRAM_BOT_TOKEN,
          whatsappEnabled: row?.whatsappEnabled ?? false,
          whatsappProvider: row?.whatsappProvider ?? "fonnte",
          whatsappApiToken: maskToken(row?.whatsappApiToken),
          whatsappTarget: row?.whatsappTarget ?? "",
          whatsappActive: eff.whatsappEnabled,
          whatsappFromEnv: !row?.whatsappApiToken && !!process.env.FONNTE_TOKEN,
          templateNewLead: row?.templateNewLead || DEFAULT_TEMPLATE,
        },
        logs,
        stats: {
          todaySent: today.filter((t) => t.status === "sent").reduce((a, b) => a + b._count, 0),
          todayFailed: today.filter((t) => t.status === "failed").reduce((a, b) => a + b._count, 0),
          weekSent: week.find((w) => w.status === "sent")?._count ?? 0,
          weekFailed: week.find((w) => w.status === "failed")?._count ?? 0,
        },
      },
    });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: e instanceof Error ? e.message : "Gagal memuat notifikasi" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  if (!(await guard())) {
    return NextResponse.json({ success: false, error: "Tidak terautentikasi" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const existing = (
      await db.notificationSetting.findMany({ take: 1, orderBy: { updatedAt: "desc" } })
    )[0];

    const data = {
      telegramEnabled: Boolean(body.telegramEnabled),
      telegramBotToken: resolveSecret(body.telegramBotToken, existing?.telegramBotToken ?? null),
      telegramChatId:
        typeof body.telegramChatId === "string"
          ? body.telegramChatId.trim() || null
          : (existing?.telegramChatId ?? null),
      whatsappEnabled: Boolean(body.whatsappEnabled),
      whatsappProvider: body.whatsappProvider === "wablas" ? "wablas" : "fonnte",
      whatsappApiToken: resolveSecret(body.whatsappApiToken, existing?.whatsappApiToken ?? null),
      whatsappTarget:
        typeof body.whatsappTarget === "string"
          ? body.whatsappTarget.replace(/[^0-9]/g, "").replace(/^0/, "62") || null
          : (existing?.whatsappTarget ?? null),
      templateNewLead:
        typeof body.templateNewLead === "string" && body.templateNewLead.trim()
          ? body.templateNewLead.slice(0, 2000)
          : (existing?.templateNewLead ?? null),
    };

    if (data.telegramEnabled && (!data.telegramBotToken || !data.telegramChatId)) {
      return NextResponse.json(
        { success: false, error: "Aktifkan Telegram: isi token bot & chat ID dulu" },
        { status: 400 }
      );
    }
    if (data.whatsappEnabled && (!data.whatsappApiToken || !data.whatsappTarget)) {
      return NextResponse.json(
        { success: false, error: "Aktifkan WhatsApp: isi token API & nomor tujuan dulu" },
        { status: 400 }
      );
    }
    if (data.telegramChatId && !/^-?\d{5,25}$/.test(data.telegramChatId)) {
      return NextResponse.json(
        { success: false, error: "Chat ID harus angka (contoh: 123456789 atau -1001234567890)" },
        { status: 400 }
      );
    }
    if (data.whatsappTarget && (data.whatsappTarget.length < 9 || data.whatsappTarget.length > 16)) {
      return NextResponse.json(
        { success: false, error: "Nomor WhatsApp tujuan tidak valid (contoh: 6281269999910)" },
        { status: 400 }
      );
    }

    const saved = existing
      ? await db.notificationSetting.update({ where: { id: existing.id }, data })
      : await db.notificationSetting.create({ data });
    invalidateSettingsCache();

    return NextResponse.json({
      success: true,
      data: { id: saved.id, message: "Pengaturan notifikasi tersimpan" },
    });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: e instanceof Error ? e.message : "Gagal menyimpan" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!(await guard())) {
    return NextResponse.json({ success: false, error: "Tidak terautentikasi" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as {
      action?: string;
      botToken?: string;
      chatId?: string;
      apiToken?: string;
      target?: string;
      provider?: string;
      logId?: string;
    };
    // nilai override yang mengandung mask dianggap "pakai yang tersimpan"
    const botToken = body.botToken && !body.botToken.includes("•") ? body.botToken.trim() : undefined;
    const chatId = body.chatId?.trim() || undefined;
    const apiToken = body.apiToken && !body.apiToken.includes("•") ? body.apiToken.trim() : undefined;
    const target = body.target ? body.target.replace(/[^0-9]/g, "").replace(/^0/, "62") : undefined;
    const provider = body.provider === "wablas" ? ("wablas" as const) : ("fonnte" as const);

    switch (body.action) {
      case "test-telegram": {
        const r = await sendTest("telegram", { botToken, chatId });
        await db.notificationLog.create({
          data: {
            leadName: "UJI COBA",
            leadWa: "6281269999910",
            source: "test",
            channel: "telegram",
            status: r.ok ? "sent" : "failed",
            error: r.error,
          },
        });
        return NextResponse.json(
          r.ok
            ? { success: true, data: { message: "Terkirim! Cek Telegram kamu sekarang 🎉" } }
            : { success: false, error: r.error || "Gagal mengirim — periksa token & chat ID" }
        );
      }
      case "test-whatsapp": {
        const r = await sendTest("whatsapp", { apiToken, target, provider });
        await db.notificationLog.create({
          data: {
            leadName: "UJI COBA",
            leadWa: "6281269999910",
            source: "test",
            channel: "whatsapp",
            status: r.ok ? "sent" : "failed",
            error: r.error,
          },
        });
        return NextResponse.json(
          r.ok
            ? { success: true, data: { message: "Terkirim! Cek WhatsApp kamu sekarang 🎉" } }
            : { success: false, error: r.error || "Gagal mengirim — periksa token & nomor" }
        );
      }
      case "retry": {
        if (!body.logId) return NextResponse.json({ success: false, error: "logId wajib" }, { status: 400 });
        const r = await retryNotification(body.logId);
        return NextResponse.json(
          r.ok
            ? { success: true, data: { message: "Berhasil dikirim ulang ✓" } }
            : { success: false, error: r.error || "Gagal mengirim ulang" }
        );
      }
      case "detect-telegram": {
        if (!botToken) return NextResponse.json({ success: false, error: "Isi token bot dulu" }, { status: 400 });
        const r = await detectTelegramChats(botToken);
        if (!r.ok) return NextResponse.json({ success: false, error: r.error }, { status: 400 });
        return NextResponse.json({ success: true, data: { chats: r.chats ?? [] } });
      }
      default:
        return NextResponse.json({ success: false, error: "Aksi tidak dikenal" }, { status: 400 });
    }
  } catch (e) {
    return NextResponse.json(
      { success: false, error: e instanceof Error ? e.message : "Aksi gagal" },
      { status: 500 }
    );
  }
}
