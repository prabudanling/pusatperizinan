import type { Metadata } from "next";
import Link from "next/link";
import { BUNDLES, fmtRange, fmtIdr, waLink } from "@/lib/katalog-lengkap";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const PAGE_TITLE = `Paket Bundel Perizinan — GO UMRAH, GO HAJI PLUS & ${BUNDLES.length - 2} Paket Hemat Lainnya`;
const PAGE_DESC = `${BUNDLES.length} paket bundel layanan perizinan paling populer: kombinasi pendirian PT + izin + pendampingan dengan harga lebih hemat daripada beli satuan — mulai ${fmtRange(Math.min(...BUNDLES.map((b) => b.price)), null)}.`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: `${SITE_URL}/paket` },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: `${SITE_URL}/paket`,
    siteName: SITE_NAME,
    type: "website",
  },
};

const FAQ = [
  {
    q: "Kenapa paket bundel lebih murah dari beli satuan?",
    a: "Karena dokumen, notaris, dan koordinasi instansi dikerjakan satu kali secara paralel — tidak ada pekerjaan yang diulang. Efisiensi itu kami berikan ke Anda dalam bentuk harga bundel.",
  },
  {
    q: "Apakah bisa menyesuaikan isi paket?",
    a: "Bisa. Paket di halaman ini adalah komposisi paling sering dibeli; setelah konsultasi, kami susun komposisi sesuai kondisi Anda — misalnya PT sudah ada sehingga komponennya dilepas dan harga menyesuaikan.",
  },
  {
    q: "Berapa lama paket GO UMRAH sampai bisa beroperasi?",
    a: "Realistisnya sekitar 90–120 hari sejak dokumen lengkap, karena izin PPIU dari Kementerian Agama punya waktu proses tersendiri. Timeline tiap tahap kami serahkan tertulis di awal perjanjian.",
  },
  {
    q: "Apakah harga sudah termasuk biaya pemerintah dan notaris?",
    a: "Angka paket adalah jasa konsultan PusatPerizinan. Biaya resmi pemerintah (PNBP), notaris, dan pihak ketiga lain dihitung transparan sesuai tarif berlaku dan kami perinci sejak penawaran.",
  },
];

export default function PaketPage() {
  const totalHemat = BUNDLES.reduce((a, b) => a + b.save, 0);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: PAGE_TITLE,
      url: `${SITE_URL}/paket`,
      itemListElement: BUNDLES.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: `Paket "${b.name}"`,
          description: b.audience,
          provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          offers: {
            "@type": "Offer",
            price: b.price,
            priceCurrency: "IDR",
            availability: "https://schema.org/InStock",
          },
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Paket Bundel", item: `${SITE_URL}/paket` },
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

      <nav aria-label="Breadcrumb" className="border-b border-stone-100 bg-stone-50/60">
        <div className="mx-auto max-w-6xl px-4 py-3 text-sm text-stone-500">
          <Link href="/" className="hover:text-emerald-700">Beranda</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-stone-700" aria-current="page">Paket Bundel</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <p className="mb-3 inline-block rounded-full bg-amber-400/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
            Bundel Terlaris
          </p>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
            {BUNDLES.length} Paket Bundel — Semua Izin Sekali Jalan
          </h1>
          <p className="mt-4 max-w-2xl text-emerald-100/90 md:text-lg">
            Kombinasi layanan paling sering dipesan klien kami: pendirian badan usaha + izin
            inti + pendampingan, dengan harga lebih hemat daripada beli satuan.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={waLink("Halo PusatPerizinan, saya ingin konsultasi paket bundel yang cocok untuk usaha saya.")}
              className="rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-emerald-950 transition hover:bg-amber-300"
            >
              Pilih Paket Bersama Konsultan
            </a>
            <Link href="/katalog" className="rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold transition hover:bg-white/10">
              Atau lihat katalog per layanan →
            </Link>
          </div>
          <p className="mt-6 text-xs text-emerald-200/70">
            Total potensi hemat seluruh paket: {fmtRange(totalHemat, null)} · Harga adalah jasa
            konsultan; biaya resmi pemerintah dihitung terpisah.
          </p>
        </div>
      </section>

      {/* PAKET LIST */}
      <section className="mx-auto max-w-6xl px-4 py-14" aria-label="Daftar paket bundel">
        <div className="grid gap-6 lg:grid-cols-2">
          {BUNDLES.map((b) => (
            <article
              key={b.name}
              className={`flex flex-col rounded-2xl border bg-white p-7 shadow-sm transition hover:shadow-lg ${
                b.badge === "FLAGSHIP" ? "border-amber-300 ring-1 ring-amber-200" : "border-stone-200"
              }`}
            >
              <div className="flex flex-wrap items-center gap-2">
                {b.badge && (
                  <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${
                    b.badge === "FLAGSHIP" ? "bg-amber-400 text-emerald-950" : "bg-emerald-100 text-emerald-800"
                  }`}>
                    {b.badge}
                  </span>
                )}
              </div>
              <h2 className="mt-3 text-xl font-bold text-stone-900">
                Paket &ldquo;{b.name}&rdquo;
              </h2>
              <p className="mt-1 text-sm text-stone-600">{b.audience}</p>
              <div className="mt-4 flex flex-wrap items-baseline gap-3">
                <p className="text-3xl font-extrabold text-emerald-800">{fmtRange(b.price, null)}</p>
                <p className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
                  Hemat {fmtIdr(b.save)} dibanding satuan
                </p>
              </div>
              <div className="mt-5 flex-1 rounded-xl bg-stone-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-stone-500">Termasuk:</p>
                <ul className="mt-2 space-y-1.5">
                  {b.includes.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-stone-700">
                      <span className="mt-0.5 text-emerald-600" aria-hidden>✓</span>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={waLink(`Halo PusatPerizinan, saya tertarik dengan Paket "${b.name}". Mohon info lebih lanjut.`)}
                className="mt-5 rounded-xl bg-emerald-800 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-emerald-700"
              >
                Ambil Paket Ini via WhatsApp
              </a>
            </article>
          ))}
        </div>
        <p className="mt-8 text-xs leading-relaxed text-stone-500">
          * Setiap paket disertai perjanjian tertulis yang memuat lingkup pekerjaan, timeline
          per tahap, dan garansi layanan. Harga dapat menyesuaikan kondisi spesifik usaha Anda
          setelah konsultasi kelayakan.
        </p>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 pb-14" aria-labelledby="faq">
        <h2 id="faq" className="text-2xl font-bold text-stone-900 md:text-3xl">Pertanyaan Umum Paket</h2>
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
    </div>
  );
}
