import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Banknote,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock,
  GraduationCap,
  ListChecks,
  MapPin,
  PhoneCall,
  ShieldAlert,
  Users,
  FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  EMPLOYMENT_TYPE_LABEL,
  JOBS,
  JOB_CATEGORY_LABEL,
  LOCATION_TYPE_LABEL,
  formatJobDate,
  formatSalaryValue,
  isPmiJob,
  type Job,
} from "@/lib/jobs";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";

const BASE_URL = "https://pusatperizinan.com";

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return JOBS.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = JOBS.find((j) => j.slug === slug);
  if (!job) return {};

  const title = `${job.title} — ${job.location.city}, ${job.location.country} | Pusat Perizinan`;
  const salaryText = `${formatSalaryValue(job.salary.min, job.salary.currency)}–${formatSalaryValue(
    job.salary.max,
    job.salary.currency
  )}/bulan`;
  const description = `Lowongan ${job.title} di ${job.location.city}, ${job.location.country} dengan gaji ${salaryText} (${EMPLOYMENT_TYPE_LABEL[job.employmentType]}) — kontrak resmi, employer terverifikasi, dan pendampingan dokumen penuh. Lamar langsung hari ini.`;

  return {
    title,
    description,
    keywords: [
      `lowongan ${job.title.toLowerCase()}`,
      `lowongan kerja ${job.location.city}`,
      `lowongan kerja ${job.location.country}`,
      job.category === "pmi" ? "lowongan PMI 2026" : "lowongan kantor 2026",
      ...job.skills.slice(0, 3),
    ],
    alternates: { canonical: `${BASE_URL}/lowongan/${job.slug}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/lowongan/${job.slug}`,
      type: "article",
      siteName: "PusatPerizinan.com",
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

// ------------------------------------------------------------
// JSON-LD — Google Jobs (JobPosting)
// ------------------------------------------------------------

function jobPostingDescriptionHtml(job: Job): string {
  const paragraphs = job.description
    .split("\n\n")
    .map((p) => `<p>${p}</p>`)
    .join("");
  const respItems = job.responsibilities.map((r) => `<li>${r}</li>`).join("");
  const qualItems = job.qualifications.map((q) => `<li>${q}</li>`).join("");
  return `${paragraphs}<p><strong>Tanggung Jawab:</strong></p><ul>${respItems}</ul><p><strong>Kualifikasi:</strong></p><ul>${qualItems}</ul>`;
}

function JobPostingJsonLd({ job }: { job: Job }) {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: jobPostingDescriptionHtml(job),
    datePosted: job.datePosted,
    validThrough: job.validThrough,
    employmentType: job.employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: job.company,
      sameAs: BASE_URL,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location.city,
        addressRegion: job.location.region,
        addressCountry: job.location.country,
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: job.salary.currency,
      value: {
        "@type": "QuantitativeValue",
        minValue: job.salary.min,
        maxValue: job.salary.max,
        unitText: job.salary.unit,
      },
    },
    directApply: true,
    industry: "Staffing & Recruitment",
    occupationalCategory: job.occupationalCategory,
    experienceRequirements: job.experience,
    educationRequirements: job.education,
    skills: job.skills.join(", "),
    qualifications: job.qualifications,
  };

  if (isPmiJob(job)) {
    jsonLd.applicantLocationRequirements = {
      "@type": "Country",
      name: "Indonesia",
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function BreadcrumbJsonLd({ job }: { job: Job }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Lowongan", item: `${BASE_URL}/lowongan` },
      {
        "@type": "ListItem",
        position: 3,
        name: job.title,
        item: `${BASE_URL}/lowongan/${job.slug}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ------------------------------------------------------------
// PAGE
// ------------------------------------------------------------

const PROSES_SELEKSI = [
  "Screening dokumen & CV",
  "Interview & asesmen",
  "Sinkronisasi employer & penandatanganan kontrak",
  "Pengurusan dokumen & keberangkatan",
];

export default async function LowonganDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = JOBS.find((j) => j.slug === slug);
  if (!job) notFound();

  const pmi = isPmiJob(job);
  const salaryRange = `${formatSalaryValue(job.salary.min, job.salary.currency)} – ${formatSalaryValue(
    job.salary.max,
    job.salary.currency
  )}/bulan`;
  const waText = `Halo, saya ingin melamar posisi ${job.title} (${job.location.city}). Berikut CV saya.`;
  const related = [
    ...JOBS.filter((j) => j.slug !== job.slug && j.category === job.category),
    ...JOBS.filter((j) => j.slug !== job.slug && j.category !== job.category),
  ].slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      <JobPostingJsonLd job={job} />
      <BreadcrumbJsonLd job={job} />

      {/* Header mini (konsisten dengan situs) */}
      <div className="border-b bg-card/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Kembali ke beranda">
            <img src="/logo-icon.png" alt="Logo PusatPerizinan.com" className="h-8 w-8" />
            <span className="font-bold text-[15px] tracking-tight">
              Pusat<span className="text-primary">Perizinan</span>
              <span className="text-gold">.com</span>
            </span>
          </Link>
          <Link
            href="/lowongan"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Semua Lowongan
          </Link>
        </div>
      </div>

      <article className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            <li className="flex items-center gap-1.5">
              <Link href="/" className="hover:text-primary transition-colors">
                Beranda
              </Link>
            </li>
            <li className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 opacity-50" aria-hidden />
              <Link href="/lowongan" className="hover:text-primary transition-colors">
                Lowongan
              </Link>
            </li>
            <li className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 opacity-50" aria-hidden />
              <span className="font-medium text-foreground" aria-current="page">
                {job.title}
              </span>
            </li>
          </ol>
        </nav>

        {/* Header lowongan */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge
              variant="secondary"
              className={
                job.category === "pmi"
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                  : job.category === "kantor"
                    ? "bg-stone-100 text-stone-800 dark:bg-stone-900/40 dark:text-stone-300"
                    : "bg-amber-50 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
              }
            >
              {JOB_CATEGORY_LABEL[job.category]}
            </Badge>
            {job.featured && (
              <Badge className="bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-800">
                Unggulan
              </Badge>
            )}
            {pmi && (
              <Badge variant="outline" className="gap-1 text-primary border-primary/30">
                <BadgeCheck className="h-3 w-3" aria-hidden /> Employer Terverifikasi
              </Badge>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-balance">
            {job.title}
          </h1>
          <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-muted-foreground">
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <Briefcase className="h-4 w-4" aria-hidden />
              {job.company}
            </span>
            <span aria-hidden>·</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" aria-hidden />
              {job.location.city}, {job.location.country} ({LOCATION_TYPE_LABEL[job.location.type]})
            </span>
          </p>

          {/* Chips info */}
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3.5 py-1.5 text-sm">
              <MapPin className="h-4 w-4 text-primary" aria-hidden />
              {job.location.city}, {job.location.country}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3.5 py-1.5 text-sm">
              <Banknote className="h-4 w-4 text-primary" aria-hidden />
              {salaryRange}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3.5 py-1.5 text-sm">
              <Clock className="h-4 w-4 text-primary" aria-hidden />
              {EMPLOYMENT_TYPE_LABEL[job.employmentType]}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3.5 py-1.5 text-sm">
              <CalendarDays className="h-4 w-4 text-primary" aria-hidden />
              Diposting {formatJobDate(job.datePosted)}
            </span>
          </div>

          {/* Pendidikan & pengalaman */}
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-2.5 rounded-xl border bg-card p-3.5 text-sm">
              <GraduationCap className="h-4 w-4 mt-0.5 shrink-0 text-primary" aria-hidden />
              <p>
                <strong className="font-semibold">Pendidikan:</strong> {job.education}
              </p>
            </div>
            <div className="flex items-start gap-2.5 rounded-xl border bg-card p-3.5 text-sm">
              <Users className="h-4 w-4 mt-0.5 shrink-0 text-primary" aria-hidden />
              <p>
                <strong className="font-semibold">Pengalaman:</strong> {job.experience}
              </p>
            </div>
          </div>
        </header>

        {/* Box gaji + CTA */}
        <div className="grid gap-4 lg:grid-cols-[1fr_320px] items-stretch mb-10">
          <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 dark:bg-emerald-950/30 dark:border-emerald-900">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800 dark:text-emerald-300">
              Rentang Gaji per Bulan
            </p>
            <p className="mt-1.5 text-2xl md:text-3xl font-extrabold text-emerald-900 dark:text-emerald-200">
              {formatSalaryValue(job.salary.min, job.salary.currency)}
              <span className="mx-2 text-emerald-500" aria-hidden>
                –
              </span>
              {formatSalaryValue(job.salary.max, job.salary.currency)}
            </p>
            <p className="mt-1.5 text-sm text-emerald-800/80 dark:text-emerald-300/80">
              Sesuai kontrak resmi · {EMPLOYMENT_TYPE_LABEL[job.employmentType]} · berlaku hingga{" "}
              {formatJobDate(job.validThrough)}
            </p>
          </div>
          <div className="flex flex-col gap-3 justify-center">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-105 min-h-[44px]"
            >
              <PhoneCall className="h-5 w-5" aria-hidden />
              Lamar via WhatsApp
            </a>
            <a
              href={`mailto:karir@pusatperizinan.com?subject=${encodeURIComponent(
                `Lamaran — ${job.title}`
              )}`}
              className="flex items-center justify-center gap-2 rounded-xl border-2 border-primary/30 bg-card px-5 py-3.5 font-semibold shadow-sm transition-all hover:border-primary min-h-[44px]"
            >
              <FileText className="h-5 w-5 text-primary" aria-hidden />
              Kirim CV via Email
            </a>
          </div>
        </div>

        {/* Konten utama */}
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-10 min-w-0">
            <section aria-labelledby="deskripsi-heading">
              <h2
                id="deskripsi-heading"
                className="flex items-center gap-2 text-xl font-bold mb-4"
              >
                <FileText className="h-5 w-5 text-primary" aria-hidden />
                Deskripsi Posisi
              </h2>
              <div className="space-y-3.5 text-[15px] leading-relaxed text-foreground/90">
                {job.description.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>

            <section aria-labelledby="tanggung-jawab-heading">
              <h2
                id="tanggung-jawab-heading"
                className="flex items-center gap-2 text-xl font-bold mb-4"
              >
                <ListChecks className="h-5 w-5 text-primary" aria-hidden />
                Tanggung Jawab
              </h2>
              <ul className="space-y-2.5">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2.5 rounded-xl border bg-card p-3.5 text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-primary" aria-hidden />
                    <span className="leading-snug">{r}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="kualifikasi-heading">
              <h2
                id="kualifikasi-heading"
                className="flex items-center gap-2 text-xl font-bold mb-4"
              >
                <BadgeCheck className="h-5 w-5 text-primary" aria-hidden />
                Kualifikasi
              </h2>
              <ul className="space-y-2.5">
                {job.qualifications.map((q, i) => (
                  <li key={i} className="flex items-start gap-2.5 rounded-xl border bg-card p-3.5 text-sm">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {i + 1}
                    </span>
                    <span className="leading-snug">{q}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="benefit-heading">
              <h2 id="benefit-heading" className="flex items-center gap-2 text-xl font-bold mb-4">
                <Users className="h-5 w-5 text-primary" aria-hidden />
                Benefit
              </h2>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {job.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5 rounded-xl border bg-card p-3.5 text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-primary" aria-hidden />
                    <span className="leading-snug">{b}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-2xl border bg-card p-5">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary" aria-hidden />
                Proses Seleksi
              </h3>
              <ol className="space-y-3">
                {PROSES_SELEKSI.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    <span className="leading-snug pt-0.5">{s}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 border-t pt-3 text-xs text-muted-foreground leading-relaxed">
                Proses seleksi gratis. Anda akan dihubungi maksimal 3 hari kerja setelah CV kami terima.
              </p>
            </div>

            <div className="rounded-2xl border bg-card p-5">
              <h3 className="text-sm font-bold mb-3">Keahlian yang Dicari</h3>
              <div className="flex flex-wrap gap-1.5">
                {job.skills.map((s) => (
                  <Badge key={s} variant="secondary" className="font-normal">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 flex items-start gap-3 rounded-xl bg-muted/60 border p-4 text-sm text-muted-foreground">
          <ShieldAlert className="h-4.5 w-4.5 mt-0.5 shrink-0 text-amber-600" aria-hidden />
          <p className="leading-relaxed">
            Pusat Perizinan dan mitranya tidak pernah memungut biaya perekrutan ilegal. Seluruh pengurusan
            dokumen mengikuti regulasi BNP2MI / UU 18/2017. Waspadai penipuan lowongan yang meminta
            pembayaran pribadi.
          </p>
        </div>

        {/* Lowongan lainnya */}
        <section aria-labelledby="lowongan-lainnya-heading" className="mt-12">
          <h2 id="lowongan-lainnya-heading" className="text-xl font-bold mb-5">
            Lowongan Lainnya
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/lowongan/${r.slug}`}
                className="group rounded-xl border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-md"
              >
                <Badge
                  variant="secondary"
                  className="mb-2 text-[10px] uppercase tracking-wide"
                >
                  {JOB_CATEGORY_LABEL[r.category]}
                </Badge>
                <h3 className="font-semibold leading-snug group-hover:text-primary transition-colors">
                  {r.title}
                </h3>
                <p className="mt-1.5 text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" aria-hidden />
                  {r.location.city}, {r.location.country}
                </p>
                <p className="mt-1.5 text-xs font-semibold text-primary">
                  {formatSalaryValue(r.salary.min, r.salary.currency)} –{" "}
                  {formatSalaryValue(r.salary.max, r.salary.currency)}/bln
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-4">
            <Link
              href="/lowongan"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              Lihat semua lowongan
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
