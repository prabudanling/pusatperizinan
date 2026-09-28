import Link from "next/link";
import { PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getAnyPage, ALL_SERVICE_PAGES, CATEGORY_META } from "@/lib/catalog";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";

/**
 * Halaman Hub (kategori / wilayah) — dirender dari route catch-all [...slug]
 * Server component (SEO aman, tanpa client JS).
 */
export function HubPage({ page }: { page: NonNullable<ReturnType<typeof getAnyPage>> }) {
  const members = ALL_SERVICE_PAGES.filter(
    (p) =>
      (page.slug.startsWith("kategori/") && p.category === page.category && p.kind === "base") ||
      (page.slug.startsWith("wilayah/") && p.region === page.region && p.kind === "region")
  );

  return (
    <main className="min-h-screen bg-background">
      <div className="border-b bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Kembali ke beranda">
            <img src="/logo-icon.png" alt="Logo PusatPerizinan.com" className="h-8 w-8" />
            <span className="font-bold text-[15px] tracking-tight">
              Pusat<span className="text-primary">Perizinan</span>
              <span className="text-gold">.com</span>
            </span>
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Halo, saya ingin konsultasi tentang layanan di ${page.h1}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md min-h-[44px]"
          >
            <PhoneCall className="h-4 w-4" aria-hidden />
            Konsultasi Gratis
          </a>
        </div>
      </div>

      <article className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Beranda</Link>
          <span className="mx-1.5">/</span>
          <Link href="/layanan" className="hover:text-primary">Layanan</Link>
          <span className="mx-1.5">/</span>
          <span className="font-medium text-foreground">{page.h1}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-balance">
          {page.h1}
        </h1>
        <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed">
          {page.intro}
        </p>

        {page.longDesc.length > 0 && (
          <div className="mt-6 space-y-3.5 max-w-3xl text-[15px] leading-relaxed text-foreground/90">
            {page.longDesc.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}

        <h2 className="mt-10 text-xl font-bold mb-5">
          {page.slug.startsWith("wilayah/") ? "Layanan Tersedia di Wilayah Ini" : "Semua Layanan"}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((r) => (
            <Link
              key={r.slug}
              href={`/layanan/${r.slug}`}
              className="group rounded-xl border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-md"
            >
              <Badge variant="secondary" className="mb-2 text-[10px] uppercase tracking-wide">
                {CATEGORY_META[r.category].label.split(" & ")[0]}
              </Badge>
              <h3 className="font-semibold leading-snug group-hover:text-primary transition-colors">
                {r.h1}
              </h3>
              <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{r.metaDesc}</p>
              <p className="mt-2 text-xs font-semibold text-primary">
                Mulai {r.price} · {r.duration}
              </p>
            </Link>
          ))}
        </div>

        {page.faq.length > 0 && (
          <div className="mt-10 max-w-3xl">
            <h2 className="text-xl font-bold mb-4">Pertanyaan Umum</h2>
            <div className="space-y-3">
              {page.faq.map((f, i) => (
                <div key={i} className="rounded-xl border bg-card p-4">
                  <h3 className="font-semibold text-sm">{f.q}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </main>
  );
}
