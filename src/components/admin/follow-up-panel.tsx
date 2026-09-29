"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { toast } from "sonner";
import {
  ChevronDown,
  ChevronRight,
  Copy,
  Check,
  CheckCircle2,
  Loader2,
  Mail,
  MessageCircle,
  User,
  X,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

// ============================================================
// FollowUpPanel — Pusat kendali email follow-up otomatis.
// Self-contained: fetch data sendiri, engine proses lead dingin,
// kirim manual via mailto/wa.me, salin, tandai terkirim/batal.
// Palet emerald/amber/stone. Dipasang orchestrator di tab dashboard.
// ============================================================

interface FollowUpItem {
  id: string;
  leadId: string;
  channel: string;
  subject: string;
  body: string;
  status: string;
  emailTo: string | null;
  toPhone: string | null;
  trigger: string;
  sentAt: string | null;
  createdAt: string;
  lead: {
    name: string;
    whatsapp: string;
    email: string | null;
    status: string;
    businessType: string;
  };
}

interface FollowUpStats {
  queued: number;
  sent: number;
  dismissed: number;
}

interface ProcessResponse {
  success: boolean;
  processed?: number;
  created?: { id: string; leadId: string; leadName: string; subject: string }[];
  skipped?: number;
  message?: string;
  error?: string;
}

/** Auto engine: proses lead dingin tiap 3 menit (spec) */
const AUTO_PROCESS_MS = 180_000;
/** Poll daftar follow-up tiap 30 detik saat auto aktif */
const POLL_MS = 30_000;
const AUTO_STORAGE_KEY = "pp-fu-auto";

/** Format nomor WA 62xxx -> +62 8xx-xxxx-xxxx (ringkas & aman) */
function formatWa(wa: string): string {
  const digits = wa.replace(/\D/g, "");
  if (digits.startsWith("62") && digits.length >= 10) {
    const parts = [digits.slice(2, 5), digits.slice(5, 9), digits.slice(9)].filter(Boolean);
    return `+62 ${parts.join("-")}`;
  }
  return `+${digits}`;
}

/** Label Indonesia + kelas warna badge status (amber/emerald/stone/rose) */
function statusMeta(status: string): { label: string; className: string } {
  switch (status) {
    case "SENT":
      return { label: "Terkirim", className: "border-transparent bg-emerald-600 text-white" };
    case "DISMISSED":
      return { label: "Dibatalkan", className: "border-stone-300 bg-stone-200 text-stone-600" };
    case "FAILED":
      return { label: "Gagal", className: "border-rose-200 bg-rose-100 text-rose-700" };
    default:
      return { label: "Queued", className: "border-amber-200 bg-amber-100 text-amber-800" };
  }
}

/** Timestamp relatif bahasa Indonesia (date-fns id locale) */
function relTime(iso: string | null): string {
  if (!iso) return "—";
  try {
    return formatDistanceToNow(new Date(iso), { addSuffix: true, locale: localeId });
  } catch {
    return "—";
  }
}

export function FollowUpPanel() {
  const [items, setItems] = useState<FollowUpItem[]>([]);
  const [stats, setStats] = useState<FollowUpStats>({ queued: 0, sent: 0, dismissed: 0 });
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [auto, setAuto] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return window.sessionStorage.getItem(AUTO_STORAGE_KEY) !== "0";
  });
  const [ownToaster, setOwnToaster] = useState(false);

  // Guard anti dobel-run engine (klik manual + interval auto bersamaan)
  const inFlightRef = useRef(false);

  // Pasang <Toaster> sonner hanya bila halaman belum memilikinya
  // (komponen self-contained, hindari dobel toaster saat diintegrasi)
  useEffect(() => {
    if (!document.querySelector("[data-sonner-toaster]")) setOwnToaster(true);
  }, []);

  /** GET /api/follow-up — list + stats */
  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/follow-up");
      const json = (await res.json()) as {
        success: boolean;
        data?: { items: FollowUpItem[]; stats: FollowUpStats };
      };
      if (json.success && json.data) {
        setItems(json.data.items);
        setStats(json.data.stats);
      }
    } catch {
      // senyap — poll berikutnya akan mencoba lagi
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  /** Engine: POST /api/follow-up/process (dipakai tombol manual & interval auto) */
  const runProcess = useCallback(
    async (opts: { trigger: "auto" | "manual"; maxPerRun: number }) => {
      if (inFlightRef.current) return;
      inFlightRef.current = true;
      if (opts.trigger === "manual") setProcessing(true);
      try {
        const res = await fetch("/api/follow-up/process", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ maxPerRun: opts.maxPerRun, trigger: opts.trigger }),
        });
        const json = (await res.json()) as ProcessResponse;
        if (!json.success) {
          if (opts.trigger === "manual") toast.error(json.error ?? "Gagal memproses follow-up");
          return;
        }
        const n = json.processed ?? 0;
        if (n > 0) {
          toast.success(
            opts.trigger === "auto"
              ? `${n} email follow-up dibuat otomatis`
              : `${n} email follow-up dibuat`
          );
          void fetchData();
        } else if (opts.trigger === "manual") {
          toast.info(
            json.message ?? "Belum ada lead yang dingin — semua masih segar atau sudah diproses"
          );
        }
      } catch {
        if (opts.trigger === "manual") toast.error("Gagal terhubung ke server");
      } finally {
        inFlightRef.current = false;
        if (opts.trigger === "manual") setProcessing(false);
      }
    },
    [fetchData]
  );

  /** Interval auto: engine proses (3 menit) + poll daftar (30 detik), skip saat tab hidden */
  useEffect(() => {
    if (!auto) return;
    const engine = setInterval(() => {
      if (document.hidden) return;
      void runProcess({ trigger: "auto", maxPerRun: 2 });
    }, AUTO_PROCESS_MS);
    const poll = setInterval(() => {
      if (document.hidden) return;
      void fetchData();
    }, POLL_MS);
    return () => {
      clearInterval(engine);
      clearInterval(poll);
    };
  }, [auto, runProcess, fetchData]);

  /** Switch auto: simpan sessionStorage + toast status engine */
  const handleAutoChange = (checked: boolean) => {
    setAuto(checked);
    try {
      window.sessionStorage.setItem(AUTO_STORAGE_KEY, checked ? "1" : "0");
    } catch {
      // sessionStorage bisa gagal (private mode) — abaikan
    }
    if (checked) {
      toast.info("Engine otomatis aktif — lead dingin diproses tiap 3 menit");
    } else {
      toast.info("Engine otomatis dimatikan");
    }
  };

  /** PATCH status follow-up + refresh */
  const updateStatus = useCallback(
    async (id: string, status: "SENT" | "DISMISSED" | "FAILED") => {
      setPendingId(id);
      try {
        const res = await fetch(`/api/follow-up/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        });
        const json = (await res.json()) as { success: boolean; error?: string };
        if (!json.success) {
          toast.error(json.error ?? "Gagal memperbarui status");
          return;
        }
        if (status === "SENT") toast.success("Email ditandai terkirim");
        if (status === "DISMISSED") toast.info("Follow-up dibatalkan");
        void fetchData();
      } catch {
        toast.error("Gagal terhubung ke server");
      } finally {
        setPendingId(null);
      }
    },
    [fetchData]
  );

  /** Kirim via email (mailto) lalu tandai SENT */
  const sendViaEmail = (item: FollowUpItem) => {
    if (!item.emailTo) return;
    const url = `mailto:${item.emailTo}?subject=${encodeURIComponent(
      item.subject
    )}&body=${encodeURIComponent(item.body)}`;
    window.location.href = url;
    void updateStatus(item.id, "SENT");
  };

  /** Kirim via WhatsApp (wa.me) lalu tandai SENT */
  const sendViaWhatsapp = (item: FollowUpItem) => {
    if (!item.toPhone) return;
    const url = `https://wa.me/${item.toPhone}?text=${encodeURIComponent(
      `${item.subject}\n\n${item.body}`
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
    void updateStatus(item.id, "SENT");
  };

  /** Salin email ke clipboard */
  const copyEmail = async (item: FollowUpItem) => {
    const text = `Subject: ${item.subject}\n\n${item.body}`;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Email disalin");
    } catch {
      toast.error("Gagal menyalin ke clipboard");
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-4">
      {ownToaster && <Toaster position="top-center" richColors closeButton />}

      {/* ---------- Header gradient ---------- */}
      <div className="rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-600 p-4 text-white">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-white/15 p-2" aria-hidden="true">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold">Follow-up Center</h2>
              <p className="text-xs text-emerald-50/90">
                Email AI otomatis untuk lead yang belum closing
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2" aria-live="polite">
            <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium">
              Queued {stats.queued}
            </span>
            <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium">
              Terkirim {stats.sent}
            </span>
            <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium">
              Dibatalkan {stats.dismissed}
            </span>
          </div>
        </div>
      </div>

      {/* ---------- Bar kontrol ---------- */}
      <div className="flex flex-col gap-3 rounded-xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          onClick={() => void runProcess({ trigger: "manual", maxPerRun: 4 })}
          disabled={processing}
          className="w-full bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-600 sm:w-auto"
        >
          {processing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Zap className="mr-2 h-4 w-4" aria-hidden="true" />
          )}
          {processing ? "Memproses..." : "Proses Lead Sekarang"}
        </Button>
        <div className="flex items-center gap-2">
          <Switch id="fu-auto" checked={auto} onCheckedChange={handleAutoChange} />
          <Label
            htmlFor="fu-auto"
            className="cursor-pointer text-sm text-muted-foreground"
          >
            Otomatis tiap 3 menit
          </Label>
        </div>
      </div>

      {/* ---------- Daftar follow-up ---------- */}
      {loading ? (
        <div className="space-y-3" aria-label="Memuat follow-up" role="status">
          {[0, 1, 2].map((i) => (
            <Card key={i} className="gap-3 p-4">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </Card>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed p-10 text-center">
          <div className="rounded-full bg-stone-100 p-4" aria-hidden="true">
            <Mail className="h-8 w-8 text-stone-400" />
          </div>
          <p className="mt-4 text-sm font-semibold text-stone-700">Belum ada email follow-up</p>
          <p className="mt-1 max-w-sm text-xs text-muted-foreground">
            Klik Proses Lead Sekarang, atau tunggu engine otomatis menangkap lead yang mulai
            dingin.
          </p>
        </div>
      ) : (
        <div className="scrollbar-thin max-h-[720px] space-y-3 overflow-y-auto pr-1" role="list">
          {items.map((item) => {
            const meta = statusMeta(item.status);
            const expanded = expandedIds.has(item.id);
            const isPending = pendingId === item.id;
            return (
              <motion.div
                key={item.id}
                role="listitem"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Card className="gap-3 p-4">
                  {/* Baris atas: badge status + trigger + timestamp */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={meta.className}>{meta.label}</Badge>
                    <Badge variant="outline" className="border-stone-300 text-stone-500">
                      {item.trigger === "auto" ? "Auto" : "Manual"}
                    </Badge>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {relTime(item.createdAt)}
                    </span>
                  </div>

                  {/* Subject + expand */}
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold leading-snug">{item.subject}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 shrink-0 gap-1 px-2 text-xs text-muted-foreground"
                      onClick={() => toggleExpand(item.id)}
                      aria-expanded={expanded}
                      aria-controls={`fu-body-${item.id}`}
                    >
                      {expanded ? (
                        <ChevronDown className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <ChevronRight className="h-4 w-4" aria-hidden="true" />
                      )}
                      {expanded ? "Sembunyikan" : "Lihat email lengkap"}
                    </Button>
                  </div>

                  {/* Body: preview 2 baris atau penuh saat expand */}
                  {expanded ? (
                    <div
                      id={`fu-body-${item.id}`}
                      className="scrollbar-thin max-h-72 overflow-y-auto whitespace-pre-wrap rounded-md bg-stone-50 p-3 text-sm text-stone-700"
                    >
                      {item.body}
                    </div>
                  ) : (
                    <p className="line-clamp-2 text-sm text-muted-foreground">{item.body}</p>
                  )}

                  {/* Meta lead */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <User className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="font-medium text-stone-700">{item.lead.name}</span>
                    </span>
                    <Badge
                      variant="outline"
                      className="border-stone-300 px-1.5 py-0 text-[10px] text-stone-500"
                    >
                      {item.lead.status}
                    </Badge>
                    <span>{formatWa(item.lead.whatsapp)}</span>
                    <span>{item.lead.email ?? "—"}</span>
                  </div>

                  {/* Timestamp terkirim utk item SENT */}
                  {item.status === "SENT" && item.sentAt && (
                    <p className="inline-flex items-center gap-1.5 text-xs text-emerald-700">
                      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                      Terkirim {relTime(item.sentAt)}
                    </p>
                  )}

                  {/* Aksi */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                      disabled={!item.emailTo || isPending}
                      title={item.emailTo ? "Buka aplikasi email" : "Lead tidak punya email"}
                      onClick={() => sendViaEmail(item)}
                    >
                      <Mail className="mr-1.5 h-4 w-4" aria-hidden="true" />
                      Kirim via Email
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                      disabled={!item.toPhone || isPending}
                      title={item.toPhone ? "Buka WhatsApp" : "Nomor WA tidak tersedia"}
                      onClick={() => sendViaWhatsapp(item)}
                    >
                      <MessageCircle className="mr-1.5 h-4 w-4" aria-hidden="true" />
                      Kirim via WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9"
                      disabled={isPending}
                      onClick={() => void copyEmail(item)}
                    >
                      <Copy className="mr-1.5 h-4 w-4" aria-hidden="true" />
                      Salin
                    </Button>
                    {item.status === "QUEUED" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-9 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                          disabled={isPending}
                          onClick={() => void updateStatus(item.id, "SENT")}
                        >
                          {isPending ? (
                            <Loader2 className="mr-1.5 h-4 w-4 animate-spin" aria-hidden="true" />
                          ) : (
                            <Check className="mr-1.5 h-4 w-4" aria-hidden="true" />
                          )}
                          Tandai Terkirim
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "h-9 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                          )}
                          disabled={isPending}
                          onClick={() => void updateStatus(item.id, "DISMISSED")}
                        >
                          <X className="mr-1.5 h-4 w-4" aria-hidden="true" />
                          Batalkan
                        </Button>
                      </>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FollowUpPanel;
