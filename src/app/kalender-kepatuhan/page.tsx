import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import { KepatuhanTool } from "@/components/program/kepatuhan-tool";
import { LeadForm } from "@/components/lead-form";

// ============================================================
// PUSATPERIZINAN.COM — /kalender-kepatuhan (IDE #1: 46 Council)
// Tool lead-magnet: kewajiban berkala (LKPM, SPT, JAMSOSTEK)
// → transformasi penjualan sekali-jadi menjadi langganan.
// ============================================================

export const metadata: Metadata = {
  title: "Kalender Kepatuhan Usaha — Jadwal LKPM, SPT & JAMSOSTEK Otomatis",
  description:
    "Hitung jadwal kewajiban legal usaha Anda secara gratis: LKPM OSS-RBA (BKPM 5/2024), SPT Tahunan DJP, JAMSOSTEK 2A. Hindari denda & pembekuan NIB — kalender personal + pengingat WhatsApp gratis.",
  alternates: { canonical: "/kalender-kepatuhan" },
  openGraph: {
    title: "Kalender Kepatuhan Usaha — Gratis & Otomatis",
    description: "Masukkan data usaha Anda, dapatkan jadwal LKPM, SPT Tahunan, dan JAMSOSTEK 2A untuk 12 bulan ke depan.",
    url: "/kalender-kepatuhan",
    type: "website",
    siteName: SITE_NAME,
    locale: "id_ID",
  },
  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "Apa akibatnya kalau LKPM terlambat?",
    a: "Sesuai ketentuan BKPM, pelaporan LKPM yang terlambat berturut-turut berujung teguran tertulis, denda, sampai pembekuan NIB — yang membuat usaha tidak bisa mengurus izin lanjutan, ikut tender, atau mengajukan pembiayaan. Kalender ini mencegah semuanya.",
  },
  {
    q: "Siapa yang wajib lapor LKPM?",
    a: "Semua pelaku usaha yang memiliki NIB berdasarkan perizinan berusaha di OSS-RBA — mulai usaha mikro sampai besar. Frekuensinya: mikro & kecil semesteran (20 Juli & 20 Januari), menengah & besar triwulanan (10 April, Juli, Oktober, Januari).",
  },
  {
    q: "Apakah tool ini benar-benar gratis?",
    a: "Ya, 100% gratis tanpa biaya tersembunyi. Setelah kalender jadi, tim kami menawarkan pengingat WhatsApp gratis — tidak diwajibkan, tidak ada paksaan.",
  },
  {
    q: "Bagaimana kalau usaha saya sudah telat lapor?",
    a: "Tenang — kasus ini sangat umum dan hampir selalu bisa dirapikan. Tim kami menangani pelaporan susulan, penjelasan ke BKPM/OSS, dan pemulihan status NIB. Jelaskan kondisinya di form, kami hitung jalur teraman.",
  },
];

export default function KalenderKepatuhanPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-primary">Beranda</Link></li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="font-semibold text-foreground">Kalender Kepatuhan</li>
          </ol>
        </nav>

        <header>
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">GRATIS • TANPA SYARAT • 60 DETIK</p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Kalender Kepatuhan Usaha — Jangan Biarkan NIB Anda Dibekukan
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Menerbitkan izin itu langkah pertama. <strong>Menjaganya tetap aktif</strong> adalah pekerjaan
            tahunan: LKPM ke OSS, SPT ke DJP, JAMSOSTEK ke BPJS. Masukkan 3 data di bawah — kami susun
            jadwal 12 bulan ke depan, lalu (kalau mau) kami ingatkan lewat WhatsApp tiap menjelang tenggat.
          </p>
        </header>

        <section className="mt-8" aria-label="Tool kalender kepatuhan">
          <KepatuhanTool />
        </section>

        <section className="mt-10 rounded-2xl border bg-card p-5 sm:p-8" aria-label="Aktifkan pengingat WhatsApp">
          <h2 className="text-xl font-bold">Aktifkan Pengingat WhatsApp Gratis</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Kami kirim pengingat 7 hari sebelum tiap tenggat — beserta tawaran bantuan kalau tidak sempat mengurus sendiri.
          </p>
          <div className="mt-5">
            <LeadForm
              source="kalender-kepatuhan"
              cta="Aktifkan Pengingat Gratis"
              needs={[
                { value: "Pengingat saja", label: "Pengingat saja (tidak perlu bantuan)" },
                { value: "LKPM", label: "Bantu urus LKPM saya" },
                { value: "SPT Tahunan", label: "Bantu SPT Tahunan" },
                { value: "Sudah telat", label: "Usaha saya sudah telat — minta tolong" },
                { value: "Paket kepatuhan tahunan", label: "Tertarik paket kepatuhan tahunan" },
              ]}
            />
          </div>
        </section>

        <section className="mt-10" aria-label="Pertanyaan umum">
          <h2 className="text-2xl font-bold">Pertanyaan yang Sering Diajukan</h2>
          <div className="mt-4 space-y-3">
            {FAQ.map((f) => (
              <details key={f.q} className="rounded-xl border p-4">
                <summary className="cursor-pointer font-semibold">{f.q}</summary>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((f) => ({
              "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }) }}
        />
      </div>
    </main>
  );
}
