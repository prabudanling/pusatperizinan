import type { Metadata } from "next";
import Link from "next/link";
import {
  LAYANAN_KATEGORI,
  LAYANAN_STATS,
  fmtRentang,
  slugOf,
} from "@/lib/layanan-500";
import {
  CATEGORIES,
  BUNDLES,
  fmtRange,
  waLink,
} from "@/lib/katalog-lengkap";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import Katalog500Browser from "./katalog-500-browser";

// ============================================================
// PUSATPERIZINAN.COM — /katalog (KATALOG 500 LAYANAN)
// ============================================================
// Sumber utama: Dataset 500 Layanan (4 kategori · 38 sub-kategori ·
// kode item + harga kupon bertingkat). Katalog klasik 31 divisi
// tetap ditautkan sebagai lapisan internal-linking tambahan.
// ============================================================

const PAGE_TITLE = `Katalog ${LAYANAN_STATS.total} Layanan Jasa Perizinan & Sertifikasi Usaha — ${LAYANAN_STATS.kategori} Kategori, ${LAYANAN_STATS.subKategori} Sub-Kategori`;
const PAGE_DESC = `Katalog terlengkap se-Asia: ${LAYANAN_STATS.total} layanan pengurusan perizinan dalam ${LAYANAN_STATS.kategori} kategori besar & ${LAYANAN_STATS.subKategori} sub-kategori — badan usaha, lingkungan, kesehatan & pangan, sektoral. Harga transparan ${fmtRentang(LAYANAN_STATS.hargaMin, LAYANAN_STATS.hargaMax)} dengan kupon diskon ${LAYANAN_STATS.diskonMin}–${LAYANAN_STATS.diskonMax}%.`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: `${SITE_URL}/katalog` },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: `${SITE_URL}/katalog`,
    siteName: SITE_NAME,
    type: "website",
  },
};

const FAQ = [
  {
    q: "Apakah harga di katalog ini adalah harga final?",
    a: `Angka pada katalog adalah jasa pengurusan (biaya konsultan) dengan kupon diskon bertingkat ${LAYANAN_STATS.diskonMin}–${LAYANAN_STATS.diskonMax}% yang sudah dipotong dari harga normal. Biaya resmi pemerintah (PNBP, materiil, notaris, uji lab) dihitung terpisah dan kami kunci transparan di penawaran resmi sebelum kerja dimulai.`,
  },
  {
    q: "Bagaimana cara pakai kupon diskon bertingkat?",
    a: "Cukup sebutkan kode item layanan (mis. BU-PT-001) saat konsultasi atau pemesanan — harga kupon langsung dipotong dari penawaran resmi. Semakin ringan nilai layanan, semakin besar persentase potongannya, dan semua layanan tetap mendapat diskon signifikan.",
  },
  {
    q: "Apa perbedaan 4 kategori besar di katalog ini?",
    a: "BU (Badan Usaha & Legalitas) fondasi legal perusahaan; LH (Perizinan Lingkungan) kepatuhan end-to-end dokumen lingkungan; KP (Kesehatan, Pangan & Produk) legalitas produk BPOM/Halal/SNI/fasilitas kesehatan; SK (Perizinan Sektoral & Operasional) 11 sektor usaha dari konstruksi sampai fintech.",
  },
  {
    q: "Apakah semua layanan tersedia di seluruh Indonesia?",
    a: "Ya. Kami melayani seluruh provinsi lewat koordinasi DPMPTSP daerah, kementerian teknis, dan notaris mitra lokal — tanda tangan bisa elektronik atau kirim-terima dokumen, tanpa perlu datang ke kantor kami.",
  },
  {
    q: "Berapa lama proses pengurusan berlangsung?",
    a: "Estimasi berbeda tiap layanan dan tercantum di setiap halaman detail: NIB 1 hari kerja, pendirian PT 3–7 hari kerja, notifikasi kosmetik 2–4 minggu, AMDAL 4–9 bulan sesuai skala kegiatan. Setiap progres dilaporkan berkala.",
  },
  {
    q: "Apakah ada garansi?",
    a: "Ada — garansi proses: dokumen dikerjakan sesuai check-list yang disepakati; bila tersendat karena faktor internal tim kami, pengerjaan berlanjut tanpa biaya tambahan hingga izin terbit. Data klien dilindungi perjanjian kerahasiaan.",
  },
];

export default function KatalogPage() {
  const totalHematJuta = Math.round(LAYANAN_STATS.totalHemat / 1_000_000_000 * 10) / 10;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: PAGE_TITLE,
      description: PAGE_DESC,
      url: `${SITE_URL}/katalog`,
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "OfferCatalog",
      name: `Katalog ${LAYANAN_STATS.total} Layanan PusatPerizinan.com`,
      url: `${SITE_URL}/katalog`,
      numberOfItems: LAYANAN_STATS.total,
      itemListElement: LAYANAN_KATEGORI.map((k) => ({
        "@type": "OfferCatalog",
        name: `${k.nama} (${k.kode})`,
        numberOfItems: k.total,
        itemListElement: k.sub.map((sk) => ({
          "@type": "OfferCatalog",
          name: `${sk.nama} (${sk.kode})`,
          numberOfItems: sk.layanan.length,
          itemListElement: sk.layanan.map((s) => ({
            "@type": "Offer",
            priceCurrency: "IDR",
            price: s.harga_diskon,
            itemOffered: {
              "@type": "Service",
              name: `${s.nama} (${s.kode})`,
              url: `${SITE_URL}/${slugOf(s)}`,
            },
          })),
        })),
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Katalog Layanan", item: `${SITE_URL}/katalog` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="border-b border-stone-100 bg-stone-50/60">
        <div className="mx-auto max-w-6xl px-4 py-3 text-sm text-stone-500">
          <Link href="/" className="hover:text-emerald-700">Beranda</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-stone-700" aria-current="page">Katalog 500 Layanan</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <p className="mb-3 inline-block rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-300">
            Katalog Terpadu · Edisi {new Date().getFullYear()} · Kupon {LAYANAN_STATS.diskonMin}–{LAYANAN_STATS.diskonMax}%
          </p>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
            {LAYANAN_STATS.total} Layanan Jasa Perizinan dalam{" "}
            {LAYANAN_STATS.kategori} Kategori &amp; {LAYANAN_STATS.subKategori} Sub-Kategori
          </h1>
          <p className="mt-4 max-w-2xl text-emerald-100/90 md:text-lg">
            Konsultan jasa pengurusan perizinan terlengkap se-Asia — satu pintu untuk legalitas
            badan usaha, lingkungan, kesehatan &amp; pangan, hingga perizinan sektoral.
            Harga transparan dengan kupon diskon bertingkat.
          </p>
          <dl className="mt-8 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { k: "Layanan aktif", v: `${LAYANAN_STATS.total}` },
              { k: "Kategori besar", v: `${LAYANAN_STATS.kategori}` },
              { k: "Sub-kategori", v: `${LAYANAN_STATS.subKategori}` },
              { k: "Rentang harga jasa", v: fmtRentang(LAYANAN_STATS.hargaMin, LAYANAN_STATS.hargaMax) },
            ].map((s) => (
              <div key={s.k} className="rounded-xl bg-white/10 p-4 backdrop-blur">
                <dd className="text-2xl font-bold md:text-3xl">{s.v}</dd>
                <dt className="mt-1 text-xs text-emerald-200/90">{s.k}</dt>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={waLink("Halo PusatPerizinan, saya melihat katalog 500 layanan dan ingin konsultasi kebutuhan izin saya.")}
              className="rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-emerald-950 transition hover:bg-amber-300"
            >
              Konsultasi Gratis 15 Menit
            </a>
            <a
              href="/download/katalog-500-layanan-pusatperizinan.pdf"
              download
              className="rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Unduh Katalog PDF ↓
            </a>
          </div>
          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-emerald-200/70">
            * Angka harga adalah kisaran <strong>jasa konsultan</strong> dan dapat berubah sesuai
            kompleksitas kasus. Biaya resmi pemerintah (PNBP, notaris, uji lab, dsb.) dihitung
            terpisah sesuai regulasi. Kode item seperti <span className="font-mono">BU-PT-001</span> memudahkan Anda mengutip layanan.
          </p>
        </div>
      </section>

      {/* OVERVIEW 4 KATEGORI */}
      <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="kategori">
        <h2 id="kategori" className="text-2xl font-bold text-stone-900 md:text-3xl">
          4 Kategori Besar — Temukan Izin Anda
        </h2>
        <p className="mt-2 max-w-2xl text-stone-600">
          Setiap kategori dipecah menjadi sub-kategori spesialis dengan kode item terstruktur —
          klik kartu untuk melompat ke daftar layanannya di browser di bawah.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LAYANAN_KATEGORI.map((k) => (
            <a
              key={k.kode}
              href={`#kat-${k.kode}`}
              className="group rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg"
            >
              <span className="rounded-lg bg-emerald-800 px-2.5 py-1 font-mono text-xs font-bold text-white">
                {k.kode}
              </span>
              <h3 className="mt-3 font-bold leading-snug text-stone-900 group-hover:text-emerald-800">{k.nama}</h3>
              <p className="mt-2 text-sm font-semibold text-emerald-700">
                {k.total} layanan · {k.sub.length} sub-kategori
              </p>
              <ul className="mt-3 space-y-1 text-xs text-stone-500">
                {k.sub.slice(0, 4).map((sk) => (
                  <li key={sk.kode} className="truncate">
                    <span className="font-mono text-stone-400">{sk.kode}</span> {sk.nama}
                  </li>
                ))}
                {k.sub.length > 4 && <li className="text-emerald-700">+{k.sub.length - 4} lainnya…</li>}
              </ul>
            </a>
          ))}
        </div>
      </section>

      {/* BROWSER 500 LAYANAN */}
      <section className="bg-stone-50 py-14" aria-labelledby="browser">
        <div className="mx-auto max-w-6xl px-4">
          <div id="kat-BU" />
          <div id="kat-LH" />
          <div id="kat-KP" />
          <div id="kat-SK" />
          <h2 id="browser" className="text-2xl font-bold text-stone-900 md:text-3xl">
            Telusuri Semua {LAYANAN_STATS.total} Layanan
          </h2>
          <p className="mt-2 max-w-2xl text-stone-600">
            Cari by nama atau kode item, filter per kategori &amp; sub-kategori.
            Klik layanan untuk detail lengkap: cakupan kerja, syarat, timeline, FAQ, dan harga kupon.
          </p>
          <div className="mt-8">
            <Katalog500Browser />
          </div>
        </div>
      </section>

      {/* PAKET BUNDEL TEASER */}
      <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="bundel">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="bundel" className="text-2xl font-bold text-stone-900 md:text-3xl">
              Paket Bundel Unggulan
            </h2>
            <p className="mt-2 max-w-2xl text-stone-600">
              Kombinasi layanan paling sering dibeli — lebih hemat daripada beli satuan.
            </p>
          </div>
          <Link href="/paket" className="rounded-xl bg-emerald-800 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700">
            Semua {BUNDLES.length} Paket →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BUNDLES.slice(0, 3).map((b) => (
            <div key={b.name} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              {b.badge && (
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-800">
                  {b.badge}
                </span>
              )}
              <h3 className="mt-3 font-bold text-stone-900">Paket &ldquo;{b.name}&rdquo;</h3>
              <p className="mt-1 text-2xl font-extrabold text-emerald-800">{fmtRange(b.price, null)}</p>
              <p className="mt-1 text-xs font-semibold text-amber-600">
                Hemat {fmtRange(b.save, null)} dibanding beli satuan
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* KATALOG KLASIK 31 DIVISI */}
      <section className="bg-stone-50 py-14" aria-labelledby="klasik">
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="klasik" className="text-2xl font-bold text-stone-900 md:text-3xl">
            Katalog Klasik — {CATEGORIES.length} Divisi Keahlian
          </h2>
          <p className="mt-2 max-w-2xl text-stone-600">
            Struktur lama berdasarkan divisi expertise kami (perizinan haji-umrah, pariwisata,
            sertifikasi ISO, dsb.) — tetap tersedia untuk referensi mendalam per divisi.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <Link
                key={c.code}
                href={`/katalog/${c.slug}`}
                className="rounded-full border border-stone-300 bg-white px-4 py-2 text-xs font-semibold text-stone-700 transition hover:border-emerald-400 hover:text-emerald-800"
              >
                {c.code}. {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 py-14" aria-labelledby="faq">
        <h2 id="faq" className="text-2xl font-bold text-stone-900 md:text-3xl">
          Pertanyaan Umum Katalog
        </h2>
        <div className="mt-6 space-y-3">
          {FAQ.map((f) => (
            <details key={f.q} className="group rounded-xl border border-stone-200 bg-white p-5 open:shadow-sm">
              <summary className="cursor-pointer list-none font-semibold text-stone-900">
                <span className="mr-2 text-emerald-700 group-open:hidden" aria-hidden>+</span>
                <span className="mr-2 hidden text-emerald-700 group-open:inline" aria-hidden>−</span>
                {f.q}
              </summary>
              <p className="mt-3 pl-6 text-sm leading-relaxed text-stone-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-900 to-emerald-700 p-8 text-white md:p-12">
          <h2 className="text-2xl font-bold md:text-3xl">Izin mana yang Anda butuhkan?</h2>
          <p className="mt-2 max-w-2xl text-emerald-100/90">
            Ceritakan usaha Anda — dalam 15 menit kami petakan izin yang wajib, urutan
            pengurusan yang benar, dan estimasi biayanya. Gratis, tanpa komitmen.
            Total potensi hemat kupon seluruh katalog: Rp {totalHematJuta} miliar.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={waLink("Halo PusatPerizinan, saya ingin konsultasi dari halaman katalog 500 layanan.")}
              className="rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-emerald-950 transition hover:bg-amber-300"
            >
              WhatsApp 0812-6999-9910
            </a>
            <Link href="/roadmap" className="rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold transition hover:bg-white/10">
              Coba Roadmap Izin AI →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
