'use client'

import { ShieldCheck, Phone, Mail, MapPin, Clock3 } from 'lucide-react'
import { NAV_LINKS, SERVICES, SITE, WA_LINK } from '@/lib/site-config'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto bg-emerald-950 text-emerald-100" aria-label="Informasi situs">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <a href="#beranda" className="flex items-center gap-2.5" aria-label="Pusat Perizinan — beranda">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700">
                <ShieldCheck className="h-5 w-5 text-amber-300" aria-hidden="true" />
              </span>
              <span className="text-base font-bold tracking-tight text-white">
                Pusat<span className="text-emerald-400">Perizinan</span>
                <span className="text-amber-400">.com</span>
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-emerald-200/70">
              Mitra legalitas usaha #1 pelaku UMKM &amp; korporasi Indonesia. Cepat, resmi,
              transparan, dan bergaransi — sejak {SITE.founded}.
            </p>
            <div className="mt-5 flex gap-3">
              {[
                { label: 'Instagram', href: SITE.social.instagram },
                { label: 'Facebook', href: SITE.social.facebook },
                { label: 'TikTok', href: SITE.social.tiktok },
                { label: 'YouTube', href: SITE.social.youtube },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ikuti kami di ${s.label}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/20 text-xs font-bold text-emerald-200 transition-colors hover:border-amber-400/50 hover:text-amber-300"
                >
                  {s.label.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>

          {/* Layanan */}
          <nav aria-label="Navigasi layanan">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">Layanan</h3>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <a
                    href={`#${s.slug}`}
                    className="text-sm text-emerald-200/80 transition-colors hover:text-white"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Navigasi */}
          <nav aria-label="Navigasi situs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">Navigasi</h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-emerald-200/80 transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#konsultasi" className="text-sm text-emerald-200/80 transition-colors hover:text-white">
                  Konsultasi Gratis
                </a>
              </li>
            </ul>
          </nav>

          {/* Kontak */}
          <address className="not-italic">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">Hubungi Kami</h3>
            <ul className="mt-4 space-y-3.5 text-sm text-emerald-200/80">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                <a href={`tel:${SITE.contact.phone}`} className="transition-colors hover:text-white">
                  {SITE.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                <a href={`mailto:${SITE.contact.email}`} className="transition-colors hover:text-white">
                  {SITE.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                <span>
                  {SITE.contact.address.street}, {SITE.contact.address.city},
                  <br />
                  {SITE.contact.address.region} {SITE.contact.address.postalCode}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                <span>{SITE.contact.hours}</span>
              </li>
            </ul>
          </address>
        </div>

        {/* CTA strip */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-emerald-400/15 bg-emerald-900/50 p-6 sm:flex-row">
          <p className="text-center text-sm font-medium text-emerald-100 sm:text-left">
            Siap membuat usaha Anda 100% legal hari ini?
          </p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-amber-400 px-6 py-2.5 text-sm font-bold text-emerald-950 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-amber-300"
          >
            Chat WhatsApp Sekarang →
          </a>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-emerald-400/10 pt-6 text-xs text-emerald-200/50 sm:flex-row">
          <p>
            © {year} {SITE.legalName}. Seluruh hak cipta dilindungi.
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <span className="transition-colors hover:text-emerald-200">Kebijakan Privasi</span>
            <span aria-hidden="true">·</span>
            <span className="transition-colors hover:text-emerald-200">Syarat &amp; Ketentuan</span>
            <span aria-hidden="true">·</span>
            <span>Dibuat dengan ❤️ untuk UMKM Indonesia</span>
          </p>
        </div>
      </div>
      {/* Safe area untuk perangkat iOS */}
      <div className="h-[env(safe-area-inset-bottom)]" aria-hidden="true" />
    </footer>
  )
}
