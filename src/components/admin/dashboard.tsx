"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import {
  Gauge, Users, Target, CalendarClock, MessageSquare, SearchCheck, BookUser,
  RefreshCw, LogOut, Menu, Database, Trash2, Radio, ShieldCheck,
  Bell, Volume2, VolumeX, Flame,
} from "lucide-react";
import { triggerRefresh, timeWIB, relativeTime } from "@/components/admin/shared";
import { OverviewTab } from "@/components/admin/overview";
import { LeadsTab } from "@/components/admin/leads";
import { PipelineTab } from "@/components/admin/pipeline";
import { ConsultationsTab } from "@/components/admin/consultations";
import { ChatsTab } from "@/components/admin/chats";
import { ChecksTab } from "@/components/admin/checks";
import { CollectionsTab } from "@/components/admin/collections";
import { NotificationsTab } from "@/components/admin/notifications";

// ============================================================
// MISSION CONTROL — shell utama (sidebar + header + tab)
// ============================================================

const NAV = [
  { id: "overview", label: "Mission Control", icon: Gauge },
  { id: "leads", label: "Leads", icon: Users },
  { id: "pipeline", label: "Pipeline", icon: Target },
  { id: "consult", label: "Konsultasi", icon: CalendarClock },
  { id: "chats", label: "Chat RIZKI", icon: MessageSquare },
  { id: "checks", label: "AI Checker", icon: SearchCheck },
  { id: "collections", label: "Database", icon: BookUser },
  { id: "notifications", label: "Notifikasi", icon: Bell },
] as const;

type TabId = (typeof NAV)[number]["id"];

interface FreshLog {
  id: string;
  leadName: string;
  leadWa: string;
  source: string;
  channel: string;
  status: string;
  createdAt: string;
}

/** Denting notifikasi 2 nada via Web Audio API (tanpa file audio) */
function playChime() {
  try {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const now = ctx.currentTime;
    [
      { freq: 987.77, at: 0 },      // B5
      { freq: 1318.51, at: 0.14 },  // E6
    ].forEach(({ freq, at }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, now + at);
      gain.gain.exponentialRampToValueAtTime(0.09, now + at + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + at + 0.35);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + at);
      osc.stop(now + at + 0.4);
    });
    setTimeout(() => void ctx.close(), 1200);
  } catch {
    // browser memblokir audio sebelum interaksi — abaikan
  }
}

export function AdminDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const [tab, setTab] = useState<TabId>("overview");
  const [clock, setClock] = useState<string>("");
  const [seedBusy, setSeedBusy] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [freshCount, setFreshCount] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const lastSeenRef = useRef<string>(new Date().toISOString());
  const toastRef = useRef(toast);
  toastRef.current = toast;

  useEffect(() => {
    const saved = localStorage.getItem("pp-admin-sound");
    if (saved === "0") setSoundOn(false);
  }, []);

  useEffect(() => {
    const tick = () => setClock(timeWIB(new Date()));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  // ---------- 🔔 LEAD WATCHER: polling log notifikasi tiap 10 dtk ----------
  useEffect(() => {
    let alive = true;
    const tick = async () => {
      if (document.hidden || !alive) return;
      try {
        const res = await fetch(`/api/admin/notifications?since=${encodeURIComponent(lastSeenRef.current)}`, { cache: "no-store" });
        if (!res.ok) return; // 401 → reload ditangani hook lain
        const json = await res.json();
        if (!json.success || !alive) return;
        const fresh = (json.data?.fresh ?? []) as FreshLog[];
        if (fresh.length > 0) {
          lastSeenRef.current = new Date().toISOString();
          const realLeads = fresh.filter((f) => f.source !== "test");
          if (realLeads.length > 0) {
            setFreshCount((c) => c + realLeads.length);
            triggerRefresh(); // tab lain ikut memuat data terbaru
            if (soundOn) playChime();
            for (const lead of realLeads) {
              toastRef.current({
                title: "🔥 Lead baru masuk!",
                description: `${lead.leadName} · ${lead.leadWa} · ${relativeTime(lead.createdAt)}`,
                action: (
                  <button
                    onClick={() => window.open(`https://wa.me/${lead.leadWa.replace(/[^0-9]/g, "")}`, "_blank")}
                    className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2 py-1 text-xs font-semibold text-white hover:bg-emerald-500"
                  >
                    <Flame aria-hidden className="h-3 w-3" /> Follow-up
                  </button>
                ),
              });
              try {
                if (typeof Notification !== "undefined" && Notification.permission === "granted") {
                  new Notification("🔥 Lead baru — PusatPerizinan.com", {
                    body: `${lead.leadName} · ${lead.leadWa}`,
                    tag: `pp-lead-${lead.id}`,
                  });
                }
              } catch {
                // izin belum diberikan — abaikan
              }
            }
          } else {
            lastSeenRef.current = new Date().toISOString();
          }
        }
      } catch {
        // jaringan berkedip — coba lagi di tick berikutnya
      }
    };
    const iv = setInterval(tick, 10_000);
    return () => {
      alive = false;
      clearInterval(iv);
    };
  }, [soundOn]);

  function go(t: TabId) {
    setTab(t);
    setNavOpen(false);
    if (t === "notifications") {
      setFreshCount(0);
      // sekalian minta izin notifikasi browser (klik = user gesture)
      try {
        if (typeof Notification !== "undefined" && Notification.permission === "default") {
          void Notification.requestPermission();
        }
      } catch {
        // browser tidak mendukung — abaikan
      }
    }
  }

  function toggleSound() {
    setSoundOn((v) => {
      localStorage.setItem("pp-admin-sound", v ? "0" : "1");
      return !v;
    });
  }

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.refresh();
  }

  async function seed() {
    setSeedBusy(true);
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const json = await res.json();
      toast({
        title: json.success ? "Data demo diisi" : "Tidak bisa mengisi",
        description: json.success
          ? `${json.data.inserted} baris demo (terlabel "Demo") tersebar 30 hari.`
          : json.error,
      });
      if (json.success) triggerRefresh();
    } finally {
      setSeedBusy(false);
    }
  }

  async function purgeDemo() {
    if (!confirm("Hapus SEMUA data demo? Data asli tidak tersentuh.")) return;
    setSeedBusy(true);
    try {
      const res = await fetch("/api/admin/seed", { method: "DELETE" });
      const json = await res.json();
      toast({
        title: json.success ? "Data demo dihapus" : "Gagal menghapus",
        description: json.success ? `${json.data.removed} baris demo dibersihkan.` : json.error,
      });
      if (json.success) triggerRefresh();
    } finally {
      setSeedBusy(false);
    }
  }

  const navItems = (onClick: () => void) => (
    <nav aria-label="Navigasi admin" className="flex-1 space-y-1">
      {NAV.map((item) => {
        const Icon = item.icon;
        const active = tab === item.id;
        return (
          <button
            key={item.id}
            onClick={onClick && (() => go(item.id))}
            aria-current={active ? "page" : undefined}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "bg-emerald-500/15 text-emerald-300 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.25)]"
                : "text-stone-400 hover:bg-stone-800/60 hover:text-stone-200"
            }`}
          >
            <Icon aria-hidden className="h-[18px] w-[18px] shrink-0" />
            {item.label}
            {active && <Radio aria-hidden className="ml-auto h-3.5 w-3.5 animate-pulse text-emerald-400" />}
          </button>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-stone-950 text-stone-100">
      {/* ---------- Sidebar desktop ---------- */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-stone-800/80 bg-stone-900/40 p-4 lg:flex">
        <div className="mb-6 flex items-center gap-3 px-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10">
            <ShieldCheck aria-hidden className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-bold leading-tight">Mission Control</p>
            <p className="text-xs text-stone-500">PusatPerizinan.com</p>
          </div>
        </div>

        {navItems(() => {})}

        <div className="mt-6 space-y-2 border-t border-stone-800/80 pt-4">
          <p className="px-1 text-[11px] font-semibold uppercase tracking-wider text-stone-600">Alat Data</p>
          <Button
            variant="outline"
            size="sm"
            onClick={seed}
            disabled={seedBusy}
            className="w-full justify-start border-stone-700 bg-stone-900/60 text-stone-300 hover:bg-stone-800 hover:text-stone-100"
          >
            <Database aria-hidden className="mr-2 h-4 w-4" /> Isi Data Demo
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={purgeDemo}
            disabled={seedBusy}
            className="w-full justify-start border-stone-700 bg-stone-900/60 text-stone-400 hover:bg-rose-500/10 hover:text-rose-300"
          >
            <Trash2 aria-hidden className="mr-2 h-4 w-4" /> Hapus Data Demo
          </Button>
        </div>

        <div className="mt-auto pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="w-full justify-start text-stone-500 hover:bg-stone-800 hover:text-stone-300"
          >
            <LogOut aria-hidden className="mr-2 h-4 w-4" /> Keluar
          </Button>
          <p className="mt-3 px-1 text-[11px] text-stone-600">v1.0 · noindex · sesi 12 jam</p>
        </div>
      </aside>

      {/* ---------- Main ---------- */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-stone-800/80 bg-stone-950/85 px-4 py-3 backdrop-blur md:px-6">
          {/* Mobile nav */}
          <Sheet open={navOpen} onOpenChange={setNavOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="border-stone-700 bg-stone-900/60 lg:hidden" aria-label="Buka navigasi">
                <Menu aria-hidden className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex w-72 flex-col border-stone-800 bg-stone-950 p-4">
              <SheetTitle className="mb-4 flex items-center gap-2 text-stone-100">
                <ShieldCheck aria-hidden className="h-5 w-5 text-emerald-400" /> Mission Control
              </SheetTitle>
              {navItems(() => {})}
              <div className="mt-4 space-y-2 border-t border-stone-800 pt-4">
                <Button variant="outline" size="sm" onClick={seed} disabled={seedBusy} className="w-full justify-start border-stone-700 text-stone-300">
                  <Database aria-hidden className="mr-2 h-4 w-4" /> Isi Data Demo
                </Button>
                <Button variant="outline" size="sm" onClick={purgeDemo} disabled={seedBusy} className="w-full justify-start border-stone-700 text-stone-400">
                  <Trash2 aria-hidden className="mr-2 h-4 w-4" /> Hapus Demo
                </Button>
                <Button variant="ghost" size="sm" onClick={logout} className="w-full justify-start text-stone-500">
                  <LogOut aria-hidden className="mr-2 h-4 w-4" /> Keluar
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-bold md:text-lg">
              {NAV.find((n) => n.id === tab)?.label}
            </h1>
            <p className="hidden text-xs text-stone-500 sm:block">
              {clock} · zona waktu Jakarta
            </p>
          </div>

          <button
            onClick={() => go("notifications")}
            aria-label={`Notifikasi${freshCount > 0 ? `, ${freshCount} lead baru belum dibaca` : ""}`}
            title="Notifikasi lead"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-stone-700 bg-stone-900/60 text-stone-300 transition-colors hover:bg-stone-800 hover:text-emerald-300"
          >
            <Bell aria-hidden className="h-4 w-4" />
            {freshCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-500 px-1 text-[10px] font-bold text-stone-950 shadow-[0_0_12px_rgba(16,185,129,0.6)]">
                {freshCount > 9 ? "9+" : freshCount}
              </span>
            )}
          </button>

          <Button
            variant="outline"
            size="icon"
            onClick={toggleSound}
            className="border-stone-700 bg-stone-900/60 hover:bg-stone-800"
            aria-label={soundOn ? "Matikan suara notifikasi" : "Nyalakan suara notifikasi"}
            title={soundOn ? "Suara notifikasi: ON" : "Suara notifikasi: OFF"}
          >
            {soundOn ? <Volume2 aria-hidden className="h-4 w-4 text-emerald-400" /> : <VolumeX aria-hidden className="h-4 w-4 text-stone-500" />}
          </Button>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            LIVE
          </span>

          <Button
            variant="outline"
            size="icon"
            onClick={() => triggerRefresh()}
            className="border-stone-700 bg-stone-900/60 hover:bg-stone-800"
            aria-label="Muat ulang data sekarang"
            title="Muat ulang data"
          >
            <RefreshCw aria-hidden className="h-4 w-4" />
          </Button>
        </header>

        {/* Tab content */}
        <main className="min-w-0 flex-1 p-4 md:p-6">
          {tab === "overview" && <OverviewTab />}
          {tab === "leads" && <LeadsTab />}
          {tab === "pipeline" && <PipelineTab />}
          {tab === "consult" && <ConsultationsTab />}
          {tab === "chats" && <ChatsTab />}
          {tab === "checks" && <ChecksTab />}
          {tab === "collections" && <CollectionsTab />}
          {tab === "notifications" && <NotificationsTab />}
        </main>
      </div>
    </div>
  );
}
