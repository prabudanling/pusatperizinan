import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, PhoneCall, Sparkles, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";
import { TaxCalculator } from "./tax-calculator";

export function generateStaticParams() {
  return [{}];
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Kalkulator Pajak 2025 — PPh 21, UMKM 0,5%, PPN & Properti",
    description:
      "Kalkulator pajak resmi Indonesia: hitung PPh 21 (metode TER), PPh Final 0,5% UMKM, PPN 11%, dan PPh jual-beli properti + BPHTB. Rumus sesuai PMK/PP terbaru — gratis, tanpa daftar.",
    keywords: [
      "kalkulator pph 21",
      "kalkulator pajak online",
      "hitung pph final 0,5",
      "kalkulator ppn",
      "kalkulator bphtb",
      "simulasi pajak umkm",
    ],
    alternates: { canonical: "/kalkulator-pajak" },
    openGraph: {
      title: "Kalkulator Pajak Indonesia 2025 — PusatPerizinan.com",
      description:
        "Hitung PPh 21, pajak UMKM 0,5%, PPN & pajak properti dengan rumus resmi. Gratis & instan.",
      url: "/kalkulator-pajak",
    },
  };
}

export default function KalkulatorPajakPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Kembali ke beranda">
            <img src="/logo-icon.png" alt="Logo PusatPerizinan.com" className="h-8 w-8" />
            <span className="font-bold text-[15px] tracking-tight">
              Pusat<span className="text-primary">Perizinan</span>
              <span className="text-gold">.com</span>
            </span>
          </Link>
          <Link href="/kbli" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Database KBLI <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-transparent to-gold/5 border-b">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Beranda</Link>
            <span className="mx-1.5">/</span>
            <span className="font-medium text-foreground">Kalkulator Pajak</span>
          </nav>
          <div className="flex items-center gap-2 mb-3">
            <Badge className="bg-primary/10 text-primary border border-primary/20">
              <Calculator className="h-3 w-3 mr-1" aria-hidden /> Rumus Resmi PMK/PP
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-balance">
            Kalkulator Pajak Indonesia 2025
          </h1>
          <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Hitung sendiri pajak Anda dengan rumus resmi: PPh 21 karyawan (metode TER), PPh Final 0,5% UMKM, PPN, dan pajak jual-beli properti. Gratis, instan, tanpa daftar.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <TaxCalculator />
      </section>

      {/* Trust + CTA */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-14">
        <div className="rounded-2xl border-2 border-primary/15 bg-gradient-to-br from-primary/5 to-gold/5 p-6 md:p-8">
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-6 w-6 shrink-0 text-primary mt-1" aria-hidden />
            <div>
              <h2 className="text-lg font-bold">Hasil kurang jelas atau butuh strategi hemat pajak?</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Kalkulator ini menunjukkan hitungan dasar. Dalam praktiknya, banyak peluang penghematan legal: pemilihan rezim pajak yang tepat, pengurang yang sering terlewat, hingga insentif pajak yang bisa diajukan. Tim konsultan pajak kami siap bedah kondisi Anda — konsultasi pertama gratis.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Halo, saya baru hitung pajak lewat kalkulator PusatPerizinan.com dan ingin konsultasi strategi pajak")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 font-semibold text-white shadow-md transition-all hover:shadow-lg min-h-[44px]"
                >
                  <PhoneCall className="h-5 w-5" aria-hidden />
                  Konsultasi Gratis via WhatsApp
                </a>
                <Link
                  href="/layanan/kategori/pajak"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-primary/30 bg-card px-5 py-3 font-semibold shadow-sm transition-all hover:border-primary min-h-[44px]"
                >
                  <Sparkles className="h-5 w-5 text-primary" aria-hidden />
                  Lihat Jasa Pajak Kami
                </Link>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground/70 max-w-2xl mx-auto leading-relaxed">
          Disclaimer: Hasil kalkulator adalah estimasi berdasarkan rumus PPh (UU HPP), PP 55/2022, dan tarif pajak daerah umum, dan tidak menggantikan konsultasi profesional. Kasus khusus (penghasilan multi-sumber, expatriat, transaksi afiliasi) membutuhkan perhitungan manual oleh konsultan.
        </p>
      </section>
    </main>
  );
}
