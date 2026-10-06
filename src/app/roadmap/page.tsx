import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, PhoneCall, Sparkles, Bot, ShieldCheck, Clock, FileCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";
import { RoadmapWizard } from "./roadmap-wizard";

export function generateStaticParams() {
  return [{}];
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "AI Roadmap Perizinan 12 Bulan — Gratis, Instan, Personal",
    description:
      "Jawab 5 pertanyaan, AI konsultan perizinan menyusun roadmap 12 bulan khusus untuk usaha Anda: izin apa, urutan apa, biaya, durasi & risiko — dari hulu ke hilir. Gratis.",
    keywords: [
      "roadmap perizinan",
      "izin apa saja untuk usaha",
      "alur pengurusan izin usaha",
      "ai konsultan perizinan",
      "roadmap izin umkm",
      "langkah izin usaha baru",
    ],
    alternates: { canonical: "/roadmap" },
    openGraph: {
      title: "AI Roadmap Perizinan 12 Bulan — PusatPerizinan.com",
      description:
        "AI menyusun roadmap perizinan personal 12 bulan untuk usaha Anda. Gratis & instan.",
      url: "/roadmap",
    },
  };
}

export default function RoadmapPage() {
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
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Halo, saya ingin konsultasi roadmap perizinan usaha saya")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md min-h-[44px]"
          >
            <PhoneCall className="h-4 w-4" aria-hidden />
            Chat Konsultan
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-transparent to-gold/5 border-b">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Beranda</Link>
            <span className="mx-1.5">/</span>
            <span className="font-medium text-foreground">AI Roadmap</span>
          </nav>
          <div className="flex items-center gap-2 mb-3">
            <Badge className="bg-primary/10 text-primary border border-primary/20">
              <Bot className="h-3 w-3 mr-1" aria-hidden /> Powered by AI + 10 Tahun Pengalaman
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-balance">
            AI Roadmap Perizinan 12 Bulan — Khusus Usaha Anda
          </h1>
          <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Bingung izin apa saja yang dibutuhkan dan urutannya? Jawab 5 pertanyaan — AI menyusun roadmap lengkap: urutan izin, estimasi biaya, durasi, dan risiko kalau dilewati.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" aria-hidden /> Hasil dalam ~30 detik</span>
            <span className="flex items-center gap-1.5"><FileCheck className="h-4 w-4 text-primary" aria-hidden /> Hulu ke hilir</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-primary" aria-hidden /> Berbasis regulasi resmi</span>
          </div>
        </div>
      </section>

      {/* Wizard */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        <RoadmapWizard />
      </section>

      {/* CTA bawah */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-14">
        <div className="rounded-2xl border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Ingin lebih detail? Cek juga{" "}
            <Link href="/kbli" className="font-semibold text-primary hover:underline">Database KBLI</Link>,{" "}
            <Link href="/kalkulator-pajak" className="font-semibold text-primary hover:underline">Kalkulator Pajak</Link>, atau{" "}
            <Link href="/layanan" className="font-semibold text-primary hover:underline">Katalog 61+ Layanan</Link>{" "}
            kami.
          </p>
        </div>
      </section>
    </main>
  );
}
