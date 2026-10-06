'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, BadgeCheck, Clock3, ShieldCheck, Sparkles, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TRUST_STATS, WA_LINK } from '@/lib/site-config'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

export function Hero() {
  return (
    <section
      id="beranda"
      aria-label="Perkenalan layanan"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24"
    >
      {/* Ornamen latar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45rem_30rem_at_85%_-10%,rgba(16,185,129,0.10),transparent),radial-gradient(35rem_25rem_at_-10%_20%,rgba(217,119,6,0.07),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_at_1px_1px,#059669_1px,transparent_0)] [background-size:28px_28px]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8">
        {/* Kolom teks */}
        <motion.div variants={container} initial="hidden" animate="show" className="text-center lg:text-left">
          <motion.div variants={item} className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-semibold text-amber-700 shadow-sm">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Dipercaya 12.500+ pelaku usaha se-Indonesia
          </motion.div>

          <motion.h1
            variants={item}
            className="text-4xl font-extrabold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl xl:text-6xl"
          >
            Urus{' '}
            <span className="relative whitespace-nowrap">
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                Izin Usaha
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 220 12"
                className="absolute -bottom-1.5 left-0 w-full text-amber-400"
                fill="none"
              >
                <path d="M3 9C60 3 160 3 217 8" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>{' '}
            Secepat Kilat, 100% Resmi &amp; Bergaransi
          </motion.h1>

          <motion.p variants={item} className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg lg:mx-0">
            NIB OSS-RBA, pendirian <strong>PT, CV, PMA</strong>, Sertifikat Standar, hingga izin UMKM —
            semua diurus ahlinya tanpa Anda pusing birokrasi.{' '}
            <span className="font-semibold text-emerald-700">Konsultasi gratis, tarif transparan.</span>
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start sm:justify-center">
            <Button
              asChild
              size="lg"
              className="h-13 w-full rounded-full bg-emerald-600 px-8 text-base shadow-lg shadow-emerald-200 transition-transform hover:-translate-y-0.5 hover:bg-emerald-700 sm:w-auto"
            >
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                Konsultasi Gratis Sekarang
                <ArrowRight className="ml-1 h-5 w-5" aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-13 w-full rounded-full border-emerald-200 px-8 text-base text-emerald-700 hover:bg-emerald-50 sm:w-auto"
            >
              <a href="#layanan">Lihat Semua Layanan</a>
            </Button>
          </motion.div>

          {/* Micro-trust */}
          <motion.ul variants={item} className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-gray-600 lg:justify-start">
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              Resmi &amp; Terverifikasi
            </li>
            <li className="flex items-center gap-1.5">
              <Clock3 className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              NIB 1 Hari Kerja
            </li>
            <li className="flex items-center gap-1.5">
              <BadgeCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              Garansi 12 Bulan
            </li>
          </motion.ul>
        </motion.div>

        {/* Kolom gambar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="relative mx-auto w-full max-w-xl lg:max-w-none"
        >
          <div aria-hidden="true" className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-emerald-100 via-transparent to-amber-100 blur-2xl" />
          <figure className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-2xl shadow-emerald-100">
            <Image
              src="/hero-illustration.png"
              alt="Konsultan profesional Pusat Perizinan menangani dokumen izin usaha untuk pengusaha Indonesia"
              width={1152}
              height={864}
              priority
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 90vw, 45vw"
            />
          </figure>

          {/* Kartu rating mengapung */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white/95 px-4 py-3 shadow-xl backdrop-blur sm:left-8"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
              <Star className="h-5 w-5 fill-amber-500 text-amber-500" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">4,9/5,0</p>
              <p className="text-xs text-gray-500">2.847 ulasan klien</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bar statistik kepercayaan */}
      <motion.dl
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-4 px-4 sm:mt-20 md:grid-cols-4 sm:px-6 lg:px-8"
      >
        {TRUST_STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-emerald-100 bg-white/80 p-5 text-center shadow-sm backdrop-blur transition-shadow hover:shadow-md"
          >
            <dt className="order-2 mt-1 block text-xs font-medium text-gray-500 sm:text-sm">{stat.label}</dt>
            <dd className="order-1 text-2xl font-extrabold text-emerald-600 sm:text-3xl">{stat.value}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
  )
}
