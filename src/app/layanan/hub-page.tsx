import Link from "next/link";
import { ChevronRight, MapPin, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ServicePage } from "@/lib/catalog";
import {
  getAnyPage,
  ALL_SERVICE_PAGES,
  CATEGORY_META,
  slugify,
} from "@/lib/catalog";
import { PROVINCES } from "@/lib/coverage-data";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";
import { SITE_URL } from "@/lib/site";



/**
 * JSON-LD untuk halaman hub: BreadcrumbList + FAQPage + ItemList anggota.
 * Berlaku untuk semua hub (kategori, wilayah, kota, sertifikasi per provinsi).
 */
function HubJsonLd({
  page,
  members,
}: {
  page: NonNullable<ReturnType<typeof getAnyPage>>;
  members: ServicePage[];
}) {
  const jsonLd: Record<string, unknown>[] = [];

  jsonLd.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: page.breadcrumbs.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      item: `${SITE_URL}${b.href}`,
    })),
  });

  if (page.faq.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  if (members.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: page.h1,
      numberOfItems: members.length,
      itemListElement: members.slice(0, 40).map((m, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: m.h1,
        url: `${SITE_URL}/layanan/${m.slug}`,
      })),
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/**
 * Halaman Hub (kategori / wilayah) — dirender dari route catch-all [...slug]
 * Server component (SEO aman, tanpa client JS).
 */
export function HubPage({ page }: { page: NonNullable<ReturnType<typeof getAnyPage>> }) {
  const isCityHub = Boolean(page.province);
  const isCertHub = page.slug.startsWith("sertifikasi/");

  const members = ALL_SERVICE_PAGES.filter((p) => {
    if (page.slug.startsWith("kategori/") && p.category === page.category && p.kind === "base") {
      return true;
    }
    if (page.slug.startsWith("wilayah/")) {
      if (isCityHub) {
        // Halaman kota: layanan level provinsi + layanan spesifik kota
        return (
          (p.province === page.province && p.kind === "region") ||
          (p.region === page.region && p.kind === "city")
        );
      }
      return p.region === page.region && p.kind === "region";
    }
    if (isCertHub) {
      // Hub sertifikasi per provinsi: hanya halaman sertifikasi × provinsi ini
      return p.category === "sertifikasi" && p.kind === "region" && p.region === page.region;
    }
    return false;
  });

  // Kota lain di provinsi yang sama (khusus halaman kota)
  const siblingCities = isCityHub
    ? (PROVINCES.find((p) => p.name === page.province)?.majors ?? []).filter(
        (c) => c !== page.region
      )
    : [];
  const provinceHubHref = isCityHub
    ? `/layanan/wilayah/${slugify(page.province ?? "")}`
    : "";

  return (
    <main className="min-h-screen bg-background">
      <HubJsonLd page={page} members={members} />
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
          <ol className="flex flex-wrap items-center gap-1.5">
            {page.breadcrumbs.map((b, i) => {
              const isLast = i === page.breadcrumbs.length - 1;
              return (
                <li key={b.href} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="h-3 w-3 opacity-50" aria-hidden />}
                  {isLast ? (
                    <span className="font-medium text-foreground" aria-current="page">
                      {b.name}
                    </span>
                  ) : (
                    <Link href={b.href} className="hover:text-primary transition-colors">
                      {b.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-balance">
          {page.h1}
        </h1>
        {(isCityHub || isCertHub) && (
          <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" aria-hidden />
            {isCityHub ? `${page.region}, ${page.province} · Indonesia` : `${page.region} · Indonesia`}
          </p>
        )}
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
          {page.slug.startsWith("wilayah/")
            ? "Layanan Tersedia di Wilayah Ini"
            : isCertHub
              ? "Sertifikasi Tersedia di Wilayah Ini"
              : "Semua Layanan"}
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

        {siblingCities.length > 0 && (
          <section className="mt-10" aria-labelledby="sibling-cities">
            <h2 id="sibling-cities" className="flex items-center gap-2 text-lg font-bold mb-4">
              <MapPin className="h-5 w-5 text-primary" aria-hidden />
              Kota lain di {page.province}
            </h2>
            <div className="flex flex-wrap gap-2">
              <Link
                href={provinceHubHref}
                className="rounded-full border border-primary bg-primary/5 px-3.5 py-1.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
              >
                Semua {page.province}
              </Link>
              {siblingCities.map((c) => (
                <Link
                  key={c}
                  href={`/layanan/wilayah/${slugify(page.province ?? "")}/${slugify(c)}`}
                  className="rounded-full border bg-card px-3.5 py-1.5 text-sm font-medium transition-all hover:border-primary hover:bg-primary/5 hover:text-primary"
                >
                  {c}
                </Link>
              ))}
            </div>
          </section>
        )}

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
