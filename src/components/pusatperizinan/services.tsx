'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BadgeCheck,
  Building2,
  FileBadge,
  Globe,
  Handshake,
  Receipt,
  Search,
  ShieldCheck,
  Store,
  Clock3,
  Wallet,
  ArrowRight,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SectionHeading } from './section-heading'
import { SERVICES, WA_LINK, type ServiceItem } from '@/lib/site-config'

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  FileBadge,
  Building2,
  Handshake,
  Globe,
  ShieldCheck,
  Store,
  Receipt,
  BadgeCheck,
}

const CATEGORIES = ['Semua', 'Legalitas Dasar', 'Badan Hukum', 'Izin Usaha', 'Pendampingan'] as const

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const Icon = ICONS[service.icon] ?? FileBadge
  const waServiceLink = `${WA_LINK.split('?')[0]}?text=${encodeURIComponent(
    `Halo Pusat Perizinan, saya tertarik dengan layanan ${service.title}. Mohon informasi lebih lanjut.`
  )}`

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.3), ease: 'easeOut' }}
      id={service.slug}
      className="group relative flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/60"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>

      <h3 className="text-lg font-bold text-gray-900">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{service.short}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="gap-1 bg-amber-50 text-amber-700 hover:bg-amber-100">
          <Wallet className="h-3 w-3" aria-hidden="true" />
          {service.price}
        </Badge>
        <Badge variant="secondary" className="gap-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
          <Clock3 className="h-3 w-3" aria-hidden="true" />
          {service.duration}
        </Badge>
      </div>

      <Button
        asChild
        variant="ghost"
        className="mt-4 justify-start gap-1.5 rounded-lg px-0 text-sm font-semibold text-emerald-700 hover:bg-transparent hover:text-emerald-800"
      >
        <a href={waServiceLink} target="_blank" rel="noopener noreferrer">
          Minta penawaran
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </a>
      </Button>
    </motion.article>
  )
}

export function Services() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('Semua')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return SERVICES.filter((s) => {
      const matchCategory = category === 'Semua' || s.category === category
      const matchQuery =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.short.toLowerCase().includes(q) ||
        s.detail.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      return matchCategory && matchQuery
    })
  }, [query, category])

  return (
    <section id="layanan" aria-label="Daftar layanan perizinan" className="bg-gradient-to-b from-white to-emerald-50/50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Layanan Kami"
          title="Satu Pintu untuk Semua Legalitas Usaha Anda"
          description="Cari jenis izin yang Anda butuhkan — ketik kata kunci di mesin pencari layanan atau pilih kategori di bawah ini."
        />

        {/* Mesin pencari layanan */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto mt-10 max-w-2xl"
          role="search"
          aria-label="Pencarian layanan perizinan"
        >
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari izin… mis. NIB, PT, halal, pajak"
              aria-label="Cari layanan perizinan"
              className="h-14 rounded-full border-emerald-200 bg-white pl-12 pr-5 text-base shadow-md shadow-emerald-100/50 focus-visible:ring-emerald-500"
            />
          </div>
        </motion.div>

        {/* Filter kategori */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Filter kategori layanan">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                category === cat
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300 hover:text-emerald-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Hasil */}
        <div aria-live="polite" className="sr-only">
          {filtered.length} layanan ditemukan
        </div>

        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-emerald-200 bg-white p-10 text-center">
            <p className="text-lg font-semibold text-gray-800">Tidak menemukan izin yang Anda cari?</p>
            <p className="mt-1 text-sm text-gray-500">
              Kami mengurus 200+ jenis perizinan. Ceritakan kebutuhan Anda, tim kami carikan solusinya.
            </p>
            <Button asChild className="mt-4 rounded-full bg-emerald-600 hover:bg-emerald-700">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                Tanya via WhatsApp
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
