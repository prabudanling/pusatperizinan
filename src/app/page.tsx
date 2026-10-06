import { JsonLd } from '@/components/json-ld'
import { Navbar } from '@/components/pusatperizinan/navbar'
import { Hero } from '@/components/pusatperizinan/hero'
import { Services } from '@/components/pusatperizinan/services'
import { WhyUs } from '@/components/pusatperizinan/why-us'
import { Process } from '@/components/pusatperizinan/process'
import { Pricing } from '@/components/pusatperizinan/pricing'
import { Testimonials } from '@/components/pusatperizinan/testimonials'
import { Faq } from '@/components/pusatperizinan/faq'
import { ConsultationForm } from '@/components/pusatperizinan/consultation-form'
import { Footer } from '@/components/pusatperizinan/footer'
import { FloatingActions } from '@/components/pusatperizinan/floating-actions'
import { SITE } from '@/lib/site-config'

/**
 * PUSATPERIZINAN.COM — Landing Page Utama
 *
 * God-Mode SEO Checklist yang terpasang di halaman ini:
 * ✅ Semantic HTML5 (header, nav, main, section, footer, address)
 * ✅ Satu H1 + hierarki heading yang benar
 * ✅ JSON-LD: Organization, ProfessionalService, WebSite + SearchAction,
 *    WebPage, FAQPage, Service ItemList, BreadcrumbList → kualifikasi Rich Results
 * ✅ Metadata lengkap (OG, Twitter, canonical, hreflang) di layout.tsx
 * ✅ sitemap.xml + robots.txt + manifest otomatis
 * ✅ Gambar dengan alt deskriptif + next/image (Core Web Vitals)
 * ✅ Aksesibilitas: skip-link, aria-label, aria-live, kontras WCAG
 * ✅ Mobile-first responsive + footer sticky + safe-area
 */
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Structured data untuk mesin pencari */}
      <JsonLd />

      <Navbar />

      <main id="konten-utama" className="flex-1">
        <Hero />
        <Services />
        <WhyUs />
        <Process />
        <Pricing />
        <Testimonials />
        <Faq />
        <ConsultationForm />
      </main>

      <Footer />
      <FloatingActions />

      {/* Data situs untuk validasi & branding mesin pencari */}
      <meta name="organization" content={SITE.legalName} />
    </div>
  )
}
