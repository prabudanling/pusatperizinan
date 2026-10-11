import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BadgeDollarSign,
  Briefcase,
  Building2,
  CalendarClock,
  CheckCircle2,
  GraduationCap,
  ListChecks,
  MapPin,
  PhoneCall,
  Send,
  ShieldCheck,
  Star,
  UserCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  JOBS,
  getJobBySlug,
  formatRupiah,
  isoDaysAgo,
  isoValidThrough,
} from "@/lib/jobs-data";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";
import { SITE_URL, absUrl } from "@/lib/site";

export function generateStaticParams() {
  return JOBS.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) return {};
  const title = `${job.title} — ${job.city}`;
  const desc = `Lowongan ${job.title} di ${job.city}. Gaji ${formatRupiah(job.salaryMin)}–${formatRupiah(job.salaryMax)}/bulan, ${job.employmentType === "FULL_TIME" ? "penuh waktu" : job.employmentType === "PART_TIME" ? "paruh waktu" : "kontrak"}. ${job.description[0].slice(0, 110)}… Lamar via WhatsApp, proses < 7 hari.`;
  return {
    title,
    description: desc,
    keywords: [
      `lowongan ${job.title.toLowerCase()}`,
      `loker ${job.city.toLowerCase()}`,
      `lowongan kerja ${job.city.toLowerCase()}`,
      "lowongan perizinan",
      "loker terbaru 2026",
      ...job.skills.slice(0, 2).map((s) => `lowongan ${s.toLowerCase()}`),
    ],
    alternates: { canonical: `/lowongan-kerja/${job.slug}` },
    openGraph: {
      title: `${title} | PusatPerizinan.com`,
      description: desc,
      url: `/lowongan-kerja/${job.slug}`,
      type: "article",
    },
  };
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) notFound();

  const relatedJobs = JOBS.filter((j) => j.slug !== job.slug && j.category === job.category)
    .concat(JOBS.filter((j) => j.slug !== job.slug && j.category !== job.category))
    .slice(0, 3);

  const waText = `Halo, saya ingin melamar posisi "${job.title}" (${job.city}) yang saya lihat di website PusatPerizinan.com.\n\nNama saya: \nPengalaman singkat: \n\nMohon informasi proses selanjutnya. Terima kasih!`;

  const employmentLabel =
    job.employmentType === "FULL_TIME"
      ? "Penuh Waktu"
      : job.employmentType === "PART_TIME"
        ? "Paruh Waktu"
        : job.employmentType === "CONTRACT"
          ? "Kontrak"
          : "Magang";
  const postedDate = isoDaysAgo(job.postedDaysAgo);
  const postedLabel = new Date(postedDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  const jobPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: [
      `<p>${job.description.map((p) => escapeHtml(p)).join("</p><p>")}</p>`,
      `<p><strong>Tanggung Jawab:</strong></p><ul>${job.responsibilities.map((r) => `<li>${escapeHtml(r)}</li>`).join("")}</ul>`,
      `<p><strong>Kualifikasi:</strong></p><ul>${job.qualifications.map((q) => `<li>${escapeHtml(q)}</li>`).join("")}</ul>`,
      `<p><strong>Benefit:</strong></p><ul>${job.benefits.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>`,
    ].join(""),
    identifier: {
      "@type": "PropertyValue",
      name: job.organization,
      value: job.id,
    },
    datePosted: postedDate,
    validThrough: isoValidThrough(),
    employmentType: job.employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: job.organization,
      sameAs: SITE_URL,
      logo: absUrl("/logo-icon.png"),
    },
    ...(job.workType === "remote"
      ? {
          jobLocationType: "TELECOMMUTE",
          applicantLocationRequirements: { "@type": "Country", name: "Indonesia" },
        }
      : {
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              streetAddress: job.address,
              addressLocality: job.city,
              addressRegion: job.province,
              addressCountry: "ID",
            },
          },
        }),
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "IDR",
      value: {
        "@type": "QuantitativeValue",
        minValue: job.salaryMin,
        maxValue: job.salaryMax,
        unitText: "MONTH",
      },
    },
    experienceRequirements: {
      "@type": "OccupationalExperienceRequirements",
      monthsOfExperience: job.experienceMonths,
    },
    educationRequirements: job.education,
    skills: job.skills.join(", "),
    directApply: true,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: "https://pusatperizinan.com/" },
      { "@type": "ListItem", position: 2, name: "Lowongan Kerja", item: "https://pusatperizinan.com/lowongan-kerja" },
      { "@type": "ListItem", position: 3, name: job.title, item: `https://pusatperizinan.com/lowongan-kerja/${job.slug}` },
    ],
  };

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Header */}
      <div className="border-b bg-card/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/lowongan-kerja" className="flex items-center gap-2.5" aria-label="Kembali ke daftar lowongan">
            <img src="/logo-icon.png" alt="Logo PusatPerizinan.com" className="h-8 w-8" />
            <span className="font-bold text-[15px] tracking-tight">
              Pusat<span className="text-primary">Perizinan</span>
              <span className="text-gold">.com</span>
            </span>
            <span className="text-sm text-muted-foreground hidden sm:inline">/ Lowongan Kerja</span>
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md min-h-[44px]"
          >
            <Send className="h-4 w-4" aria-hidden />
            Lamar Sekarang
          </a>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Beranda</Link>
          <span className="mx-1.5">/</span>
          <Link href="/lowongan-kerja" className="hover:text-primary">Lowongan Kerja</Link>
          <span className="mx-1.5">/</span>
          <span className="font-medium text-foreground">{job.title}</span>
        </nav>
      </div>

      {/* Job header */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="rounded-2xl border bg-card p-6 md:p-8">
          {job.isPartner && (
            <Badge className="mb-3 bg-gold/10 text-gold border border-gold/20">
              <Building2 className="h-3 w-3 mr-1" aria-hidden /> Dibuka oleh LPK mitra resmi
            </Badge>
          )}
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-balance">{job.title}</h1>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm">
            <div className="flex items-start gap-2">
              <Building2 className="h-4 w-4 mt-0.5 text-primary shrink-0" aria-hidden />
              <div>
                <p className="font-semibold">{job.organization}</p>
                <p className="text-xs text-muted-foreground">{job.isPartner ? "Mitra jaringan" : "Perusahaan utama"}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" aria-hidden />
              <div>
                <p className="font-semibold">{job.city}</p>
                <p className="text-xs text-muted-foreground capitalize">{job.workType === "remote" ? "Remote penuh" : job.workType}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <BadgeDollarSign className="h-4 w-4 mt-0.5 text-primary shrink-0" aria-hidden />
              <div>
                <p className="font-semibold">{formatRupiah(job.salaryMin)}–{formatRupiah(job.salaryMax)}/bulan</p>
                <p className="text-xs text-muted-foreground">{job.salaryNote ?? "Range gaji transparan"}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CalendarClock className="h-4 w-4 mt-0.5 text-primary shrink-0" aria-hidden />
              <div>
                <p className="font-semibold">{employmentLabel}</p>
                <p className="text-xs text-muted-foreground">Diposting {postedLabel}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-4 text-base font-bold text-primary-foreground shadow-md transition-all hover:shadow-lg min-h-[44px]"
            >
              <Send className="h-5 w-5" aria-hidden />
              Lamar via WhatsApp — Proses &lt; 7 Hari
            </a>
            <div className="rounded-xl border bg-background px-4 py-3 text-xs text-muted-foreground flex items-center gap-2 sm:max-w-[220px]">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" aria-hidden />
              Tanpa biaya lamaran — 100% gratis
            </div>
          </div>
        </div>
      </div>

      {/* Konten */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-10 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          {/* Deskripsi */}
          <section aria-label="Deskripsi pekerjaan">
            <h2 className="font-bold text-xl mb-3 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" aria-hidden /> Tentang Posisi Ini
            </h2>
            <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
              {job.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {/* Tanggung jawab */}
          <section aria-label="Tanggung jawab">
            <h2 className="font-bold text-xl mb-3 flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-primary" aria-hidden /> Tanggung Jawab
            </h2>
            <ul className="space-y-2.5 text-sm">
              {job.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Kualifikasi */}
          <section aria-label="Kualifikasi">
            <h2 className="font-bold text-xl mb-3 flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-primary" aria-hidden /> Kualifikasi
            </h2>
            <ul className="space-y-2.5 text-sm">
              {job.qualifications.map((q, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden />
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ lamaran */}
          <section aria-label="Pertanyaan umum lamaran">
            <h2 className="font-bold text-xl mb-3 flex items-center gap-2">
              <PhoneCall className="h-5 w-5 text-primary" aria-hidden /> Proses Lamaran
            </h2>
            <div className="space-y-3 text-sm">
              {[
                { q: "Bagaimana cara melamar?", a: "Klik tombol 'Lamar via WhatsApp' di atas, lengkapi template pesan (nama + pengalaman singkat), kirim. Tim HR merespons dalam 1-3 hari kerja." },
                { q: "Apakah perlu mengirim CV?", a: "Untuk tahap pertama cukup pesan WhatsApp. CV diminta setelah Anda lolos penyaringan awal." },
                { q: "Apakah ada biaya lamaran?", a: "Tidak ada sama sekali. Rekrutmen kami gratis — jika ada pihak meminta pembayaran, itu bukan kami." },
                { q: "Berapa lama prosesnya?", a: "Rata-rata kurang dari 7 hari kerja: penyaringan → wawancara HR → wawancara user → penawaran." },
              ].map((f, i) => (
                <div key={i} className="rounded-xl border bg-card p-4">
                  <p className="font-semibold">{f.q}</p>
                  <p className="text-muted-foreground mt-1 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          <div className="rounded-2xl border bg-card p-5 lg:sticky lg:top-6">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <Star className="h-4 w-4 text-gold" aria-hidden /> Ringkasan
            </h2>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-xs text-muted-foreground">Posisi</dt>
                <dd className="font-semibold">{job.title}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Perusahaan</dt>
                <dd className="font-semibold">{job.organization}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Lokasi</dt>
                <dd className="font-semibold">{job.city}, {job.province}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Jenis</dt>
                <dd className="font-semibold">{employmentLabel}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Gaji</dt>
                <dd className="font-semibold">{formatRupiah(job.salaryMin)}–{formatRupiah(job.salaryMax)}/bln</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Pendidikan</dt>
                <dd className="font-semibold flex items-start gap-1.5">
                  <GraduationCap className="h-4 w-4 mt-0.5 text-primary shrink-0" aria-hidden /> {job.education}
                </dd>
              </div>
            </dl>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-sm font-bold text-primary-foreground shadow-md transition-all hover:shadow-lg min-h-[44px]"
            >
              <Send className="h-4 w-4" aria-hidden /> Lamar Sekarang
            </a>
          </div>

          {/* Skill tags */}
          <div className="rounded-2xl border bg-card p-5">
            <h2 className="font-bold mb-3 text-sm">Keahlian Terkait</h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((s) => (
                <span key={s} className="rounded-full bg-muted px-3 py-1 text-xs font-medium">{s}</span>
              ))}
            </div>
          </div>

          {/* Benefit */}
          <div className="rounded-2xl border bg-card p-5">
            <h2 className="font-bold mb-3 text-sm">Benefit</h2>
            <ul className="space-y-2 text-sm">
              {job.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" aria-hidden /> {b}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* Related */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-14">
        <h2 className="font-bold text-xl mb-4">Lowongan Lainnya</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {relatedJobs.map((rj) => (
            <Link
              key={rj.id}
              href={`/lowongan-kerja/${rj.slug}`}
              className="rounded-2xl border bg-card p-5 hover:shadow-md transition-shadow"
            >
              <p className="text-xs text-muted-foreground mb-1">{rj.city}</p>
              <h3 className="font-semibold leading-snug">{rj.title}</h3>
              <p className="text-sm text-primary font-semibold mt-2">{formatRupiah(rj.salaryMin)}–{formatRupiah(rj.salaryMax)}/bln</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
