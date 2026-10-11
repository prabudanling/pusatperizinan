import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays, Clock, User2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BLOG_ARTICLES, BLOG_CATEGORIES, type BlogArticle } from "@/lib/blog-content";
import { fmtDateID } from "@/lib/format";

// ============================================================
// PUSATPERIZINAN.COM — /blog (Arsitektur URL Nyata, P0-02)
// Server component: seluruh kartu artikel adalah <a href> asli
// sehingga Google dapat menemukan & meng-crawl setiap artikel.
// ============================================================

export const metadata: Metadata = {
  title: "Blog Perizinan Usaha — Panduan NIB, PT, Halal, BPOM & Pajak",
  description:
    "Kumpulan artikel mendalam seputar perizinan usaha Indonesia: cara mengurus NIB via OSS-RBA, biaya pendirian PT/CV/PMA, sertifikasi halal SEHATI, izin edar BPOM/PIRT, PBG/SLF, pajak UMKM, hingga izin PPIU/PPIH dan RKAB tambang. Ditulis tim konsultan, diperbarui mengikuti regulasi terbaru.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog Perizinan Usaha — PusatPerizinan.com",
    description:
      "Panduan mendalam perizinan usaha Indonesia oleh praktisi: NIB, PT, halal, BPOM, PBG/SLF, pajak, PPIU/PPIH, RKAB.",
    url: "/blog",
    type: "website",
    siteName: "PusatPerizinan.com",
    locale: "id_ID",
  },
  robots: { index: true, follow: true },
};

export default function BlogIndexPage() {
  const sorted = [...BLOG_ARTICLES].sort((a, b) =>
    b.updatedAt.localeCompare(a.updatedAt)
  );

  const byCategory = new Map<string, BlogArticle[]>();
  for (const cat of BLOG_CATEGORIES) {
    const items = sorted.filter((a) => a.category === cat);
    if (items.length > 0) byCategory.set(cat, items);
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header halaman */}
      <section className="border-b bg-gradient-to-b from-primary/5 to-transparent">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-primary">
                  Beranda
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="font-semibold text-foreground">
                Blog
              </li>
            </ol>
          </nav>

          <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 text-sm font-bold text-primary">
            <BookOpen className="h-4 w-4" aria-hidden />
            {BLOG_ARTICLES.length} artikel — ditulis praktisi, diperbarui mengikuti regulasi
          </p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Blog Perizinan Usaha Indonesia
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            Panduan langkah demi langkah, rincian biaya aktual, dan perubahan regulasi —
            dirangkum tim konsultan PusatPerizinan.com dari pengalaman menangani
            ribuan pengajuan izin di seluruh Indonesia.
          </p>
        </div>
      </section>

      {/* Daftar artikel per kategori — setiap kartu adalah tautan nyata */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6" aria-label="Daftar artikel">
        {[...byCategory.entries()].map(([cat, items]) => (
          <div key={cat} className="mb-12 last:mb-0">
            <h2 className="text-xl font-bold tracking-tight">
              {cat} <span className="text-sm font-medium text-muted-foreground">({items.length})</span>
            </h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-border/70 bg-card p-6 transition-all hover:border-primary/40 hover:shadow-xl"
                >
                  <div className="flex items-center justify-between gap-2">
                    <Badge className="rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold text-[11px]">
                      {a.category}
                    </Badge>
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Clock className="h-3 w-3" aria-hidden />
                      {a.readMinutes} mnt
                    </span>
                  </div>
                  <h3 className="mt-4 font-bold text-[15.5px] leading-snug group-hover:text-primary transition-colors">
                    {a.title}
                  </h3>
                  <p className="mt-2.5 text-[13px] text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                    {a.excerpt}
                  </p>
                  <div className="mt-4 pt-4 border-t border-border/60 text-[11px] text-muted-foreground">
                    <p className="flex items-center gap-1.5">
                      <User2 className="h-3 w-3" aria-hidden /> {a.author} · {a.authorRole}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5">
                      <CalendarDays className="h-3 w-3" aria-hidden /> Diperbarui {fmtDateID(a.updatedAt)}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 font-bold text-primary">
                      Baca Artikel{" "}
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
