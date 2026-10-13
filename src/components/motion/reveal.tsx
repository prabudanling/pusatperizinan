"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * ============================================================
 * SISTEM MOTION SERAGAM — PusatPerizinan.com (Task 6-a)
 * ============================================================
 * Bahasa gerak tunggal untuk seluruh landing page:
 *  - Durasi masuk 0.6s, ease custom cubic-bezier(0.22, 1, 0.36, 1)
 *    (cepat di awal, melunak presisi di akhir — "signature ease")
 *  - Stagger 0.08s antar item dalam satu koreografi
 *  - Rise distance default 24px (rentang aman 20–28px)
 *  - whileInView + viewport { once: true, margin: "-64px" }
 *    → animasi sekali saja, tidak bolak-balik, dan terpicu
 *    tepat sebelum elemen benar-benar terlihat.
 *  - HANYA properti compositor: transform & opacity → nol layout
 *    thrashing, nol jank, 60fps bahkan di perangkat kelas bawah.
 *  - Hormati prefers-reduced-motion: bila aktif, komponen dirender
 *    sebagai elemen statis tanpa wrapper motion sama sekali.
 * ============================================================
 */

/** Signature easing studio — wajib dipakai semua animasi masuk. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Jeda antar item dalam satu koreografi (detik). */
export const STAGGER = 0.08;

/** Elemen HTML yang didukung sebagai wadah Reveal. */
const MOTION_TAGS = {
  div: motion.div,
  li: motion.li,
  article: motion.article,
  section: motion.section,
} as const;

export type RevealTag = keyof typeof MOTION_TAGS;

interface RevealProps {
  children: React.ReactNode;
  /** Delay masuk dalam detik — gunakan kelipatan STAGGER. */
  delay?: number;
  /** Jarak rise (px). Rentang bahasa gerak: 20–28. Default 24. */
  y?: number;
  className?: string;
  /** Tag semantik output; gunakan "li"/"article" di dalam list/article. */
  as?: RevealTag;
}

/**
 * Reveal — entrance seragam pengganti hand-rolled variants:
 * fade + rise (opacity 0→1, y→0) saat elemen masuk viewport.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = MOTION_TAGS[as] as typeof motion.div;

  // WCAG 2.2 — preferensi reduced-motion: render statis, nol animasi.
  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, scale: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * RevealScale — varian untuk kartu: rise 20px + scale 0.97→1.
 * Memberi kedalaman "zoom lembut" tanpa pernah menyentuh layout.
 */
export function RevealScale({
  children,
  delay = 0,
  y = 20,
  className,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = MOTION_TAGS[as] as typeof motion.div;

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}
