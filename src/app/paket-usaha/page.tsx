import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import { LeadForm } from "@/components/lead-form";
import { Coffee, ChefHat, Stethoscope, MoonStar, WashingMachine, PartyPopper, Check } from "lucide-react";

// ============================================================
// PUSATPERIZINAN.COM — /paket-usaha (IDE #3: Izin-in-a-Box)
// Pelanggan membeli HASIL ("buka kedai kopi"), bukan izin satuan.
// Komposisi paket memakai layanan nyata dari katalog + harga jujur.
// ============================================================

export const metadata: Metadata = {
  title: "Paket Usaha Siap Jalan — Kedai Kopi, Klinik, Travel Umroh, Cloud Kitchen",
  description:
    "Izin-in-a-Box: semua legalitas usaha Anda dibundel per industri — kedai kopi, cloud kitchen, klinik gigi, travel umroh, laundry, event organizer. Harga transparan, timeline jelas, garansi tertulis.",
  alternates: { canonical: "/paket-usaha" },
  openGraph: {
    title: "Paket Usaha Siap Jalan — Semua Izin Sekali Bener",
    description: "Bundel legalitas per industri dengan harga transparan & garansi tertulis.",
    url: "/paket-usaha",
    type: "website",
    siteName: SITE_NAME,
    locale: "id_ID",
  },
  robots: { index: true, follow: true },
};

const VERTICALS = [
  {
    icon: Coffee, name: "Kedai Kopi & Kafe", price: "Rp 6,9jt", time: "3-5 minggu",
    includes: ["NIB + KBLI optimal (OSS-RBA)", "PBG & SLF tempat usaha", "Sertifikat Higiene Sanitasi (Dinkes)", "NIB produk & NPWP", "Pendampingan pendaftaran merek dagang"],
    audience: "Kafe baru, roastery, kedai franchise — siap kunjungan Dinkes & calon investor.",
  },
  {
    icon: ChefHat, name: "Cloud Kitchen & Katering", price: "Rp 8,5jt", time: "4-6 minggu",
    includes: ["NIB + Sertifikat Standar pangan", "PIRT atau Izin Edar BPOM (sesuai skala)", "Sertifikat Higiene Sanitasi", "Sertifikasi Halal (jalur Sehati/reguler)", "Syarat bergabung GoFood/Grab/Shopee"],
    audience: "Dapur rumahan komersial, ghost kitchen, katering corporate.",
  },
  {
    icon: Stethoscope, name: "Klinik (Gigi/Umum)", price: "Rp 22jt", time: "2-3 bulan",
    includes: ["Badan usaha (PT/Yayasan) + NPWP", "Izin Klinik (Permenkes 43/2019)", "SIP dokter & STR pendampingan", "IPAK apotek/pelayanan farmasi", "Standar sarana & pemeriksaan Kemenkes"],
    audience: "Dokter muda membuka praktik, grup klinik yang ekspansi cabang.",
  },
  {
    icon: MoonStar, name: "Travel Umroh (PPIU)", price: "Rp 45jt", time: "3-4 bulan",
    includes: ["Pendirian PT + modal dasar sesuai regulasi", "TDUP & KBLI 79120", "PPIU Kemenag (termasuk pra-audit)", "SISKOPATUH & kepatuhan BPK2U", "Training tim + template kontrak jamaah"],
    audience: "Pengasuh/ustaz yang naik kelas jadi travel resmi — jalur flagship kami.",
  },
  {
    icon: WashingMachine, name: "Laundry & Jasa Bersih", price: "Rp 4,9jt", time: "2-3 minggu",
    includes: ["NIB + izin lingkungan (SPPL/UKL-UPL)", "Surat pernyataan & pemeriksaan Dinkes", "BPJS karyawan + kontrak kerja template", "NPWP & pengaturan pajak UMKM 0,5%", "Pendampingan sewa tempat & PBG bila perlu"],
    audience: "Laundry satuan, kilat massal, franchise laundry — siap pengajuan kredit usaha.",
  },
  {
    icon: PartyPopper, name: "Event Organizer & Agensi", price: "Rp 9,8jt", time: "3-4 minggu",
    includes: ["Badan usaha PT/CV + NPWP", "Izin keramaian/kegiatan (polsek-polres)", "Izin terbit reklame kampanye", "Sertifikasi BNSP EO (opsional, syarat tender)", "Kontrak vendor & asuransi event template"],
    audience: "EO weddings, konser, corporate gathering — lega saat urusan polisi & klien besar.",
  },
];

export default function PaketUsahaPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-primary">Beranda</Link></li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="font-semibold text-foreground">Paket Usaha</li>
          </ol>
        </nav>

        <header className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">IZIN-IN-A-BOX • GARANSI TERTULIS</p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Pilih Usahanya, Kami Siapkan Semua Izinnya
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Anda tidak perlu jadi ahli regulasi. Pilih vertikal usaha Anda — kami bundel{" "}
            <strong>semua</strong> izin, sertifikasi, dan kepatuhannya dalam satu paket dengan harga
            transparan. Lebih hemat 15-25% dibanding beli satuan, dengan garansi uang kembali tertulis.
          </p>
        </header>

        <section className="mt-10 grid gap-5 md:grid-cols-2" aria-label="Daftar paket usaha">
          {VERTICALS.map((v) => (
            <article key={v.name} className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700" aria-hidden><v.icon className="h-5 w-5" /></span>
                <div>
                  <h2 className="font-bold">{v.name}</h2>
                  <p className="text-sm text-muted-foreground">{v.audience}</p>
                </div>
              </div>
              <ul className="mt-4 flex-1 space-y-2">
                {v.includes.map((i) => (
                  <li key={i} className="flex gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden /><span>{i}</span></li>
                ))}
              </ul>
              <div className="mt-5 flex items-end justify-between border-t pt-4">
                <div>
                  <p className="text-lg font-extrabold">{v.price}</p>
                  <p className="text-xs text-muted-foreground">Timeline: {v.time}</p>
                </div>
                <a
                  href={`https://wa.me/6281269999910?text=${encodeURIComponent(`Halo, saya tertarik Paket Usaha "${v.name}". Mohon info lengkapnya.`)}`}
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                >
                  Ambil Paket Ini
                </a>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-2xl border bg-card p-5 sm:p-8" aria-label="Konsultasi paket">
          <h2 className="text-xl font-bold">Industri Anda Belum Ada di Daftar?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Kami punya 144 layanan yang bisa dikomposisikan untuk industri apa pun — dari salon sampai pabrik.
            Ceritakan rencana Anda, tim menyusun paket custom gratis.
          </p>
          <div className="mt-5 max-w-2xl">
            <LeadForm source="paket-usaha" cta="Susun Paket Custom Saya" />
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Paket Usaha Siap Jalan — Izin-in-a-Box",
            itemListElement: VERTICALS.map((v, i) => ({
              "@type": "ListItem", position: i + 1,
              item: { "@type": "Service", name: `Paket ${v.name}`, description: v.audience, provider: { "@type": "Organization", name: SITE_NAME } },
            })),
          }) }}
        />
      </div>
    </main>
  );
}
