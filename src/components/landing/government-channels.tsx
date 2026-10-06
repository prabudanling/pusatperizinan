"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Landmark, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { INSTITUTIONS } from "@/lib/institutions";
import { InstitutionSeal } from "@/components/institutions/institution-seal";

function SealChip({ i }: { i: number }) {
  const inst = INSTITUTIONS[i];
  return (
    <div className="flex shrink-0 items-center gap-2.5 rounded-2xl border bg-card px-4 py-2.5 shadow-sm">
      <InstitutionSeal inst={inst} size="sm" />
      <div className="pr-1">
        <p className="whitespace-nowrap text-[13px] font-bold leading-tight">{inst.name}</p>
        <p className="whitespace-nowrap text-[11px] text-muted-foreground">{inst.role}</p>
      </div>
    </div>
  );
}

/**
 * Section "Kanal Resmi Pemerintah" — marquee dua arah berisi 20 instansi.
 * Sinyal E-E-A-T untuk Google + trust signal instan untuk pengunjung.
 */
export function GovernmentChannels() {
  const reduce = useReducedMotion();
  const half = Math.ceil(INSTITUTIONS.length / 2);
  const rowA = INSTITUTIONS.slice(0, half).map((_, idx) => idx);
  const rowB = INSTITUTIONS.slice(half).map((_, idx) => idx + half);

  const marqueeProps = (direction: "left" | "right") =>
    reduce
      ? {}
      : {
          animate: { x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] },
          transition: { duration: 46, repeat: Infinity, ease: "linear" as const },
        };

  return (
    <section
      id="kanal-resmi"
      aria-labelledby="kanal-resmi-heading"
      className="border-y bg-card/40 py-16 md:py-20 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <Badge
            variant="outline"
            className="rounded-full border-primary/30 bg-primary/5 text-primary font-semibold px-4 py-1"
          >
            <Landmark className="mr-1.5 h-3.5 w-3.5" aria-hidden />
            Kanal Resmi Pemerintah
          </Badge>
          <h2
            id="kanal-resmi-heading"
            className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight"
          >
            Kami Mengurus Proses di{" "}
            <span className="text-gradient-brand">20 Kanal Resmi Setiap Hari</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Kemenkumham, DJP, OSS-RBA, BPJPH, BPOM, Kemenag, ESDM, LPJK, dan 12 instansi lainnya —
            semua legalitas Anda diproses di sistem resmi pemerintah, atas nama Anda, dan dapat
            diverifikasi langsung.
          </p>
        </div>
      </div>

      {/* Marquee dua arah */}
      <div className="relative mt-12 space-y-4">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-28 bg-gradient-to-r from-background to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-28 bg-gradient-to-l from-background to-transparent"
          aria-hidden
        />
        <div className="overflow-hidden">
          <motion.div className="flex w-max gap-4 px-4" {...marqueeProps("left")}>
            {[...rowA, ...rowA].map((i, k) => (
              <SealChip key={`a-${k}`} i={i} />
            ))}
          </motion.div>
        </div>
        <div className="overflow-hidden">
          <motion.div className="flex w-max gap-4 px-4" {...marqueeProps("right")}>
            {[...rowB, ...rowB].map((i, k) => (
              <SealChip key={`b-${k}`} i={i} />
            ))}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 text-center">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-primary" aria-hidden />
            Jalur resmi pemerintah 100%
          </span>
          <span>
            <strong className="text-foreground">20 instansi</strong> terkait semua layanan kami
          </span>
          <span>
            Dokumen terbit <strong className="text-foreground">atas nama Anda</strong>
          </span>
        </div>
        <Link
          href="/kanal-resmi"
          className="group mt-6 inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:brightness-110 min-h-[44px]"
        >
          Lihat Direktori 20 Kanal Resmi
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </div>
    </section>
  );
}
