import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import { LeadForm } from "@/components/lead-form";
import { Check, Sprout } from "lucide-react";

// ============================================================
// PUSATPERIZINAN.COM — /bumdes (IDE #10: Desa Formal)
// 80.000+ BUMDes butuh legalisasi & kesiapan usaha — pasar
// terbesar yang tersentuh paling sedikit. Harga sosial, kualitas
// standar nasional.
// ============================================================

export const metadata: Metadata = {
  title: "Layanan BUMDes & BUMDesa — Pendirian, Izin Usaha & Pembukuan Rapi",
  description:
    "Program khusus desa: pendirian badan hukum BUMDes (Kemenkop), NIB & izin usaha unit, pembukuan sederhana, pelatihan pengurus. Harga sosial untuk pemerintah desa & dana desa — melayani 38 provinsi.",
  alternates: { canonical: "/bumdes" },
  openGraph: {
    title: "Layanan BUMDes & BUMDesa — Legalitas Desa Rapi",
    description: "Pendirian badan hukum, izin usaha unit, pembukuan & pelatihan pengurus. Harga sosial.",
    url: "/bumdes",
    type: "website",
    siteName: SITE_NAME,
    locale: "id_ID",
  },
  robots: { index: true, follow: true },
};

const PACKAGES = [
  {
    name: "Pendirian Badan Hukum BUMDes", price: "Rp 3,5jt", time: "3-6 minggu",
    items: ["Penyusunan AD/ART sesuai Permendes", "Rekomendasi Kemenkop & RKSM", "Penerbitan Badan Hukum (SK)", "NPWP BUMDes & NIB", "Panduan RAT pertama"],
  },
  {
    name: "Izin Usaha Unit BUMDes", price: "Rp 1,8jt / unit", time: "1-3 minggu",
    items: ["NIB unit usaha via OSS (toko, angkutan, pertanian…)", "Sertifikat Standar sesuai risiko", "Pendampingan izin sektor (dusun wisata, kerupuk, dll.)", "Konsultasi KBLI yang benar untuk dana desa"],
  },
  {
    name: "Desa Siap Usaha (Terlengkap)", price: "Rp 9,9jt", time: "2-3 bulan",
    items: ["Semua di paket 1 & 2 (maks 3 unit usaha)", "Sistem pembukuan sederhana + template jurnal", "Pelatihan pengurus & pengawas (2 sesi, daring)", "Laporan tahunan siap pantau Balai Desa/BPKAD", "Prioritas konsultasi 12 bulan"],
  },
];

const FAQ = [
  {
    q: "Apakah BUMDes wajib berbadan hukum?",
    a: "Sejak Permendes 4/2015 jo. 11/2019, BUMDes berbadan hukum setelah SK Kemenkop terbit — dan hampir semua kerja sama (bank, BUMN, investor) kini menuntutnya. Bila BUMDes Anda masih ber-SK Camat, saatnya dinaikkan statusnya.",
  },
  {
    q: "Bisa dibayar dengan Dana Desa?",
    a: "Bisa — banyak desa memakai belanja modal/pendampingan Dana Desa untuk legalitas BUMDes karena justru merupakan syarat pengelolaan aset desa yang benar. Kami berikan penawaran formal untuk lampiran SPJ desa, dan harga sosial khusus untuk desa tertinggal/3T.",
  },
  {
    q: "Kami di daerah 3T, apakah dilayani?",
    a: "Ya — proses utama BUMDes (Kemenkop & OSS) dilakukan daring; kunjungan fisik hanya bila benar-benar diperlukan. Kami melayani 38 provinsi dan memberi prioritas jadwal untuk desa 3T.",
  },
];

export default function BumdesPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-primary">Beranda</Link></li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="font-semibold text-foreground">Layanan BUMDes</li>
          </ol>
        </nav>

        <header className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700"><Sprout className="h-3.5 w-3.5" aria-hidden />HARGA SOSIAL • 38 PROVINSI • DANA DESA BISA</p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            BUMDes Legal, Usaha Jalan — Desa Anda Layak Setingkat Perusahaan
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Dana desa tahunan di Indonesia ratusan triliun, tapi jutaan aset desa masih dikelola lembaga
            yang badan hukumnya belum tuntas. Kami membedah persoalan itu: pendirian badan hukum, izin
            setiap unit usaha, pembukuan yang bisa dibaca pengawas — dengan harga sosial yang pantas untuk
            kas desa.
          </p>
        </header>

        <section className="mt-10 grid gap-5 md:grid-cols-3" aria-label="Paket BUMDes">
          {PACKAGES.map((p) => (
            <article key={p.name} className="flex flex-col rounded-2xl border bg-card p-6">
              <h2 className="font-bold leading-snug">{p.name}</h2>
              <p className="mt-2 text-2xl font-extrabold text-emerald-700">{p.price}</p>
              <p className="text-xs text-muted-foreground">Timeline: {p.time}</p>
              <ul className="mt-4 flex-1 space-y-2">
                {p.items.map((i) => (
                  <li key={i} className="flex gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden /><span>{i}</span></li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="mt-10" aria-label="FAQ BUMDes">
          <h2 className="text-2xl font-bold">Pertanyaan Umum Desa</h2>
          <div className="mt-4 space-y-3">
            {FAQ.map((f) => (
              <details key={f.q} className="rounded-xl border p-4">
                <summary className="cursor-pointer font-semibold">{f.q}</summary>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border bg-card p-5 sm:p-8" aria-label="Formulir konsultasi BUMDes">
          <h2 className="text-xl font-bold">Konsultasi untuk Kepala Desa / Sekretaris BUMDes</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sampaikan kondisi BUMDes Anda (baru mau berdiri / sudah jalan / masalah dokumen) — tim kami
            membalas dengan rencana langkah demi langkah dan estimasi biayanya.
          </p>
          <div className="mt-5 max-w-2xl">
            <LeadForm
              source="bumdes"
              cta="Konsultasi Gratis untuk Desa Kami"
              needs={[
                { value: "Pendirian baru", label: "BUMDes baru mau berdiri" },
                { value: "Naik badan hukum", label: "Sudah jalan, mau SK badan hukum" },
                { value: "Izin unit usaha", label: "Butuh izin unit usaha" },
                { value: "Pembukuan", label: "Butuh pembukuan / laporan rapi" },
              ]}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
