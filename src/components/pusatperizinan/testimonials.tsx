'use client'

import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { SectionHeading } from './section-heading'
import { TESTIMONIALS } from '@/lib/site-config'

export function Testimonials() {
  const [active, setActive] = useState(0)
  const total = TESTIMONIALS.length

  const next = useCallback(() => setActive((v) => (v + 1) % total), [total])
  const prev = useCallback(() => setActive((v) => (v - 1 + total) % total), [total])

  // Auto-rotate
  useEffect(() => {
    const id = setInterval(next, 6000)
    return () => clearInterval(id)
  }, [next])

  return (
    <section id="testimoni" aria-label="Testimoni pelanggan" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimoni"
          title="Cerita Sukses Mereka Dimulai dari Izin yang Beres"
          description="Dari warung UMKM hingga perusahaan asing — inilah kata mereka tentang Pusat Perizinan."
        />

        <div className="relative mx-auto mt-12 max-w-3xl" aria-roledescription="carousel" aria-label="Testimoni klien">
          <Quote
            className="absolute -top-6 left-1/2 h-12 w-12 -translate-x-1/2 text-emerald-100"
            aria-hidden="true"
            fill="currentColor"
          />

          <div className="relative min-h-[260px] sm:min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={active}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="rounded-3xl border border-gray-100 bg-white p-8 shadow-lg shadow-emerald-100/40 sm:p-10"
                aria-label={`Testimoni ${active + 1} dari ${total}`}
              >
                <div className="flex justify-center gap-1" aria-label={`Rating ${TESTIMONIALS[active].rating} dari 5 bintang`}>
                  {Array.from({ length: TESTIMONIALS[active].rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-5 text-center text-base leading-relaxed text-gray-700 sm:text-lg">
                  “{TESTIMONIALS[active].text}”
                </blockquote>
                <figcaption className="mt-6 text-center">
                  <p className="font-bold text-gray-900">{TESTIMONIALS[active].name}</p>
                  <p className="mt-0.5 text-sm text-emerald-700">{TESTIMONIALS[active].role}</p>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Kontrol */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              aria-label="Testimoni sebelumnya"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-all hover:border-emerald-300 hover:text-emerald-700 active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex gap-2" role="tablist" aria-label="Pilih testimoni">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Testimoni ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === active ? 'w-8 bg-emerald-600' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Testimoni berikutnya"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-all hover:border-emerald-300 hover:text-emerald-700 active:scale-95"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
