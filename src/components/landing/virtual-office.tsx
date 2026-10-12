import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Mail,
  MapPin,
  PhoneCall,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  VO_PACKAGES,
  VO_LOCATIONS,
  VO_CITIES,
} from "@/lib/virtual-office-data";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";

// ============================================================
// Section Virtual Office — Landing Page
// Gate menuju 1.200+ halaman programatik /layanan/virtual-office-*
// Server component (tanpa client JS) — konsisten palet emerald/gold.
// ============================================================

export function VirtualOfficeSection() {
  const premium = VO_LOCATIONS.filter((l) => l.tier === "premium").slice(0, 6);
  const cities = VO_CITIES;

  return (
    <section
      id="virtual-office"
      className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-[oklch(0.23_0.03_165)] to-emerald-900 text-emerald-50"
      aria-labelledby="vo-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Badge className="mb-4 bg-gold/15 text-gold border border-gold/30 hover:bg-gold/20">
            <Star className="h-3.5 w-3.5 mr-1" aria-hidden /> Baru · 48 Lokasi Premium
          </Badge>
          <h2 id="vo-heading" className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Virtual Office — Alamat Bisnis di{" "}
            <span className="text-gold">SCBD, Sudirman & 30 Kota</span>
          </h2>
          <p className="mt-4 text-emerald-100/85 leading-relaxed">
            Gedung korporat nyata + resepsionis + penerimaan surat. Dokumen resmi untuk NIB, PKP,
            rekening bank & marketplace. Mulai <strong className="text-gold">Rp 500rb/bulan</strong> —
            aktif 1-2 hari kerja, tanpa datang ke kantor.
          </p>
        </div>

        {/* 3 paket unggulan */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {VO_PACKAGES.slice(0, 3).map((p) => (
            <article
              key={p.id}
              className={`relative rounded-2xl border p-6 transition-all hover:shadow-xl ${
                p.popular
                  ? "border-gold/50 bg-emerald-50/10"
                  : "border-emerald-100/20 bg-emerald-50/5"
              }`}
            >
              {p.popular && (
                <Badge className="absolute -top-2.5 left-5 bg-gold text-emerald-950 border-0 font-bold">
                  Paling Diminati
                </Badge>
              )}
              <h3 className="font-bold text-lg">{p.name}</h3>
              <p className="mt-1.5 flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold text-gold">{p.priceMonthly}</span>
                <span className="text-xs text-emerald-100/70">· {p.priceYearly}</span>
              </p>
              <p className="mt-2 text-sm text-emerald-100/75 leading-relaxed line-clamp-2">{p.desc}</p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {p.features.slice(0, 3).map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-gold" aria-hidden />
                    <span className="leading-snug text-emerald-100/90">{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Halo, saya tertarik paket ${p.name}. Mohon info lengkap.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 font-semibold text-white shadow-md transition-all hover:brightness-105 min-h-[44px]"
              >
                <PhoneCall className="h-4 w-4" aria-hidden />
                Ambil Paket
              </a>
            </article>
          ))}
        </div>

        {/* Keunggulan mini */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { icon: Building2, t: "Gedung nyata & resepsionis 24/7" },
            { icon: Mail, t: "Surat diterima + notifikasi WhatsApp" },
            { icon: CheckCircle2, t: "Diterima NIB, PKP, bank & marketplace" },
          ].map((f) => (
            <div
              key={f.t}
              className="flex items-center gap-2.5 rounded-xl border border-emerald-100/15 bg-emerald-50/5 px-4 py-3 text-sm"
            >
              <f.icon className="h-4.5 w-4.5 shrink-0 text-gold" aria-hidden />
              <span className="text-emerald-100/90">{f.t}</span>
            </div>
          ))}
        </div>

        {/* Lokasi premium */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-100/70">
            <MapPin className="h-4 w-4 text-gold" aria-hidden />
            Lokasi premium:
          </span>
          {premium.map((l) => (
            <Link
              key={l.slug}
              href={`/layanan/virtual-office-address-${l.slug}`}
              className="rounded-full border border-emerald-100/25 bg-emerald-50/5 px-3.5 py-1.5 text-sm font-medium transition-all hover:border-gold hover:text-gold"
            >
              {l.area}
            </Link>
          ))}
          <Link
            href="/virtual-office"
            className="rounded-full bg-gold/15 border border-gold/40 px-3.5 py-1.5 text-sm font-bold text-gold transition-all hover:bg-gold/25"
          >
            + 48 lokasi, 30 kota
          </Link>
        </div>

        {/* CTA utama */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/virtual-office"
            className="inline-flex items-center gap-2 rounded-xl bg-gold px-7 py-3.5 font-bold text-emerald-950 shadow-lg transition-all hover:brightness-105 min-h-[44px]"
          >
            Lihat Semua Paket & 48 Lokasi
            <ArrowRight className="h-5 w-5" aria-hidden />
          </Link>
          <span className="text-sm text-emerald-100/70">
            {cities.length} kota · 6 paket · garansi uang kembali 100%
          </span>
        </div>
      </div>
    </section>
  );
}
