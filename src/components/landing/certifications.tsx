import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BadgeCheck, Award, ShieldCheck, Building2, Plane, UtensilsCrossed,
  ArrowRight, Sparkles, FileCheck2, Beaker, HardHat, PhoneCall,
} from "lucide-react";
import { CERT_STATS, CERT_GROUP_LABEL, type CertGroup } from "@/lib/catalog/certifications";
import { CERT_REGION_STATS } from "@/lib/catalog/sertifikasi-provinsi";

// ============================================================
// Section Sertifikasi & ISO — homepage
// Katalog terlengkap: PPIU/PIHK, ISO 9001:2026, halal jasa, dst.
// ============================================================

const GROUPS: { id: CertGroup; icon: typeof Award; blurb: string; href: string }[] = [
  { id: "travel-ibadah", icon: Plane, blurb: "PPIU, PIHK (ONH Plus), PPMP, pembimbing bersertifikat — sesuai PMHU 2/2026.", href: "/layanan/paket-pendirian-travel-umrah" },
  { id: "iso-manajemen", icon: Award, blurb: "ISO 9001:2026 edisi terbaru, 27001, 37001:2025, hingga IMS gabungan hemat biaya.", href: "/layanan/iso-9001" },
  { id: "halal", icon: BadgeCheck, blurb: "Halal jasa restoran, hotel & konveksi — sesuai PP 42/2024 via BPJPH.", href: "/layanan/halal-jasa-restoran" },
  { id: "pangan", icon: UtensilsCrossed, blurb: "ISO 22000, HACCP, CPPOB, SPP-IRT — dari UMKM sampai eksportir.", href: "/layanan/iso-22000" },
  { id: "lab-kesehatan", icon: Beaker, blurb: "ISO 17025, 15189, 13485, 17020/17024/17065 — lab & lembaga sertifikasi.", href: "/layanan/iso-17025" },
  { id: "badan-usaha", icon: HardHat, blurb: "SBU LPJK, SKTTK, BNSP, SLO — tiket masuk tender & kepatuhan fasilitas.", href: "/layanan/sbu-lpjk" },
];

export function CertificationsSection() {
  return (
    <section aria-labelledby="sertifikasi-heading" className="relative overflow-hidden border-t bg-gradient-to-b from-emerald-950/5 via-transparent to-amber-500/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        {/* Heading */}
        <div className="max-w-3xl">
          <Badge className="bg-gold/10 text-gold border border-gold/25 mb-4">
            <Sparkles className="h-3 w-3 mr-1" aria-hidden /> Katalog Sertifikasi Terlengkap
          </Badge>
          <h2 id="sertifikasi-heading" className="text-2xl md:text-4xl font-extrabold tracking-tight text-balance">
            Sertifikasi &amp; ISO untuk <span className="text-primary">Semua PT</span> — terutama <span className="text-gold">Travel Haji &amp; Umrah</span>
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            {CERT_STATS.total} layanan sertifikasi dalam {CERT_STATS.groups} kelompok — kini tersedia ×
            {" "}
            {CERT_REGION_STATS.provinces} provinsi ({CERT_REGION_STATS.total.toLocaleString("id-ID")} halaman
            lokal, dari Aceh sampai Papua Pegunungan). Dari izin PPIU &amp; PIHK sesuai regulasi terbaru
            (PMHU 2/2026), ISO 9001 edisi 2026, halal jasa (PP 42/2024), sampai SBU untuk tender. Satu tim,
            semua dokumen kepercayaan bisnis Anda.
          </p>
        </div>

        {/* Grid kelompok */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GROUPS.map((g) => {
            const Icon = g.icon;
            return (
              <Link
                key={g.id}
                href={g.id === "travel-ibadah" ? "/layanan/kategori/sertifikasi" : g.href}
                className="group rounded-2xl border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="font-bold leading-tight">{CERT_GROUP_LABEL[g.id]}</h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{g.blurb}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Lihat layanan <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            );
          })}
        </div>

        {/* Bar highlight */}
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-gold/30 bg-gradient-to-r from-gold/10 via-transparent to-primary/10 p-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
            <p className="text-sm leading-relaxed">
              <span className="font-bold">Baru 2026:</span> ISO 9001:2026 resmi terbit (16 Sep 2026) &amp; standar travel
              haji-umrah diperbarui via PMHU 2/2026.{" "}
              <span className="text-muted-foreground">Jangan sampai dokumen Anda dibangun di atas regulasi basi — kami pakai yang terkini.</span>
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <a href={`https://wa.me/6281269999910?text=${encodeURIComponent("Halo, saya mau konsultasi sertifikasi (ISO/PPIU/PIHK/halal)")}`} target="_blank" rel="noopener noreferrer">
                <PhoneCall className="h-4 w-4" aria-hidden /> Konsultasi Gratis
              </a>
            </Button>
            <Button asChild variant="outline" className="border-primary/40 hover:bg-primary/5">
              <Link href="/layanan/sertifikasi/dki-jakarta">
                <Building2 className="h-4 w-4" aria-hidden /> Sertifikasi × {CERT_REGION_STATS.provinces} Provinsi
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-primary/40 hover:bg-primary/5">
              <Link href="/layanan/kategori/sertifikasi">
                <ShieldCheck className="h-4 w-4" aria-hidden /> Katalog {CERT_STATS.total} Sertifikasi
              </Link>
            </Button>
          </div>
        </div>

        <p className="mt-4 hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
          <Building2 className="h-3.5 w-3.5" aria-hidden /> Jasa konsultan — biaya resmi lembaga/instansi terpisah &amp; transparan di penawaran.
        </p>
      </div>
    </section>
  );
}
