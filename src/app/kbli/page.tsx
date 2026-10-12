import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, PhoneCall, Search, Sparkles, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { KBLI_PAGES, KBLI_CATEGORIES, KBLI_TOTAL } from "@/lib/kbli-catalog";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";
import { KbliBrowser } from "./kbli-browser";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Database KBLI 2025 — Kode Bidang Usaha, Izin & Pajak",
    description: `Database ${KBLI_TOTAL}+ KBLI terlengkap: arti kode, tingkat risiko, izin yang dibutuhkan, kewajiban pajak & cara pengurusan via OSS-RBA. Cari KBLI untuk usaha Anda — konsultasi gratis.`,
    keywords: [
      "kbli 2025",
      "database kbli",
      "kbli berapa untuk",
      "kode kbli usaha",
      "kbli dan izinnya",
      "kbli pajak",
    ],
    alternates: { canonical: "/kbli" },
    openGraph: {
      title: "Database KBLI 2025 — PusatPerizinan.com",
      description: `${KBLI_TOTAL}+ KBLI dengan izin, risiko & pajak lengkap per kode. Cari bidang usaha Anda sekarang.`,
      url: "/kbli",
    },
  };
}

export default function KbliCatalogPage() {
  const items = KBLI_PAGES.map((p) => ({
    code: p.code,
    slug: p.slug,
    title: p.h1.replace(/^KBLI \d+ — /, ""),
    category: p.category.id,
    categoryIcon: p.category.icon,
    risk: p.risk,
    desc: p.desc,
  }));

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Kembali ke beranda">
            <img src="/logo-icon.png" alt="Logo PusatPerizinan.com" className="h-8 w-8" />
            <span className="font-bold text-[15px] tracking-tight">
              Pusat<span className="text-primary">Perizinan</span>
              <span className="text-gold">.com</span>
            </span>
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Halo, saya ingin konsultasi pemilihan KBLI untuk usaha saya")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md min-h-[44px]"
          >
            <PhoneCall className="h-4 w-4" aria-hidden />
            Konsultasi Gratis
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-transparent to-gold/5 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Beranda</Link>
            <span className="mx-1.5">/</span>
            <span className="font-medium text-foreground">KBLI</span>
          </nav>
          <div className="flex items-center gap-2 mb-3">
            <Badge className="bg-primary/10 text-primary border border-primary/20">
              <BookOpen className="h-3 w-3 mr-1" aria-hidden /> Database Terlengkap
            </Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-balance max-w-3xl leading-tight">
            Database KBLI 2025 — {KBLI_TOTAL} Kode Bidang Usaha
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Cari kode KBLI usaha Anda: arti, tingkat risiko, izin yang dibutuhkan, kewajiban pajak, dan insentif UMKM — semua dalam satu halaman per kode.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:shadow-lg"
            >
              <Sparkles className="h-4 w-4" aria-hidden /> Bingung KBLI apa? Coba AI Roadmap
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/kalkulator-pajak"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary/30 bg-card px-5 py-2.5 text-sm font-semibold shadow-sm transition-all hover:border-primary"
            >
              <Search className="h-4 w-4 text-primary" aria-hidden /> Hitung Pajak Usaha
            </Link>
          </div>
        </div>
      </section>

      {/* Browser */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <KbliBrowser items={items} categories={KBLI_CATEGORIES.map((c) => ({ id: c.id, name: c.name, icon: c.icon }))} />
      </section>
    </main>
  );
}
