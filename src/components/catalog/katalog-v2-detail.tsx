import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Building2,
  CalendarClock,
  CheckCircle2,
  Clock,
  Info,
  ListChecks,
  MessageCircle,
  Percent,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import type { KatalogV2Service } from "@/lib/katalog-v2";
import { katalogV2ByCategory } from "@/lib/katalog-v2";
import { SITE_NAME, SITE_URL, absUrl, TRUST_METRICS } from "@/lib/site";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";

// ============================================================
// PUSATPERIZINAN.COM — Halaman Detail Katalog Premium v2 (PP-XXX)
// Server component. URL: /layanan/{slug}-pp-{cat}-{nnn}
// SEO: JSON-LD BreadcrumbList + Product(+Offer harga diskon) —
// memungkinkan rich result harga di Google.
// ============================================================

const fmtIdr = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

export function katalogV2JsonLd(s: KatalogV2Service) {
  const url = `${absUrl("/layanan")}/${s.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL + "/" },
          { "@type": "ListItem", position: 2, name: "Katalog Layanan", item: absUrl("/katalog") },
          { "@type": "ListItem", position: 3, name: s.category, item: absUrl("/katalog#premium") },
          { "@type": "ListItem", position: 4, name: s.name, item: url },
        ],
      },
      {
        "@type": "Product",
        "@id": url + "#product",
        name: `${s.name} — ${s.code}`,
        sku: s.code,
        description:
          s.description ||
          `Jasa pengurusan ${s.name} oleh ${SITE_NAME}. Estimasi ${s.estimate}, diterbitkan ${s.authority}.`,
        brand: { "@type": "Brand", name: SITE_NAME },
        category: s.category,
        offers: {
          "@type": "Offer",
          url,
          priceCurrency: "IDR",
          price: s.discountPrice,
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: TRUST_METRICS.rating,
          reviewCount: TRUST_METRICS.reviewCount,
        },
      },
    ],
  };
}

export function KatalogV2Detail({ service: s }: { service: KatalogV2Service }) {
  const waText = encodeURIComponent(
    `Halo ${SITE_NAME}, saya tertarik layanan ${s.name} (${s.code}) — harga katalog ${fmtIdr(s.discountPrice)}. Mohon info proses & dokumen yang perlu disiapkan.`
  );
  const related = katalogV2ByCategory(s.categoryCode)
    .filter((x) => x.code !== s.code)
    .slice(0, 6);
  const requirements = s.requirements ? s.requirements.split(/,\s*/).filter(Boolean) : [];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(katalogV2JsonLd(s)) }}
      />
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-primary">Beranda</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/katalog" className="hover:text-primary">Katalog Layanan</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/katalog#premium" className="hover:text-primary">{s.category}</Link></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="font-semibold text-foreground">{s.name}</li>
            </ol>
          </nav>

          {/* HERO */}
          <header>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
                {s.code}
              </span>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                Katalog Premium · {s.category}
              </span>
              {s.savings > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                  <Percent className="h-3.5 w-3.5" aria-hidden />
                  Diskon {s.discountPct}%
                </span>
              )}
            </div>
            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl">
              {s.name}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              {s.description || `Jasa pengurusan ${s.name} lengkap oleh tim ${SITE_NAME} — pendampingan hingga terbit.`}
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-emerald-600" aria-hidden /> Estimasi: <strong className="text-foreground">{s.estimate}</strong>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarClock className="h-4 w-4 text-emerald-600" aria-hidden /> Masa berlaku: <strong className="text-foreground">{s.validity}</strong>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-emerald-600" aria-hidden /> Diterbitkan: <strong className="text-foreground">{s.authority}</strong>
              </span>
            </div>
          </header>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* KOLOM UTAMA */}
            <div className="space-y-6 lg:col-span-2">
              {/* Harga */}
              <section aria-labelledby="harga" className="rounded-2xl border bg-card p-6">
                <h2 id="harga" className="flex items-center gap-2 text-lg font-bold">
                  <Banknote className="h-5 w-5 text-emerald-600" aria-hidden />
                  Harga Jasa Pengurusan
                </h2>
                <div className="mt-4 flex flex-wrap items-end gap-x-6 gap-y-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Harga diskon</p>
                    <p className="text-3xl font-extrabold text-emerald-700 sm:text-4xl">{fmtIdr(s.discountPrice)}</p>
                  </div>
                  {s.normalPrice > s.discountPrice && (
                    <>
                      <div>
                        <p className="text-xs text-muted-foreground">Harga normal</p>
                        <p className="text-lg font-semibold text-muted-foreground line-through">{fmtIdr(s.normalPrice)}</p>
                      </div>
                      <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-sm font-bold text-emerald-700">
                        Hemat {fmtIdr(s.savings)}
                      </span>
                    </>
                  )}
                </div>
                <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                  Harga jasa konsultan — biaya resmi pemerintah (PNBP) dibayar terpisah sesuai tarif instansi.
                  Final setelah review kasus: lokasi, kelengkapan dokumen & kompleksitas.
                </p>
              </section>

              {/* Syarat */}
              {requirements.length > 0 && (
                <section aria-labelledby="syarat" className="rounded-2xl border bg-card p-6">
                  <h2 id="syarat" className="flex items-center gap-2 text-lg font-bold">
                    <ListChecks className="h-5 w-5 text-emerald-600" aria-hidden />
                    Syarat Utama
                  </h2>
                  <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {requirements.map((r) => (
                      <li key={r} className="flex items-start gap-2.5 text-sm leading-relaxed">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Belum punya salah satu dokumen? Tim kami membantu pengadaannya — sampaikan saat konsultasi.
                  </p>
                </section>
              )}

              {/* Catatan */}
              {s.notes && (
                <section className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
                  <h2 className="flex items-center gap-2 text-sm font-bold text-emerald-800">
                    <Sparkles className="h-4 w-4" aria-hidden />
                    Catatan Penting
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-emerald-900/90">{s.notes}</p>
                </section>
              )}

              {/* Layanan sejenis */}
              {related.length > 0 && (
                <section aria-labelledby="terkait" className="rounded-2xl border bg-card p-6">
                  <h2 id="terkait" className="text-lg font-bold">
                    Layanan {s.category} Lainnya
                  </h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {related.map((r) => (
                      <Link
                        key={r.code}
                        href={`/layanan/${r.slug}`}
                        className="group rounded-xl border p-4 transition hover:border-emerald-300 hover:bg-accent"
                      >
                        <p className="text-xs font-bold text-emerald-700">{r.code}</p>
                        <p className="mt-1 text-sm font-semibold leading-snug group-hover:text-primary">{r.name}</p>
                        <p className="mt-1.5 text-sm font-bold text-emerald-700">{fmtIdr(r.discountPrice)}</p>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/katalog#premium"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
                  >
                    Lihat seluruh 500 layanan Katalog Premium
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </section>
              )}
            </div>

            {/* SIDEBAR */}
            <aside className="space-y-5">
              <div className="rounded-2xl border bg-card p-6 lg:sticky lg:top-24">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Siap diurus?</p>
                <p className="mt-1 text-2xl font-extrabold text-emerald-700">{fmtIdr(s.discountPrice)}</p>
                <div className="mt-4 space-y-2.5">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    Tanya Layanan Ini
                  </a>
                  <Link
                    href="/konsultasi"
                    className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition hover:opacity-90"
                  >
                    <ShieldCheck className="h-4 w-4" aria-hidden />
                    Konsultasi Gratis 30 Menit
                  </Link>
                  <Link
                    href="/kalkulator"
                    className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-bold transition hover:bg-accent"
                  >
                    Hitung Estimasi Total Biaya
                  </Link>
                </div>
                <dl className="mt-5 space-y-2.5 border-t pt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 shrink-0 fill-amber-400 text-amber-400" aria-hidden />
                    <dd className="font-semibold">{TRUST_METRICS.rating}/5 · {TRUST_METRICS.reviewCount} ulasan</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                    <dd className="text-muted-foreground">{TRUST_METRICS.permitsIssued}+ izin terbit</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                    <dd className="text-muted-foreground">Garansi 100% uang kembali bila gagal karena proses kami</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
