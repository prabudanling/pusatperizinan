"use client";

// ============================================================
// PUSATPERIZINAN.COM — Simulasi Profit Kemitraan (client component)
// Interaktif ringan (tanpa lib eksternal): pilih tier kota,
// target deal/bulan, dan tier kemitraan → estimasi komisi.
// Angka = RATA-RATA campuran katalog 500+ layanan (blended),
// murni edukatif — bukan janji pendapatan (disclaimer di UI).
// ============================================================

import { useMemo, useState } from "react";
import { Calculator, Info, TrendingUp } from "lucide-react";
import { Slider } from "@/components/ui/slider";

/** Rata-rata nilai kontrak campuran per tier kota (IDR). */
const CITY_TIERS = [
  {
    id: "A",
    label: "Kota Tier A",
    example: "Jakarta, Surabaya, Medan, Makassar…",
    avg: 4_500_000,
    demand: "30–80 permintaan/bulan",
  },
  {
    id: "B",
    label: "Kota Tier B",
    example: "Bandung, Semarang, Banjarmasin, Manado…",
    avg: 3_500_000,
    demand: "10–30 permintaan/bulan",
  },
  {
    id: "C",
    label: "Kota Tier C",
    example: "Kabupaten & kota kecil di 38 provinsi",
    avg: 2_800_000,
    demand: "3–10 permintaan/bulan",
  },
] as const;

/** Tier kemitraan → komisi (% nilai kontrak) + biaya bergabung. */
const PARTNER_TIERS = [
  { id: "gerai", label: "Gerai Mitra", rate: 0.25, fee: 0 },
  { id: "cabang", label: "Cabang Resmi", rate: 0.35, fee: 25_000_000 },
  { id: "master", label: "Master Franchise", rate: 0.45, fee: 100_000_000 },
] as const;

const fmt = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

export function PartnerProfitSimulator() {
  const [city, setCity] = useState<(typeof CITY_TIERS)[number]["id"]>("B");
  const [deals, setDeals] = useState(10);
  const [tier, setTier] = useState<(typeof PARTNER_TIERS)[number]["id"]>("cabang");

  const result = useMemo(() => {
    const c = CITY_TIERS.find((x) => x.id === city)!;
    const t = PARTNER_TIERS.find((x) => x.id === tier)!;
    const monthly = Math.round(c.avg * deals * t.rate);
    const yearly = monthly * 12;
    const payback =
      t.fee > 0 && monthly > 0 ? Math.ceil(t.fee / monthly) : 0;
    return { c, t, monthly, yearly, payback };
  }, [city, deals, tier]);

  return (
    <div className="rounded-2xl border bg-card p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700" aria-hidden>
          <Calculator className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-lg font-bold">Simulasi Profit Cabang Anda</h3>
          <p className="text-sm text-muted-foreground">
            Geser, pilih, lihat estimasi — 10 detik tanpa isi formulir.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {/* Tier kota */}
        <div>
          <label htmlFor="sim-city" className="text-sm font-semibold">
            Lokasi cabang
          </label>
          <select
            id="sim-city"
            value={city}
            onChange={(e) => setCity(e.target.value as typeof city)}
            className="mt-2 w-full rounded-lg border bg-background px-3 py-2.5 text-sm"
          >
            {CITY_TIERS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-xs text-muted-foreground">
            {result.c.example} · {result.c.demand}
          </p>
        </div>

        {/* Tier kemitraan */}
        <div>
          <label htmlFor="sim-tier" className="text-sm font-semibold">
            Tier kemitraan
          </label>
          <select
            id="sim-tier"
            value={tier}
            onChange={(e) => setTier(e.target.value as typeof tier)}
            className="mt-2 w-full rounded-lg border bg-background px-3 py-2.5 text-sm"
          >
            {PARTNER_TIERS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label} — komisi {Math.round(t.rate * 100)}%
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-xs text-muted-foreground">
            {result.t.fee === 0
              ? "Bergabung gratis, kuota 2 mitra/kota"
              : `Investasi sekali ${fmt(result.t.fee)} — bukan tahunan`}
          </p>
        </div>

        {/* Target deal */}
        <div>
          <label htmlFor="sim-deals" className="text-sm font-semibold">
            Target deal terlayani/bulan: <span className="text-emerald-700">{deals}</span>
          </label>
          <Slider
            id="sim-deals"
            className="mt-4"
            value={[deals]}
            min={1}
            max={60}
            step={1}
            onValueChange={(v) => setDeals(v[0] ?? deals)}
            aria-label="Target deal per bulan"
          />
          <p className="mt-1.5 text-xs text-muted-foreground">
            Pusat yang memproses — Anda cukup sambut & serah terima dokumen.
          </p>
        </div>
      </div>

      {/* Hasil */}
      <div className="mt-6 grid gap-4 rounded-xl bg-emerald-50/60 p-5 sm:grid-cols-3" aria-live="polite">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700/80">Estimasi komisi / bulan</p>
          <p className="mt-1 text-2xl font-extrabold text-emerald-800">{fmt(result.monthly)}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700/80">Estimasi komisi / tahun</p>
          <p className="mt-1 text-2xl font-extrabold text-emerald-800">{fmt(result.yearly)}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700/80">
            {result.payback > 0 ? "Estimasi balik modal" : "Investasi bergabung"}
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-2xl font-extrabold text-emerald-800">
            <TrendingUp className="h-5 w-5 shrink-0" aria-hidden />
            {result.payback > 0 ? `${result.payback} bulan` : "GRATIS"}
          </p>
        </div>
      </div>

      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
        Simulasi edukatif dari rata-rata nilai kontrak campuran katalog 500+ layanan (NIB, PT/CV, PMA,
        Halal, BPOM, PBG/SLF, virtual office recurring, pajak bulanan). Bukan janji pendapatan —
        angka final mengikuti kontrak MOU & realisasi wilayah Anda.
      </p>
    </div>
  );
}
