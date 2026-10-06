import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, CONTACT } from "@/lib/site";

// ============================================================
// PUSATPERIZINAN.COM — /kebijakan-privasi (E-E-A-T & kepatuhan UU PDP)
// Ringkas, jujur, spesifik pada aliran data yang benar-benar
// terjadi di situs ini (form leads, AI chat, tools).
// ============================================================

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: `Bagaimana ${SITE_NAME} mengumpulkan, menggunakan, dan melindungi data pribadi Anda sesuai UU Pelindungan Data Pribadi (UU 27/2022).`,
  alternates: { canonical: "/kebijakan-privasi" },
  robots: { index: true, follow: true },
};

const SECTIONS = [
  {
    h: "Data yang Kami Kumpulkan",
    p: [
      "Data yang Anda berikan langsung: nama, nomor WhatsApp/telepon, email, jenis usaha, dan deskripsi kebutuhan — melalui formulir konsultasi, AI chat (RIZKI), license checker, kalkulator, atau formulir lain di situs ini.",
      "Data teknis terbatas: halaman yang dikunjungi dan interaksi situs, untuk keperluan perbaikan layanan. Kami tidak menjual data Anda kepada pihak ketiga.",
    ],
  },
  {
    h: "Cara Kami Menggunakan Data",
    p: [
      "Menghubungi Anda untuk konsultasi perizinan yang Anda minta.",
      "Menyusun rekomendasi jalur perizinan, estimasi biaya, dan penawaran jasa.",
      "Korespondensi administratif terkait pengurusan izin yang Anda titipkan.",
    ],
  },
  {
    h: "Dasar Hukum & Kepatuhan",
    p: [
      "Pemrosesan data dilakukan berdasarkan persetujuan Anda (satu setuju saat mengirim formulir) dan sepanjang relevan mengacu pada UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.",
      "Dokumen identitas yang Anda serahkan untuk keperluan pengurusan izin hanya dibagikan kepada instansi/portal resmi yang menjadi jalur pengajuan (mis. OSS-RBA, Kemenkumham, DJP, BPJPH, BPOM) dan mitra notaris yang bekerja untuk akta Anda.",
    ],
  },
  {
    h: "Retensi & Hak Anda",
    p: [
      "Data leads disimpan selama diperlukan untuk keperluan konsultasi; Anda dapat meminta penghapusan kapan saja.",
      "Anda berhak meminta akses, koreksi, atau penghapusan data pribadi Anda dengan menghubungi kami melalui kanal di halaman Kontak.",
    ],
  },
];

export default function KebijakanPrivasiPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-primary">Beranda</Link></li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="font-semibold text-foreground">Kebijakan Privasi</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Kebijakan Privasi</h1>
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

          <section aria-label="Kontak privasi">
            <h2 className="text-xl font-bold tracking-tight">Pertanyaan Privasi</h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground/85">
              Hubungi <a href={`mailto:${CONTACT.email}`} className="font-semibold text-primary hover:underline">{CONTACT.email}</a>{" "}
              atau WhatsApp {CONTACT.phoneDisplay} untuk permintaan terkait data pribadi Anda.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
