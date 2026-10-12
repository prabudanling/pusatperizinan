import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import { LeadForm } from "@/components/lead-form";
import { Handshake, MapPin, Percent, Rocket } from "lucide-react";

// ============================================================
// PUSATPERIZINAN.COM — /mitra (IDE #5: Jaringan Mitra 514 Kota)
// Skala nasional tanpa gaji: mitra daerah dapat lead + merek,
// PusatPerizinan menutup & memenuhi. Komisi transparan.
// ============================================================

export const metadata: Metadata = {
  title: "Program Mitra Daerah — Jadi Mitra Resmi Konsultan Perizinan #1",
  description:
    "Untuk notaris, PPAT, tukang urus izin & konsultan daerah di 514 kabupaten/kota: dapat lead nasional, merek terpercaya, dan komisi hingga 30%. Bergabung gratis — screening maksimal 2 mitra per kota.",
  alternates: { canonical: "/mitra" },
  openGraph: {
    title: "Program Mitra Daerah PusatPerizinan.com",
    description: "Lead nasional + merek terpercaya + komisi hingga 30%. Kuota 2 mitra per kota.",
    url: "/mitra",
    type: "website",
    siteName: SITE_NAME,
    locale: "id_ID",
  },
  robots: { index: true, follow: true },
};

const BENEFITS = [
  { icon: Rocket, title: "Lead Nasional Mengalir", desc: "Permintaaan dari kota Anda yang masuk lewat 9.600+ halaman SEO & AI search kami, langsung diteruskan ke Anda — gratis, bukan dijual." },
  { icon: Percent, title: "Komisi Hingga 30%", desc: "Setiap deal yang Anda tutup atau bantu proses memperoleh komisi transparan. Paid-out bulanan, laporan real-time di dashboard mitra." },
  { icon: MapPin, title: "Merek & Standar Nasional", desc: "Kartu nama, proposal, SOP proses, dan garansi tertulis level nasional — mitra daerah langsung tampil sekelas firma besar." },
  { icon: Handshake, title: "Screening Eksklusif", desc: "Maksimal 2 mitra per kabupaten/kota agar lead tidak saling berebut. Yang cepat, dapat wilayahnya." },
];

const STEPS = [
  { step: 1, title: "Daftar & Screening", desc: "Isi formulir. Kami verifikasi rekam jejak (bukan lihat ijazah — kami lihat pekerjaan)." },
  { step: 2, title: "Onboarding 3 Hari", desc: "Pelatihan produk, akses portal mitra, materi penawaran, dan garansi tertulis level nasional." },
  { step: 3, title: "Lead Mengalir & Berkembang", desc: "Lead kota Anda dikirim, Anda tutup, komisi masuk bulanan. Naik level → komisi naik." },
];

export default function MitraPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-primary">Beranda</Link></li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="font-semibold text-foreground">Program Mitra</li>
          </ol>
        </nav>

        <header className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">KUOTA 2 MITRA / KOTA • GRATIS BERGABUNG</p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Program Mitra Daerah — Dibayar Setiap Kali Usaha di Kota Anda Butuh Izin
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Setiap hari ratusan pencari izin dari seluruh Indonesia menemukan kami. Untuk kota-kota di luar
            cakupan tim inti, kami <strong>hadiahkan</strong> lead-nya kepada mitra lokal terpilih —
            Anda kerjakan pakai SOP & garansi kami, komisi untuk Anda.
          </p>
        </header>

        <section className="mt-10 grid gap-5 sm:grid-cols-2" aria-label="Keuntungan mitra">
          {BENEFITS.map((b) => (
            <article key={b.title} className="rounded-2xl border bg-card p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700" aria-hidden><b.icon className="h-5 w-5" /></span>
              <h2 className="mt-3 font-bold">{b.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
            </article>
          ))}
        </section>

        <section className="mt-10" aria-label="Cara bergabung">
          <h2 className="text-2xl font-bold">3 Langkah Bergabung</h2>
          <ol className="mt-4 grid gap-4 sm:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.step} className="rounded-xl border bg-card p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white" aria-hidden>{s.step}</span>
                <h3 className="mt-3 font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-10 rounded-2xl border bg-card p-5 sm:p-8" aria-label="Formulir pendaftaran mitra">
          <h2 className="text-xl font-bold">Daftar Jadi Mitra (Gratis)</h2>
          <p className="mt-2 text-sm text-muted-foreground">Ceritakan pengalaman & kota Anda — tim kemitraan menghubungi maksimal 3 hari kerja.</p>
          <div className="mt-5 max-w-2xl">
            <LeadForm
              source="mitra"
              cta="Ajukan Jadi Mitra"
              note="Data hanya untuk proses screening mitra — tidak dibagikan."
              needs={[
                { value: "Konsultan/tukang urus izin", label: "Konsultan / tukang urus izin" },
                { value: "Notaris/PPAT", label: "Notaris / PPAT / staf notaris" },
                { value: "Konsultan pajak", label: "Konsultan pajak / akuntan" },
                { value: "Agen properti/konstruksi", label: "Agen properti / jasa konstruksi" },
                { value: "Lainnya", label: "Profesi lain (jelaskan di kolom pesan)" },
              ]}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
