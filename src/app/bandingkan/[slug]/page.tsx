import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Equal,
  GitCompareArrows,
  HelpCircle,
  PhoneCall,
  Scale,
  ThumbsDown,
  ThumbsUp,
  Trophy,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { COMPARISONS, getComparison, getRelatedComparisons } from "@/lib/comparisons";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) return {};
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    keywords: c.keywords,
    alternates: { canonical: `/bandingkan/${c.slug}` },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDesc,
      url: `/bandingkan/${c.slug}`,
      type: "article",
    },
  };
}

export default async function ComparisonDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) notFound();

  const related = getRelatedComparisons(c.slug, 3);
  const aWins = c.aspects.filter((x) => x.winner === "a").length;
  const bWins = c.aspects.filter((x) => x.winner === "b").length;
  const ties = c.aspects.filter((x) => x.winner === "tie").length;

  const waText = `Halo, saya baru membaca perbandingan ${c.aShort} vs ${c.bShort} di PusatPerizinan.com. Kondisi usaha saya: \n\nMohon direkomendasikan badan usaha yang paling cocok.`;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: "https://pusatperizinan.com/" },
      { "@type": "ListItem", position: 2, name: "Perbandingan Badan Usaha", item: "https://pusatperizinan.com/bandingkan" },
      { "@type": "ListItem", position: 3, name: `${c.aShort} vs ${c.bShort}`, item: `https://pusatperizinan.com/bandingkan/${c.slug}` },
    ],
  };

  // Mapping entitas → slug layanan yang benar-benar ada di katalog
  const SERVICE_SLUG_MAP: Record<string, string> = {
    pt: "pt",
    cv: "cv",
    "pt-pma": "pt",
    "pt-lokal": "pt",
    "pt-perorangan": "pt-perorangan",
    "usaha-dagang": "nib",
    yayasan: "koperasi-yayasan",
    koperasi: "koperasi-yayasan",
    firma: "cv",
    "nib-op": "nib",
  };

  const serviceLinks = [
    { label: `Jasa Pendirian ${c.aName.split(" (")[0]}`, href: `/layanan/${SERVICE_SLUG_MAP[c.aId] ?? "nib"}` },
    { label: `Jasa Pendirian ${c.bName.split(" (")[0]}`, href: `/layanan/${SERVICE_SLUG_MAP[c.bId] ?? "nib"}` },
    { label: "NIB & OSS-RBA", href: "/layanan/nib" },
    { label: "Konsultasi Pajak", href: "/layanan/kategori/pajak" },
  ];

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Header */}
      <div className="border-b bg-card/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/bandingkan" className="flex items-center gap-2.5" aria-label="Kembali ke daftar perbandingan">
            <img src="/logo-icon.png" alt="Logo PusatPerizinan.com" className="h-8 w-8" />
            <span className="font-bold text-[15px] tracking-tight">
              Pusat<span className="text-primary">Perizinan</span>
              <span className="text-gold">.com</span>
            </span>
            <span className="text-sm text-muted-foreground hidden sm:inline">/ Perbandingan</span>
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md min-h-[44px]"
          >
            <PhoneCall className="h-4 w-4" aria-hidden />
            Konsultasi Gratis
          </a>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Beranda</Link>
          <span className="mx-1.5">/</span>
          <Link href="/bandingkan" className="hover:text-primary">Perbandingan</Link>
          <span className="mx-1.5">/</span>
          <span className="font-medium text-foreground">{c.aShort} vs {c.bShort}</span>
        </nav>
      </div>

      {/* Hero */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <Badge className="bg-primary/10 text-primary border border-primary/20">
            <Scale className="h-3 w-3 mr-1" aria-hidden /> {c.aspects.length} Aspek Dibandingkan
          </Badge>
          <Badge variant="outline" className="text-muted-foreground">
            <GitCompareArrows className="h-3 w-3 mr-1" aria-hidden /> {aWins} menang {c.aShort} • {bWins} menang {c.bShort} • {ties} imbang
          </Badge>
        </div>
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-balance">
          {c.aName} vs {c.bName}
        </h1>

        {/* Intro */}
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-5">
            <h2 className="font-bold text-lg text-primary">{c.aName}</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {c.chooseA.slice(0, 3).map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <ThumbsUp className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden /> {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border-2 border-gold/40 bg-gold/5 p-5">
            <h2 className="font-bold text-lg text-gold">{c.bName}</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {c.chooseB.slice(0, 3).map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <ThumbsUp className="h-4 w-4 text-gold mt-0.5 shrink-0" aria-hidden /> {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4 space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
          {c.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      {/* Tabel perbandingan — desktop */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-6">
        <h2 className="font-bold text-xl md:text-2xl mb-4 flex items-center gap-2">
          <GitCompareArrows className="h-6 w-6 text-primary" aria-hidden /> Tabel Perbandingan Lengkap
        </h2>

        {/* Desktop table */}
        <div className="hidden md:block overflow-hidden rounded-2xl border">
          <table className="w-full text-sm">
            <caption className="sr-only">Tabel perbandingan {c.aName} dan {c.bName}</caption>
            <thead>
              <tr className="bg-muted/60">
                <th scope="col" className="text-left font-bold p-4 w-[18%]">Aspek</th>
                <th scope="col" className="text-left font-bold p-4 text-primary">{c.aName}</th>
                <th scope="col" className="text-left font-bold p-4 text-gold">{c.bName}</th>
                <th scope="col" className="text-center font-bold p-4 w-[13%]">Unggul</th>
              </tr>
            </thead>
            <tbody>
              {c.aspects.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                  <th scope="row" className="text-left font-semibold p-4 align-top">{row.aspect}</th>
                  <td className={`p-4 align-top ${row.winner === "a" ? "bg-primary/5 font-medium" : ""}`}>{row.a}</td>
                  <td className={`p-4 align-top ${row.winner === "b" ? "bg-gold/5 font-medium" : ""}`}>{row.b}</td>
                  <td className="p-4 align-top text-center">
                    {row.winner === "a" && <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 text-xs font-bold">{c.aShort}</span>}
                    {row.winner === "b" && <span className="inline-flex items-center gap-1 rounded-full bg-gold/10 text-gold border border-gold/20 px-2 py-0.5 text-xs font-bold">{c.bShort}</span>}
                    {row.winner === "tie" && <span className="inline-flex items-center gap-1 rounded-full bg-muted text-muted-foreground border px-2 py-0.5 text-xs font-bold"><Equal className="h-3 w-3" aria-hidden /> Setara</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {c.aspects.map((row, i) => (
            <div key={i} className="rounded-2xl border bg-card p-4">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <h3 className="font-bold text-sm">{row.aspect}</h3>
                {row.winner === "a" && <span className="rounded-full bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 text-[11px] font-bold shrink-0">{c.aShort} unggul</span>}
                {row.winner === "b" && <span className="rounded-full bg-gold/10 text-gold border border-gold/20 px-2 py-0.5 text-[11px] font-bold shrink-0">{c.bShort} unggul</span>}
                {row.winner === "tie" && <span className="rounded-full bg-muted text-muted-foreground border px-2 py-0.5 text-[11px] font-bold shrink-0">Setara</span>}
              </div>
              <div className="space-y-2 text-sm">
                <p className={row.winner === "a" ? "rounded-lg bg-primary/5 p-2.5" : "p-2.5 rounded-lg"}>
                  <span className="font-semibold text-primary">{c.aShort}: </span>{row.a}
                </p>
                <p className={row.winner === "b" ? "rounded-lg bg-gold/5 p-2.5" : "p-2.5 rounded-lg"}>
                  <span className="font-semibold text-gold">{c.bShort}: </span>{row.b}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verdict */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-6 grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-5">
          <h2 className="font-bold flex items-center gap-2 text-primary">
            <Trophy className="h-5 w-5" aria-hidden /> Pilih {c.aShort} jika:
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {c.chooseA.map((s, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden /> {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border-2 border-gold/40 bg-gold/5 p-5">
          <h2 className="font-bold flex items-center gap-2 text-gold">
            <Trophy className="h-5 w-5" aria-hidden /> Pilih {c.bShort} jika:
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {c.chooseB.map((s, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-gold mt-0.5 shrink-0" aria-hidden /> {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border bg-card p-5">
          <h2 className="font-bold flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" aria-hidden /> Verdict Kami
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.verdict}</p>
        </div>
      </div>

      {/* FAQ */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-6">
        <h2 className="font-bold text-xl md:text-2xl mb-4 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-primary" aria-hidden /> Pertanyaan yang Sering Diajukan
        </h2>
        <div className="space-y-3">
          {c.faq.map((f, i) => (
            <details key={i} className="group rounded-xl border bg-card overflow-hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 font-semibold text-sm md:text-base hover:bg-muted/40 transition-colors">
                {f.q}
                <ChevronRight className="h-4 w-4 shrink-0 transition-transform group-open:rotate-90" aria-hidden />
              </summary>
              <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </div>

      {/* CTA + layanan terkait */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-6">
        <div className="rounded-2xl border bg-gradient-to-br from-primary/5 to-gold/5 p-6 text-center">
          <h2 className="font-bold text-lg">Sudah menentukan pilihan? Kami urus dari nol sampai terbit.</h2>
          <p className="text-sm text-muted-foreground mt-1.5">Pendirian resmi, NIB, NPWP, KBLI — pendampingan penuh, laporan transparan.</p>
          <div className="mt-4 flex flex-col sm:flex-row justify-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-bold text-primary-foreground shadow-md transition-all hover:shadow-lg min-h-[44px]"
            >
              <PhoneCall className="h-5 w-5" aria-hidden /> Konsultasi Pilihan Saya — Gratis
            </a>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm">
            {serviceLinks.map((l) => (
              <Link key={l.href} href={l.href} className="rounded-full border bg-background px-3.5 py-2 hover:border-primary/50 transition-colors">
                {l.label} <ArrowRight className="inline h-3.5 w-3.5" aria-hidden />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Related comparisons */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-14">
        <h2 className="font-bold text-xl mb-4">Perbandingan Lainnya</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {related.map((rc) => (
            <Link key={rc.slug} href={`/bandingkan/${rc.slug}`} className="rounded-2xl border bg-card p-5 hover:shadow-md transition-shadow">
              <p className="text-xs font-bold text-muted-foreground mb-1.5">{rc.aShort} vs {rc.bShort}</p>
              <h3 className="font-semibold leading-snug">{rc.title.split(":")[0]}</h3>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Bandingkan <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
