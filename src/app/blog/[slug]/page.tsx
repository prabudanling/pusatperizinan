import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  Landmark,
  ListChecks,
  MessageCircleQuestion,
  ShieldCheck,
  Sparkles,
  User2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BLOG_ARTICLES,
  getArticle,
  getRelatedArticles,
} from "@/lib/blog-content";
import { PERMIT_GUIDES } from "@/lib/seo-content";
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from "@/lib/landing-data";
import { fmtDateID } from "@/lib/format";
import { SITE_URL, CONTACT } from "@/lib/site";

// ============================================================
// PUSATPERIZINAN.COM — /blog/[slug] (P0-02)
// Halaman artikel server-rendered: H1 unik, author & role,
// tanggal publikasi/update, breadcrumb, FAQ, artikel terkait,
// tautan panduan, CTA, dan BlogPosting JSON-LD per URL.
// ============================================================

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return BLOG_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.keywords,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `/blog/${article.slug}`,
      type: "article",
      siteName: "PusatPerizinan.com",
      locale: "id_ID",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
      section: article.category,
      tags: article.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
    robots: { index: true, follow: true },
  };
}

function guideName(id: string): string {
  return PERMIT_GUIDES.find((g) => g.id === id)?.name ?? id;
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article.relatedArticles);

  // ---------- JSON-LD: BlogPosting + BreadcrumbList + FAQ ----------
  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/blog/${article.slug}#article`,
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    inLanguage: "id-ID",
    articleSection: article.category,
    keywords: article.keywords.join(", "),
    wordCount: article.sections.reduce(
      (n, s) =>
        n +
        s.paragraphs.join(" ").split(/\s+/).length +
        (s.bullets ?? []).join(" ").split(/\s+/).length,
      0
    ),
    author: {
      "@type": "Person",
      name: article.author,
      jobTitle: article.authorRole,
      worksFor: { "@id": `${SITE_URL}/#organization` },
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${article.slug}`,
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${SITE_URL}/blog/${article.slug}`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Halo, saya baca artikel "${article.title}" dan ingin konsultasi lebih lanjut.`
  )}`;

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {article.faq.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-primary">
                Beranda
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/blog" className="hover:text-primary">
                Blog
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="font-semibold text-foreground">
              {article.category}
            </li>
          </ol>
        </nav>

        {/* Meta kategori */}
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold text-[11px]">
            {article.category}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" aria-hidden /> {article.readMinutes} menit baca
          </span>
        </div>

        {/* H1 unik per artikel */}
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight leading-tight sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{article.excerpt}</p>

        {/* E-E-A-T: penulis + tanggal — ditampilkan & terbaca mesin pencari */}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl border border-border/70 bg-secondary/40 px-5 py-4 text-sm">
          <p className="flex items-center gap-2 font-semibold">
            <User2 className="h-4 w-4 text-primary" aria-hidden />
            {article.author}
            <span className="font-normal text-muted-foreground">· {article.authorRole}</span>
          </p>
          <p className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="h-4 w-4 text-primary" aria-hidden />
            Terbit {fmtDateID(article.publishedAt)}
          </p>
          <p className="flex items-center gap-2 text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" aria-hidden />
            Diperbarui {fmtDateID(article.updatedAt)}
          </p>
        </div>

        {/* Isi artikel — heading hierarkis mulai H2 */}
        <div className="mt-10 space-y-8">
          {article.sections.map((s, i) => (
            <section key={i} aria-label={s.heading}>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight flex items-start gap-2.5">
                <span className="mt-1.5 h-6 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-primary to-gold" aria-hidden />
                {s.heading}
              </h2>
              <div className="mt-3 space-y-3">
                {s.paragraphs.map((p, j) => (
                  <p key={j} className="text-[15.5px] text-foreground/85 leading-relaxed">{p}</p>
                ))}
              </div>
              {s.bullets && s.bullets.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {s.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-foreground/85">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* FAQ artikel (sesuai konten yang terlihat — schema FAQPage di atas) */}
        {article.faq.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
              <MessageCircleQuestion className="h-5 w-5 text-primary" aria-hidden />
              Sering Ditanya Soal Ini
            </h2>
            <Accordion type="single" collapsible className="mt-4 space-y-3">
              {article.faq.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border border-border/70 rounded-2xl bg-secondary/40 px-5 last:border-b"
                >
                  <AccordionTrigger className="py-4 text-sm font-bold hover:no-underline hover:text-primary text-left">
                    {f.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {f.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}

        {/* Cross-link: panduan terkait (money page links) */}
        {article.relatedGuides.length > 0 && (
          <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-5">
            <p className="flex items-center gap-1.5 text-sm font-bold">
              <Landmark className="h-4 w-4 text-primary" aria-hidden />
              Pelajari Lebih Dalam di Panduan Kami
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {article.relatedGuides.map((g) => (
                <Link
                  key={g}
                  href={`/panduan/${g}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-card border border-primary/25 px-3.5 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10 transition-colors"
                >
                  {guideName(g)}
                  <ArrowRight className="h-3 w-3" aria-hidden />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Artikel terkait — tautan nyata antar-URL */}
        {related.length > 0 && (
          <div className="mt-8">
            <p className="flex items-center gap-1.5 text-sm font-bold">
              <ListChecks className="h-4 w-4 text-primary" aria-hidden />
              Artikel Terkait
            </p>
            <div className="mt-3 grid sm:grid-cols-2 gap-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="rounded-2xl border border-border/70 bg-secondary/40 p-4 hover:border-primary/40 hover:shadow-md transition-all"
                >
                  <Badge variant="outline" className="rounded-full text-[10px] border-gold/40 text-gold-foreground font-semibold">
                    {r.category}
                  </Badge>
                  <p className="mt-2 text-sm font-bold leading-snug">{r.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{r.readMinutes} menit baca</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA penutup */}
        <div className="mt-12 flex flex-col sm:flex-row items-center gap-3 rounded-2xl bg-gradient-to-r from-primary to-emerald-700 p-6 text-primary-foreground">
          <Sparkles className="h-5 w-5 shrink-0 hidden sm:block" aria-hidden />
          <p className="text-sm font-semibold flex-1 text-center sm:text-left">
            Tidak mau repot? Serahkan semuanya ke tim ahli kami — garansi 100% uang kembali.
          </p>
          <Button asChild variant="secondary" className="rounded-full font-bold shrink-0 w-full sm:w-auto">
            <a href={waHref} target="_blank" rel="noopener noreferrer">
              Konsultasi WhatsApp {WHATSAPP_DISPLAY} <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" aria-hidden /> Semua artikel
          </Link>
          <Link href="/layanan" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            <BookOpen className="h-4 w-4" aria-hidden /> Lihat layanan perizinan
          </Link>
          <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            {CONTACT.hours}
          </span>
        </div>
      </article>
    </main>
  );
}
