import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GitCompareArrows, PhoneCall, Sparkles, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { COMPARISONS } from "@/lib/comparisons";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";

export function generateStaticParams() {
  return [{}];
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Perbandingan Badan Usaha — PT vs CV, PMA, Yayasan, Koperasi & Lainnya",
    description:
      "Panduan memilih badan usaha: perbandingan PT vs CV, PT PMA vs PT Lokal, PT Perorangan vs NIB, CV vs UD, PT vs Yayasan/Koperasi, Firma vs CV — tabel lengkap, pajak, biaya, risiko. Gratis.",
    keywords: [
      "perbandingan badan usaha",
      "pt vs cv",
      "pt pma vs pt lokal",
      "pt perorangan vs nib",
      "cv vs usaha dagang",
      "pt vs yayasan",
      "pt vs koperasi",
      "firma vs cv",
      "pilih badan usaha",
    ],
    alternates: { canonical: "/bandingkan" },
    openGraph: {
      title: "Perbandingan Badan Usaha — PusatPerizinan.com",
      description:
        "8 panduan perbandingan badan usaha lengkap: PT, CV, PMA, PT Perorangan, UD, Yayasan, Koperasi, Firma. Tabel per aspek, pajak, biaya, verdict siap pakai.",
      url: "/bandingkan",
    },
  };
}

export default function BandingkanIndexPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Kembali ke beranda">
            <img src="/logo-icon.png" alt="Logo PusatPerizinan.com" className="h-8 w-8" />
            <span className="font-bold text-[15px] tracking-tight">
              Pusat<span className="text-primary">Perizinan</span>
              <span className="text-gold">.com</span>
            </span>
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Halo, saya masih bingung memilih badan usaha — bisa dibantu konsultasi?")}`}
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
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Beranda</Link>
            <span className="mx-1.5">/</span>
            <span className="font-medium text-foreground">Perbandingan Badan Usaha</span>
          </nav>
          <div className="flex items-center gap-2 mb-3">
            <Badge className="bg-primary/10 text-primary border border-primary/20">
              <GitCompareArrows className="h-3 w-3 mr-1" aria-hidden /> {COMPARISONS.length} Panduan Perbandingan — Basis Regulasi Resmi
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-balance">
            Pilih Badan Usaha yang Tepat — Tanpa Nyesel Setelahnya
          </h1>
          <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Salah memilih badan usaha = pajak bocor, tender gagal, atau harta pribadi terlilit utang. Setiap
            perbandingan di bawah membedah keduanya per aspek: hukum, pajak, biaya, durasi, risiko — plus verdict
            siap pakai: kapan pilih yang mana.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><TrendingUp className="h-4 w-4 text-primary" aria-hidden /> 10-13 aspek per perbandingan</span>
            <span className="flex items-center gap-1.5"><Sparkles className="h-4 w-4 text-primary" aria-hidden /> Berbasis UU/PP/KUHD terkini</span>
            <span className="flex items-center gap-1.5"><GitCompareArrows className="h-4 w-4 text-primary" aria-hidden /> Verdict jujur, bukan promosi</span>
          </div>
        </div>
      </section>

      {/* Grid perbandingan */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-4 md:grid-cols-2">
          {COMPARISONS.map((c) => (
            <article key={c.slug} className="rounded-2xl border bg-card p-5 md:p-6 hover:shadow-md transition-shadow flex flex-col">
              <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground mb-3">
                <span className="rounded-full bg-primary/10 text-primary px-2.5 py-1">{c.aShort}</span>
                <span className="text-lg font-extrabold text-foreground">vs</span>
                <span className="rounded-full bg-gold/10 text-gold px-2.5 py-1">{c.bShort}</span>
                <span className="ml-auto hidden sm:inline">{c.aspects.length} aspek</span>
              </div>
              <h2 className="font-bold text-lg leading-snug">
                <Link href={`/bandingkan/${c.slug}`} className="hover:text-primary transition-colors">
                  {c.aShort} vs {c.bShort}: Perbandingan Lengkap {c.aspects.length} Aspek
                </Link>
              </h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">{c.intro[0]}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {c.keywords.slice(0, 3).map((k) => (
                  <span key={k} className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] text-muted-foreground">{k}</span>
                ))}
              </div>
              <Link
                href={`/bandingkan/${c.slug}`}
                className="mt-auto pt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-md min-h-[44px] w-full"
              >
                Baca Perbandingan Lengkap <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-14">
        <div className="rounded-2xl border bg-card p-6 text-center">
          <h2 className="font-bold text-lg">Masih ragu memilih?</h2>
          <p className="text-sm text-muted-foreground mt-1.5">
            Konsultasi gratis 15 menit dengan konsultan kami — sebutkan kondisi usaha Anda, kami rekomendasikan
            badan hukum yang paling hemat & aman. Atau coba{" "}
            <Link href="/roadmap" className="font-semibold text-primary hover:underline">AI Roadmap Perizinan</Link> untuk
            gambaran lengkap.
          </p>
        </div>
      </section>
    </main>
  );
}
