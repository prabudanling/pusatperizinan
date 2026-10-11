import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Globe2,
  Landmark,
  MapPin,
  PhoneCall,
  Search,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ALL_SERVICE_PAGES, slugify } from "@/lib/catalog";
import type { CatalogCategory } from "@/lib/catalog";
import { PROVINCES } from "@/lib/coverage-data";
import { PMI_COUNTRIES } from "@/lib/pmi-services";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";
import { CatalogBrowser } from "./catalog-browser";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Katalog Layanan Lengkap — Perizinan, Pajak & Kerja Luar Negeri",
    description:
      "Direktori lengkap jasa konsultan PusatPerizinan.com: perizinan usaha (NIB, PT, halal, BPOM), pajak pribadi & perusahaan, kerja luar negeri ke 17 negara. 38 provinsi, harga transparan, garansi 100%.",
    keywords: [
      "katalog layanan konsultan",
      "jasa perizinan lengkap",
      "jasa pajak",
      "kerja luar negeri",
      "konsultan bisnis indonesia",
    ],
    alternates: { canonical: "/layanan" },
    openGraph: {
      title: "Katalog Layanan PusatPerizinan.com",
      description:
        "1.000+ halaman layanan: perizinan × 38 provinsi, pajak × 15 kota, PMI × 17 negara. Konsultasi gratis.",
      url: "/layanan",
    },
  };
}

export default async function LayananCatalogPage() {
  // ---- Katalog utama ----
  const basePages = ALL_SERVICE_PAGES.filter((p) => p.kind === "base");
  const byCategory: Record<CatalogCategory, typeof basePages> = {
    perizinan: basePages.filter((p) => p.category === "perizinan"),
    pajak: basePages.filter((p) => p.category === "pajak"),
    pmi: basePages.filter((p) => p.category === "pmi"),
    "virtual-office": basePages.filter((p) => p.category === "virtual-office"),
    sertifikasi: basePages.filter((p) => p.category === "sertifikasi"),
  };

  const totalBase = basePages.length;
  const totalAll = ALL_SERVICE_PAGES.length;
  const stats = [
    { label: "Layanan utama", value: `${totalBase}`, icon: Landmark },
    { label: "Total halaman layanan", value: `${totalAll}+`, icon: Building2 },
    { label: "Provinsi jangkauan", value: "38", icon: MapPin },
    { label: "Negara tujuan PMI", value: `${PMI_COUNTRIES.length}`, icon: Globe2 },
  ];

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
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Halo, saya ingin konsultasi layanan PusatPerizinan.com")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md min-h-[44px]"
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
            <span className="font-medium text-foreground">Layanan</span>
          </nav>
          <div className="flex items-center gap-2 mb-3">
            <Badge className="bg-primary/10 text-primary border border-primary/20">
              <Sparkles className="h-3 w-3 mr-1" aria-hidden /> Katalog Terlengkap di Indonesia
            </Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-balance max-w-3xl leading-tight">
            Katalog {totalBase}+ Layanan Konsultan — dari Hulu ke Hilir
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Perizinan usaha, pajak pribadi & perusahaan, kerja luar negeri — semua dikombinasikan dengan 38 provinsi, 15+ kota, dan 17 negara tujuan PMI. Pilih layanan Anda:
          </p>
        </div>
      </section>

      {/* Stats */}
      <section aria-label="Statistik layanan" className="border-b bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <s.icon className="h-5 w-5 text-primary" aria-hidden />
              </div>
              <div>
                <p className="text-xl font-extrabold leading-none">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Browser interaktif (client component) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <CatalogBrowser
          categories={{
            perizinan: byCategory.perizinan.map((p) => ({
              slug: p.slug, title: p.h1, desc: p.desc, price: p.price, duration: p.duration, popular: p.keywords.length > 0 && p.slug === "nib",
            })),
            pajak: byCategory.pajak.map((p) => ({
              slug: p.slug, title: p.h1, desc: p.desc, price: p.price, duration: p.duration, popular: p.slug.includes("spt-op") || p.slug.includes("umkm"),
            })),
            pmi: byCategory.pmi.map((p) => ({
              slug: p.slug, title: p.h1, desc: p.desc, price: p.price, duration: p.duration, popular: p.slug === "jepang-ssw" || p.slug === "pptkis",
            })),
            sertifikasi: byCategory.sertifikasi.map((p) => ({
              slug: p.slug, title: p.h1, desc: p.desc, price: p.price, duration: p.duration, popular: p.slug === "iso-9001" || p.slug === "paket-pendirian-travel-umrah",
            })),
          }}
        />
      </section>

      {/* Wilayah */}
      <section aria-labelledby="wilayah-heading" className="border-t bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <h2 id="wilayah-heading" className="flex items-center gap-2 text-xl font-bold mb-2">
            <MapPin className="h-5 w-5 text-primary" aria-hidden />
            Berdasarkan Wilayah (38 Provinsi)
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Semua layanan tersedia di seluruh Indonesia — pilih provinsi Anda untuk melihat detail lokal.
          </p>
          <div className="flex flex-wrap gap-2">
            {PROVINCES.map((p) => (
              <Link
                key={p.name}
                href={`/layanan/wilayah/${slugify(p.name)}`}
                className="rounded-full border bg-card px-3.5 py-1.5 text-sm font-medium transition-all hover:border-primary hover:bg-primary/5 hover:text-primary"
              >
                {p.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Negara PMI */}
      <section aria-labelledby="negara-heading" className="border-t">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <h2 id="negara-heading" className="flex items-center gap-2 text-xl font-bold mb-2">
            <Globe2 className="h-5 w-5 text-primary" aria-hidden />
            Kerja di Luar Negeri — {PMI_COUNTRIES.length} Negara Tujuan
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Panduan lengkap per negara: gaji, sektor, syarat & proses resmi sesuai UU 18/2017.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {PMI_COUNTRIES.map((c) => (
              <Link
                key={c.code}
                href={`/layanan/kerja-di-${c.code}`}
                className="group rounded-xl border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl" aria-hidden>{c.flag}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:text-primary" aria-hidden />
                </div>
                <h3 className="mt-2 font-semibold text-sm group-hover:text-primary transition-colors">{c.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{c.sectors}</p>
                <p className="mt-1.5 text-xs font-semibold text-primary">{c.salary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-gradient-to-br from-primary/5 to-gold/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-balance">
            Bingung mulai dari mana? Kami bantu petakan gratis.
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Ceritakan kondisi Anda via WhatsApp — tim kami susun roadmap lengkap (izin apa saja, biaya, timeline) dalam hitungan jam. Tanpa komitmen.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Halo, saya ingin konsultasi roadmap layanan untuk usaha saya")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-md transition-all hover:shadow-lg min-h-[44px]"
            >
              <PhoneCall className="h-5 w-5" aria-hidden /> Konsultasi Gratis Sekarang
            </a>
            <Link
              href="/#cek-izin"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-primary/30 bg-card px-6 py-3.5 font-semibold shadow-sm transition-all hover:border-primary min-h-[44px]"
            >
              <Search className="h-5 w-5 text-primary" aria-hidden /> Cek Izin dengan AI
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
