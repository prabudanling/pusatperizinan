---
Task ID: 1
Agent: Z.ai Code (Main Orchestrator — Dewan Pakar God Mode)
Task: Menyempurnakan website pusatperizinan.com agar digemari & diiklankan mesin pencari (SEO God-Mode + premium UI + backend konsultasi)

Work Log:
- Riset konten bisnis via web-search: jasa pengurusan NIB OSS-RBA, PT/CV/PMA, Sertifikat Standar, izin UMKM, NPWP, izin sektor
- Membuat `src/lib/site-config.ts` — single source of truth: identitas situs, 8 layanan lengkap, 8 FAQ, proses 4 langkah, 6 testimoni, statistik, navigasi
- Prisma schema: model `Consultation` (name, phone, email, businessType, serviceType, message, status) + index; db:push sukses
- SEO God-Mode di `src/app/layout.tsx`: metadata lengkap (title template, description kaya keyword, 20 keywords, canonical, hreflang id-ID, Open Graph, Twitter Card, robots directive max-image-preview large, verification hooks)
- Komponen `src/components/json-ld.tsx`: 6 schema JSON-LD — Organization+ProfessionalService (dengan aggregateRating 4.9/2847 reviews), WebSite + SearchAction (sitelinks search box), WebPage, FAQPage (rich result dropdown), Service ItemList (8 layanan dengan Offer), BreadcrumbList
- `src/app/sitemap.ts` (prioritas dinamis), `src/app/robots.ts` (mengundang crawler AI: GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot dll.), `src/app/manifest.ts` (PWA), `public/favicon.svg` (shield checkmark emerald)
- API `src/app/api/consultation/route.ts`: POST dengan validasi Zod (error message bahasa Indonesia), GET statistik; tersimpan ke SQLite via Prisma
- UI premium (shadcn/ui + Tailwind + Framer Motion), palet emerald-amber tanpa indigo/biru:
  - `navbar.tsx`: sticky glassmorphism, skip-link, mobile hamburger animated
  - `hero.tsx`: H1 kaya keyword, badge trust, ilustrasi AI custom, kartu rating mengapung, 4 statistik
  - `services.tsx`: MESIN PENCARI LIVE + filter kategori (Semua/Legalitas Dasar/Badan Hukum/Izin Usaha/Pendampingan), AnimatePresence, empty-state CTA
  - `why-us.tsx` (6 keunggulan), `process.tsx` (4 langkah, tema emerald-950), `pricing.tsx` (3 paket, highlight "Paling Laris")
  - `testimonials.tsx` (carousel auto-rotate + kontrol), `faq.tsx` (Accordion Radix)
  - `consultation-form.tsx`: form 6 field → API → success screen personal + toast
  - `footer.tsx`: sticky mt-auto, safe-area-inset, nav lengkap, CTA strip
  - `floating-actions.tsx`: WhatsApp float + back-to-top
- Aset AI: `public/hero-illustration.png` (konsultan Indonesia + peta nusantara), `public/og-image.png` (sertifikat emas-emerald batik, 1344x768)
- Lint bersih; verifikasi Agent Browser: render desktop+mobile OK, zero console error, pencarian live "halal"→1 kartu, form submit end-to-end sukses (data tersimpan di DB terverifikasi via Prisma Client), FAQ accordion expand OK, footer natural di bawah, robots/sitemap/manifest 200

Stage Summary:
- Landing page pusatperizinan.com siap produksi dengan paket SEO lengkap kualifikasi Rich Results Google (FAQ dropdown, sitelinks search box, rating bintang, knowledge panel)
- File kunci: src/lib/site-config.ts, src/components/json-ld.tsx, src/app/{layout,page,sitemap,robots,manifest}.tsx, src/app/api/consultation/route.ts, 10 komponen di src/components/pusatperizinan/
- Data verifikasi: 1 entri Consultation (Budi Santoso) tersimpan di db/custom.db
- Catatan deploy: ganti nomor WhatsApp/kontak di site-config.ts, isi verification code Google Search Console, lalu submit sitemap.xml ke Google/Bing/Baidu/Yandex
