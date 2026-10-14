import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeDollarSign,
  Briefcase,
  Building2,
  CheckCircle2,
  MapPin,
  PhoneCall,
  Sparkles,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { JOBS, formatRupiah } from "@/lib/jobs-data";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";

export function generateStaticParams() {
  return [{}];
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Lowongan Kerja Terbaru — Karier di Bidang Perizinan, Pajak & PMI",
    description:
      "Lowongan kerja terbaru PusatPerizinan.com & mitra: marketing, konsultan perizinan, legal officer, trainer bahasa Jepang, coordinator PMI, content writer, dan lainnya. Gaji transparan, BPJS, karier jelas.",
    keywords: [
      "lowongan kerja perizinan",
      "loker konsultan perizinan",
      "lowongan marketing jakarta",
      "loker trainer bahasa jepang",
      "lowongan coordinator pmi",
      "lowongan content writer seo remote",
      "loker legal officer jakarta",
    ],
    alternates: { canonical: "/lowongan-kerja" },
    openGraph: {
      title: "Lowongan Kerja — PusatPerizinan.com",
      description:
        "12 posisi aktif: sales, konsultan, legal, konten, PMI. Gaji transparan, remote/hybrid tersedia. Lamar via WhatsApp, respons cepat.",
      url: "/lowongan-kerja",
    },
  };
}

function WorkTypeBadge({ workType }: { workType: "onsite" | "hybrid" | "remote" }) {
  const map = {
    onsite: { label: "On-site", cls: "bg-muted text-muted-foreground border-border" },
    hybrid: { label: "Hybrid", cls: "bg-gold/10 text-gold border-gold/20" },
    remote: { label: "Remote", cls: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  } as const;
  const m = map[workType];
  return <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${m.cls}`}>{m.label}</span>;
}

export default function LowonganPage() {
  const featured = JOBS.filter((j) => j.featured);
  const others = JOBS.filter((j) => !j.featured);

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Kembali ke beranda">
            <img src="/logo-icon.png" alt="Logo PusatPerizinan.com" className="h-8 w-8" />
            <span className="font-bold text-[15px] tracking-tight">
              Pusat<span className="text-primary">Perizinan</span>
              <span className="text-gold">.com</span>
            </span>
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Halo, saya ingin menanyakan lowongan kerja di PusatPerizinan.com")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md min-h-[44px]"
          >
            <PhoneCall className="h-4 w-4" aria-hidden />
            Tanya via WhatsApp
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-transparent to-gold/5 border-b">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Beranda</Link>
            <span className="mx-1.5">/</span>
            <span className="font-medium text-foreground">Lowongan Kerja</span>
          </nav>
          <div className="flex items-center gap-2 mb-3">
            <Badge className="bg-primary/10 text-primary border border-primary/20">
              <Sparkles className="h-3 w-3 mr-1" aria-hidden /> {JOBS.length} Posisi Aktif — Diperbarui Berkala
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-balance">
            Lowongan Kerja — Tumbuh Bersama Industri Perizinan
          </h1>
          <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Kami merekrut tim untuk membantu ribuan pelaku usaha dan pekerja migran Indonesia. Gaji transparan,
            pelatihan nyata, jalur karier jelas. Lamar langsung via WhatsApp — tanpa biaya apa pun.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-primary" aria-hidden /> {JOBS.length} posisi aktif</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" aria-hidden /> Jakarta, Bekasi & remote nasional</span>
            <span className="flex items-center gap-1.5"><BadgeDollarSign className="h-4 w-4 text-primary" aria-hidden /> Range gaji tercantum jujur</span>
            <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-primary" aria-hidden /> Proses lamaran &lt; 7 hari</span>
          </div>
        </div>
      </section>

      {/* Daftar lowongan */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Posisi prioritas */}
        {featured.length > 0 && (
          <>
            <h2 className="font-bold text-xl mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-gold" aria-hidden /> Prioritas Rekrutmen
            </h2>
            <div className="grid gap-4 md:grid-cols-2 mb-10">
              {featured.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </>
        )}

        {/* Posisi lainnya */}
        <h2 className="font-bold text-xl mb-4 flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" aria-hidden /> Semua Posisi Terbuka
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {others.map((job) => (
            <JobCard key={job.id} job={job} compact />
          ))}
        </div>
      </section>

      {/* Perhatian anti-penipuan */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-10">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-bold text-amber-900 flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-5 w-5" aria-hidden /> Perhatian: Rekrutmen Kami 100% Gratis
          </h2>
          <p className="text-sm text-amber-800 leading-relaxed">
            PusatPerizinan.com dan mitranya TIDAK PERNAH memungut biaya lamaran, biaya training, atau biaya
            administrasi apa pun dari pelamar. Jika ada pihak yang mengatasnamakan kami meminta pembayaran, jangan
            transfer — lapor langsung ke WhatsApp resmi kami di bawah. Untuk posisi di LPK mitra, biaya pelatihan
            (jika ada) mengikuti regulasi KemenP2MI dan diinformasikan tertulis sebelum penandatanganan.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-14">
        <div className="rounded-2xl border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Tidak menemukan posisi yang cocok? Kirim CV terbuka ke WhatsApp kami, atau jelajahi{" "}
            <Link href="/layanan" className="font-semibold text-primary hover:underline">layanan perizinan</Link> &{" "}
            <Link href="/roadmap" className="font-semibold text-primary hover:underline">alat AI gratis</Link> kami.
          </p>
        </div>
      </section>
    </main>
  );
}

function JobCard({ job, compact = false }: { job: (typeof JOBS)[number]; compact?: boolean }) {
  return (
    <article className={`rounded-2xl border bg-card p-5 flex flex-col hover:shadow-md transition-shadow ${compact ? "" : "md:p-6"}`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
          <Building2 className="h-3.5 w-3.5" aria-hidden /> {job.organization}
        </span>
        <WorkTypeBadge workType={job.workType} />
      </div>
      <h3 className={`font-bold leading-snug ${compact ? "text-base" : "text-lg"}`}>
        <Link href={`/lowongan-kerja/${job.slug}`} className="hover:text-primary transition-colors">
          {job.title}
        </Link>
      </h3>
      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" aria-hidden /> {job.city}</span>
        <span className="flex items-center gap-1"><BadgeDollarSign className="h-3.5 w-3.5" aria-hidden /> {formatRupiah(job.salaryMin)}–{formatRupiah(job.salaryMax)}/bln</span>
        <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" aria-hidden /> {job.employmentType === "FULL_TIME" ? "Penuh Waktu" : job.employmentType === "PART_TIME" ? "Paruh Waktu" : job.employmentType === "CONTRACT" ? "Kontrak" : "Magang"}</span>
      </div>
      {job.salaryNote && !compact && <p className="mt-2 text-xs text-muted-foreground italic">{job.salaryNote}</p>}
      <div className="mt-auto pt-4">
        <Link
          href={`/lowongan-kerja/${job.slug}`}
          className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-md min-h-[44px] w-full"
        >
          Lihat Detail & Lamar
        </Link>
      </div>
    </article>
  );
}
