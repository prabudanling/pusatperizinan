import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, Building2, CheckCircle2, Globe2, MapPin, ShieldCheck, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FOUNDER, TEAM } from "@/lib/team-data";
import { CONTACT, SITE_NAME, TRUST_METRICS } from "@/lib/site";

// ============================================================
// PUSATPERIZINAN.COM — /tentang-kami (E-E-A-T, PHASE 6)
// Halaman entitas: siapa kami, siapa yang mengerjakan,
// alamat nyata, dan keterbukaan status klaim bisnis.
// ============================================================

export const metadata: Metadata = {
  title: "Tentang Kami — Tim Konsultan Perizinan di SCBD Jakarta",
  description: `${SITE_NAME} (${CONTACT.foundingYear}) adalah jaringan konsultan perizinan & perpajakan berbasis di SCBD, Jakarta. Kenali founder, tim konsultan, dan cara kami bekerja untuk klien di ${TRUST_METRICS.provinces} provinsi.`,
  alternates: { canonical: "/tentang-kami" },
  openGraph: {
    title: `Tentang ${SITE_NAME}`,
    description: "Tim konsultan perizinan berbasis di SCBD Jakarta — kenali orang-orang yang mengerjakan izin Anda.",
    url: "/tentang-kami",
    type: "website",
    siteName: SITE_NAME,
    locale: "id_ID",
  },
  robots: { index: true, follow: true },
};

export default function TentangKamiPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-primary">Beranda</Link></li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="font-semibold text-foreground">Tentang Kami</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Tentang {SITE_NAME}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          {SITE_NAME} adalah jaringan konsultan perizinan usaha, perpajakan, dan
          penempatan pekerja migran yang berbasis di Indonesia Stock Exchange
          Building, SCBD — Jakarta. Kami menangani pengurusan izin dari ujung ke
          ujung: analisis KBLI, pengajuan via OSS-RBA, koordinasi notaris dan
          instansi teknis, hingga izin terbit dan kewajiban pasca-terbit.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border/70 bg-secondary/40 p-5">
            <MapPin className="h-5 w-5 text-primary" aria-hidden />
            <p className="mt-2 text-sm font-bold">Kantor</p>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              {CONTACT.address.street}, {CONTACT.address.city} {CONTACT.address.postalCode}
            </p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-secondary/40 p-5">
            <Building2 className="h-5 w-5 text-primary" aria-hidden />
            <p className="mt-2 text-sm font-bold">Badan Usaha</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Jasa dioperasikan oleh jaringan konsultan di bawah entitas{" "}
              <strong>PT Digital Bisnis Manajemen</strong>.
            </p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-secondary/40 p-5">
            <Globe2 className="h-5 w-5 text-primary" aria-hidden />
            <p className="mt-2 text-sm font-bold">Jangkauan</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {TRUST_METRICS.provinces} provinsi &amp; {TRUST_METRICS.cities} kabupaten/kota
              di Indonesia.
            </p>
          </div>
        </div>

        {/* Founder */}
        <section aria-label="Founder" className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight">Founder &amp; Principal Consultant</h2>
          <div className="mt-5 rounded-3xl border border-primary/25 bg-primary/5 p-6">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-lg font-extrabold text-primary-foreground" aria-hidden>
                {FOUNDER.initials}
              </span>
              <div>
                <p className="font-bold">{FOUNDER.name}</p>
                <p className="text-sm text-primary font-semibold">{FOUNDER.title.id}</p>
                <Badge variant="outline" className="mt-1 rounded-full border-gold/40 text-[10px] font-semibold">
                  <Award className="h-3 w-3 mr-1" aria-hidden /> {FOUNDER.credentials}
                </Badge>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85">{FOUNDER.bio.id}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {FOUNDER.focus.id.map((f) => (
                <li key={f} className="rounded-full bg-card border border-primary/25 px-3 py-1 text-[11px] font-semibold text-primary">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Tim */}
        <section aria-label="Tim konsultan" className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight">Tim Konsultan</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Setiap klien ditangani konsultan dengan spesialisasi sektor yang sesuai —
            bukan operator call center.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {TEAM.map((m) => (
              <div key={m.name} className="rounded-2xl border border-border/70 bg-card p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-sm font-extrabold text-primary" aria-hidden>
                    {m.initials}
                  </span>
                  <div>
                    <p className="text-sm font-bold">{m.name}</p>
                    <p className="text-xs text-primary font-semibold">{m.title.id}</p>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{m.bio.id}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Keterbukaan cara kerja */}
        <section aria-label="Cara kami bekerja" className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" aria-hidden />
            Cara Kami Bekerja
          </h2>
          <ul className="mt-4 space-y-3">
            {[
              "Semua pengajuan melalui jalur resmi: OSS-RBA (Kemeninvest/BKPM), SIAK Kemenkumham, DJP Coretax, BPJPH, BPOM, dan sistem instansi daerah — tanpa jalur pintas.",
              "Dokumen Anda diproses konsultan yang ditugaskan secara individu; Anda menerima update progres dan bisa memverifikasi setiap dokumen di portal resmi terkait.",
              "Angka-angka statistik yang kami tampilkan (jumlah klien, izin terbit, rating) adalah klaim bisnis internal — kami menyediakan bukti riwayat pekerjaan saat Anda memintanya dalam konsultasi.",
              "Regulasi berubah. Konten panduan kami merujuk dasar hukum dan instansi sumber; untuk keputusan hukum final, verifikasi ke publikasi resmi instansi terkait.",
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/85">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-primary to-emerald-700 p-5 text-primary-foreground">
            <ShieldCheck className="h-5 w-5 shrink-0" aria-hidden />
            <p className="flex-1 text-sm font-semibold">
              Punya kasus perizinan yang macet atau rumit? Itu spesialisasi kami.
            </p>
            <Button asChild variant="secondary" className="rounded-full font-bold shrink-0">
              <Link href="/kontak">
                Hubungi Kami <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
