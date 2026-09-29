import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  FileCheck2,
  Globe2,
  Landmark,
  PhoneCall,
  Plane,
  ScrollText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JOBS } from "@/lib/jobs";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";
import { JobBrowser } from "./job-browser";

const BASE_URL = "https://pusatperizinan.com";

export function generateMetadata(): Metadata {
  const negaraTujuan = new Set(
    JOBS.filter((j) => j.location.country !== "Indonesia").map((j) => j.location.country)
  ).size;

  return {
    title: `${JOBS.length} Lowongan Kerja Terbaru 2026 — Dalam & Luar Negeri | Pusat Perizinan`,
    description: `${JOBS.length} lowongan kerja aktif 2026: ${negaraTujuan} negara tujuan PMI (Jepang, Korea, Arab Saudi, Taiwan, Jerman, Malaysia) + posisi kantor & lapangan di Indonesia. Gaji transparan, kontrak resmi BNP2MI/UU 18/2017, tanpa biaya perekrutan ilegal. Lamar langsung.`,
    keywords: [
      "lowongan kerja 2026",
      "lowongan kerja luar negeri",
      "lowongan PMI",
      "kerja di Jepang SSW",
      "kerja Korea EPS",
      "lowongan perawat lansia Jepang",
      "lowongan kantor Jakarta",
      "lowongan konsultan perizinan",
      "rekrutmen tanpa biaya",
    ],
    alternates: { canonical: `${BASE_URL}/lowongan` },
    openGraph: {
      title: `${JOBS.length} Lowongan Kerja Terbaru 2026 — Dalam & Luar Negeri`,
      description: `${negaraTujuan} negara tujuan PMI + posisi kantor & lapangan. Kontrak resmi, gaji transparan, pendampingan penuh. Lamar sekarang.`,
      url: `${BASE_URL}/lowongan`,
      type: "website",
      siteName: "PusatPerizinan.com",
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title: `${JOBS.length} Lowongan Kerja Terbaru 2026 — Dalam & Luar Negeri`,
      description: `${negaraTujuan} negara tujuan PMI + posisi kantor & lapangan. Kontrak resmi, tanpa biaya ilegal.`,
    },
    robots: { index: true, follow: true },
  };
}

// ------------------------------------------------------------
// JSON-LD — ItemList berisi 12 lowongan (position 1-12)
// ------------------------------------------------------------

function ItemListJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Daftar Lowongan Kerja PusatPerizinan.com 2026",
    numberOfItems: JOBS.length,
    itemListElement: JOBS.map((job, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: job.title,
      url: `${BASE_URL}/lowongan/${job.slug}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ------------------------------------------------------------
// PAGE
// ------------------------------------------------------------

export default function LowonganIndexPage() {
  const negaraTujuan = new Set(
    JOBS.filter((j) => j.location.country !== "Indonesia").map((j) => j.location.country)
  );

  const stats = [
    {
      label: `${negaraTujuan.size} Negara Tujuan`,
      desc: [...negaraTujuan].join(", "),
      icon: Globe2,
    },
    {
      label: "Kontrak Resmi",
      desc: "Sesuai UU 18/2017 & dipantau SISKOP2MI",
      icon: ShieldCheck,
    },
    {
      label: "Tanpa Biaya Ilegal",
      desc: "Tidak ada pungutan perekrutan — waspadai penipuan",
      icon: BadgeCheck,
    },
  ];

  const keunggulan = [
    {
      icon: FileCheck2,
      title: "Pendampingan Dokumen BNP2MI",
      desc: "Ijazah, akta, paspor hingga SKCK kami cek, legalisasi, dan verifikasi sesuai standar BNP2MI sebelum dikirim ke employer.",
    },
    {
      icon: BadgeCheck,
      title: "Employer Terverifikasi",
      desc: "Setiap employer luar negeri melewati pemeriksaan legalitas, reputasi, dan kesesuaian kontrak — bukan penyalur gelap.",
    },
    {
      icon: ScrollText,
      title: "Kontrak Transparan",
      desc: "Gaji, jam kerja, tunjangan, dan hak cuti tertulis jelas di kontrak. Tidak ada janji lisan yang menggantung.",
    },
    {
      icon: Plane,
      title: "Pendampingan Sampai Tiba",
      desc: "Dari orientasi pra-keberangkatan, penerbangan, hingga serah terima di negara tujuan — tim kami memastikan Anda tidak sendirian.",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <ItemListJsonLd />

      {/* Header mini (konsisten dengan situs) */}
      <div className="border-b bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Kembali ke beranda">
            <img src="/logo-icon.png" alt="Logo PusatPerizinan.com" className="h-8 w-8" />
            <span className="font-bold text-[15px] tracking-tight">
              Pusat<span className="text-primary">Perizinan</span>
              <span className="text-gold">.com</span>
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Beranda
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-transparent to-gold/5 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              Beranda
            </Link>
            <span className="mx-1.5">/</span>
            <span className="font-medium text-foreground">Lowongan Kerja</span>
          </nav>
          <div className="flex items-center gap-2 mb-3">
            <Badge className="bg-primary/10 text-primary border border-primary/20">
              <Sparkles className="h-3 w-3 mr-1" aria-hidden /> {JOBS.length} Lowongan Aktif
            </Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-balance max-w-3xl leading-tight">
            {JOBS.length} Lowongan Kerja Terbaru 2026 — Dalam &amp; Luar Negeri
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Posisi PMI di {negaraTujuan.size} negara tujuan, karier kantor pusat, hingga proyek lapangan —
            semua lewat jalur resmi UU 18/2017, kontrak transparan, dan pendampingan dokumen penuh. Pilih
            lowongan di bawah dan lamar langsung.
          </p>

          {/* Statistik kecil */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="flex items-start gap-3 rounded-xl border bg-card p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <s.icon className="h-5 w-5 text-primary" aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm leading-tight">{s.label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground leading-snug">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browser interaktif (client component) — semua job tetap dirender di DOM */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10" aria-label="Daftar lowongan kerja">
        <JobBrowser jobs={JOBS} />
      </section>

      {/* Kenapa melamar lewat kami */}
      <section aria-labelledby="kenapa-heading" className="border-t bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h2 id="kenapa-heading" className="flex items-center gap-2 text-xl md:text-2xl font-bold mb-2">
            <Landmark className="h-5 w-5 text-primary" aria-hidden />
            Kenapa Melamar Lewat Kami
          </h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
            Kami bukan penyalur gelap. Seluruh proses rekrutmen dan pengurusan dokumen mengikuti regulasi
            BNP2MI / UU No. 18 Tahun 2017 tentang Perlindungan Pekerja Migran Indonesia.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {keunggulan.map((k) => (
              <div key={k.title} className="rounded-2xl border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <k.icon className="h-5.5 w-5.5 text-primary" aria-hidden />
                </div>
                <h3 className="mt-4 font-bold leading-snug">{k.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{k.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="border-t bg-gradient-to-br from-primary/5 to-gold/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-balance">
            Masih ragu dengan persyaratannya?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Tanya langsung ke tim rekrutmen kami — kirim pertanyaan Anda via WhatsApp, kami jelaskan
            persyaratan dokumen, gaji, dan tahapan seleksi untuk posisi yang Anda minati.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                "Halo, saya ingin bertanya persyaratan lowongan kerja di PusatPerizinan.com"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-105 min-h-[44px]"
            >
              <PhoneCall className="h-5 w-5" aria-hidden /> Tanya Persyaratan Lowongan
            </a>
            <Button asChild variant="outline" size="lg" className="border-2 border-primary/30 min-h-[44px]">
              <Link href="/layanan/kerja-luar-negeri">
                Pelajari Jalur Kerja Luar Negeri
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
