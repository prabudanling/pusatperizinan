import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SITE_NAME, CONTACT } from "@/lib/site";

// ============================================================
// PUSATPERIZINAN.COM — /kontak (E-E-A-T: NAP konsisten, PHASE 7)
// Data NAP diambil dari site.ts — satu sumber untuk schema,
// footer, dan halaman ini (entity consistency untuk local SEO).
// ============================================================

export const metadata: Metadata = {
  title: "Kontak — Kantor SCBD Jakarta & WhatsApp Bisnis",
  description: `Hubungi ${SITE_NAME}: kantor di Indonesia Stock Exchange Building SCBD Jakarta Selatan, WhatsApp ${CONTACT.phoneDisplay}, email ${CONTACT.email}. Jam operasional ${CONTACT.hours}.`,
  alternates: { canonical: "/kontak" },
  openGraph: {
    title: `Kontak ${SITE_NAME}`,
    description: "Kantor SCBD Jakarta, WhatsApp, email, dan jam operasional.",
    url: "/kontak",
    type: "website",
    siteName: SITE_NAME,
    locale: "id_ID",
  },
  robots: { index: true, follow: true },
};

export default function KontakPage() {
  const waHref = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Halo PusatPerizinan.com, saya ingin konsultasi perizinan usaha."
  )}`;

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-primary">Beranda</Link></li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="font-semibold text-foreground">Kontak</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Hubungi Kami</h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Konsultasi awal gratis — jelaskan rencana usaha Anda, tim kami membalas
          dengan jalur perizinan yang paling sesuai dan estimasi biayanya.
        </p>

        <div className="mt-8 space-y-4">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-primary/25 bg-primary/5 p-5 transition-colors hover:bg-primary/10"
          >
            <MessageCircle className="h-6 w-6 shrink-0 text-primary" aria-hidden />
            <div>
              <p className="font-bold">WhatsApp Bisnis (paling cepat)</p>
              <p className="text-sm text-muted-foreground">{CONTACT.phoneDisplay} — dijawab konsultan, bukan bot</p>
            </div>
          </a>

          <div className="flex items-center gap-4 rounded-2xl border border-border/70 bg-card p-5">
            <Phone className="h-6 w-6 shrink-0 text-primary" aria-hidden />
            <div>
              <p className="font-bold">Telepon</p>
              <a href={`tel:${CONTACT.phoneIntl}`} className="text-sm text-muted-foreground hover:text-primary">
                {CONTACT.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-border/70 bg-card p-5">
            <Mail className="h-6 w-6 shrink-0 text-primary" aria-hidden />
            <div>
              <p className="font-bold">Email</p>
              <a href={`mailto:${CONTACT.email}`} className="text-sm text-muted-foreground hover:text-primary">
                {CONTACT.email}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-2xl border border-border/70 bg-card p-5">
            <MapPin className="h-6 w-6 shrink-0 text-primary" aria-hidden />
            <div>
              <p className="font-bold">Kantor</p>
              <address className="mt-1 text-sm not-italic text-muted-foreground leading-relaxed">
                {CONTACT.address.street}, {CONTACT.address.city}, {CONTACT.address.region}{" "}
                {CONTACT.address.postalCode}
              </address>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-border/70 bg-card p-5">
            <Clock className="h-6 w-6 shrink-0 text-primary" aria-hidden />
            <div>
              <p className="font-bold">Jam Operasional</p>
              <p className="text-sm text-muted-foreground">{CONTACT.hours}</p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-xs text-muted-foreground leading-relaxed">
          Dengan menghubungi kami, data yang Anda bagikan digunakan hanya untuk
          keperluan konsultasi &amp; pengurusan izin Anda — lihat{" "}
          <Link href="/kebijakan-privasi" className="font-semibold text-primary hover:underline">
            Kebijakan Privasi
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
