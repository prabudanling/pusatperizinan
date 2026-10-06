'use client'

import { motion } from 'framer-motion'
import { Check, Crown, Rocket, Store } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SectionHeading } from './section-heading'
import { WA_LINK } from '@/lib/site-config'

const PACKAGES = [
  {
    name: 'UMKM Starter',
    icon: Store,
    price: 'Rp 250rb',
    original: 'Rp 400rb',
    tagline: 'Untuk usaha perorangan yang mau resmi secepatnya.',
    features: [
      'NIB perorangan OSS-RBA',
      'Pilihan 2 kode KBLI',
      'Panduan rekening & marketplace',
      'Update progres harian',
      'Garansi terbit',
    ],
    highlighted: false,
  },
  {
    name: 'Badan Usaha',
    icon: Rocket,
    price: 'Rp 2,5jt',
    original: 'Rp 3,5jt',
    tagline: 'Paket favorit — PT/CV lengkap siap operasional.',
    features: [
      'Akta notaris + SK Kemenkumham',
      'NPWP badan & NIB',
      'Domisili usaha + 5 kode KBLI',
      'Konsultasi struktur usaha',
      'Template surat & dokumen usaha',
      'Garansi 12 bulan pendampingan',
    ],
    highlighted: true,
  },
  {
    name: 'Corporate Enterprise',
    icon: Crown,
    price: 'Custom',
    original: null,
    tagline: 'Untuk PMA, izin khusus sektor, dan multi-izin.',
    features: [
      'Pendirian PMA/PTMA + KITAS investor',
      'Izin teknis sektor (edar, distro, klinik…)',
      'Sertifikasi halal & PIRT',
      'Manager khusus akun Anda',
      'Prioritas respons < 15 menit',
      'Audit kepatuhan tahunan',
    ],
    highlighted: false,
  },
] as const

export function Pricing() {
  return (
    <section id="harga" aria-label="Paket harga layanan" className="bg-gradient-to-b from-emerald-50/50 to-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Paket & Harga"
          title="Harga Jujur, Tanpa Biaya Siluman"
          description="Pilih paket sesuai skala usaha Anda. Semua tarif sudah termasuk jasa kami — biaya resmi pemerintah disampaikan terbuka di awal."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
              className={`relative flex flex-col rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1.5 ${
                pkg.highlighted
                  ? 'border-emerald-500 bg-emerald-950 text-white shadow-2xl shadow-emerald-200 lg:scale-[1.04]'
                  : 'border-gray-150 border-gray-200 bg-white shadow-sm hover:shadow-xl hover:shadow-emerald-100/60'
              }`}
            >
              {pkg.highlighted && (
                <Badge className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-4 py-1 text-xs font-bold text-emerald-950 hover:bg-amber-400">
                  ★ Paling Laris
                </Badge>
              )}

              <div className="flex items-center gap-3">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    pkg.highlighted ? 'bg-emerald-400/20 text-emerald-300' : 'bg-emerald-50 text-emerald-600'
                  }`}
                >
                  <pkg.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-bold">{pkg.name}</h3>
              </div>

              <p className={`mt-3 text-sm ${pkg.highlighted ? 'text-emerald-100/80' : 'text-gray-500'}`}>
                {pkg.tagline}
              </p>

              <div className="mt-5 flex items-end gap-2">
                <span className="text-4xl font-extrabold tracking-tight">{pkg.price}</span>
                {pkg.original && (
                  <span className={`pb-1.5 text-sm line-through ${pkg.highlighted ? 'text-emerald-300/60' : 'text-gray-400'}`}>
                    {pkg.original}
                  </span>
                )}
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${pkg.highlighted ? 'text-amber-400' : 'text-emerald-600'}`}
                      aria-hidden="true"
                    />
                    <span className={pkg.highlighted ? 'text-emerald-50/90' : 'text-gray-600'}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                size="lg"
                className={`mt-7 w-full rounded-full text-base ${
                  pkg.highlighted
                    ? 'bg-amber-400 text-emerald-950 shadow-lg shadow-amber-900/30 hover:bg-amber-300'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                <a
                  href={`${WA_LINK.split('?')[0]}?text=${encodeURIComponent(
                    `Halo, saya tertarik dengan paket ${pkg.name} (${pkg.price}). Mohon info selengkapnya.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {pkg.price === 'Custom' ? 'Minta Penawaran' : 'Pilih Paket Ini'}
                </a>
              </Button>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          Butuh kombinasi khusus?{' '}
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-700 underline underline-offset-4 hover:text-emerald-800">
            Konsultasikan gratis dengan tim kami
          </a>
          .
        </p>
      </div>
    </section>
  )
}
