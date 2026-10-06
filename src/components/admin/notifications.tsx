"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Send, MessageCircle, CheckCircle2, XCircle, RotateCcw, Eye, EyeOff,
  Save, Radar, Zap, Clock, BellRing, Loader2,
} from "lucide-react";
import { useAdminData, relativeTime, EmptyState, SkeletonRows } from "@/components/admin/shared";

// ============================================================
// TAB NOTIFIKASI — pusat kendali Telegram & WhatsApp real-time
// ============================================================

interface SettingsData {
  telegramEnabled: boolean;
  telegramBotToken: string | null;
  telegramChatId: string;
  telegramActive: boolean;
  telegramFromEnv: boolean;
  whatsappEnabled: boolean;
  whatsappProvider: string;
  whatsappApiToken: string | null;
  whatsappTarget: string;
  whatsappActive: boolean;
  whatsappFromEnv: boolean;
  templateNewLead: string;
}
interface LogRow {
  id: string;
  leadId: string | null;
  leadName: string;
  leadWa: string;
  source: string;
  channel: string;
  status: string;
  message: string | null;
  error: string | null;
  createdAt: string;
}
interface Stats { todaySent: number; todayFailed: number; weekSent: number; weekFailed: number }
interface NotifData { settings: SettingsData; logs: LogRow[]; stats: Stats }

const DEFAULT_TEMPLATE = `🔥 LEAD BARU MASUK!

👤 Nama: {{nama}}
📱 WhatsApp: {{wa}}
💼 Jenis usaha: {{jenis}}
📦 Paket diminati: {{paket}}
💰 Nilai estimasi: {{nilai}}
📡 Sumber: {{sumber}}
🕐 {{waktu}} WIB

💬 "{{pesan}}"

⚡️ Follow-up sekarang: wa.me/{{wa}}`;

const TOKENS = [
  { token: "{{nama}}", desc: "Nama lead" },
  { token: "{{wa}}", desc: "Nomor WA" },
  { token: "{{jenis}}", desc: "Jenis usaha" },
  { token: "{{paket}}", desc: "Paket" },
  { token: "{{nilai}}", desc: "Nilai estimasi" },
  { token: "{{sumber}}", desc: "Sumber lead" },
  { token: "{{waktu}}", desc: "Waktu WIB" },
  { token: "{{pesan}}", desc: "Catatan" },
] as const;

const SOURCE_LABEL: Record<string, string> = {
  landing: "Form Website",
  chat: "Chat AI RIZKI",
  roadmap: "AI Roadmap",
  checker: "Cek Izin",
  popup: "Popup",
  konsultasi: "Konsultasi",
  test: "Uji Coba",
};

function waktuWIB(d: Date): string {
  return (
    d.toLocaleDateString("id-ID", { timeZone: "Asia/Jakarta", day: "2-digit", month: "short", year: "numeric" }) +
    " " +
    d.toLocaleTimeString("id-ID", { timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit", hour12: false })
  );
}

function renderPreview(tpl: string): string {
  const map: Record<string, string> = {
    "{{nama}}": "Budi Santoso (contoh)",
    "{{wa}}": "6281234567890",
    "{{jenis}}": "Kafe / Kuliner",
    "{{paket}}": "Bisnis",
    "{{nilai}}": "Rp 7.500.000",
    "{{sumber}}": "🌐 Form Website",
    "{{waktu}}": waktuWIB(new Date()),
    "{{pesan}}": "Mau buka cabang kedua, perlu NIB + sertifikat standar",
  };
  return Object.entries(map).reduce((acc, [k, v]) => acc.split(k).join(v), tpl);
}

function ChannelDot({ active }: { active: boolean }) {
  return active ? (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> AKTIF
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-700 bg-stone-800/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-500">
      <span className="h-1.5 w-1.5 rounded-full bg-stone-600" /> NONAKTIF
    </span>
  );
}

export function NotificationsTab() {
  const { toast } = useToast();
  const { data, loading, error, reload } = useAdminData<NotifData>("/api/admin/notifications", { intervalMs: 8000 });

  // ---- form state ----
  const [tgEnabled, setTgEnabled] = useState(false);
  const [tgToken, setTgToken] = useState("");
  const [tgChatId, setTgChatId] = useState("");
  const [waEnabled, setWaEnabled] = useState(false);
  const [waProvider, setWaProvider] = useState("fonnte");
  const [waToken, setWaToken] = useState("");
  const [waTarget, setWaTarget] = useState("");
  const [template, setTemplate] = useState(DEFAULT_TEMPLATE);
  const [dirty, setDirty] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [showTgToken, setShowTgToken] = useState(false);
  const [showWaToken, setShowWaToken] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [saveBusy, setSaveBusy] = useState(false);
  const [detectOpen, setDetectOpen] = useState(false);
  const [detected, setDetected] = useState<{ id: string; title: string; type: string }[]>([]);
  const templateRef = useRef<HTMLTextAreaElement>(null);

  // hydrate form dari data (hanya bila user belum mengedit)
  useEffect(() => {
    if (!data || dirty) return;
    const s = data.settings;
    setTgEnabled(s.telegramEnabled);
    setTgToken(s.telegramBotToken ?? "");
    setTgChatId(s.telegramChatId ?? "");
    setWaEnabled(s.whatsappEnabled);
    setWaProvider(s.whatsappProvider || "fonnte");
    setWaToken(s.whatsappApiToken ?? "");
    setWaTarget(s.whatsappTarget ?? "");
    setTemplate(s.templateNewLead || DEFAULT_TEMPLATE);
    setHydrated(true);
  }, [data, dirty]);

  function touch() {
    if (!dirty) setDirty(true);
  }

  async function saveAll() {
    setSaveBusy(true);
    try {
      const res = await fetch("/api/admin/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          telegramEnabled: tgEnabled,
          telegramBotToken: tgToken,
          telegramChatId: tgChatId,
          whatsappEnabled: waEnabled,
          whatsappProvider: waProvider,
          whatsappApiToken: waToken,
          whatsappTarget: waTarget,
          templateNewLead: template,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setDirty(false);
        toast({ title: "Tersimpan ✓", description: "Kanal notifikasi diperbarui. Lead baru langsung dikirim ke HP kamu." });
        await reload();
      } else {
        toast({ title: "Gagal menyimpan", description: json.error, variant: "destructive" });
      }
    } finally {
      setSaveBusy(false);
    }
  }

  async function action(body: Record<string, unknown>, okTitle: string) {
    setBusy(body.action as string);
    try {
      const res = await fetch("/api/admin/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (json.success) {
        toast({ title: okTitle, description: json.data?.message });
        await reload();
      } else {
        toast({ title: "Gagal", description: json.error, variant: "destructive" });
      }
      return json;
    } finally {
      setBusy(null);
    }
  }

  async function detectChats() {
    setBusy("detect");
    try {
      const res = await fetch("/api/admin/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "detect-telegram", botToken: tgToken }),
      });
      const json = await res.json();
      if (json.success) {
        setDetected(json.data.chats ?? []);
        setDetectOpen(true);
      } else {
        toast({ title: "Deteksi gagal", description: json.error, variant: "destructive" });
      }
    } finally {
      setBusy(null);
    }
  }

  function insertToken(token: string) {
    const el = templateRef.current;
    touch();
    if (!el) {
      setTemplate((t) => t + token);
      return;
    }
    const start = el.selectionStart ?? template.length;
    const end = el.selectionEnd ?? template.length;
    const next = template.slice(0, start) + token + template.slice(end);
    setTemplate(next);
    requestAnimationFrame(() => {
      el.focus();
      el.selectionStart = el.selectionEnd = start + token.length;
    });
  }

  const s = data?.settings;
  const logs = data?.logs ?? [];
  const stats = data?.stats;

  return (
    <div className="space-y-5" data-testid="notif-tab">
      {/* ---------- statistik ---------- */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Terkirim hari ini", value: stats?.todaySent ?? 0, icon: CheckCircle2, cls: "text-emerald-400" },
          { label: "Gagal hari ini", value: stats?.todayFailed ?? 0, icon: XCircle, cls: "text-rose-400" },
          { label: "Terkirim 7 hari", value: stats?.weekSent ?? 0, icon: Zap, cls: "text-amber-300" },
          { label: "Gagal 7 hari", value: stats?.weekFailed ?? 0, icon: RotateCcw, cls: "text-stone-400" },
        ].map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="rounded-xl border border-stone-800 bg-stone-900/50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-stone-500">{k.label}</p>
                <Icon aria-hidden className={`h-4 w-4 ${k.cls}`} />
              </div>
              <p className="mt-1 text-2xl font-bold tabular-nums">{k.value}</p>
            </div>
          );
        })}
      </div>

      {/* ---------- kartu kanal ---------- */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Telegram */}
        <div className="rounded-xl border border-sky-800/40 bg-stone-900/50 p-5">
          <div className="mb-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/30">
                <Send aria-hidden className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold">Telegram</p>
                <p className="text-xs text-stone-500">Bot API resmi — gratis, paling cepat</p>
              </div>
            </div>
            <ChannelDot active={!!s?.telegramActive} />
          </div>

          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="tg-enabled" className="text-sm text-stone-300">Kirim notifikasi lead</Label>
              <Switch id="tg-enabled" checked={tgEnabled} onCheckedChange={(v) => { setTgEnabled(v); touch(); }} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tg-token" className="text-xs text-stone-400">Token Bot (dari @BotFather)</Label>
              <div className="relative">
                <Input
                  id="tg-token"
                  type={showTgToken ? "text" : "password"}
                  value={tgToken}
                  onChange={(e) => { setTgToken(e.target.value); touch(); }}
                  placeholder="123456789:AAHxyz…"
                  className="border-stone-700 bg-stone-950/70 pr-10 text-stone-100 placeholder:text-stone-600"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setShowTgToken((v) => !v)}
                  aria-label={showTgToken ? "Sembunyikan token" : "Tampilkan token"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
                >
                  {showTgToken ? <EyeOff aria-hidden className="h-4 w-4" /> : <Eye aria-hidden className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tg-chat" className="text-xs text-stone-400">Chat ID tujuan</Label>
              <div className="flex gap-2">
                <Input
                  id="tg-chat"
                  value={tgChatId}
                  onChange={(e) => { setTgChatId(e.target.value); touch(); }}
                  placeholder="123456789 atau -1001234567890"
                  className="border-stone-700 bg-stone-950/70 text-stone-100 placeholder:text-stone-600"
                  inputMode="numeric"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={detectChats}
                  disabled={busy === "detect" || !tgToken}
                  className="shrink-0 border-stone-700 bg-stone-900/60 text-stone-300 hover:bg-stone-800"
                >
                  {busy === "detect" ? <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> : <Radar aria-hidden className="h-4 w-4" />}
                  <span className="ml-1.5 hidden sm:inline">Deteksi</span>
                </Button>
              </div>
              <p className="text-[11px] leading-relaxed text-stone-500">
                Cara setup 3 menit: ① Chat <span className="text-sky-400">@BotFather</span> → kirim <code className="text-stone-400">/newbot</code> → salin token. ② Kirim pesan apa pun ke bot kamu. ③ Klik <b>Deteksi</b> untuk ambil Chat ID otomatis.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => action({ action: "test-telegram", botToken: tgToken, chatId: tgChatId }, "Uji Telegram")}
              disabled={busy === "test-telegram"}
              className="w-full border-sky-700/50 bg-sky-500/10 text-sky-300 hover:bg-sky-500/20"
            >
              {busy === "test-telegram" ? <Loader2 aria-hidden className="mr-2 h-4 w-4 animate-spin" /> : <BellRing aria-hidden className="mr-2 h-4 w-4" />}
              Kirim Pesan Uji
            </Button>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="rounded-xl border border-emerald-800/40 bg-stone-900/50 p-5">
          <div className="mb-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30">
                <MessageCircle aria-hidden className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold">WhatsApp</p>
                <p className="text-xs text-stone-500">Via gateway: Fonnte atau Wablas</p>
              </div>
            </div>
            <ChannelDot active={!!s?.whatsappActive} />
          </div>

          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="wa-enabled" className="text-sm text-stone-300">Kirim notifikasi lead</Label>
              <Switch id="wa-enabled" checked={waEnabled} onCheckedChange={(v) => { setWaEnabled(v); touch(); }} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-stone-400">Gateway</Label>
                <Select value={waProvider} onValueChange={(v) => { setWaProvider(v); touch(); }}>
                  <SelectTrigger className="border-stone-700 bg-stone-950/70 text-stone-100" aria-label="Pilih gateway WhatsApp">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-stone-800 bg-stone-900 text-stone-100">
                    <SelectItem value="fonnte">Fonnte (gratis)</SelectItem>
                    <SelectItem value="wablas">Wablas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="wa-target" className="text-xs text-stone-400">Nomor tujuan</Label>
                <Input
                  id="wa-target"
                  value={waTarget}
                  onChange={(e) => { setWaTarget(e.target.value); touch(); }}
                  placeholder="6281269999910"
                  className="border-stone-700 bg-stone-950/70 text-stone-100 placeholder:text-stone-600"
                  inputMode="numeric"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="wa-token" className="text-xs text-stone-400">Token API Gateway</Label>
              <div className="relative">
                <Input
                  id="wa-token"
                  type={showWaToken ? "text" : "password"}
                  value={waToken}
                  onChange={(e) => { setWaToken(e.target.value); touch(); }}
                  placeholder="Token device Fonnte / Wablas"
                  className="border-stone-700 bg-stone-950/70 pr-10 text-stone-100 placeholder:text-stone-600"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setShowWaToken((v) => !v)}
                  aria-label={showWaToken ? "Sembunyikan token" : "Tampilkan token"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
                >
                  {showWaToken ? <EyeOff aria-hidden className="h-4 w-4" /> : <Eye aria-hidden className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-[11px] leading-relaxed text-stone-500">
                Fonnte: daftar di <span className="text-emerald-400">fonnte.com</span> → scan QR → salin token device. Wablas: buat device di <span className="text-emerald-400">console.wablas.com</span> → salin token.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => action({ action: "test-whatsapp", apiToken: waToken, target: waTarget, provider: waProvider }, "Uji WhatsApp")}
              disabled={busy === "test-whatsapp"}
              className="w-full border-emerald-700/50 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
            >
              {busy === "test-whatsapp" ? <Loader2 aria-hidden className="mr-2 h-4 w-4 animate-spin" /> : <BellRing aria-hidden className="mr-2 h-4 w-4" />}
              Kirim Pesan Uji
            </Button>
          </div>
        </div>
      </div>

      {/* ---------- template pesan ---------- */}
      <div className="rounded-xl border border-stone-800 bg-stone-900/50 p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="font-bold">Template Pesan Lead Baru</p>
            <p className="text-xs text-stone-500">Berlaku untuk kedua kanal — klik chip untuk menyisipkan variabel</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { setTemplate(DEFAULT_TEMPLATE); touch(); }}
            className="text-stone-500 hover:bg-stone-800 hover:text-stone-300"
          >
            <RotateCcw aria-hidden className="mr-1.5 h-3.5 w-3.5" /> Reset default
          </Button>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-1.5">
              {TOKENS.map((t) => (
                <button
                  key={t.token}
                  type="button"
                  onClick={() => insertToken(t.token)}
                  title={t.desc}
                  className="rounded-md border border-emerald-800/50 bg-emerald-500/10 px-2 py-1 font-mono text-[11px] text-emerald-300 transition-colors hover:bg-emerald-500/20"
                >
                  {t.token}
                </button>
              ))}
            </div>
            <Textarea
              ref={templateRef}
              value={template}
              onChange={(e) => { setTemplate(e.target.value); touch(); }}
              rows={12}
              className="resize-y border-stone-700 bg-stone-950/70 font-mono text-[13px] leading-relaxed text-stone-100"
              aria-label="Template pesan notifikasi"
            />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">Pratinjau langsung</p>
            <div className="max-h-72 overflow-y-auto whitespace-pre-wrap rounded-xl rounded-tl-sm border border-stone-700/60 bg-[#0b141a] p-4 font-mono text-[13px] leading-relaxed text-stone-200 shadow-inner" data-testid="template-preview">
              {renderPreview(template)}
            </div>
          </div>
        </div>
      </div>

      {/* ---------- simpan ---------- */}
      <div className="flex items-center justify-between gap-3 rounded-xl border border-emerald-800/40 bg-emerald-500/5 p-4">
        <p className="text-sm text-stone-400">
          {dirty ? "Ada perubahan yang belum tersimpan." : "Semua pengaturan tersimpan. Notifikasi aktif tiap lead baru masuk."}
        </p>
        <Button onClick={saveAll} disabled={saveBusy || !dirty} className="shrink-0 bg-emerald-600 text-white hover:bg-emerald-500">
          {saveBusy ? <Loader2 aria-hidden className="mr-2 h-4 w-4 animate-spin" /> : <Save aria-hidden className="mr-2 h-4 w-4" />}
          Simpan Pengaturan
        </Button>
      </div>

      {/* ---------- feed pengiriman ---------- */}
      <div className="rounded-xl border border-stone-800 bg-stone-900/50 p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <p className="font-bold">Riwayat Pengiriman <span className="ml-1 text-xs font-normal text-stone-500">live · 8 dtk</span></p>
          </div>
          {hydrated && <Badge variant="outline" className="border-stone-700 text-stone-400">{logs.length} log</Badge>}
        </div>

        {loading ? (
          <SkeletonRows rows={5} />
        ) : error ? (
          <p className="py-6 text-center text-sm text-rose-400">{error}</p>
        ) : logs.length === 0 ? (
          <EmptyState
            title="Belum ada pengiriman"
            sub="Begitu lead baru masuk lewat form, chat AI, atau roadmap — notifikasi akan muncul di sini dan langsung meluncur ke Telegram/WhatsApp kamu."
          />
        ) : (
          <div className="max-h-96 space-y-2 overflow-y-auto pr-1 [scrollbar-width:thin]">
            <AnimatePresence initial={false}>
              {logs.map((log) => {
                const isTg = log.channel === "telegram";
                const ok = log.status === "sent";
                const Icon = isTg ? Send : MessageCircle;
                return (
                  <motion.div
                    key={log.id}
                    layout
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-start gap-3 rounded-lg border border-stone-800/80 bg-stone-950/50 p-3"
                    data-testid="notif-log"
                  >
                    <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ring-1 ${
                      isTg ? "bg-sky-500/10 text-sky-400 ring-sky-500/25" : "bg-emerald-500/10 text-emerald-400 ring-emerald-500/25"
                    }`}>
                      <Icon aria-hidden className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        <p className="truncate text-sm font-semibold text-stone-200">{log.leadName}</p>
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide ${ok ? "text-emerald-400" : "text-rose-400"}`}>
                          {ok ? <CheckCircle2 aria-hidden className="h-3 w-3" /> : <XCircle aria-hidden className="h-3 w-3" />}
                          {ok ? "terkirim" : "gagal"}
                        </span>
                      </div>
                      <div className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-stone-500">
                        <a href={`https://wa.me/${log.leadWa.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-stone-400 underline-offset-2 hover:text-emerald-300 hover:underline">
                          {log.leadWa}
                        </a>
                        <span>·</span>
                        <span>{SOURCE_LABEL[log.source] ?? log.source}</span>
                        <span>·</span>
                        <Clock aria-hidden className="inline h-3 w-3" />
                        <span>{relativeTime(log.createdAt)}</span>
                      </div>
                      {!ok && log.error && (
                        <p className="mt-1 truncate text-xs text-rose-400/80" title={log.error}>
                          {log.error}
                        </p>
                      )}
                    </div>
                    {!ok && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => action({ action: "retry", logId: log.id }, "Kirim ulang")}
                        disabled={busy === "retry"}
                        className="h-8 shrink-0 px-2 text-xs text-amber-300 hover:bg-amber-500/10 hover:text-amber-200"
                      >
                        <RotateCcw aria-hidden className="mr-1 h-3.5 w-3.5" /> Ulangi
                      </Button>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* ---------- dialog hasil deteksi chat id ---------- */}
      <Dialog open={detectOpen} onOpenChange={setDetectOpen}>
        <DialogContent className="border-stone-800 bg-stone-900 text-stone-100">
          <DialogHeader>
            <DialogTitle>Chat ID Terdeteksi</DialogTitle>
            <DialogDescription className="text-stone-400">
              Chat yang pernah mengirim pesan ke bot kamu. Pilih salah satu sebagai tujuan notifikasi.
            </DialogDescription>
          </DialogHeader>
          {detected.length === 0 ? (
            <p className="rounded-lg border border-amber-800/50 bg-amber-500/10 p-4 text-sm text-amber-300">
              Belum ada chat terdeteksi. Buka Telegram → cari bot kamu → tekan <b>Start</b> / kirim pesan apa pun, lalu klik Deteksi lagi.
            </p>
          ) : (
            <div className="space-y-2">
              {detected.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { setTgChatId(c.id); touch(); setDetectOpen(false); }}
                  className="flex w-full items-center justify-between rounded-lg border border-stone-700 bg-stone-950/60 p-3 text-left transition-colors hover:border-emerald-600/50 hover:bg-emerald-500/5"
                >
                  <div>
                    <p className="text-sm font-semibold">{c.title}</p>
                    <p className="text-xs text-stone-500">{c.type} · {c.id}</p>
                  </div>
                  <Badge variant="outline" className="border-emerald-700/50 bg-emerald-500/10 text-emerald-300">Pakai</Badge>
                </button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
