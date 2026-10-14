import type { Metadata } from "next";
import Link from "next/link";
import { Camera, PhoneCall, ScanSearch, ShieldCheck, Clock, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";
import { DocumentChecker } from "./document-checker";

export function generateStaticParams() {
  return [{}];
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "AI Cek Dokumen — Foto Dokumen Langsung Diperiksa AI, Gratis",
    description:
      "Unggah foto NPWP, NIB, KTP, sertifikat halal/PIRT/BPOM, paspor PMI, atau dokumen legalitas lainnya — AI memeriksa kelengkapan, keterbacaan, tanggal kadaluarsa, dan masalahnya. Hasil instan + saran langkah berikutnya. Gratis.",
    keywords: [
      "cek dokumen online",
      "ai cek npwp",
      "cek kelengkapan dokumen izin",
      "verifikasi dokumen usaha",
      "cek nib online",
      "cek dokumen pmi",
      "ai periksa dokumen gratis",
    ],
    alternates: { canonical: "/cek-dokumen" },
    openGraph: {
      title: "AI Cek Dokumen — PusatPerizinan.com",
      description:
        "Foto dokumen Anda diperiksa AI dalam hitungan detik: kelengkapan, keterbacaan, masalah & langkah berikutnya. Gratis & privasi terjaga.",
      url: "/cek-dokumen",
    },
  };
}

export default function CekDokumenPage() {
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
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Halo, saya butuh bantuan pemeriksaan dokumen legalitas usaha")}`}
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
            <span className="font-medium text-foreground">AI Cek Dokumen</span>
          </nav>
          <div className="flex items-center gap-2 mb-3">
            <Badge className="bg-primary/10 text-primary border border-primary/20">
              <ScanSearch className="h-3 w-3 mr-1" aria-hidden /> Powered by AI Vision + 10 Tahun Pengalaman
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-balance">
            AI Cek Dokumen — Foto Langsung Diperiksa, Hasil Instan
          </h1>
          <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            NPWP, NIB, KTP, sertifikat halal, PIRT, BPOM, paspor PMI, kontrak kerja — unggah fotonya, AI memeriksa
            kelengkapan, keterbacaan, tanggal kedaluwarsa, dan masalah yang berisiko. Anda dapat daftar masalah +
            langkah perbaikannya.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" aria-hidden /> Hasil dalam ~20 detik</span>
            <span className="flex items-center gap-1.5"><Camera className="h-4 w-4 text-primary" aria-hidden /> Cukup foto ponsel</span>
            <span className="flex items-center gap-1.5"><Lock className="h-4 w-4 text-primary" aria-hidden /> Foto tidak disimpan di server</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-primary" aria-hidden /> Nomor identitas otomatis disensor</span>
          </div>
        </div>
      </section>

      {/* Upload & hasil */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        <DocumentChecker />
      </section>

      {/* Cara kerja singkat */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-4">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { n: "1", t: "Unggah foto", d: "Pilih kategori dokumen (atau biarkan AI mendeteksi otomatis) lalu unggah foto dari galeri/kamera." },
            { n: "2", t: "AI memeriksa", d: "AI vision membaca dokumen: elemen wajib, keterbacaan, tanggal berlaku, ketidaksesuaian." },
            { n: "3", t: "Terima laporan", d: "Daftar masalah dengan tingkat risiko + saran perbaikan + langkah berikutnya, siap dikirim ke konsultan." },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl border bg-card p-5">
              <div className="h-8 w-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">{s.n}</div>
              <h3 className="mt-3 font-semibold">{s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA bawah */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-14">
        <div className="rounded-2xl border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Butuh alat lain? Coba{" "}
            <Link href="/roadmap" className="font-semibold text-primary hover:underline">AI Roadmap Perizinan</Link>,{" "}
            <Link href="/kalkulator-pajak" className="font-semibold text-primary hover:underline">Kalkulator Pajak</Link>, atau{" "}
            <Link href="/kbli" className="font-semibold text-primary hover:underline">Database KBLI</Link>{" "}
            kami.
          </p>
        </div>
      </section>
    </main>
  );
}
