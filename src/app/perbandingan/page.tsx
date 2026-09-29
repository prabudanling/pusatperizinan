import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Clock,
  FileText,
  PhoneCall,
  Scale,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { COMPARISONS } from "@/lib/catalog/comparisons";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";

// ============================================================
// /perbandingan — Index Perbandingan Badan Usaha (SEO)
// 12 halaman perbandingan: PT vs CV, PT Perorangan, PMA, dst
// ============================================================

const BASE_URL = "https://pusatperizinan.com";

export function generateMetadata(): Metadata {
  const title = "Perbandingan Badan Usaha: PT vs CV, PT Perorangan & 10 Lainnya | Pusat Perizinan";
  const description =
    "Perbandingan lengkap 12 bentuk badan usaha Indonesia: PT vs CV, PT Perorangan, UD, Firma, Yayasan, Perkumpulan, Koperasi, PT PMA & Kantor Perwakilan — biaya, pajak, tanggung jawab hukum, dan rekomendasi.";

  return {
    title,
    description,
    keywords: [
      "perbandingan badan usaha",
      "beda pt dan cv",
      "pt vs cv",
      "pt perorangan",
      "bentuk badan usaha indonesia",
      "pilih badan usaha",
      "biaya pendirian pt",
      "pajak badan usaha",
    ],
    alternates: { canonical: `${BASE_URL}/perbandingan` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/perbandingan`,
      type: "website",
      siteName: "PusatPerizinan.com",
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

// ------------------------------------------------------------
// JSON-LD: CollectionPage + ItemList berisi 12 comparison
// ------------------------------------------------------------

function IndexJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Perbandingan Badan Usaha: PT vs CV, PT Perorangan & 10 Lainnya",
    description:
      "Kumpulan 12 perbandingan bentuk badan usaha Indonesia: biaya pendirian, pajak, tanggung jawab hukum, dan rekomendasi pilihan.",
    url: `${BASE_URL}/perbandingan`,
    isPartOf: { "@type": "WebSite", name: "PusatPerizinan.com", url: BASE_URL },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: COMPARISONS.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${c.entityA.name} vs ${c.entityB.name}`,
        url: `${BASE_URL}/perbandingan/${c.slug}`,
      })),
    },
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

export default function PerbandinganIndexPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <IndexJsonLd />

      {/* Header mini (konsisten dengan situs) */}
      <div className="border-b bg-card/50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Kembali ke beranda">
            <img src="/logo-icon.png" alt="Logo PusatPerizinan.com" className="h-8 w-8" />
            <span className="text-[15px] font-bold tracking-tight">
              Pusat<span className="text-primary">Perizinan</span>
              <span className="text-gold">.com</span>
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Beranda
          </Link>
        </div>
      </div>

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b bg-gradient-to-br from-primary/8 via-background to-gold/10">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="border border-primary/20 bg-primary/10 text-primary hover:bg-primary/15">
                <Scale className="mr-1 h-3.5 w-3.5" aria-hidden />
                Panduan Memilih Badan Usaha
              </Badge>
              <Badge variant="outline">{COMPARISONS.length} perbandingan lengkap</Badge>
            </div>
            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-balance md:text-4xl">
              Perbandingan Badan Usaha: PT vs CV, PT Perorangan &amp; 10 Lainnya
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Memilih bentuk badan usaha adalah keputusan paling menentukan di awal perjalanan
              bisnis — dan paling mahal bila salah. Di bawah ini kami susun perbandingan mendetail
              dua-duanya: biaya pendirian nyata, perlakuan pajak, tanggung jawab hukum, sampai
              rekomendasi konkret.
            </p>

            {/* Stat cepat */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border bg-card p-3.5">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Bentuk usaha
                </p>
                <p className="mt-0.5 text-lg font-bold text-primary">10 bentuk</p>
              </div>
              <div className="rounded-xl border bg-card p-3.5">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Pasangan dibedah
                </p>
                <p className="mt-0.5 text-lg font-bold text-primary">{COMPARISONS.length} duel</p>
              </div>
              <div className="rounded-xl border bg-card p-3.5">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Aspek dibandingkan
                </p>
                <p className="mt-0.5 text-lg font-bold text-primary">10–14 / halaman</p>
              </div>
              <div className="rounded-xl border bg-card p-3.5">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Regulasi
                </p>
                <p className="mt-0.5 text-sm font-semibold leading-snug">UU Cipta Kerja, BKPM, PMK</p>
              </div>
            </div>
          </div>
        </section>

        {/* Intro SEO */}
        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8" aria-label="Pengantar">
          <div className="max-w-3xl space-y-3.5 text-[15px] leading-relaxed text-foreground/90">
            <p>
              Pilihan badan usaha menentukan tiga hal besar sekaligus.{" "}
              <strong>Pertama, pajak</strong>: omzet yang sama bisa dikenai PPh final 0,5% di CV,
              PT Perorangan, atau UD — tetapi PPh Badan 22% di PT, dan dividen ke pemilik orang
              pribadi kena PPh final 10% sesuai PMK 128/2019.{" "}
              <strong>Kedua, tanggung jawab hukum</strong>: di PT dan PT Perorangan harta pribadi
              terlindungi sebesar modal disetor, sedangkan sekutu aktif CV/Firma dan pemilik UD
              menanggung utang usaha dengan seluruh harta pribadinya.
            </p>
            <p>
              <strong>Ketiga, akses modal &amp; pasar</strong>: bank, investor, dan panitia tender
              memberi perlakuan sangat berbeda antara badan hukum dan bukan badan hukum. Untuk
              pendiri asing, pilihan bahkan lebih rumit lagi — PT PMA menuntut modal disetor
              minimal Rp 10 miliar, sementara kantor perwakilan tidak menanggung kewajiban modal
              tetapi tidak boleh mencari laba.
            </p>
            <p>
              Setiap halaman perbandingan di bawah ditulis dari regulasi aslinya (UU 40/2007, UU
              6/2023 Cipta Kerja, UU 18/2008, UU 16/2001, UU 25/1992, UU 25/2007, Peraturan BKPM
              5/2021, PP 23/2018 jo. PP 55/2022) dengan angka biaya realistis — bukan teori.
              Belum yakin mulai dari mana?{" "}
              <Link href="/layanan/pt" className="font-semibold text-primary hover:underline">
                Layanan pendirian PT
              </Link>{" "}
              dan{" "}
              <Link href="/layanan/cv" className="font-semibold text-primary hover:underline">
                layanan pendirian CV
              </Link>{" "}
              kami adalah dua titik masuk paling populer.
            </p>
          </div>
        </section>

        {/* Grid 12 comparison */}
        <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6 lg:px-8" aria-labelledby="daftar-heading">
          <h2 id="daftar-heading" className="mb-5 flex items-center gap-2 text-xl font-bold">
            <Sparkles className="h-5 w-5 text-primary" aria-hidden />
            Semua Perbandingan ({COMPARISONS.length})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COMPARISONS.map((c) => (
              <article
                key={c.slug}
                className="group flex flex-col rounded-2xl border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <h3 className="text-[15px] font-bold leading-snug">
                    <span className="mr-1" aria-hidden>
                      {c.entityA.icon}
                    </span>
                    {c.entityA.name} vs{" "}
                    <span className="mr-0.5" aria-hidden>
                      {c.entityB.icon}
                    </span>
                    {c.entityB.name}
                  </h3>
                  <Badge
                    variant="outline"
                    className="shrink-0 border-gold/40 bg-gold/10 text-[10px] text-amber-700 dark:text-gold"
                    aria-label="Duel perbandingan"
                  >
                    🆚
                  </Badge>
                </div>
                <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {c.metaDesc}
                </p>
                <div className="mb-4 flex flex-wrap gap-1.5 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5">
                    <FileText className="h-3 w-3" aria-hidden /> {c.tableRows.length} aspek
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5">
                    <BadgeCheck className="h-3 w-3" aria-hidden /> {c.faq.length} FAQ
                  </span>
                </div>
                <div className="mt-auto">
                  <Button asChild size="sm" className="w-full min-h-[44px]">
                    <Link href={`/perbandingan/${c.slug}`}>
                      Lihat Perbandingan
                      <ArrowRight
                        className="ml-1 h-4 w-4 opacity-70 transition-opacity group-hover:opacity-100"
                        aria-hidden
                      />
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA WhatsApp */}
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-2xl border-2 border-primary/15 bg-gradient-to-br from-primary/5 to-gold/10 p-6 md:p-8">
            <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <h2 className="text-xl font-bold md:text-2xl">
                  Masih ragu memilih badan usaha?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Ceritakan profil usaha Anda — jumlah pemilik, estimasi omzet, dan target pasar.
                  Tim kami merekomendasikan bentuk yang paling hemat pajak dan aman hukum,
                  lengkap dengan estimasi biaya &amp; waktu. Konsultasi gratis, tanpa komitmen.
                </p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden /> Garansi 100%
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-primary" aria-hidden /> Balas cepat jam kerja
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <BadgeCheck className="h-3.5 w-3.5 text-primary" aria-hidden /> 1.247+ klien di 38 provinsi
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:min-w-[260px]">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "Halo PusatPerizinan.com, saya masih ragu memilih badan usaha (PT/CV/lainnya). Mohon konsultasi gratis."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 font-semibold text-white shadow-md transition-all hover:brightness-105 hover:shadow-lg"
                >
                  <PhoneCall className="h-5 w-5" aria-hidden />
                  Konsultasi Gratis via WhatsApp
                </a>
                <Button asChild variant="outline" className="min-h-[44px]">
                  <Link href="/layanan/pt">Lihat Layanan Pendirian PT</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer mini (sticky ke bawah) */}
      <footer className="mt-auto border-t bg-card/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} PusatPerizinan.com — Konsultan perizinan &amp; legalitas
            usaha. Konten bersifat edukatif, bukan nasihat hukum formal.
          </p>
          <nav aria-label="Tautan terkait" className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/layanan/pt" className="transition-colors hover:text-primary">
              Pendirian PT
            </Link>
            <Link href="/layanan/cv" className="transition-colors hover:text-primary">
              Pendirian CV
            </Link>
            <Link href="/layanan/kategori/pajak" className="transition-colors hover:text-primary">
              Layanan Pajak
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
