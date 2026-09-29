"use client";

// ============================================================
// Admin Dashboard — Command Center PusatPerizinan.com
// Lead monitoring REAL-TIME (polling 5 dtk) + feed aktivitas.
//
// KEAMANAN: Gate PIN di bawah ini hanya demo sandbox (client-side).
// Untuk produksi wajib auth server (NextAuth) — jangan pakai ini.
// ============================================================

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { toast } from "sonner";
import {
  Activity,
  Banknote,
  CalendarCheck,
  Eye,
  FileCheck,
  Flame,
  Lock,
  Mail,
  MapIcon,
  MessageCircle,
  RefreshCw,
  Search,
  Star,
  Trophy,
  UserPlus,
  Users,
} from "lucide-react";

import { Toaster } from "@/components/ui/sonner";
import FollowUpPanel from "@/components/admin/follow-up-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// ============================================================
// Tipe data
// ============================================================

type LeadStatus = "NEW" | "CONTACTED" | "CONSULTED" | "CLOSED_WON" | "CLOSED_LOST";
type ActivityType =
  | "chat"
  | "license-check"
  | "document-check"
  | "roadmap"
  | "subscriber"
  | "consultation"
  | "lead";
type TabKey = "leads" | "activity" | "follow-up";

interface Lead {
  id: string;
  name: string;
  whatsapp: string;
  email: string | null;
  businessType: string;
  businessDesc: string | null;
  package: string | null;
  source: string;
  status: LeadStatus;
  estimatedValue: number;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

interface LeadSummary {
  total: number;
  today: number;
  byStatus: Record<LeadStatus, number>;
  pipelineActiveCount: number;
  pipelineValue: number;
  todayValue: number;
}

interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  detail: string;
  at: string;
}

// ============================================================
// Konstanta & konfigurasi
// ============================================================

const ADMIN_PIN = "123456"; // Demo sandbox — produksi: NextAuth
const AUTH_KEY = "pp-admin-auth";
const LEADS_POLL_MS = 5_000;
const ACTIVITY_POLL_MS = 10_000;
const HIGHLIGHT_MS = 4_000;

const STATUSES: { value: LeadStatus; label: string; badge: string }[] = [
  { value: "NEW", label: "Baru", badge: "bg-amber-100 text-amber-800 border-amber-200" },
  { value: "CONTACTED", label: "Dihubungi", badge: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  { value: "CONSULTED", label: "Konsultasi", badge: "bg-stone-200 text-stone-800 border-stone-300" },
  { value: "CLOSED_WON", label: "Deal Won", badge: "bg-emerald-600 text-white border-emerald-700" },
  { value: "CLOSED_LOST", label: "Deal Lost", badge: "bg-rose-100 text-rose-700 border-rose-200" },
];

const STATUS_MAP = new Map(STATUSES.map((s) => [s.value, s]));

const SOURCES: { value: string; label: string }[] = [
  { value: "landing", label: "Landing Page" },
  { value: "chat", label: "Chat AI" },
  { value: "checker", label: "Cek Izin AI" },
  { value: "popup", label: "Popup" },
];

const SOURCE_MAP = new Map(SOURCES.map((s) => [s.value, s.label]));

// ============================================================
// Helper format
// ============================================================

/** Rp ringkas: >=1M → "Rp X,X M", >=1jt → "Rp X,X jt", >=1rb → "Rp X rb" */
function formatRupiahCompact(value: number): string {
  if (value >= 1_000_000_000) return `Rp ${(value / 1_000_000_000).toFixed(1).replace(".", ",")} M`;
  if (value >= 1_000_000) return `Rp ${(value / 1_000_000).toFixed(1).replace(".", ",")} jt`;
  if (value >= 1_000) return `Rp ${Math.round(value / 1_000)} rb`;
  return `Rp ${value}`;
}

/** Nomor WA tersimpan "6281298765432" → tampil "+62 812-9876-5432" */
function formatWaDisplay(whatsapp: string): string {
  const digits = whatsapp.replace(/\D/g, "");
  if (digits.startsWith("62") && digits.length >= 9) {
    const rest = digits.slice(2);
    return `+62 ${rest.slice(0, 3)}-${rest.slice(3, 7)}-${rest.slice(7)}`;
  }
  return `+${digits}`;
}

/** Link wa.me dengan sapaan personal untuk tim sales */
function buildWaLink(whatsapp: string, name: string): string {
  const digits = whatsapp.replace(/\D/g, "");
  const text = encodeURIComponent(
    `Halo Kak ${name}! Saya tim PusatPerizinan.com. Terima kasih sudah menghubungi kami — ada yang bisa kami bantu terkait perizinan usaha Kakak?`
  );
  return `https://wa.me/${digits}?text=${text}`;
}

function formatRelative(iso: string): string {
  try {
    return formatDistanceToNow(new Date(iso), { addSuffix: true, locale: localeId });
  } catch {
    return "—";
  }
}

/** Jam WIB (Asia/Jakarta) "HH:MM:SS" */
function formatWibTime(d: Date): string {
  return d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  });
}

// ============================================================
// Komponen kecil
// ============================================================

function StatusBadge({ status }: { status: LeadStatus }) {
  const cfg = STATUS_MAP.get(status);
  if (!cfg) return <Badge variant="secondary">{status}</Badge>;
  return (
    <Badge className={cn("border font-medium", cfg.badge)} aria-label={`Status: ${cfg.label}`}>
      {cfg.label}
    </Badge>
  );
}

function SourceBadge({ source }: { source: string }) {
  const label = SOURCE_MAP.get(source) || source;
  return (
    <span className="mt-0.5 inline-flex w-fit items-center rounded bg-stone-100 px-1.5 py-0.5 text-[10px] font-medium text-stone-500">
      {label}
    </span>
  );
}

function ActivityIcon({ type }: { type: ActivityType }) {
  const Icon =
    type === "chat"
      ? MessageCircle
      : type === "license-check"
        ? Search
        : type === "document-check"
          ? FileCheck
          : type === "roadmap"
            ? MapIcon
            : type === "subscriber"
              ? Mail
              : type === "consultation"
                ? CalendarCheck
                : Star; // lead
  return (
    <div
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full",
        type === "lead" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
      )}
      aria-hidden
    >
      <Icon className="size-4" />
    </div>
  );
}

function DetailField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-stone-500">{label}</p>
      <div className="text-sm text-stone-800">{children ?? "—"}</div>
    </div>
  );
}

// ============================================================
// Login gate (demo PIN)
// ============================================================

function LoginGate({ onSuccess }: { onSuccess: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [shakeKey, setShakeKey] = useState(0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem(AUTH_KEY, "1");
      onSuccess();
      return;
    }
    setError("PIN salah, coba lagi.");
    setShakeKey((k) => k + 1);
    setPin("");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-100 px-4">
      <motion.div
        key={shakeKey}
        animate={shakeKey > 0 ? { x: [0, -10, 10, -6, 6, 0] } : { x: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-sm"
      >
        <Card className="border-stone-200 shadow-lg">
          <CardHeader className="items-center pb-2 text-center">
            <div className="mx-auto mb-2 flex size-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/30">
              <Lock className="size-6" aria-hidden />
            </div>
            <CardTitle className="text-xl font-bold text-stone-800">Command Center Admin</CardTitle>
            <p className="text-sm text-stone-500">
              Masukkan PIN untuk memantau lead &amp; aktivitas PusatPerizinan.com
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-pin">PIN Admin</Label>
                <Input
                  id="admin-pin"
                  type="password"
                  inputMode="numeric"
                  autoComplete="current-password"
                  placeholder="••••••"
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    if (error) setError("");
                  }}
                  aria-invalid={!!error}
                  aria-describedby={error ? "admin-pin-error" : undefined}
                  className="border-stone-300 text-center text-lg tracking-[0.4em]"
                />
                {error && (
                  <p id="admin-pin-error" role="alert" className="text-sm font-medium text-rose-600">
                    {error}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Masuk
              </Button>
              <div className="space-y-1 text-center">
                <p className="text-xs text-stone-500">
                  PIN demo: <span className="font-mono font-semibold text-stone-700">123456</span>
                </p>
                <p className="text-[11px] text-stone-400">
                  Demo sandbox — untuk produksi wajib auth server (NextAuth)
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

// ============================================================
// Skeleton loading
// ============================================================

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="border-stone-200">
            <CardContent className="flex items-center justify-between p-4">
              <div className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-7 w-14" />
              </div>
              <Skeleton className="size-9 rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-stone-200">
        <CardContent className="p-6">
          <div className="mb-4 flex gap-3">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-40" />
          </div>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="mb-2 h-12 w-full" />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================================
// Dashboard utama
// ============================================================

export function AdminDashboard() {
  // ---- Auth gate ----
  const [authed, setAuthed] = useState<boolean | null>(null);
  useEffect(() => {
    setAuthed(sessionStorage.getItem(AUTH_KEY) === "1");
  }, []);

  // ---- Data lead ----
  const [leads, setLeads] = useState<Lead[]>([]);
  const [summary, setSummary] = useState<LeadSummary | null>(null);
  const [initialLoaded, setInitialLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [pollError, setPollError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [highlighted, setHighlighted] = useState<Set<string>>(new Set());
  const knownIds = useRef<Set<string>>(new Set());

  // ---- Filter ----
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");

  // ---- Sheet detail ----
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editStatus, setEditStatus] = useState<LeadStatus>("NEW");
  const [editNotes, setEditNotes] = useState("");
  const [savingStatus, setSavingStatus] = useState(false);
  const [savingNotes, setSavingNotes] = useState(false);

  // ---- Aktivitas ----
  const [activeTab, setActiveTab] = useState<TabKey>("leads");
  const [activityItems, setActivityItems] = useState<ActivityItem[]>([]);
  const [activityLoaded, setActivityLoaded] = useState(false);
  const [activityError, setActivityError] = useState<string | null>(null);

  const selectedLead = useMemo(
    () => (selectedId ? leads.find((l) => l.id === selectedId) ?? null : null),
    [leads, selectedId]
  );

  // ---- Debounce search 300ms ----
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(t);
  }, [search]);

  // ---- Fetch leads (list + summary) + deteksi lead baru ----
  const fetchLeads = useCallback(async () => {
    try {
      setRefreshing(true);
      const params = new URLSearchParams();
      if (debouncedSearch) params.set("q", debouncedSearch);
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (sourceFilter !== "all") params.set("source", sourceFilter);
      const res = await fetch(`/api/admin/leads?${params.toString()}`, { cache: "no-store" });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Gagal memuat data lead");
      }
      const items: Lead[] = json.data.items;
      const nextSummary: LeadSummary = json.data.summary;

      // Deteksi lead baru (skip saat fetch pertama)
      if (knownIds.current.size > 0) {
        const fresh = items.filter((i) => !knownIds.current.has(i.id));
        if (fresh.length > 0) {
          setHighlighted((prev) => {
            const next = new Set(prev);
            fresh.forEach((f) => next.add(f.id));
            return next;
          });
          fresh.forEach((f) => toast.success(`🎉 Lead baru masuk: ${f.name}`));
          setTimeout(() => {
            setHighlighted((prev) => {
              const next = new Set(prev);
              fresh.forEach((f) => next.delete(f.id));
              return next;
            });
          }, HIGHLIGHT_MS);
        }
      }
      items.forEach((i) => knownIds.current.add(i.id));

      setLeads(items);
      setSummary(nextSummary);
      setLastUpdated(new Date());
      setLoadError(null);
      setPollError(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan jaringan";
      setPollError(true);
      if (knownIds.current.size === 0) setLoadError(msg);
    } finally {
      setRefreshing(false);
      setInitialLoaded(true);
    }
  }, [debouncedSearch, statusFilter, sourceFilter]);

  // Fetch saat filter berubah / mount pertama
  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Polling real-time 5 detik (skip saat tab browser hidden)
  const fetchLeadsRef = useRef(fetchLeads);
  useEffect(() => {
    fetchLeadsRef.current = fetchLeads;
  }, [fetchLeads]);
  useEffect(() => {
    const timer = setInterval(() => {
      if (!document.hidden) fetchLeadsRef.current();
    }, LEADS_POLL_MS);
    return () => clearInterval(timer);
  }, []);

  // ---- Fetch feed aktivitas (poll 10 dtk saat tab aktif) ----
  const fetchActivity = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/activity", { cache: "no-store" });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Gagal memuat aktivitas");
      }
      setActivityItems(json.data.items as ActivityItem[]);
      setActivityError(null);
    } catch (err) {
      setActivityError(err instanceof Error ? err.message : "Terjadi kesalahan jaringan");
    } finally {
      setActivityLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (activeTab !== "activity") return;
    fetchActivity();
    const timer = setInterval(() => {
      if (!document.hidden) fetchActivity();
    }, ACTIVITY_POLL_MS);
    return () => clearInterval(timer);
  }, [activeTab, fetchActivity]);

  // ---- Sheet & aksi update lead ----
  function openLead(lead: Lead) {
    setSelectedId(lead.id);
    setEditStatus(lead.status);
    setEditNotes(lead.notes || "");
    setSheetOpen(true);
  }

  async function patchLead(id: string, body: Record<string, unknown>, kind: "status" | "notes") {
    if (kind === "status") setSavingStatus(true);
    else setSavingNotes(true);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Gagal menyimpan perubahan");
      }
      toast.success(kind === "status" ? "Status lead diperbarui" : "Catatan disimpan");
      await fetchLeads();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menyimpan perubahan");
    } finally {
      setSavingStatus(false);
      setSavingNotes(false);
    }
  }

  const stats = summary
    ? [
        { label: "Lead Hari Ini", value: String(summary.today), icon: UserPlus },
        { label: "Total Lead", value: String(summary.total), icon: Users },
        { label: "Pipeline Aktif", value: String(summary.pipelineActiveCount), icon: Flame },
        { label: "Nilai Pipeline", value: formatRupiahCompact(summary.pipelineValue), icon: Banknote },
        { label: "Deal Won", value: String(summary.byStatus.CLOSED_WON), icon: Trophy },
      ]
    : [];

  // ---- Gate: tunggu sessionStorage & render login bila belum auth ----
  if (authed === null) return null;
  if (!authed) return <LoginGate onSuccess={() => setAuthed(true)} />;

  return (
    <div className="flex min-h-screen flex-col bg-stone-100">
      <Toaster position="bottom-right" richColors closeButton />

      {/* ===== Header ===== */}
      <header className="bg-gradient-to-r from-emerald-700 to-emerald-600 px-4 py-4 text-white sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-tight sm:text-xl">Command Center</h1>
            <p className="text-xs text-emerald-100 sm:text-sm">
              PusatPerizinan.com — Lead Monitoring
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5">
              <span
                className="size-2 animate-pulse rounded-full bg-emerald-300"
                aria-hidden
              />
              <span className="text-xs font-semibold tracking-widest" aria-label="Data real-time aktif">
                LIVE
              </span>
            </div>
            <span className="hidden text-xs text-emerald-100/90 md:inline">
              Terakhir diperbarui {lastUpdated ? formatWibTime(lastUpdated) : "—"} WIB
            </span>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Muat ulang data"
              onClick={() => fetchLeads()}
              className="text-white hover:bg-white/15 hover:text-white"
            >
              <RefreshCw className={cn("size-4", refreshing && "animate-spin")} />
            </Button>
          </div>
        </div>
      </header>

      {/* ===== Konten ===== */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabKey)} className="space-y-5">
          <TabsList className="h-11 w-full justify-start gap-1 bg-white p-1 shadow-sm sm:w-auto">
            <TabsTrigger
              value="leads"
              className="px-4 data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
            >
              Leads
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className="px-4 data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
            >
              Aktivitas
            </TabsTrigger>
            <TabsTrigger
              value="follow-up"
              className="px-4 data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
            >
              Follow-up
            </TabsTrigger>
          </TabsList>

          {/* Peringatan polling gagal (data lama tetap tampil) */}
          {pollError && !loadError && (
            <div
              role="status"
              className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-800"
            >
              Gagal memuat pembaruan — mencoba lagi otomatis...
            </div>
          )}

          {/* ---------- TAB LEADS ---------- */}
          {activeTab === "leads" && (
            <>
              {/* Stats row */}
              {!summary ? (
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Card key={i} className="border-stone-200">
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="space-y-2">
                          <Skeleton className="h-3 w-20" />
                          <Skeleton className="h-7 w-14" />
                        </div>
                        <Skeleton className="size-9 rounded-lg" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
                  {stats.map((s) => (
                    <Card key={s.label} className="border-stone-200 shadow-sm">
                      <CardContent className="flex items-center justify-between gap-2 p-4">
                        <div className="min-w-0">
                          <p className="truncate text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                            {s.label}
                          </p>
                          <p className="text-2xl font-bold text-stone-800">{s.value}</p>
                        </div>
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                          <s.icon className="size-4" aria-hidden />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Toolbar */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                  <Search
                    className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400"
                    aria-hidden
                  />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari nama / WA / jenis usaha..."
                    aria-label="Cari lead berdasarkan nama, WhatsApp, atau jenis usaha"
                    className="border-stone-300 bg-white pl-9"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger
                    aria-label="Filter status lead"
                    className="w-full bg-white sm:w-[170px]"
                  >
                    <SelectValue placeholder="Semua Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    {STATUSES.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sourceFilter} onValueChange={setSourceFilter}>
                  <SelectTrigger
                    aria-label="Filter sumber lead"
                    className="w-full bg-white sm:w-[170px]"
                  >
                    <SelectValue placeholder="Semua Sumber" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Sumber</SelectItem>
                    {SOURCES.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Badge variant="secondary" className="w-fit px-3 py-1 text-xs">
                  {leads.length} lead
                </Badge>
              </div>

              {/* Error state awal */}
              {loadError && initialLoaded ? (
                <Card className="border-stone-200">
                  <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
                    <p className="text-sm font-medium text-rose-600">{loadError}</p>
                    <Button
                      onClick={() => fetchLeads()}
                      className="bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                      Coba Lagi
                    </Button>
                  </CardContent>
                </Card>
              ) : !summary ? (
                <DashboardSkeleton />
              ) : (
                /* Tabel lead */
                <Card className="border-stone-200 shadow-sm">
                  <CardContent className="p-0">
                    <div className="scrollbar-thin max-h-[65vh] overflow-x-auto overflow-y-auto rounded-lg">
                      <Table>
                        <TableCaption className="sr-only">
                          Daftar lead PusatPerizinan.com urut dari yang terbaru
                        </TableCaption>
                        <TableHeader className="sticky top-0 z-10 bg-stone-50 shadow-[0_1px_0_0_var(--border)]">
                          <TableRow className="hover:bg-transparent">
                            <TableHead>Nama</TableHead>
                            <TableHead>WhatsApp</TableHead>
                            <TableHead>Jenis Usaha</TableHead>
                            <TableHead className="text-right">Nilai</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Umur</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {leads.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={7} className="py-10 text-center text-sm text-stone-500">
                                Tidak ada lead yang cocok dengan filter.
                              </TableCell>
                            </TableRow>
                          )}
                          {leads.map((lead) => (
                            <TableRow
                              key={lead.id}
                              onClick={() => openLead(lead)}
                              className={cn(
                                "cursor-pointer",
                                highlighted.has(lead.id)
                                  ? "bg-emerald-50 transition-colors"
                                  : "hover:bg-muted/50"
                              )}
                            >
                              <TableCell>
                                <p className="font-medium text-stone-800">{lead.name}</p>
                                <SourceBadge source={lead.source} />
                              </TableCell>
                              <TableCell className="whitespace-nowrap font-mono text-xs text-stone-600">
                                {formatWaDisplay(lead.whatsapp)}
                              </TableCell>
                              <TableCell className="text-sm text-stone-600">
                                {lead.businessType}
                              </TableCell>
                              <TableCell className="whitespace-nowrap text-right text-sm font-medium text-stone-800">
                                {formatRupiahCompact(lead.estimatedValue)}
                              </TableCell>
                              <TableCell>
                                <StatusBadge status={lead.status} />
                              </TableCell>
                              <TableCell className="whitespace-nowrap text-xs text-stone-500">
                                {formatRelative(lead.createdAt)}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-1">
                                  <Button
                                    asChild
                                    variant="ghost"
                                    size="icon"
                                    className="size-8 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                                  >
                                    <a
                                      href={buildWaLink(lead.whatsapp, lead.name)}
                                      target="_blank"
                                      rel="noreferrer"
                                      aria-label={`Chat WhatsApp dengan ${lead.name}`}
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <MessageCircle className="size-4" />
                                    </a>
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    aria-label={`Lihat detail ${lead.name}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openLead(lead);
                                    }}
                                    className="size-8 text-stone-500 hover:bg-stone-100 hover:text-stone-700"
                                  >
                                    <Eye className="size-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {/* ---------- TAB AKTIVITAS ---------- */}
          {activeTab === "activity" && (
            <Card className="border-stone-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-stone-800">
                  <Activity className="size-4 text-emerald-600" aria-hidden />
                  Alur Aktivitas Terbaru
                </CardTitle>
                <p className="text-xs text-stone-500">
                  Gabungan chat AI, cek izin, cek dokumen, roadmap, kursus email, konsultasi &amp;
                  lead — diperbarui tiap 10 detik
                </p>
              </CardHeader>
              <CardContent className="p-0">
                {activityError && activityItems.length === 0 ? (
                  <div className="flex flex-col items-center gap-3 py-12 text-center">
                    <p className="text-sm font-medium text-rose-600">{activityError}</p>
                    <Button
                      onClick={() => fetchActivity()}
                      className="bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                      Coba Lagi
                    </Button>
                  </div>
                ) : !activityLoaded ? (
                  <div className="space-y-3 p-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Skeleton className="size-8 rounded-full" />
                        <div className="flex-1 space-y-1.5">
                          <Skeleton className="h-3 w-24" />
                          <Skeleton className="h-3 w-64" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : activityItems.length === 0 ? (
                  <div className="flex flex-col items-center gap-2 py-14 text-center">
                    <div className="flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <Activity className="size-5" aria-hidden />
                    </div>
                    <p className="text-sm font-medium text-stone-700">Belum ada aktivitas</p>
                    <p className="text-xs text-stone-500">
                      Aktivitas pengunjung (chat, cek izin, lead) akan muncul di sini secara real-time.
                    </p>
                  </div>
                ) : (
                  <ul
                    className="scrollbar-thin max-h-[70vh] divide-y divide-stone-100 overflow-y-auto px-4 pb-4 sm:px-6"
                    aria-label="Feed aktivitas terbaru"
                  >
                    {activityItems.map((item) => (
                      <li key={item.id} className="flex items-center gap-3 py-3">
                        <ActivityIcon type={item.type} />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-stone-800">{item.title}</p>
                          <p className="truncate text-sm text-stone-600">{item.detail}</p>
                        </div>
                        <time
                          dateTime={item.at}
                          className="hidden shrink-0 text-xs text-stone-400 sm:block"
                        >
                          {formatRelative(item.at)}
                        </time>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          )}
          {/* ---------- TAB FOLLOW-UP ---------- */}
          {activeTab === "follow-up" && <FollowUpPanel />}
        </Tabs>
      </main>

      {/* ===== Footer ===== */}
      <footer className="mt-auto px-4 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center">
        <p className="text-xs text-stone-500">
          PusatPerizinan.com Command Center • Demo sandbox
        </p>
      </footer>

      {/* ===== Sheet detail lead ===== */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-full gap-0 sm:max-w-md">
          <SheetHeader className="border-b border-stone-100">
            <div className="flex items-center gap-2 pr-6">
              <SheetTitle className="text-lg font-bold text-stone-800">
                {selectedLead?.name ?? "Detail Lead"}
              </SheetTitle>
              {selectedLead && <StatusBadge status={selectedLead.status} />}
            </div>
            <SheetDescription>
              Detail lead + aksi follow-up tim sales
            </SheetDescription>
          </SheetHeader>

          {selectedLead && (
            <div className="scrollbar-thin flex-1 space-y-5 overflow-y-auto p-4">
              {/* Kontak */}
              <div className="space-y-2">
                <DetailField label="WhatsApp">
                  <span className="font-mono">{formatWaDisplay(selectedLead.whatsapp)}</span>
                </DetailField>
                <Button
                  asChild
                  className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  <a
                    href={buildWaLink(selectedLead.whatsapp, selectedLead.name)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle className="size-4" aria-hidden />
                    Chat WhatsApp
                  </a>
                </Button>
              </div>

              <Separator className="bg-stone-100" />

              {/* Field utama */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                <DetailField label="Email">{selectedLead.email || "—"}</DetailField>
                <DetailField label="Jenis Usaha">{selectedLead.businessType}</DetailField>
                <DetailField label="Paket">{selectedLead.package || "—"}</DetailField>
                <DetailField label="Nilai Estimasi">
                  <span className="font-semibold text-emerald-700">
                    Rp {selectedLead.estimatedValue.toLocaleString("id-ID")}
                  </span>
                </DetailField>
                <DetailField label="Sumber">
                  {SOURCE_MAP.get(selectedLead.source) || selectedLead.source}
                </DetailField>
                <DetailField label="Dibuat">{formatRelative(selectedLead.createdAt)}</DetailField>
                <DetailField label="Diupdate">{formatRelative(selectedLead.updatedAt)}</DetailField>
              </div>

              {selectedLead.businessDesc && (
                <DetailField label="Deskripsi Usaha">
                  <p className="whitespace-pre-wrap rounded-lg bg-stone-50 p-3 text-sm leading-relaxed text-stone-700">
                    {selectedLead.businessDesc}
                  </p>
                </DetailField>
              )}

              <Separator className="bg-stone-100" />

              {/* Update status */}
              <div className="space-y-2">
                <Label htmlFor="lead-status">Status Lead</Label>
                <Select value={editStatus} onValueChange={(v) => setEditStatus(v as LeadStatus)}>
                  <SelectTrigger id="lead-status" aria-label="Ubah status lead" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  onClick={() => patchLead(selectedLead.id, { status: editStatus }, "status")}
                  disabled={savingStatus || editStatus === selectedLead.status}
                  className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  {savingStatus ? "Menyimpan..." : "Simpan Status"}
                </Button>
              </div>

              {/* Catatan */}
              <div className="space-y-2">
                <Label htmlFor="lead-notes">Catatan Internal</Label>
                <Textarea
                  id="lead-notes"
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  maxLength={2000}
                  rows={5}
                  placeholder="Catatan hasil kontak, kebutuhan khusus, negosiasi harga..."
                  className="border-stone-300 text-sm"
                />
                <p className="text-right text-[11px] text-stone-400">
                  {editNotes.length}/2000
                </p>
                <Button
                  variant="outline"
                  onClick={() => patchLead(selectedLead.id, { notes: editNotes }, "notes")}
                  disabled={savingNotes || editNotes === (selectedLead.notes || "")}
                  className="w-full border-stone-300"
                >
                  {savingNotes ? "Menyimpan..." : "Simpan Catatan"}
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
