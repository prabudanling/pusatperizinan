import type { Metadata } from "next";
import Link from "next/link";
import {
  CATEGORIES,
  BUNDLES,
  COUNT_SERVICES,
  COUNT_VARIANTS,
  PRICE_FLOOR,
  PRICE_CEIL,
  fmtRange,
  waLink,
} from "@/lib/katalog-lengkap";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const PAGE_TITLE = `Katalog Lengkap ${COUNT_VARIANTS}+ Layanan Perizinan, Sertifikasi & Legalitas Usaha — ${CATEGORIES.length} Divisi`;
const PAGE_DESC = `Katalog ${COUNT_SERVICES} jenis layanan (${COUNT_VARIANTS} varian paket) dalam ${CATEGORIES.length} divisi: dari PPIU/PIHK haji-umrah, pendirian PT, BPOM, halal, PBG/SLF, sampai ISO — lengkap dengan kisaran harga & timeline.`;

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

const ROADMAP_ACTIVE = [
  { name: "RIZKI — Konsultan AI 24/7", desc: "Chat AI yang men-diagnosis kebutuhan izin, merekomendasikan layanan, dan menjemput lead." },
  { name: "AI Document Checker", desc: "Upload foto dokumen → AI menilai kelengkapan, status, dan langkah berikutnya." },
  { name: "Roadmap Izin 12 Bulan", desc: "Wizard yang menyusun urutan izin sesuai bidang usaha, provinsi, dan modal." },
];
const ROADMAP_NEXT = [
  { name: "Compliance Tracker Klien", desc: "Dashboard status izin berjalan: aktif, mendekati perpanjangan, kedaluwarsa." },
  { name: "Regulatory Update Alerts", desc: "Notifikasi perubahan regulasi Kemenag/OSS/instansi teknis yang relevan dengan izin klien." },
  { name: "Sertifikat Terverifikasi", desc: "Mekanisme verifikasi keaslian sertifikat terbit untuk anti-pemalsuan." },
];

const FAQ = [
  {
    q: "Apakah harga di katalog ini adalah harga final?",
    a: "Tidak — semua angka adalah kisaran jasa konsultan PusatPerizinan dan dapat berubah sesuai kompleksitas kasus. Biaya resmi pemerintah (PNBP, materiil, notaris, uji lab) dihitung terpisah sesuai regulasi yang berlaku.",
  },
  {
    q: "Divisi mana yang paling dalam keahlian PusatPerizinan?",
    a: "Divisi R — perizinan ibadah & perjalanan haji-umrah (PPIU/PIHK) adalah inti spesialisasi kami, disusul pariwisata-perhotelan dan sertifikasi ISO. Untuk divisi lain kami menangani secara end-to-end dengan standar proses yang sama.",
  },
  {
    q: "Apakah semua layanan tersedia di semua provinsi?",
    a: "Sebagian besar ya — kami menjangkau 38 provinsi. Untuk izin yang berpijak pada peraturan daerah (reklame, minuman beralkohol, PBG), ketentuan lokalnya berbeda; halaman wilayah kami memuat catatan lokal per provinsi.",
  },
  {
    q: "Bagaimana cara memulai dari katalog ini?",
    a: "Pilih divisi yang relevan, pelajari layanan & kisaran harganya, lalu konsultasikan kasus Anda via WhatsApp atau chat RIZKI. Dari situ kami susun paket yang paling efisien — termasuk menawarkan paket bundel bila lebih hemat.",
  },
  {
    q: "Kenapa jumlah layanan di halaman ini bisa berubah?",
    a: "Katalog kami hidup: divisi dan layanan baru ditambahkan saat regulasi berubah atau kapasitas tim bertambah. Angka statistik di halaman ini dihitung langsung dari data, bukan ditulis manual — jadi selalu akurat.",
  },
];

export default function KatalogPage() {
  const primer = CATEGORIES.filter((c) => c.tier === "primer");
  const sekunder = CATEGORIES.filter((c) => c.tier === "sekunder");

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
      name: "Katalog Layanan PusatPerizinan.com",
      url: `${SITE_URL}/katalog`,
      numberOfItems: COUNT_SERVICES,
      itemListElement: CATEGORIES.map((c) => ({
        "@type": "OfferCatalog",
        name: `${c.name} (${c.code})`,
        url: `${SITE_URL}/katalog/${c.slug}`,
        numberOfItems: c.services.length,
        itemListElement: c.services.slice(0, 5).map((s) => ({
          "@type": "Offer",
          priceCurrency: "IDR",
          ...(s.priceFrom ? { price: s.priceFrom } : {}),
          itemOffered: { "@type": "Service", name: s.name },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="border-b border-stone-100 bg-stone-50/60">
        <div className="mx-auto max-w-6xl px-4 py-3 text-sm text-stone-500">
          <Link href="/" className="hover:text-emerald-700">Beranda</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-stone-700" aria-current="page">Katalog Layanan</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <p className="mb-3 inline-block rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-300">
            Katalog Terpadu · Diperbarui {new Date().getFullYear()}
          </p>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
            {COUNT_VARIANTS}+ Layanan Perizinan &amp; Sertifikasi dalam {CATEGORIES.length} Divisi
          </h1>
          <p className="mt-4 max-w-2xl text-emerald-100/90 md:text-lg">
            Dari pendirian badan usaha sampai izin penerbangan; dari PPIU/PIHK haji-umrah
            sampai CBAM Uni Eropa. Semua dalam satu platform, dengan tim yang sama.
          </p>
          <dl className="mt-8 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { k: "Jenis layanan", v: `${COUNT_SERVICES}` },
              { k: "Varian paket", v: `${COUNT_VARIANTS}+` },
              { k: "Divisi layanan", v: `${CATEGORIES.length}` },
              { k: "Rentang harga jasa", v: fmtRange(PRICE_FLOOR, PRICE_CEIL) },
            ].map((s) => (
              <div key={s.k} className="rounded-xl bg-white/10 p-4 backdrop-blur">
                <dd className="text-2xl font-bold md:text-3xl">{s.v}</dd>
                <dt className="mt-1 text-xs text-emerald-200/90">{s.k}</dt>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={waLink("Halo PusatPerizinan, saya melihat katalog layanan dan ingin konsultasi kebutuhan izin saya.")}
              className="rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-emerald-950 transition hover:bg-amber-300"
            >
              Konsultasi Gratis 15 Menit
            </a>
            <Link
              href="/paket"
              className="rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Lihat {BUNDLES.length} Paket Bundel Hemat →
            </Link>
          </div>
          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-emerald-200/70">
            * Angka harga adalah kisaran <strong>jasa konsultan</strong> dan dapat berubah sesuai
            kompleksitas kasus. Biaya resmi pemerintah (PNBP, notaris, uji lab, dsb.) dihitung
            terpisah sesuai regulasi.
          </p>
        </div>
      </section>

      {/* LAYANAN PRIMER */}
      <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="primer">
        <h2 id="primer" className="text-2xl font-bold text-stone-900 md:text-3xl">
          Layanan Primer — Inti Keahlian Kami
        </h2>
        <p className="mt-2 max-w-2xl text-stone-600">
          Tiga divisi dengan kedalaman expertise tertinggi, tim khusus, dan rekam jejak terbanyak.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {primer.map((c) => {
            const prices = c.services.flatMap((s) => [s.priceFrom, s.priceTo]).filter((v): v is number => typeof v === "number");
            return (
              <Link
                key={c.code}
                href={`/katalog/${c.slug}`}
                className="group relative rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg"
              >
                {c.flagship && (
                  <span className="absolute -top-3 left-5 rounded-full bg-amber-400 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-950">
                    ⭐ Flagship
                  </span>
                )}
                <div className="text-3xl" aria-hidden>{c.icon}</div>
                <h3 className="mt-3 font-bold text-stone-900 group-hover:text-emerald-800">
                  {c.code}. {c.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{c.tagline}</p>
                <p className="mt-4 text-xs font-semibold text-emerald-700">
                  {c.services.length} layanan{prices.length ? ` · ${fmtRange(Math.min(...prices), Math.max(...prices))}` : ""}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* PAKET BUNDEL TEASER */}
      <section className="bg-stone-50 py-14" aria-labelledby="bundel">
        <div className="mx-auto max-w-6xl px-4">
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
        </div>
      </section>

      {/* LAYANAN SEKUNDER */}
      <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="sekunder">
        <h2 id="sekunder" className="text-2xl font-bold text-stone-900 md:text-3xl">
          Semua Divisi Lainnya ({sekunder.length})
        </h2>
        <p className="mt-2 max-w-2xl text-stone-600">
          Meski disebut pendukung, standar kualitasnya sama: timeline jelas, dokumen rapi,
          dan pendampingan sampai izin terbit.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sekunder.map((c) => {
            const prices = c.services.flatMap((s) => [s.priceFrom, s.priceTo]).filter((v): v is number => typeof v === "number");
            return (
              <Link
                key={c.code}
                href={`/katalog/${c.slug}`}
                className="group rounded-2xl border border-stone-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="text-2xl" aria-hidden>{c.icon}</div>
                  <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[11px] font-bold text-stone-500">
                    Divisi {c.code}
                  </span>
                </div>
                <h3 className="mt-2.5 font-bold leading-snug text-stone-900 group-hover:text-emerald-800">
                  {c.name}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm text-stone-600">{c.tagline}</p>
                <p className="mt-3 text-xs font-semibold text-emerald-700">
                  {c.services.length} layanan{prices.length ? ` · ${fmtRange(Math.min(...prices), Math.max(...prices))}` : ""}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ROADMAP AI */}
      <section className="bg-emerald-950 py-14 text-white" aria-labelledby="ai">
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="ai" className="text-2xl font-bold md:text-3xl">
            AI-Powered Compliance — Sudah Aktif &amp; Dikembangkan
          </h2>
          <p className="mt-2 max-w-2xl text-emerald-100/80">
            Kami membangun platform, bukan sekadar situs brosur. Berikut yang sudah berjalan
            hari ini — dan yang sedang kami kembangkan. Kami hanya mengklaim yang sudah ada.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
              <h3 className="flex items-center gap-2 font-bold text-emerald-300">✅ Sudah Aktif Hari Ini</h3>
              <ul className="mt-4 space-y-4">
                {ROADMAP_ACTIVE.map((f) => (
                  <li key={f.name}>
                    <p className="font-semibold">{f.name}</p>
                    <p className="text-sm text-emerald-100/75">{f.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/15 p-6">
              <h3 className="flex items-center gap-2 font-bold text-amber-300">🚧 Sedang Dikembangkan</h3>
              <ul className="mt-4 space-y-4">
                {ROADMAP_NEXT.map((f) => (
                  <li key={f.name}>
                    <p className="font-semibold">{f.name}</p>
                    <p className="text-sm text-emerald-100/60">{f.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
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
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={waLink("Halo PusatPerizinan, saya ingin konsultasi dari halaman katalog layanan.")}
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
