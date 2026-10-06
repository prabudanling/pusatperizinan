'use client'

import { motion } from 'framer-motion'
import { MessagesSquare, FileUp, Cog, PartyPopper } from 'lucide-react'
import { SectionHeading } from './section-heading'
import { PROCESS_STEPS } from '@/lib/site-config'

const STEP_ICONS = [MessagesSquare, FileUp, Cog, PartyPopper]

export function Process() {
  return (
    <section
      id="proses"
      aria-label="Cara kerja layanan"
      className="relative overflow-hidden bg-emerald-950 py-20 text-white sm:py-24"
    >
      {/* Ornamen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:26px_26px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-900/60 px-4 py-1.5 text-sm font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            Cara Kerja
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            4 Langkah Mudah, Izin Langsung Jalan
          </h2>
          <p className="mt-4 text-base leading-relaxed text-emerald-100/80 sm:text-lg">
            Anda tidak perlu paham birokrasi. Ikuti saja 4 langkah ini — sisanya biar kami yang urus.
          </p>
        </div>

        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {PROCESS_STEPS.map((step, i) => {
            const Icon = STEP_ICONS[i]
            return (
              <motion.li
                key={step.step}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
                className="relative"
              >
                {/* Garis penghubung (desktop) */}
                {i < PROCESS_STEPS.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute left-[calc(50%+3rem)] top-8 hidden h-0.5 w-[calc(100%-6rem)] bg-gradient-to-r from-emerald-400/60 to-emerald-400/10 lg:block"
                  />
                )}
                <div className="flex h-full flex-col items-center rounded-2xl border border-emerald-400/20 bg-emerald-900/50 p-6 text-center backdrop-blur transition-colors hover:border-emerald-300/40">
                  <div className="relative">
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-900/50">
                      <Icon className="h-8 w-8 text-white" aria-hidden="true" />
                    </span>
                    <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-sm font-extrabold text-emerald-950 shadow">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-emerald-100/75">{step.desc}</p>
                </div>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
