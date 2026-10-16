import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

// ============================================================
// PUSATPERIZINAN.COM — /syarat-ketentuan (E-E-A-T, PHASE 6)
// Termasuk disclaimer penting: kami konsultan, bukan instansi
// pemerintah; keputusan keputusan hukum final ada di publikasi resmi.
// ============================================================

export const metadata: Metadata = {
  title: "Syarat & Ketentuan Layanan",
  description: `Syarat penggunaan situs ${SITE_NAME} dan ketentuan penggunaan jasa konsultasi perizinan usaha.`,
  alternates: { canonical: "/syarat-ketentuan" },
  robots: { index: true, follow: true },
};

const SECTIONS = [
  {
    h: "Status Layanan",
    p: [
      `${SITE_NAME} adalah penyedia JASA KONSULTASI dan pengurusan perizinan — kami BUKAN instansi pemerintah dan tidak berafiliasi dengan instansi pemerintah mana pun. Semua pengajuan izin diproses melalui jalur resmi: OSS-RBA, Kemenkumham, DJP, BPJPH, BPOM, instansi daerah, dan portal resmi lainnya.`,
      "Estimasi biaya di situs ini adalah biaya jasa kami; biaya resmi pemerintah (retribusi, PNBP, notaris, penerbitan) disampaikan terpisah dan transparan sebelum Anda menyetujui pekerjaan.",
    ],
  },
  {
    h: "Estimasi Waktu & Hasil",
    p: [
      "Durasi pengerjaan yang kami tampilkan adalah estimasi berdasarkan pengalaman pengajuan normal. Waktu final ditentukan instansi penerbit; antrean, verifikasi tambahan, atau perubahan regulasi dapat memengaruhi jadwal.",
      "Garansi yang kami berikan berlaku pada cakupan yang dinyatakan tertulis dalam perjanjian jasa per klien (mis. pengulangan proses bila penolakan terjadi karena kesalahan administratif pihak kami).",
    ],
  },
  {
    h: "Konten Informasi (Bukan Nasihat Hukum)",
    p: [
      "Panduan, artikel, kalkulator, dan tools di situs ini bersifat informasi umum. Kondisi setiap usaha berbeda; untuk keputusan yang mengikat, lakukan konsultasi dan verifikasi terhadap publikasi resmi instansi terkait (JDIH, OSS, DJP, BPOM, BPJPH, dan lainnya).",
    ],
  },
  {
    h: "Penggunaan Situs",
    p: [
      "Dilarang menggunakan situs ini untuk penyalahgunaan, scraping massal, atau upaya yang mengganggu ketersediaan layanan.",
      "Merek, konten, dan materi di situs ini adalah milik kami; pengutipan sebagian untuk keperluan non-komersial diperbolehkan dengan atribusi dan tautan ke sumber.",
    ],
  },
];

export default function SyaratKetentuanPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-primary">Beranda</Link></li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="font-semibold text-foreground">Syarat &amp; Ketentuan</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Syarat &amp; Ketentuan</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Terakhir diperbarui: {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        <div className="mt-8 space-y-8">
          {SECTIONS.map((s) => (
            <section key={s.h} aria-label={s.h}>
              <h2 className="text-xl font-bold tracking-tight">{s.h}</h2>
              <div className="mt-3 space-y-3">
                {s.p.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed text-foreground/85">{p}</p>
                ))}
              </div>
            </section>
          ))}
          <p className="text-sm text-muted-foreground">
            Pertanyaan tentang ketentuan ini? Hubungi kami via{" "}
            <Link href="/kontak" className="font-semibold text-primary hover:underline">halaman kontak</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
