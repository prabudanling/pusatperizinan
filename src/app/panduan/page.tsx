import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Building2,
  CalendarCheck,
  Database,
  FileText,
  Globe2,
  Landmark,
  ShieldCheck,
  Stamp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { PERMIT_GUIDES } from "@/lib/seo-content";
import { SITE_NAME, SITE_URL, absUrl } from "@/lib/site";

// ============================================================
// PUSATPERIZINAN.COM — /panduan (server component)
// Halaman CTA resmi "Panduan Perizinan" — hub indeks 16 panduan
// resmi per jenis izin (sumber: PERMIT_GUIDES / seo-content.ts),
// setiap kartu menuju halaman panduan detail /panduan/[id].
// JSON-LD: CollectionPage + ItemList + BreadcrumbList.
// ============================================================

const PAGE_URL = absUrl("/panduan");

export const metadata: Metadata = {
  title: "Panduan Perizinan Usaha Terlengkap — 16 Panduan Resmi",
  description:
    "Panduan praktik per jenis izin: NIB/OSS, PT, CV, halal, BPOM/PIRT, PBG/SLF, izin lingkungan, klinik, PMA, pajak, umroh & haji (PPIU/PPIH), IATA, MISA Arab Saudi, RKAB tambang — syarat, biaya, timeline, langkah resmi, dan tips.",
  keywords: [
    "panduan perizinan usaha",
    "cara mengurus izin usaha",
    "cara membuat nib",
    "cara mendirikan pt",
    "cara daftar sertifikasi halal",
    "cara daftar bpom",
    "panduan izin usaha 2026",
    "prosedur izin usaha indonesia",
  ],
  alternates: { canonical: "/panduan" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Panduan Perizinan Usaha Terlengkap — PusatPerizinan.com",
    description:
      "16 panduan resmi per jenis izin: syarat, biaya, timeline, langkah resmi, dan tips dari konsultan berpengalaman 10+ tahun.",
    url: "/panduan",
    siteName: SITE_NAME,
    type: "website",
    locale: "id_ID",
  },
};

/** Pengelompokan panduan untuk navigasi yang mudah dipindai. */
const GUIDE_GROUPS: { title: string; icon: typeof Landmark; ids: string[] }[] = [
  { title: "Legalitas Dasar & Badan Usaha", icon: Building2, ids: ["nib", "oss", "pt", "cv", "pma"] },
  { title: "Sertifikasi Produk", icon: Stamp, ids: ["halal", "bpom"] },
  { title: "Bangunan & Lingkungan", icon: Landmark, ids: ["pbg", "lingkungan"] },
  { title: "Sektor & Perpajakan", icon: ShieldCheck, ids: ["klinik", "pajak", "rkab-tambang"] },
  { title: "Travel Ibadah & Internasional", icon: Globe2, ids: ["ppi-umroh", "ppi-haji", "iata", "saudi-arabia"] },
];

const OTHER_LEARNING_PATHS = [
  {
    icon: FileText,
    href: "/syarat",
    title: "Syarat & Prosedur",
    desc: "Dokumen yang perlu disiapkan per layanan — halaman indeks + 110 halaman syarat detail.",
  },
  {
    icon: Database,
    href: "/kbli",
    title: "Database KBLI",
    desc: "Cari kode lapangan usaha, level risikonya, dan kewajiban yang menyertainya.",
  },
  {
    icon: BookOpen,
    href: "/blog",
    title: "Blog & Artikel",
    desc: "Kabar regulasi terbaru, studi kasus, dan panduan mendalam dari tim kami.",
  },
  {
    icon: CalendarCheck,
    href: "/kalender-kepatuhan",
    title: "Kalender Kepatuhan",
    desc: "Jatuh tempo laporan & pajak sepanjang tahun — jangan sampai kena denda.",
  },
  {
    icon: ShieldCheck,
    href: "/kanal-resmi",
    title: "Kanal Resmi Pemerintah",
    desc: "Direktori portal resmi (OSS, AHU, Coretax, BPJPH, BPOM) + cara cek status otentik.",
  },
];

// JSON-LD: CollectionPage + ItemList + BreadcrumbList
const panduanJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/panduan#webpage`,
      url: PAGE_URL,
      name: "Panduan Perizinan Usaha Terlengkap — 16 Panduan Resmi",
      description:
        "Kumpulan panduan praktik perizinan usaha Indonesia: syarat, biaya, timeline, dan langkah resmi per jenis izin.",
      inLanguage: "id",
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/panduan#itemlist`,
      name: "Panduan Perizinan per Jenis Izin",
      numberOfItems: PERMIT_GUIDES.length,
      itemListElement: PERMIT_GUIDES.map((g, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: g.name,
        url: absUrl(`/panduan/${g.id}`),
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Panduan Perizinan", item: PAGE_URL },
      ],
    },
  ],
};

export default function PanduanPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(panduanJsonLd) }}
      />
      <Header />
      <main className="min-h-screen bg-background">
        {/* ===== HERO ===== */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-b pt-24 md:pt-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-10 md:pb-14">
            <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">Beranda</Link>
              <span className="mx-1.5">/</span>
              <span className="font-medium text-foreground">Panduan Perizinan</span>
            </nav>
            <Badge className="bg-primary/10 text-primary border border-primary/20 mb-4">
              <BookOpen className="h-3 w-3 mr-1" aria-hidden /> {PERMIT_GUIDES.length} PANDUAN RESMI · GRATIS DIBACA
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance max-w-3xl">
              Panduan{" "}
              <span className="bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">Perizinan Usaha</span>{" "}
              Terlengkap
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Setiap panduan berisi{" "}
              <strong className="text-foreground">syarat lengkap, biaya, timeline, langkah resmi, dan tips lapangan</strong>{" "}
              — disusun dari UU Cipta Kerja, PP 5/2021, Peraturan OSS, dan pengalaman menangani 3.890+ izin.
            </p>
          </div>
        </section>

        {/* ===== GRID PANDUAN PER KELOMPOK ===== */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16" aria-label="Daftar panduan perizinan">
          {GUIDE_GROUPS.map((group) => {
            const guides = group.ids
              .map((id) => PERMIT_GUIDES.find((g) => g.id === id))
              .filter((g): g is (typeof PERMIT_GUIDES)[number] => Boolean(g));
            if (guides.length === 0) return null;
            return (
              <div key={group.title} className="mb-12 last:mb-0">
                <h2 className="flex items-center gap-2.5 text-xl md:text-2xl font-extrabold tracking-tight">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <group.icon className="h-5 w-5" aria-hidden />
                  </span>
                  {group.title}
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {guides.map((g) => (
                    <Link
                      key={g.id}
                      href={`/panduan/${g.id}`}
                      className="group flex flex-col rounded-2xl border bg-card p-5 transition-all hover:shadow-md hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-primary"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-bold leading-snug group-hover:text-primary transition-colors">
                          {g.name}
                        </h3>
                        <ArrowRight
                          className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                          aria-hidden
                        />
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">{g.short}</p>
                      <dl className="mt-4 grid grid-cols-2 gap-2 text-xs border-t pt-3">
                        <div>
                          <dt className="text-muted-foreground">Otoritas</dt>
                          <dd className="font-semibold mt-0.5">{g.authority}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">Timeline</dt>
                          <dd className="font-semibold mt-0.5">{g.timeline}</dd>
                        </div>
                      </dl>
                      <span className="mt-3 text-xs font-semibold text-primary">{g.cost}</span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* ===== JALUR BELAJAR LAIN ===== */}
        <section className="bg-secondary/40 border-y" aria-labelledby="jalur-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <h2 id="jalur-heading" className="text-2xl md:text-3xl font-extrabold tracking-tight text-center">
              Belajar lewat Jalur Lain
            </h2>
            <p className="mt-3 text-center text-muted-foreground max-w-2xl mx-auto">
              Panduan ini bagian dari Knowledge Hub kami — lima jalur lain untuk memahami legalitas usaha Anda.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {OTHER_LEARNING_PATHS.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="group rounded-2xl border bg-card p-5 transition-all hover:shadow-md hover:border-primary/40"
                >
                  <p.icon className="h-6 w-6 text-primary" aria-hidden />
                  <h3 className="mt-3 font-semibold group-hover:text-primary transition-colors">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </Link>
              ))}
              {/* CTA konsultasi sebagai kartu penutup */}
              <Link
                href="/konsultasi"
                className="group rounded-2xl bg-primary p-5 text-primary-foreground transition-all hover:brightness-105 hover:shadow-md"
              >
                <BookOpen className="h-6 w-6" aria-hidden />
                <h3 className="mt-3 font-semibold">Tanya Langsung ke Pakar</h3>
                <p className="mt-1.5 text-sm text-primary-foreground/85 leading-relaxed">
                  Konsultasi gratis 30 menit — peta izin usaha Anda dirapikan konsultan senior, dijadwalkan ≤ 24 jam.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold">
                  Jadwalkan sekarang
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
