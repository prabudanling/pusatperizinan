"use client";

// ============================================================
// PUSATPERIZINAN.COM — Galeri Kantor Resmi (BERANDA)
// ============================================================
// Trust section: bukti fisik kantor pusat Jakarta SCBD & cabang
// Bandung — sinyal E-E-A-T "perusahaan nyata berstandar
// internasional", bukan alamat virtual.
//
// Design system Task 6:
//   • Animasi compositor-only (framer whileInView once, transform &
//     opacity saja) — hormat prefers-reduced-motion via MotionProvider
//   • Hover scale 1.03 transform-only, aspect ratio terkunci
//     (height fix + object-cover) → nol layout shift (CLS aman)
//   • next/image + sizes responsif → optimizer Next.js menyajikan
//     WebP/AVIF
//   • i18n inline bilingual id/en (fallback id untuk 28 bahasa lain)
// ============================================================

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-provider";

const EASE = [0.22, 1, 0.36, 1] as const;

const HALF_SIZES = "(max-width: 768px) 100vw, (max-width: 1280px) 58vw, 700px";

interface OfficePhoto {
  src: string;
  alt: { id: string; en: string };
  chip: { id: string; en: string };
}

const PHOTOS: OfficePhoto[] = [
  {
    src: "/kantor/kantor-resepsionis.jpg",
    alt: {
      id: "Resepsionis kantor pusat PusatPerizinan.com — meja reception, dinding tanaman hijau, dan logo PP pada branding wall",
      en: "Reception area of PusatPerizinan.com head office — front desk, green plant wall and PP logo on the branding wall",
    },
    chip: { id: "Kantor Pusat — Jakarta SCBD", en: "Head Office — Jakarta SCBD" },
  },
  {
    src: "/kantor/kantor-branding-wall.jpg",
    alt: {
      id: "Branding wall PusatPerizinan.com dengan logo PP di kantor pusat Jakarta",
      en: "PusatPerizinan.com branding wall with PP logo at the Jakarta head office",
    },
    chip: { id: "Branding Wall — Jakarta", en: "Branding Wall — Jakarta" },
  },
  {
    src: "/kantor/kantor-jakarta.jpg",
    alt: {
      id: "Papan nama PusatPerizinan.com pada fasade gedung kantor pusat di Jakarta",
      en: "PusatPerizinan.com signage on the facade of the head office building in Jakarta",
    },
    chip: { id: "Signage Gedung — Jakarta", en: "Building Signage — Jakarta" },
  },
  {
    src: "/kantor/kantor-bandung-lobi.jpg",
    alt: {
      id: "Lobi kantor cabang PusatPerizinan.com di Bandung dengan pemandangan kota",
      en: "Lobby of the PusatPerizinan.com branch office in Bandung with city view",
    },
    chip: { id: "Kantor Cabang — Bandung", en: "Branch Office — Bandung" },
  },
  {
    src: "/kantor/kantor-bandung-fasade.jpg",
    alt: {
      id: "Fasade gedung kantor cabang PusatPerizinan.com di Bandung",
      en: "Facade of the PusatPerizinan.com branch office building in Bandung",
    },
    chip: { id: "Fasade Kantor — Bandung", en: "Office Facade — Bandung" },
  },
];

function OfficeFigure({
  photo,
  index,
  className,
  sizes,
  heightClass,
}: {
  photo: OfficePhoto;
  index: number;
  className?: string;
  sizes: string;
  heightClass: string;
}) {
  const { lang } = useLanguage();
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: EASE, delay: (index % 2) * 0.08 }}
      className={`group relative overflow-hidden rounded-2xl border border-border/70 shadow-sm ${className ?? ""}`}
    >
      <Image
        src={photo.src}
        alt={lang === "en" ? photo.alt.en : photo.alt.id}
        width={2000}
        height={1333}
        sizes={sizes}
        className={`${heightClass} w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]`}
      />
      <figcaption className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm">
        <MapPin className="h-3 w-3" aria-hidden="true" />
        {lang === "en" ? photo.chip.en : photo.chip.id}
      </figcaption>
    </motion.figure>
  );
}

export function OfficeGallery() {
  const { lang } = useLanguage();
  const en = lang === "en";

  return (
    <section id="kantor" className="py-20 md:py-28 scroll-mt-20" aria-labelledby="kantor-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
            {en ? "Our Offices" : "Kantor Resmi Kami"}
          </p>
          <h2 id="kantor-heading" className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
            {en ? (
              <>
                Real Offices in Jakarta & Bandung,{" "}
                <span className="text-gradient-brand">Not a Virtual Address</span>
              </>
            ) : (
              <>
                Kantor Nyata di Jakarta & Bandung,{" "}
                <span className="text-gradient-brand">Bukan Alamat Virtual</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {en
              ? "Head office at Indonesia Stock Exchange Building, SCBD Jakarta — with a branch office in Bandung. Every permit is handled from a real, professional workspace you can visit by appointment."
              : "Kantor pusat di Indonesia Stock Exchange Building, SCBD Jakarta — dengan kantor cabang di Bandung. Setiap izin dikerjakan dari ruang kerja profesional yang nyata dan bisa Anda kunjungi dengan appointment."}
          </p>
        </motion.div>

        {/* Grid editorial asimetris — 2 baris pasangan + banner fasade */}
        <div className="mt-12 grid gap-4 md:grid-cols-12">
          <OfficeFigure
            photo={PHOTOS[0]}
            index={0}
            className="md:col-span-7"
            sizes={HALF_SIZES}
            heightClass="h-64 md:h-80"
          />
          <OfficeFigure
            photo={PHOTOS[1]}
            index={1}
            className="md:col-span-5"
            sizes={HALF_SIZES}
            heightClass="h-64 md:h-80"
          />
          <OfficeFigure
            photo={PHOTOS[2]}
            index={2}
            className="md:col-span-5"
            sizes={HALF_SIZES}
            heightClass="h-64 md:h-80"
          />
          <OfficeFigure
            photo={PHOTOS[3]}
            index={3}
            className="md:col-span-7"
            sizes={HALF_SIZES}
            heightClass="h-64 md:h-80"
          />
          <OfficeFigure
            photo={PHOTOS[4]}
            index={4}
            className="md:col-span-12"
            sizes="100vw"
            heightClass="h-56 md:h-80"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center"
        >
          <a
            href="/tentang-kami"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            {en ? "Get to know our company" : "Kenali perusahaan kami lebih dekat"}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
          <span className="hidden sm:block h-4 w-px bg-border" aria-hidden="true" />
          <p className="text-xs text-muted-foreground">
            {en
              ? "Office visits by appointment — book via WhatsApp"
              : "Kunjungan kantor dengan appointment — jadwalkan via WhatsApp"}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
