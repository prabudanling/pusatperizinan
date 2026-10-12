import Link from "next/link";
import { BUNDLES, COUNT_VARIANTS, CATEGORIES, fmtRange, waLink } from "@/lib/katalog-lengkap";

/**
 * CatalogTeaser — jembatan homepage → katalog lengkap & paket bundel.
 * Server component (zero-JS), mengikuti design system landing (emerald/amber/stone).
 */
export function CatalogTeaser() {
  const featured = BUNDLES.slice(0, 3);

  return (
    <section id="katalog" className="bg-white py-16 md:py-20" aria-labelledby="katalog-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
            Katalog Terpadu
          </span>
          <h2 id="katalog-heading" className="mt-3 text-2xl font-bold text-stone-900 md:text-3xl">
            {COUNT_VARIANTS}+ Layanan Perizinan dalam {CATEGORIES.length} Divisi — Satu Tim
          </h2>
          <p className="mt-3 text-stone-600">
            Dari pendirian badan usaha sampai izin penerbangan; inti keahlian kami di
            perizinan travel haji-umrah (PPIU/PIHK). Jelajahi katalog lengkap dengan kisaran
            harga dan timeline tiap layanan.
          </p>
        </div>

        {/* Paket bundel unggulan */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {featured.map((b) => (
            <div
              key={b.name}
              className="rounded-2xl border border-stone-200 bg-gradient-to-b from-white to-stone-50 p-6 shadow-sm transition hover:shadow-md"
            >
              {b.badge && (
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-800">
                  {b.badge}
                </span>
              )}
              <h3 className="mt-3 font-bold text-stone-900">Paket &ldquo;{b.name}&rdquo;</h3>
              <p className="mt-1 text-sm text-stone-600">{b.audience}</p>
              <div className="mt-4 flex items-baseline gap-2">
                <p className="text-2xl font-extrabold text-emerald-800">{fmtRange(b.price, null)}</p>
                <p className="text-xs font-bold text-amber-600">hemat {fmtRange(b.save, null)}</p>
              </div>
              <a
                href={waLink(`Halo PusatPerizinan, saya tertarik dengan Paket "${b.name}".`)}
                className="mt-4 inline-block w-full rounded-xl bg-emerald-800 px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-emerald-700"
              >
                Konsultasi Paket Ini
              </a>
            </div>
          ))}
        </div>

        {/* CTA katalog */}
        <div className="mt-8 flex flex-col items-start gap-4 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-stone-700">
            <strong className="text-stone-900">Butuh izin di luar paket?</strong> Lihat seluruh
            katalog — 31 divisi, mulai Rp 450 ribu.
          </p>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href="/katalog"
              className="rounded-xl bg-emerald-800 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
            >
              Jelajahi Katalog →
            </Link>
            <Link
              href="/paket"
              className="rounded-xl border border-emerald-300 px-5 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100"
            >
              Semua Paket Bundel
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
