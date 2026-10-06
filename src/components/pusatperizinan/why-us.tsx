'use client'

import { motion } from 'framer-motion'
import { Award, Banknote, Headset, Lock, ThumbsUp, Timer } from 'lucide-react'
import { SectionHeading } from './section-heading'

const REASONS = [
  {
    icon: Timer,
    title: 'Tercepat di Kelasnya',
    desc: 'Proses dokumen paralel dengan mitra notaris & dinas di 34 provinsi. NIB bisa terbit dalam 1 hari kerja.',
  },
  {
    icon: Lock,
    title: 'Data Anda Aman',
    desc: 'Enkripsi end-to-end untuk seluruh dokumen pribadi. Tidak dibagikan ke pihak ketiga tanpa izin Anda.',
  },
  {
    icon: Banknote,
    title: 'Tarif Transparan',
    desc: 'Rincian biaya tertulis sebelum deal. Tidak ada biaya siluman, tidak ada biaya "resi" yang aneh-aneh.',
  },
  {
    icon: Award,
    title: 'Ahli Sesuai Sektor',
    desc: 'Ditangani konsultan yang paham regulasi sektor Anda: F&B, konstruksi, kesehatan, logistik, hingga investasi asing.',
  },
  {
    icon: Headset,
    title: 'Update Real-Time',
    desc: 'Progres pengurusan dilaporkan tiap tahap via WhatsApp. Anda selalu tahu posisi dokumen sedang di mana.',
  },
  {
    icon: ThumbsUp,
    title: 'Garansi 12 Bulan',
    desc: 'Izin ditolak karena kelalaian kami? Kami ulangi gratis. Plus konsultasi legal gratis setahun penuh.',
  },
] as const

export function WhyUs() {
  return (
    <section id="alasan" aria-label="Keunggulan layanan" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Mengapa Kami"
          title="Bukan Sekadar Mengurus — Kami Memastikan Beres"
          description="Ribuan pelaku usaha memilih Pusat Perizinan karena enam janji ini, yang kami tepati sejak hari pertama."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.1, ease: 'easeOut' }}
              className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-100/50"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition-colors group-hover:bg-amber-500 group-hover:text-white">
                <reason.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
