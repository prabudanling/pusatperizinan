import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  FileText,
  Gift,
  Landmark,
  ListChecks,
  PhoneCall,
  Scale,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getKbliBySlug, getAllKbliSlugs, KBLI_PAGES, KBLI_CATEGORY_PAGES, getKbliCategoryPage } from "@/lib/kbli-catalog";
import type { KbliCategoryPage } from "@/lib/kbli-catalog";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams(): { slug: string[] }[] {
  return [
    ...getAllKbliSlugs().map((s) => ({ slug: [s] })),
    ...KBLI_CATEGORY_PAGES.map((c) => ({ slug: c.slug.split("/") })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const joined = slug.join("/");
  const cat = getKbliCategoryPage(joined);
  if (cat) {
    return {
      title: cat.title,
      description: cat.metaDesc,
      keywords: cat.keywords,
      alternates: { canonical: `/kbli/${cat.slug}` },
      openGraph: { title: cat.title, description: cat.metaDesc, url: `/kbli/${cat.slug}`, type: "article" },
      robots: { index: true, follow: true },
    };
  }
  const page = getKbliBySlug(joined);
  if (!page) return {};
  return {
    title: page.title,
    description: page.metaDesc,
    keywords: page.keywords,
    alternates: { canonical: `/kbli/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.metaDesc,
      url: `/kbli/${page.slug}`,
      type: "article",
    },
    robots: { index: true, follow: true },
  };
}

function KbliJsonLd({ page }: { page: NonNullable<ReturnType<typeof getKbliBySlug>> }) {
  
  const jsonLd: Record<string, unknown>[] = [
    // DefinedTerm — magnet featured snippet untuk pencarian "kbli 56101"
    {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      name: `KBLI ${page.code}`,
      alternateName: `KBLI ${page.code} ${page.h1.replace(/^KBLI \d+ — /, "")}`,
      description: page.metaDesc,
      inDefinedTermSet: {
        "@type": "DefinedTermSet",
        name: "Klasifikasi Baku Lapangan Usaha Indonesia (KBLI) 2025",
        url: `${SITE_URL}/kbli`,
      },
      termCode: page.code,
      url: `${SITE_URL}/kbli/${page.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Database KBLI", item: `${SITE_URL}/kbli` },
        { "@type": "ListItem", position: 3, name: `KBLI ${page.code}`, item: `${SITE_URL}/kbli/${page.slug}` },
      ],
    },
  ];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

const RISK_BADGE: Record<string, string> = {
  rendah: "bg-emerald-100 text-emerald-800 border-emerald-200",
  "menengah-rendah": "bg-amber-100 text-amber-800 border-amber-200",
  "menengah-tinggi": "bg-orange-100 text-orange-800 border-orange-200",
  tinggi: "bg-red-100 text-red-800 border-red-200",
};

function riskKey(label: string): string {
  const l = label.toLowerCase();
  if (l.includes("menengah rendah")) return "menengah-rendah";
  if (l.includes("menengah tinggi")) return "menengah-tinggi";
  if (l.includes("tinggi")) return "tinggi";
  return "rendah";
}

function KbliCategoryJsonLd({ page }: { page: KbliCategoryPage }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: page.h1,
      description: page.metaDesc,
      url: `${SITE_URL}/kbli/${page.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Database KBLI", item: `${SITE_URL}/kbli` },
        { "@type": "ListItem", position: 3, name: page.name, item: `${SITE_URL}/kbli/${page.slug}` },
      ],
    },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

function KbliCategoryView({ page }: { page: KbliCategoryPage }) {
  const waText = `Halo, saya mencari KBLI bidang ${page.name} untuk usaha saya: `;
  return (
    <main className="min-h-screen bg-background">
      <KbliCategoryJsonLd page={page} />

      <div className="border-b bg-card/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/kbli" className="flex items-center gap-2.5" aria-label="Kembali ke Database KBLI">
            <img src="/logo-icon.png" alt="Logo PusatPerizinan.com" className="h-8 w-8" />
            <span className="font-bold text-[15px] tracking-tight">
              Pusat<span className="text-primary">Perizinan</span>
              <span className="text-gold">.com</span>
            </span>
            <span className="text-sm text-muted-foreground hidden sm:inline">/ KBLI / {page.name}</span>
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm min-h-[44px]"
          >
            <PhoneCall className="h-4 w-4" aria-hidden /> Konsultasi Gratis
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-primary">Beranda</Link>
          <span className="mx-1.5">/</span>
          <Link href="/kbli" className="hover:text-primary">Database KBLI</Link>
          <span className="mx-1.5">/</span>
          <span className="font-medium text-foreground">{page.name}</span>
        </nav>

        <div className="flex items-center gap-3">
          <span className="text-4xl" aria-hidden>{page.icon}</span>
          <Badge variant="outline" className="border-primary/30 text-primary">Bidang {page.letter}</Badge>
        </div>
        <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight">{page.h1}</h1>
        <div className="mt-3 space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
          {page.intro.map((p, i) => (<p key={i}>{p}</p>))}
          {page.longDesc.map((p, i) => (<p key={`l-${i}`}>{p}</p>))}
        </div>

        {/* Distribusi risiko */}
        <div className="mt-6 flex flex-wrap gap-2">
          {page.riskSpread.map((r) => (
            <Badge key={r.label} variant="outline" className="text-muted-foreground">
              {r.count} kode · {r.label}
            </Badge>
          ))}
        </div>

        {/* Daftar kode */}
        <h2 className="mt-8 font-bold text-xl">{page.members.length} Kode KBLI di Bidang Ini</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {page.members.map((m) => (
            <Link
              key={m.slug}
              href={`/kbli/${m.slug}`}
              className="group rounded-2xl border bg-card p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono font-bold text-primary">{m.code}</span>
                <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${RISK_BADGE[riskKey(m.riskLabel)]}`}>
                  {m.riskLabel}
                </span>
              </div>
              <span className="mt-1.5 block font-semibold text-sm leading-snug group-hover:text-primary transition-colors">{m.title}</span>
            </Link>
          ))}
        </div>

        {/* Layanan terkait */}
        <h2 className="mt-10 font-bold text-xl">Layanan yang Biasa Diurus untuk Bidang Ini</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {page.relatedServices.map((s) => (
            <Link key={s.slug} href={`/layanan/${s.slug}`} className="rounded-full border bg-background px-3.5 py-2 text-sm hover:border-primary/50 transition-colors">
              {s.title} <ArrowRight className="inline h-3.5 w-3.5" aria-hidden />
            </Link>
          ))}
        </div>

        {/* FAQ */}
        <h2 className="mt-10 font-bold text-xl">Pertanyaan Umum</h2>
        <div className="mt-4 space-y-3">
          {page.faq.map((f, i) => (
            <details key={i} className="group rounded-xl border bg-card overflow-hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 font-semibold text-sm md:text-base hover:bg-muted/40 transition-colors">
                {f.q}
                <ChevronRight className="h-4 w-4 shrink-0 transition-transform group-open:rotate-90" aria-hidden />
              </summary>
              <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border bg-gradient-to-br from-primary/5 to-gold/5 p-6 text-center">
          <h2 className="font-bold text-lg">Sudah menemukan KBLI usaha Anda?</h2>
          <p className="text-sm text-muted-foreground mt-1.5">Kami urus NIB & seluruh perizinannya sampai terbit — konsultasi gratis.</p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-bold text-primary-foreground shadow-md min-h-[44px]"
          >
            <PhoneCall className="h-5 w-5" aria-hidden /> Chat WhatsApp Sekarang
          </a>
        </div>
      </div>
    </main>
  );
}

export default async function KbliDetailPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const joined = slug.join("/");

  // Halaman kategori bidang KBLI (kategori/{id})
  const cat = getKbliCategoryPage(joined);
  if (cat) return <KbliCategoryView page={cat} />;

  const page = getKbliBySlug(joined);
  if (!page) notFound();

  const serviceName = page.h1.replace(/^KBLI \d+ — /, "");

  return (
    <main className="min-h-screen bg-background">
      <KbliJsonLd page={page} />

      {/* Header mini */}
      <div className="border-b bg-card/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Kembali ke beranda">
            <img src="/logo-icon.png" alt="Logo PusatPerizinan.com" className="h-8 w-8" />
            <span className="font-bold text-[15px] tracking-tight">
              Pusat<span className="text-primary">Perizinan</span>
              <span className="text-gold">.com</span>
            </span>
          </Link>
          <Link href="/kbli" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Database KBLI
          </Link>
        </div>
      </div>

      <article className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-primary">Beranda</Link></li>
            <li><ChevronRight className="h-3.5 w-3.5 opacity-50 inline" aria-hidden /></li>
            <li><Link href="/kbli" className="hover:text-primary">KBLI</Link></li>
            <li><ChevronRight className="h-3.5 w-3.5 opacity-50 inline" aria-hidden /></li>
            <li className="font-medium text-foreground" aria-current="page">KBLI {page.code}</li>
          </ol>
        </nav>

        {/* Hero */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="outline" className="font-mono font-bold text-sm">KBLI {page.code}</Badge>
            <Badge className={`border ${RISK_BADGE[page.risk]}`}>{page.riskLabel}</Badge>
            <Badge variant="secondary" className="gap-1">
              <span aria-hidden>{page.category.icon}</span> {page.category.name}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-balance">
            KBLI {page.code} — {serviceName}
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {page.desc}
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-8 min-w-0">
            {/* Cakupan */}
            <section aria-labelledby="cakupan">
              <h2 id="cakupan" className="flex items-center gap-2 text-xl font-bold mb-4">
                <ListChecks className="h-5 w-5 text-primary" aria-hidden />
                Cakupan Kegiatan KBLI {page.code}
              </h2>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {page.includes.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2.5 rounded-xl border bg-card p-3.5 text-sm">
                    <CheckCircle2 className="h-4.5 w-4.5 shrink-0 mt-0.5 text-primary" aria-hidden />
                    <span className="leading-snug">{inc}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Izin */}
            <section aria-labelledby="izin">
              <h2 id="izin" className="flex items-center gap-2 text-xl font-bold mb-4">
                <ShieldCheck className="h-5 w-5 text-primary" aria-hidden />
                Izin yang Dibutuhkan
              </h2>
              <div className="space-y-3">
                {page.licenses.map((lic, i) => (
                  <div key={i} className="rounded-xl border bg-card p-4">
                    <h3 className="font-semibold text-[15px] flex items-center gap-2">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {i + 1}
                      </span>
                      {lic.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{lic.note}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Pajak */}
            <section aria-labelledby="pajak">
              <h2 id="pajak" className="flex items-center gap-2 text-xl font-bold mb-4">
                <Scale className="h-5 w-5 text-primary" aria-hidden />
                Kewajiban Pajak Usaha
              </h2>
              <div className="rounded-2xl border bg-gradient-to-br from-amber-50/50 to-transparent p-5 dark:from-amber-950/10">
                <ul className="space-y-2.5">
                  {page.taxNotes.map((note, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed">
                      <BadgeCheck className="h-4 w-4 mt-0.5 shrink-0 text-amber-600" aria-hidden />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/kalkulator-pajak"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  Hitung pajak usaha Anda <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </section>

            {/* Insentif */}
            <section aria-labelledby="insentif">
              <h2 id="insentif" className="flex items-center gap-2 text-xl font-bold mb-4">
                <Gift className="h-5 w-5 text-primary" aria-hidden />
                Insentif & Subsidi yang Tersedia
              </h2>
              <ul className="space-y-2">
                {page.incentives.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2.5 rounded-xl border border-emerald-200/60 bg-emerald-50/50 dark:border-emerald-900/40 dark:bg-emerald-950/20 p-3.5 text-sm">
                    <Sparkles className="h-4 w-4 mt-0.5 shrink-0 text-emerald-600" aria-hidden />
                    <span className="leading-snug">{inc}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* FAQ */}
            <section aria-labelledby="faq">
              <h2 id="faq" className="flex items-center gap-2 text-xl font-bold mb-4">
                <Users className="h-5 w-5 text-primary" aria-hidden />
                Pertanyaan Umum KBLI {page.code}
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {page.faq.map((f, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left text-[15px] font-semibold hover:text-primary hover:no-underline">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Layanan terkait */}
            <section aria-labelledby="layanan-terkait">
              <h2 id="layanan-terkait" className="flex items-center gap-2 text-xl font-bold mb-4">
                <Landmark className="h-5 w-5 text-primary" aria-hidden />
                Layanan Kami untuk KBLI Ini
              </h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {page.relatedServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/layanan/${s.slug}`}
                    className="group rounded-xl border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-md"
                  >
                    <h3 className="text-sm font-semibold group-hover:text-primary transition-colors leading-snug">{s.title}</h3>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                      Detail <ArrowRight className="h-3 w-3" aria-hidden />
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {/* KBLI terkait */}
            {page.relatedKbli.length > 0 && (
              <section aria-labelledby="kbli-terkait">
                <h2 id="kbli-terkait" className="flex items-center gap-2 text-lg font-bold mb-4">
                  <BookOpen className="h-5 w-5 text-primary" aria-hidden />
                  KBLI Sejenis di Kategori Ini
                </h2>
                <div className="flex flex-wrap gap-2">
                  {page.relatedKbli.map((k) => (
                    <Link
                      key={k.slug}
                      href={`/kbli/${k.slug}`}
                      className="group flex items-center gap-2 rounded-full border bg-card px-3.5 py-1.5 text-sm font-medium transition-all hover:border-primary hover:bg-primary/5 hover:text-primary"
                    >
                      <Badge variant="outline" className="font-mono text-[10px] px-1.5 py-0">{k.code}</Badge>
                      {k.title}
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start space-y-4">
            <div className="rounded-2xl border-2 border-primary/15 bg-gradient-to-br from-primary/5 to-gold/5 p-6">
              <div className="flex items-center gap-2 mb-1.5">
                <FileText className="h-5 w-5 text-primary" aria-hidden />
                <h2 className="text-lg font-bold">Urus KBLI {page.code} Sekarang</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-5">
                NIB untuk KBLI {page.code} bisa terbit <strong className="text-foreground">hari ini</strong>. Konsultasi pemilihan kode pendukung & strategi pajak gratis.
              </p>
              <div className="space-y-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Halo, saya ingin mengurus NIB untuk KBLI ${page.code} — ${serviceName}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-105 min-h-[44px]"
                >
                  <PhoneCall className="h-5 w-5" aria-hidden />
                  WhatsApp — NIB Hari Ini
                </a>
                <Link
                  href="/roadmap"
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground shadow-md transition-all hover:shadow-lg hover:brightness-110 min-h-[44px]"
                >
                  <Sparkles className="h-5 w-5" aria-hidden />
                  AI Roadmap 12 Bulan
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border bg-card p-5">
              <h3 className="text-sm font-bold mb-3">Spesifikasi KBLI {page.code}</h3>
              <dl className="space-y-2.5 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Kode</dt>
                  <dd className="font-mono font-bold">{page.code}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Bidang</dt>
                  <dd className="font-medium text-right">{page.category.name}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Tingkat risiko</dt>
                  <dd className="font-medium text-right">{page.riskLabel}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Legal inti</dt>
                  <dd className="font-medium text-right">NIB via OSS-RBA</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Pajak UMKM</dt>
                  <dd className="font-medium text-right text-primary">PPh Final 0,5%</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl bg-[oklch(0.23_0.03_165)] p-5 text-emerald-50">
              <p className="text-sm leading-relaxed">
                <strong className="text-emerald-300">Salah pilih KBLI</strong> bisa bikin pajak lebih berat & izin salah struktur. Konsultasikan gratis sebelum daftar!
              </p>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}
