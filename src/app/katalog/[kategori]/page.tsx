import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CATEGORIES,
  getCategory,
  fmtRange,
  fmtIdr,
  waLink,
} from "@/lib/katalog-lengkap";
import { getCatalogServiceLink } from "@/lib/catalog/mapping";
import { SITE_URL, SITE_NAME } from "@/lib/site";

interface PageProps {
  params: Promise<{ kategori: string }>;
}

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ kategori: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { kategori } = await params;
  const cat = getCategory(kategori);
  if (!cat) return {};
  const title = `${cat.name} — ${cat.services.length} Layanan, Kisaran Harga & Timeline`;
  const description = `${cat.tagline}. ${cat.desc.slice(0, 140)}… Kisaran harga mulai ${fmtRange(
    Math.min(...cat.services.flatMap((s) => [s.priceFrom, s.priceTo]).filter((v): v is number => typeof v === "number")),
    null
  )}.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/katalog/${cat.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/katalog/${cat.slug}`,
      siteName: SITE_NAME,
      type: "website",
    },
  };
}

export default async function KategoriPage({ params }: PageProps) {
  const { kategori } = await params;
  const cat = getCategory(kategori);
  if (!cat) notFound();

  const prices = cat.services.flatMap((s) => [s.priceFrom, s.priceTo]).filter((v): v is number => typeof v === "number");
  const priceMin = prices.length ? Math.min(...prices) : null;
  const priceMax = prices.length ? Math.max(...prices) : null;
  const lainnya = CATEGORIES.filter((c) => c.slug !== cat.slug && (c.flagship || c.tier === "primer"));
  const siblingSample = CATEGORIES.filter((c) => c.slug !== cat.slug).slice(0, 6);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "OfferCatalog",
      name: `${cat.name} — PusatPerizinan.com`,
      url: `${SITE_URL}/katalog/${cat.slug}`,
      description: cat.desc,
      numberOfItems: cat.services.length,
      itemListElement: cat.services.map((s) => ({
        "@type": "Offer",
        priceCurrency: "IDR",
        ...(s.priceFrom ? { price: s.priceFrom } : {}),
        itemOffered: {
          "@type": "Service",
          name: `${s.code} — ${s.name}`,
          description: s.desc,
          ...(s.timeline ? { serviceType: s.name } : {}),
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Katalog Layanan", item: `${SITE_URL}/katalog` },
        { "@type": "ListItem", position: 3, name: cat.name, item: `${SITE_URL}/katalog/${cat.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: cat.faq.map((f) => ({
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
          <Link href="/katalog" className="hover:text-emerald-700">Katalog Layanan</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-stone-700" aria-current="page">{cat.name}</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-4xl" aria-hidden>{cat.icon}</span>
            <span className="rounded-md bg-white/15 px-2.5 py-1 text-xs font-bold tracking-wide">Divisi {cat.code}</span>
            {cat.flagship && (
              <span className="rounded-full bg-amber-400 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-950">
                ⭐ Flagship Expertise
              </span>
            )}
          </div>
          <h1 className="mt-4 max-w-3xl text-2xl font-bold leading-tight md:text-4xl">{cat.name}</h1>
          <p className="mt-3 max-w-2xl text-emerald-100/90 md:text-lg">{cat.tagline}</p>
          <dl className="mt-7 flex flex-wrap gap-3 text-sm">
            <div className="rounded-lg bg-white/10 px-4 py-2.5">
              <dt className="text-xs text-emerald-200/80">Layanan</dt>
              <dd className="font-bold">{cat.services.length}</dd>
            </div>
            {priceMin !== null && (
              <div className="rounded-lg bg-white/10 px-4 py-2.5">
                <dt className="text-xs text-emerald-200/80">Kisaran harga jasa</dt>
                <dd className="font-bold">{fmtRange(priceMin, priceMax)}</dd>
              </div>
            )}
            <div className="rounded-lg bg-white/10 px-4 py-2.5">
              <dt className="text-xs text-emerald-200/80">Kategori</dt>
              <dd className="font-bold">{cat.tier === "primer" ? "Layanan Primer" : "Layanan Pendukung"}</dd>
            </div>
          </dl>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={waLink(`Halo PusatPerizinan, saya tertarik dengan layanan divisi ${cat.code} (${cat.name}). Bisa dijelaskan prosesnya?`)}
              className="rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-emerald-950 transition hover:bg-amber-300"
            >
              Konsultasi Divisi Ini
            </a>
            <Link href="/katalog" className="rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold transition hover:bg-white/10">
              ← Semua Divisi
            </Link>
          </div>
        </div>
      </section>

      {/* DESKRIPSI */}
      <section className="mx-auto max-w-4xl px-4 py-10">
        <h2 className="sr-only">Tentang divisi {cat.name}</h2>
        <p className="text-base leading-relaxed text-stone-700 md:text-lg">{cat.desc}</p>
      </section>

      {/* DAFTAR LAYANAN */}
      <section className="mx-auto max-w-6xl px-4 pb-12" aria-labelledby="layanan">
        <h2 id="layanan" className="text-2xl font-bold text-stone-900 md:text-3xl">
          Daftar Layanan ({cat.services.length})
        </h2>
        <div className="mt-6 space-y-5">
          {cat.services.map((s) => {
            const svcLink = getCatalogServiceLink(s.name, cat.related[0]?.href ?? "/layanan");
            return (
            <article key={s.code} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-800">{s.code}</span>
                    {s.badge && (
                      <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-amber-800">
                        {s.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-stone-900">{s.name}</h3>
                </div>
                <div className="text-right">
                  <p className="text-lg font-extrabold text-emerald-800">{fmtRange(s.priceFrom, s.priceTo)}</p>
                  {s.timeline && <p className="text-xs text-stone-500">⏱ {s.timeline}</p>}
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">{s.desc}</p>

              {s.includes && (
                <div className="mt-4 rounded-xl bg-stone-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-stone-500">Paket mencakup:</p>
                  <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                    {s.includes.map((i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-stone-700">
                        <span className="mt-0.5 text-emerald-600" aria-hidden>✓</span>
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {s.variants && (
                <div className="mt-4 overflow-hidden rounded-xl border border-stone-200">
                  <table className="w-full text-sm">
                    <thead className="bg-stone-50 text-left text-xs uppercase tracking-wide text-stone-500">
                      <tr>
                        <th className="px-4 py-2.5">Paket</th>
                        <th className="px-4 py-2.5">Harga</th>
                        <th className="px-4 py-2.5">Cakupan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {s.variants.map((v) => (
                        <tr key={v.name}>
                          <td className="px-4 py-2.5 font-semibold text-stone-800">{v.name}</td>
                          <td className="whitespace-nowrap px-4 py-2.5 font-bold text-emerald-800">{fmtIdr(v.priceFrom)}</td>
                          <td className="px-4 py-2.5 text-stone-600">{v.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tautan ke halaman dedikasi layanan (pemetaan otomatis, 137/137) */}
              <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-stone-100 pt-4">
                <Link
                  href={svcLink.href}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3.5 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100"
                  aria-label={`Buka halaman lengkap ${s.name}: syarat, proses & biaya`}
                >
                  Halaman lengkap: syarat, proses &amp; biaya
                  <span aria-hidden>→</span>
                </Link>
                <a
                  href={waLink(`Halo PusatPerizinan, saya tertarik dengan layanan ${s.name} (${s.code}). Bisa dijelaskan prosesnya?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-stone-500 transition hover:text-emerald-700"
                >
                  Tanya via WhatsApp
                </a>
              </div>
            </article>
            );
          })}
        </div>
        <p className="mt-5 text-xs leading-relaxed text-stone-500">
          * Kisaran harga adalah jasa konsultan PusatPerizinan dan dapat menyesuaikan kompleksitas
          kasus; biaya resmi pemerintah (PNBP, notaris, uji lab, dsb.) dihitung terpisah sesuai regulasi.
        </p>
      </section>

      {/* TAUTAN TERKAIT */}
      {cat.related.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-12" aria-labelledby="terkait">
          <h2 id="terkait" className="text-xl font-bold text-stone-900">
            Bacaan Terkait di Situs Ini
          </h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {cat.related.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-emerald-300 hover:text-emerald-800"
              >
                {r.label} →
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 pb-12" aria-labelledby="faq">
        <h2 id="faq" className="text-2xl font-bold text-stone-900">Pertanyaan Umum</h2>
        <div className="mt-6 space-y-3">
          {cat.faq.map((f) => (
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

      {/* EKSPLORASI DIVISI LAIN */}
      <section className="bg-stone-50 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-xl font-bold text-stone-900">Divisi Unggulan Lainnya</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {lainnya.map((c) => (
              <Link
                key={c.code}
                href={`/katalog/${c.slug}`}
                className="group rounded-2xl border border-stone-200 bg-white p-5 transition hover:border-emerald-300 hover:shadow-md"
              >
                <div className="text-2xl" aria-hidden>{c.icon}</div>
                <h3 className="mt-2 font-bold text-stone-900 group-hover:text-emerald-800">{c.name}</h3>
                <p className="mt-1 text-xs text-emerald-700">{c.services.length} layanan</p>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-stone-600">
            Lihat semua:{" "}
            {siblingSample.map((c, i) => (
              <span key={c.code}>
                <Link href={`/katalog/${c.slug}`} className="font-medium text-emerald-700 hover:underline">
                  {c.name}
                </Link>
                {i < siblingSample.length - 1 ? " · " : " · "}
              </span>
            ))}
            <Link href="/katalog" className="font-bold text-emerald-800 hover:underline">…dan {CATEGORIES.length - 1 - siblingSample.length} divisi lain</Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-900 to-emerald-700 p-8 text-white md:p-12">
          <h2 className="text-2xl font-bold md:text-3xl">Siap urus {cat.name.toLowerCase()}?</h2>
          <p className="mt-2 max-w-2xl text-emerald-100/90">
            Konsultasi 15 menit pertama gratis — kami petakan izin yang wajib, urutannya,
            dan estimasi biaya untuk kasus spesifik Anda.
          </p>
          <a
            href={waLink(`Halo PusatPerizinan, saya ingin mulai pengurusan di divisi ${cat.code} (${cat.name}).`)}
            className="mt-6 inline-block rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-emerald-950 transition hover:bg-amber-300"
          >
            WhatsApp Kami Sekarang
          </a>
        </div>
      </section>
    </div>
  );
}
