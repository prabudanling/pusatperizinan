"use client";

import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

// ============================================================
// Shared helpers & hooks untuk Mission Control Admin
// ============================================================

export function formatRp(n: number): string {
  return "Rp " + (n || 0).toLocaleString("id-ID");
}

export function compactRp(n: number): string {
  if (n >= 1_000_000_000) return `Rp ${(n / 1_000_000_000).toFixed(1).replace(".", ",")} M`;
  if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(1).replace(".", ",")} jt`;
  if (n >= 1_000) return `Rp ${Math.round(n / 1_000)} rb`;
  return formatRp(n);
}

export function relativeTime(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const diff = Date.now() - d.getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1) return "baru saja";
  if (m < 60) return `${m} mnt lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} jam lalu`;
  const day = Math.floor(h / 24);
  if (day < 30) return `${day} hari lalu`;
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export function timeWIB(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleTimeString("id-ID", { timeZone: "Asia/Jakarta", hour12: false }) + " WIB";
}

export function waLink(wa: string, text?: string): string {
  const num = wa.replace(/[^0-9]/g, "").replace(/^0/, "62");
  const t = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${num}${t}`;
}

// ---------- Status visual ----------

export const LEAD_STATUSES = [
  { value: "NEW", label: "Baru", color: "bg-amber-500/15 text-amber-300 border-amber-500/30" },
  { value: "CONTACTED", label: "Dihubungi", color: "bg-teal-500/15 text-teal-300 border-teal-500/30" },
  { value: "CONSULTED", label: "Konsultasi", color: "bg-purple-500/15 text-purple-300 border-purple-500/30" },
  { value: "CLOSED_WON", label: "Closing ✓", color: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" },
  { value: "CLOSED_LOST", label: "Hilang", color: "bg-rose-500/15 text-rose-300 border-rose-500/30" },
] as const;

export function StatusBadge({ status }: { status: string }) {
  const s = LEAD_STATUSES.find((x) => x.value === status);
  return (
    <Badge variant="outline" className={s?.color ?? "bg-stone-500/15 text-stone-300 border-stone-500/30"}>
      {s?.label ?? status}
    </Badge>
  );
}

export function SourceBadge({ source }: { source: string }) {
  const map: Record<string, string> = {
    landing: "bg-emerald-500/10 text-emerald-300 border-emerald-500/25",
    chat: "bg-teal-500/10 text-teal-300 border-teal-500/25",
    checker: "bg-amber-500/10 text-amber-300 border-amber-500/25",
    popup: "bg-orange-500/10 text-orange-300 border-orange-500/25",
    konsultasi: "bg-purple-500/10 text-purple-300 border-purple-500/25",
  };
  return (
    <Badge variant="outline" className={map[source] ?? "bg-stone-500/10 text-stone-300 border-stone-500/25"}>
      {source}
    </Badge>
  );
}

export function EmptyState({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-stone-800/80 text-2xl">🗂️</div>
      <p className="font-semibold text-stone-300">{title}</p>
      {sub && <p className="mt-1 max-w-sm text-sm text-stone-500">{sub}</p>}
    </div>
  );
}

export function SkeletonRows({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2 py-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-11 animate-pulse rounded-lg bg-stone-800/60" />
      ))}
    </div>
  );
}

// ---------- Data hook: fetch + auto-refresh + event bus ----------

export function useAdminData<T>(url: string | null, opts?: { intervalMs?: number }) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!url) return;
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (res.status === 401) {
        window.location.reload(); // sesi habis → server page menampilkan login
        return;
      }
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Gagal memuat data");
      setData(json.data as T);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal memuat data");
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const ms = opts?.intervalMs;
    if (!ms) return;
    const t = setInterval(() => {
      if (!document.hidden) load();
    }, ms);
    return () => clearInterval(t);
  }, [load, opts?.intervalMs]);

  useEffect(() => {
    const handler = () => load();
    window.addEventListener("pp-admin-refresh", handler);
    return () => window.removeEventListener("pp-admin-refresh", handler);
  }, [load]);

  return { data, loading, error, reload: load };
}

export async function apiPatch(url: string, body: unknown): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.status === 401) {
      window.location.reload();
      return { ok: false };
    }
    const json = await res.json();
    if (!json.success) return { ok: false, error: json.error };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Gagal" };
  }
}

export function triggerRefresh() {
  window.dispatchEvent(new Event("pp-admin-refresh"));
}

// ---------- CSV export ----------

export function downloadCSV(filename: string, headers: string[], rows: (string | number)[][]) {
  const esc = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
  const csv = "\uFEFF" + [headers.map(esc).join(";"), ...rows.map((r) => r.map(esc).join(";"))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}
