import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import { LeadForm } from "@/components/lead-form";
import { Building2, FileSearch, Landmark, ShieldCheck } from "lucide-react";

// ============================================================
// PUSATPERIZINAN.COM — /solusi-korporat (IDE #9: B2B Whitelabel)
// Bank/multifinance/properti butuh calon debitur-penyewa yang
// legal — kami sediakan verifikasi massal + perbaikan legalitas.
// ============================================================

export const metadata: Metadata = {
  title: "Solusi Korporat — Verifikasi & Perbaikan Legalitas Massal untuk Bank, Leasing & Properti",
  description:
    "Program B2B: cek legalitas instan untuk portofolio debitur/penyewa, remediasi dokumen perizinan, white-label desk legalitas, SLA tertulis. Diproses tim berpengalaman 3.890+ izin di 38 provinsi.",
  alternates: { canonical: "/solusi-korporat" },
  openGraph: {
    title: "Solusi Korporat — Legalitas Massal & White-Label",
    description: "Verifikasi & perbaikan legalitas untuk bank, multifinance, developer & platform.",
    url: "/solusi-korporat",
    type: "website",
    siteName: SITE_NAME,
    locale: "id_ID",
  },
  robots: { index: true, follow: true },
};

const SERVICES = [
  {
    icon: FileSearch, title: "Legal Check Massal (Bulk)",
    desc: "Kirim daftar calon debitur/penyewa/merchant — kami keluarkan skor legalitas: NIB aktif? LKPM lancar? Sertifikat sesuai KBLI? Hasil dalam CSV/API siap dipakai tim risiko Anda.",
  },
  {
    icon: ShieldCheck, title: "Remediasi Sebelum Disbursement",
    desc: "Debitur potensial tapi dokumennya bolong? Paket perbaikan terstruktur: lengkapi NIB, perpanjang izin, rapikan pajak — dengan tenggat yang sinkron dengan jadwal pencairan Anda.",
  },
  {
    icon: Building2, title: "White-Label Desk Legalitas",
    desc: "Meja layanan legalitas bermerek institusi Anda — dijalankan tim kami dengan SOP Anda. Cocok untuk bank UMKM, lelang aset, dan marketplace B2B.",
  },
  {
    icon: Landmark, title: "Due Diligence Transaksi",
    desc: "Untuk merger, akuisisi, dan pendanaan: pemeriksaan legalitas perusahaan target — badan hukum, perizinan, kepegawaian, kekayaan intelektual — dengan opini tertulis.",
  },
];

export default function SolusiKorporatPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-primary">Beranda</Link></li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="font-semibold text-foreground">Solusi Korporat</li>
          </ol>
        </nav>

        <header className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">B2B • SLA TERTULIS • NDA STANDAR</p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Legalitas Ribuan Debitur & Penyewa — Satu Mitra yang Menjaga
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Bank, multifinance, developer, dan platform yang berurusan dengan UMKM selalu menabrak masalah
            yang sama: <strong>legalitas yang tidak siap</strong>. Kami menyediakan verifikasi massal,
            perbaikan terstruktur, dan desk legalitas white-label — berbasis pengalaman memproses 3.890+
            perizinan lintas 38 provinsi.
          </p>
        </header>

        <section className="mt-10 grid gap-5 sm:grid-cols-2" aria-label="Layanan korporat">
          {SERVICES.map((s) => (
            <article key={s.title} className="rounded-2xl border bg-card p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700" aria-hidden><s.icon className="h-5 w-5" /></span>
              <h2 className="mt-3 font-bold">{s.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-2xl border bg-card p-5 sm:p-8" aria-label="Diskusi kebutuhan korporat">
          <h2 className="text-xl font-bold">Diskusikan Kebutuhan Institusi Anda</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Cantumkan volume & jenis kebutuhan — kami kirim proposal dengan pricing volume, SLA, dan sampel laporan.
          </p>
          <div className="mt-5 max-w-2xl">
            <LeadForm
              source="korporat"
              cta="Minta Proposal Korporat"
              needs={[
                { value: "Bank/KFi", label: "Bank / Perusahaan Pembiayaan" },
                { value: "Developer", label: "Developer / Manajemen Properti" },
                { value: "Marketplace/Platform", label: "Marketplace / Platform" },
                { value: "Korporasi lain", label: "Korporasi / Grup lainnya" },
              ]}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
