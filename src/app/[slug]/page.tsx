import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  LAYANAN_500,
  ALL_LAYANAN_SLUGS,
  getLayananBySlug,
  slugOf,
  relatedOf,
  faqOf,
  cakupanOf,
  syaratOf,
  timelineOf,
  fmtIdr,
  diskonLabel,
  nilaiBadge,
  waTextOf,
  LAYANAN_KATEGORI,
  LAYANAN_STATS,
} from "@/lib/layanan-500";
import { SITE_URL, SITE_NAME, CONTACT } from "@/lib/site";

// ============================================================
// PUSATPERIZINAN.COM — HALAMAN DETAIL 500 LAYANAN (root level)
// ============================================================
// URL persis mengikuti dataset resmi, mis. /jasa-pendirian-pt-lokal.
// Programmatic SEO: tiap halaman unik (judul, harga, kode item,
// cakupan, syarat, timeline, FAQ, JSON-LD Service+Offer+FAQ+Breadcrumb).
// dynamicParams=false → slug di luar dataset → 404 (tidak duplikat).
// ============================================================

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return ALL_LAYANAN_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getLayananBySlug(slug);
  if (!s) return {};
  const title = `${s.nama} — Harga Kupon ${fmtIdr(s.harga_diskon)} (Hemat ${Math.round(s.diskon * 100)}%)`;
  const description = `${s.nama} (${s.kode}) — ${s.deskripsi.slice(0, 130)}... Harga normal ${fmtIdr(s.harga)}, kupon ${fmtIdr(s.harga_diskon)}. Estimasi ${timelineOf(s).split("(")[0].trim()}. Garansi proses, melayani 38 provinsi.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/${slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${slug}`,
      siteName: SITE_NAME,
      type: "website",
      locale: "id_ID",
    },
    robots: { index: true, follow: true },
  };
}

const ALUR = [
  {
    step: "1",
    title: "Konsultasi & Kode Item",
    desc: "Sebutkan kode item layanan via WhatsApp — konfirmasi kebutuhan, wilayah izin, dan estimasi waktu (gratis 15 menit).",
  },
  {
    step: "2",
    title: "Penawaran Resmi + Kupon",
    desc: "Kami terbitkan penawaran bernomor: lingkup kerja, jadwal, dan harga kupon yang sudah dipotong dari harga normal.",
  },
  {
    step: "3",
    title: "Dokumen & Pengurusan",
    desc: "Anda kirim dokumen sesuai check-list; tim kami menyusun berkas dan mengurus ke instansi sampai tuntas.",
  },
  {
    step: "4",
    title: "Izin Terbit & Arsip Digital",
    desc: "Dokumen asli dikembalikan lengkap, arsip digital diserahkan rapi — perpanjangan berikutnya jadi jauh lebih cepat.",
  },
];

export default async function LayananDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getLayananBySlug(slug);
  if (!s) notFound();

  const kategori = LAYANAN_KATEGORI.find((k) => k.kode === s.kategori_kode);
  const faq = faqOf(s);
  const related = relatedOf(s, 6);
  const badge = nilaiBadge(s);
  const waHref = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(waTextOf(s))}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: s.nama,
      serviceType: s.sub,
      category: s.kategori,
      description: s.deskripsi,
      url: `${SITE_URL}/${slug}`,
      provider: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        telephone: CONTACT.phoneDisplay,
      },
      areaServed: { "@type": "Country", name: "Indonesia" },
      offers: {
        "@type": "Offer",
        priceCurrency: "IDR",
        price: s.harga_diskon,
        url: `${SITE_URL}/${slug}`,
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Katalog 500 Layanan", item: `${SITE_URL}/katalog` },
        { "@type": "ListItem", position: 3, name: s.kategori, item: `${SITE_URL}/katalog#kat-${s.kategori_kode}` },
        { "@type": "ListItem", position: 4, name: s.nama, item: `${SITE_URL}/${slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
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
          <Link href="/katalog" className="hover:text-emerald-700">Katalog 500 Layanan</Link>
          <span className="mx-2">/</span>
          <span className="hidden sm:inline">{s.kategori}</span>
          <span className="mx-2 hidden sm:inline">/</span>
          <span className="font-medium text-stone-700" aria-current="page">{s.nama}</span>
        </div>
      </nav>

      {/* HERO + HARGA */}
      <section className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-800 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[1.5fr_1fr] md:py-16">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-emerald-400/15 px-3 py-1 font-mono text-xs font-bold tracking-wider text-emerald-300">
                {s.kode}
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                {s.kategori}
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                {s.sub}
              </span>
              {badge && (
                <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-emerald-950">
                  {badge}
                </span>
              )}
            </div>
            <h1 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">{s.nama}</h1>
            <p className="mt-4 max-w-2xl text-emerald-100/90 leading-relaxed md:text-lg">{s.deskripsi}</p>
            <ul className="mt-6 grid gap-2 text-sm text-emerald-100/85 sm:grid-cols-2">
              {cakupanOf(s).map((c) => (
                <li key={c} className="flex items-start gap-2">
                  <span className="mt-0.5 text-emerald-400" aria-hidden>✓</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* KARTU HARGA */}
          <aside className="h-fit rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur md:sticky md:top-24">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">Harga jasa konsultan</p>
            <p className="mt-2 text-lg text-stone-300 line-through">{fmtIdr(s.harga)}</p>
            <p className="text-3xl font-extrabold text-amber-400 md:text-4xl">{fmtIdr(s.harga_diskon)}</p>
            <p className="mt-1 text-sm font-semibold text-emerald-300">
              {diskonLabel(s)} · kode item <span className="font-mono">{s.kode}</span>
            </p>
            <p className="mt-3 rounded-xl bg-emerald-400/10 px-3 py-2 text-xs leading-relaxed text-emerald-100/90">
              Estimasi proses: {timelineOf(s)}
            </p>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block rounded-xl bg-amber-400 px-5 py-3 text-center text-sm font-bold text-emerald-950 transition hover:bg-amber-300"
            >
              Pesan via WhatsApp — Kupon {Math.round(s.diskon * 100)}%
            </a>
            <Link
              href="/roadmap"
              className="mt-2 block rounded-xl border border-white/25 px-5 py-3 text-center text-sm font-semibold transition hover:bg-white/10"
            >
              Cek Roadmap Izin Usaha →
            </Link>
            <p className="mt-3 text-[11px] leading-relaxed text-emerald-200/70">
              * Harga jasa pengurusan; belum termasuk PNBP, notaris, dan uji lab. Dikunci transparan di penawaran resmi.
            </p>
          </aside>
        </div>
      </section>

      {/* ALUR 4 LANGKAH */}
      <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="alur">
        <h2 id="alur" className="text-2xl font-bold text-stone-900 md:text-3xl">
          Alur Pengurusan {s.nama}
        </h2>
        <p className="mt-2 max-w-2xl text-stone-600">
          Empat langkah transparan — Anda selalu tahu posisi dokumen, tanpa biaya tersembunyi.
        </p>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ALUR.map((a) => (
            <li key={a.step} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-800 font-bold text-white" aria-hidden>
                {a.step}
              </span>
              <h3 className="mt-3 font-bold text-stone-900">{a.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{a.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* SYARAT + GARANSI */}
      <section className="bg-stone-50 py-14" aria-labelledby="syarat">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-2">
          <div>
            <h2 id="syarat" className="text-2xl font-bold text-stone-900 md:text-3xl">Syarat Dokumen</h2>
            <ul className="mt-6 space-y-3">
              {syaratOf(s).map((t) => (
                <li key={t} className="flex items-start gap-3 rounded-xl border border-stone-200 bg-white p-4">
                  <span className="mt-0.5 text-emerald-700" aria-hidden>📋</span>
                  <span className="text-sm leading-relaxed text-stone-700">{t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-stone-500">
              Belum punya dokumen tertentu? Tim kami bantu mengurusnya lebih dulu —
              lihat <Link href="/katalog" className="font-semibold text-emerald-700 hover:underline">Katalog 500 Layanan</Link>.
            </p>
          </div>
          <div className="rounded-2xl bg-emerald-950 p-6 text-white md:p-8">
            <h3 className="text-xl font-bold md:text-2xl">Garansi Proses {SITE_NAME}</h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-emerald-100/90">
              <li>✅ Check-list dokumen disepakati di awal — tidak ada biaya kejutan</li>
              <li>✅ Progress dilaporkan berkala sampai izin terbit</li>
              <li>✅ Tersendat karena faktor internal tim? Lanjut tanpa biaya tambahan</li>
              <li>✅ Data klien dilindungi perjanjian kerahasiaan</li>
              <li>✅ Arsip digital final — perpanjangan berikutnya jauh lebih cepat</li>
            </ul>
            <p className="mt-5 text-xs text-emerald-200/70">
              Sejak 2009 · PT Top Konsultan Internasional · Dipercaya 1.247+ bisnis di 38 provinsi
            </p>
          </div>
        </div>
      </section>

      {/* LAYANAN TERKAIT */}
      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="terkait">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="terkait" className="text-2xl font-bold text-stone-900 md:text-3xl">
                Layanan Terkait di {s.sub}
              </h2>
              <p className="mt-2 text-stone-600">
                Sering diambil bersamaan — bundel bisa lebih hemat, konsultasikan ke tim kami.
              </p>
            </div>
            <Link
              href="/katalog"
              className="rounded-xl bg-emerald-800 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700"
            >
              Lihat Semua {LAYANAN_STATS.total} Layanan →
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.kode}
                href={`/${slugOf(r)}`}
                className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
              >
                <span className="font-mono text-[11px] font-bold text-emerald-700">{r.kode}</span>
                <h3 className="mt-1.5 font-bold leading-snug text-stone-900 group-hover:text-emerald-800">{r.nama}</h3>
                <p className="mt-2 text-sm">
                  <span className="text-stone-400 line-through">{fmtIdr(r.harga)}</span>{" "}
                  <span className="font-extrabold text-emerald-800">{fmtIdr(r.harga_diskon)}</span>
                </p>
                <p className="mt-1 text-xs font-semibold text-amber-600">{diskonLabel(r)}</p>
              </Link>
            ))}
          </div>
          {kategori && (
            <p className="mt-6 text-sm text-stone-500">
              Jelajahi sub-kategori lain di {kategori.nama}:{" "}
              {kategori.sub
                .filter((x) => x.kode !== s.sub_kode)
                .slice(0, 5)
                .map((x) => (
                  <span key={x.kode}>
                    <Link href={`/katalog#${x.kode}`} className="font-semibold text-emerald-700 hover:underline">
                      {x.nama}
                    </Link>
                    {" · "}
                  </span>
                ))}
              <Link href="/katalog" className="font-semibold text-emerald-700 hover:underline">semua →</Link>
            </p>
          )}
        </section>
      )}

      {/* FAQ */}
      <section className="bg-stone-50 py-14" aria-labelledby="faq">
        <div className="mx-auto max-w-4xl px-4">
          <h2 id="faq" className="text-2xl font-bold text-stone-900 md:text-3xl">
            Pertanyaan Umum {s.nama}
          </h2>
          <div className="mt-6 space-y-3">
            {faq.map((f) => (
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
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-900 to-emerald-700 p-8 text-white md:p-12">
          <h2 className="text-2xl font-bold md:text-3xl">Siap urus {s.nama} hari ini?</h2>
          <p className="mt-2 max-w-2xl text-emerald-100/90">
            Kupon {Math.round(s.diskon * 100)}% berlaku periode ini — sebut kode{" "}
            <span className="font-mono font-bold text-amber-300">{s.kode}</span> saat chat.
            Konsultasi awal gratis, tanpa komitmen.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-emerald-950 transition hover:bg-amber-300"
            >
              WhatsApp — Kupon {fmtIdr(s.harga_diskon)}
            </a>
            <Link
              href="/kontak"
              className="rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
            >
              Kontak & Kantor Kami
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
