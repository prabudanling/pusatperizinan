"use client";

import { MotionConfig } from "framer-motion";

/**
 * MotionProvider — konfigurasi motion global (Task 6-a, Sistem Animasi).
 *
 * `reducedMotion="user"` membuat seluruh animasi framer-motion di aplikasi
 * otomatis di-skip (langsung ke state akhir) ketika pengguna mengaktifkan
 * "prefers-reduced-motion" di OS/browser — sesuai WCAG 2.2 (2.3.3 Animation
 * from Interactions) tanpa perlu logika manual di tiap komponen.
 *
 * CATATAN WIRING: komponen ini dirancang untuk dipasang sekali di tree root
 * (mis. membalut {children} di dalam <body> pada src/app/layout.tsx):
 *
 *   <MotionProvider>
 *     <LanguageProvider> ... </LanguageProvider>
 *   </MotionProvider>
 *
 * Sebagai lapisan pertahanan tambahan, komponen <Reveal> juga membaca
 * useReducedMotion() secara independen, sehingga aksesibilitas tetap
 * terjaga meskipun provider ini belum di-mount.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
