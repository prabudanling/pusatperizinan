"use client";

// ============================================================
// PUSATPERIZINAN.COM — Browser Katalog Premium v2 (PP-XXX)
// Client component ringan: search + filter 6 kategori + tier harga
// + sort + load-more (24/batch). Data dari lib/katalog-v2.ts.
// ============================================================

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock, Search, ShieldCheck } from "lucide-react";
import {
  KATALOG_V2,
  KATALOG_V2_CATEGORIES,
  KATALOG_V2_STATS,
  katalogV2Tier,
  type KatalogV2Service,
} from "@/lib/katalog-v2";

const fmtIdr = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

const TIERS = [
  { id: "all", label: "Semua Tier" },
  { id: "entry", label: "Entry (<2 jt)" },
  { id: "mid", label: "Mid (2–15 jt)" },
  { id: "premium", label: "Premium (15–100 jt)" },
  { id: "enterprise", label: "Enterprise (>100 jt)" },
] as const;

const SORTS = [
  { id: "populer", label: "Urutan Katalog" },
  { id: "murah", label: "Harga Terendah" },
  { id: "mahal", label: "Harga Tertinggi" },
  { id: "hemat", label: "Hemat Terbesar" },
  { id: "nama", label: "Nama A–Z" },
] as const;

const BATCH = 24;

export function KatalogV2Browser() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [tier, setTier] = useState<string>("all");
  const [sort, setSort] = useState<(typeof SORTS)[number]["id"]>("populer");
  const [shown, setShown] = useState(BATCH);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list: KatalogV2Service[] = KATALOG_V2.filter((s) => {
      if (cat !== "all" && s.categoryCode !== cat) return false;
      if (tier !== "all" && katalogV2Tier(s.discountPrice) !== tier) return false;
      if (!needle) return true;
      return (
        s.name.toLowerCase().includes(needle) ||
        s.code.toLowerCase().includes(needle) ||
        s.authority.toLowerCase().includes(needle)
      );
    });
    switch (sort) {
      case "murah":
        list = [...list].sort((a, b) => a.discountPrice - b.discountPrice);
        break;
      case "mahal":
        list = [...list].sort((a, b) => b.discountPrice - a.discountPrice);
        break;
      case "hemat":
        list = [...list].sort((a, b) => b.savings - a.savings);
        break;
      case "nama":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name, "id"));
        break;
    }
    return list;
  }, [q, cat, tier, sort]);

  const visible = filtered.slice(0, shown);

  return (
    <div>
      {/* Kontrol */}
      <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" aria-hidden />
            <input
              type="search"
              value={q}
              onChange={(e) => { setQ(e.target.value); setShown(BATCH); }}
              placeholder="Cari nama layanan, kode item (PP-BU-001), atau lembaga…"
              aria-label="Cari layanan katalog premium"
              className="w-full rounded-lg border border-stone-300 bg-white py-2.5 pl-9 pr-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <select
            value={tier}
            onChange={(e) => { setTier(e.target.value); setShown(BATCH); }}
            aria-label="Filter tier harga"
            className="rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-sm"
          >
            {TIERS.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            aria-label="Urutkan"
            className="rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-sm"
          >
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </div>

        {/* Chip kategori */}
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter kategori">
          <button
            type="button"
            onClick={() => { setCat("all"); setShown(BATCH); }}
            aria-pressed={cat === "all"}
            className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${cat === "all" ? "bg-emerald-700 text-white" : "bg-stone-100 text-stone-700 hover:bg-stone-200"}`}
          >
            Semua (500)
          </button>
          {KATALOG_V2_CATEGORIES.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => { setCat(c.code); setShown(BATCH); }}
              aria-pressed={cat === c.code}
              title={c.desc}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${cat === c.code ? "bg-emerald-700 text-white" : "bg-stone-100 text-stone-700 hover:bg-stone-200"}`}
            >
              {c.name} ({c.count})
            </button>
          ))}
        </div>

        <p className="mt-3 text-xs text-stone-500" aria-live="polite">
          Menampilkan <strong>{visible.length}</strong> dari <strong>{filtered.length}</strong> layanan
          {q && ` untuk “${q}”`} · Total hemat katalog: {fmtIdr(KATALOG_V2_STATS.totalSavings)}
        </p>
      </div>

      {/* Grid */}
      {visible.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-stone-300 bg-white p-8 text-center text-sm text-stone-500">
          Tidak ada layanan yang cocok. Coba kata kunci lain atau reset filter.
        </p>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((s) => (
            <article key={s.code} className="flex flex-col rounded-2xl border border-stone-200 bg-white p-5 transition hover:border-emerald-300 hover:shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                  <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
                  {s.code}
                </span>
                {s.savings > 0 && (
                  <span className="rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                    -{s.discountPct}%
                  </span>
                )}
              </div>
              <h3 className="mt-2 text-sm font-bold leading-snug text-stone-900">{s.name}</h3>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-stone-500">
                <Clock className="h-3 w-3 shrink-0" aria-hidden />
                {s.estimate} · {s.authority.length > 34 ? `${s.authority.slice(0, 34)}…` : s.authority}
              </p>
              <div className="mt-3 flex items-end justify-between gap-2 border-t border-stone-100 pt-3">
                <div>
                  {s.normalPrice > s.discountPrice && (
                    <p className="text-xs text-stone-400 line-through">{fmtIdr(s.normalPrice)}</p>
                  )}
                  <p className="text-lg font-extrabold text-emerald-700">{fmtIdr(s.discountPrice)}</p>
                </div>
                <Link
                  href={`/layanan/${s.slug}`}
                  className="inline-flex min-h-9 items-center gap-1 rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-emerald-800"
                  aria-label={`Detail ${s.name}`}
                >
                  Detail <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Load more */}
      {shown < filtered.length && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setShown((n) => n + BATCH)}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-stone-300 bg-white px-6 py-3 text-sm font-bold text-stone-800 transition hover:border-emerald-400 hover:text-emerald-800"
          >
            Muat 24 lagi (sisa {filtered.length - shown})
          </button>
        </div>
      )}

      {/* CTA bawah */}
      <div className="mt-8 rounded-2xl bg-[oklch(0.23_0.03_165)] p-6 text-emerald-50 sm:p-8">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-bold text-white">
              <ShieldCheck className="h-5 w-5 text-emerald-300" aria-hidden />
              Bingung pilih dari 500 layanan?
            </h3>
            <p className="mt-1 text-sm text-emerald-100/80">
              Konsultasi gratis 30 menit — kami petakan izin yang wajib untuk usaha Anda.
            </p>
          </div>
          <Link
            href="/konsultasi"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-emerald-950 transition hover:bg-amber-300"
          >
            Jadwalkan Sekarang <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
