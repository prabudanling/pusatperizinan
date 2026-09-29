import type { Metadata } from "next";
import Link from "next/link";
import {
  Camera,
  CheckCircle2,
  FileCheck2,
  PhoneCall,
  ScanSearch,
  Send,
  ShieldCheck,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";
import { DocChecker } from "./doc-checker";
import type { DocTypeMeta } from "./doc-checker";

// ============================================================
// /cek-dokumen — AI Cek Dokumen Gratis (VLM)
// Foto dokumen diperiksa AI dalam ~30 detik. Foto TIDAK disimpan.
// ============================================================

const SITE_URL = "https://pusatperizinan.com";

// Daftar literal 8 tipe dokumen (label+emoji sama persis dengan DOC_TYPES di /api/cek-dokumen)
const DOC_TYPE_META: DocTypeMeta[] = [
  { id: "ktp", label: "KTP / e-KTP", emoji: "🪪" },
  { id: "npwp", label: "Kartu NPWP / NPWP NIK", emoji: "💼" },
  { id: "nib", label: "NIB (OSS-RBA)", emoji: "🏢" },
  { id: "akta", label: "Akta Pendirian Badan Usaha", emoji: "📜" },
  { id: "sk-menkumham", label: "SK Menkumham", emoji: "🏛️" },
  { id: "paspor", label: "Paspor Indonesia", emoji: "🛂" },
  { id: "ijazah", label: "Ijazah / STTB", emoji: "🎓" },
  { id: "sertifikat-standar", label: "Sertifikat Standar (SS)", emoji: "📋" },
];

const FAQS = [
  {
    q: "Apakah foto dokumen saya disimpan?",
    a: "Tidak. Foto hanya diproses sementara di memori server selama analisis AI berlangsung dan hilang setelah sesi selesai. Kami tidak menyimpan, menyalin, ataupun membagikan foto dokumen Anda ke pihak mana pun.",
  },
  {
    q: "Dokumen apa yang didukung?",
    a: "8 tipe dokumen: KTP / e-KTP, Kartu NPWP / NPWP NIK, NIB (OSS-RBA), Akta Pendirian Badan Usaha, SK Menkumham, Paspor Indonesia, Ijazah / STTB, dan Sertifikat Standar (SS).",
  },
  {
    q: "Apakah hasil ini pengganti verifikasi resmi?",
    a: "Bukan. AI Cek Dokumen adalah alat bantu pre-check untuk menilai kelayakan foto sebelum diajukan. Keputusan akhir tetap berada di tangan instansi penerbit seperti Dukcapil, DJP, OSS, Kemenkumham, dan Imigrasi.",
  },
  {
    q: "Berapa biayanya?",
    a: "GRATIS. Tidak ada biaya, tanpa login, tanpa registrasi — cukup unggah foto dan hasil keluar dalam ±30 detik.",
  },
  {
    q: "Bagaimana jika hasilnya perlu perbaikan?",
    a: "Tim konsultan kami siap membantu memperbaiki dokumen Anda langsung via WhatsApp — mulai dari panduan foto ulang yang benar, perbaikan data, hingga pengurusan ulang dokumen ke instansi terkait.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      absolute: "AI Cek Dokumen Gratis — Periksa KTP, NPWP, NIB dalam 30 Detik | Pusat Perizinan",
    },
    description:
      "Unggah foto KTP, NPWP, NIB, akta, atau paspor — AI memeriksa kelayakan dokumen dalam 30 detik: skor 0-100, checklist keterbacaan, rekomendasi perbaikan. Gratis, tanpa login, foto tidak pernah disimpan.",
    keywords: [
      "cek dokumen online gratis",
      "ai cek ktp",
      "cek npwp online",
      "periksa nib oss",
      "cek kelengkapan dokumen izin",
      "verifikasi dokumen usaha",
      "cek dokumen dengan ai",
      "kelayakan dokumen perizinan",
    ],
    alternates: { canonical: `${SITE_URL}/cek-dokumen` },
    openGraph: {
      title: "AI Cek Dokumen Gratis — Periksa KTP, NPWP, NIB dalam 30 Detik",
      description:
        "Skor kelayakan 0-100 + checklist pemeriksaan + rekomendasi perbaikan. Foto diproses sementara di memori, tidak pernah disimpan. Gratis & tanpa login.",
      url: `${SITE_URL}/cek-dokumen`,
      siteName: "PusatPerizinan.com",
      locale: "id_ID",
      type: "website",
      images: [{ url: "/logo.png", width: 1005, height: 831, alt: "AI Cek Dokumen PusatPerizinan.com" }],
    },
    robots: { index: true, follow: true },
  };
}

export default function CekDokumenPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AI Cek Dokumen",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "IDR" },
  };

  const steps = [
    {
      icon: UploadCloud,
      title: "1. Upload foto",
      desc: "Pilih jenis dokumen, lalu unggah foto dari galeri atau kamera HP. Bisa langsung dari HP, tanpa login.",
    },
    {
      icon: ScanSearch,
      title: "2. AI menganalisis",
      desc: "AI verifikator memeriksa keterbacaan, kelengkapan data, dan tanda-tanda dokumen bermasalah dalam ±30 detik.",
    },
    {
      icon: Send,
      title: "3. Perbaiki & ajukan",
      desc: "Dapat skor 0-100, checklist masalah, dan rekomendasi perbaikan. Lanjut pengurusan bersama konsultan kami.",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />

      {/* Header mini */}
      <div className="border-b bg-card/50">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Kembali ke beranda">
            <img src="/logo-icon.png" alt="Logo PusatPerizinan.com" className="h-8 w-8" />
            <span className="text-[15px] font-bold tracking-tight">
              Pusat<span className="text-primary">Perizinan</span>
              <span className="text-gold">.com</span>
            </span>
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Halo, saya butuh bantuan pemeriksaan dokumen legalitas usaha")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md"
          >
            <PhoneCall className="h-4 w-4" aria-hidden />
            Chat Konsultan
          </a>
        </div>
      </div>

      {/* Hero + Checker */}
      <section className="border-b bg-gradient-to-br from-primary/5 via-transparent to-gold/5">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
          <div className="text-center">
            <Badge className="border border-primary/20 bg-primary/10 text-primary">
              <Sparkles className="mr-1 h-3 w-3" aria-hidden />
              GRATIS • Tanpa Login • 30 Detik
            </Badge>
            <h1 className="mt-4 text-balance text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
              AI Cek Dokumen —{" "}
              <span className="text-primary">Foto Diperiksa AI, Hasil dalam 30 Detik</span>
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Sebelum dokumen Anda ditolak instansi, periksa dulu di sini. Unggah foto KTP, NPWP,
              NIB, atau dokumen lain — AI memberi skor kelayakan 0-100, checklist masalah, dan
              rekomendasi perbaikan. Gratis, tanpa login, foto tidak pernah disimpan.
            </p>
          </div>

          <div className="mt-8">
            <DocChecker docTypes={DOC_TYPE_META} />
          </div>

          {/* Privacy note menonjol */}
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-300 bg-emerald-50 p-4">
            <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" aria-hidden />
            <p className="text-sm leading-relaxed text-emerald-900">
              <span className="font-bold">Privasi terjamin:</span> foto dokumen diproses sementara
              di memori server dan <span className="font-bold underline underline-offset-2">TIDAK PERNAH disimpan</span>.
              Begitu analisis selesai, foto hilang. Tidak ada database, tidak ada backup, tidak ada pembagian ke pihak ketiga.
            </p>
          </div>
        </div>
      </section>

      {/* Cara Pakai */}
      <section aria-labelledby="cara-pakai-heading" className="border-b">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 md:py-12">
          <h2 id="cara-pakai-heading" className="text-center text-2xl font-bold tracking-tight md:text-3xl">
            Cara Pakai — 3 Langkah Saja
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3 md:gap-6">
            {steps.map((s) => (
              <div key={s.title} className="rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <s.icon className="h-6 w-6 text-primary" aria-hidden />
                </div>
                <h3 className="mt-4 font-bold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 Dokumen Didukung */}
      <section aria-labelledby="dokumen-heading" className="border-b bg-card/30">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 md:py-12">
          <h2 id="dokumen-heading" className="text-center text-2xl font-bold tracking-tight md:text-3xl">
            8 Dokumen Didukung
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-muted-foreground md:text-base">
            Cek kelayakan dokumen identitas maupun legalitas usaha — semua dinilai dengan checklist
            verifikator resmi.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {DOC_TYPE_META.map((d) => (
              <div
                key={d.id}
                className="flex flex-col items-center gap-2 rounded-2xl border bg-card p-4 text-center shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                <span className="text-3xl" aria-hidden>{d.emoji}</span>
                <span className="text-xs font-semibold leading-tight sm:text-sm">{d.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA WhatsApp bawah */}
      <section className="bg-gradient-to-br from-primary/5 to-gold/5">
        <div className="mx-auto max-w-5xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <FileCheck2 className="h-7 w-7 text-primary" aria-hidden />
          </div>
          <h2 className="mt-4 text-balance text-2xl font-bold tracking-tight md:text-3xl">
            Dokumen Anda sudah layak? Langsung ajukan bersama kami.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Tim konsultan berpengalaman siap memeriksa ulang, memperbaiki, dan mengurus dokumen Anda
            sampai diterima instansi. Konsultasi awal gratis.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Halo, saya baru cek dokumen via AI Cek Dokumen dan ingin bantuan perbaikan & pengajuan")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-md transition-all hover:shadow-lg"
            >
              <PhoneCall className="h-5 w-5" aria-hidden /> Konsultasi Gratis via WhatsApp
            </a>
            <Link
              href="/roadmap"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border-2 border-primary/30 bg-card px-6 py-3.5 font-semibold shadow-sm transition-all hover:border-primary"
            >
              <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden /> Susun Roadmap Izin dengan AI
            </Link>
          </div>
          <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Camera className="h-3.5 w-3.5" aria-hidden />
            AI Cek Dokumen adalah alat bantu pre-check — keputusan akhir tetap dari instansi penerbit.
          </p>
        </div>
      </section>
    </main>
  );
}
