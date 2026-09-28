---
Task ID: 1
Agent: Z.ai Code (main orchestrator)
Task: Clone dan install website pusatperizinan.com dari GitHub (https://github.com/pusatperizinan/pusatperizinan.com) ke sandbox project

Work Log:
- Clone repositori https://github.com/pusatperizinan/pusatperizinan.com ke /home/z/pusatperizinan-repo
- Analisis struktur: Next.js 16 + TypeScript 5 + Tailwind CSS 4 + Prisma 6 (SQLite) + shadcn/ui, landing page konsultan perizinan dengan i18n 30 bahasa
- Bandingkan package.json sandbox vs repo: dependencies identik, repo menambah script "build:static" dan "pack"
- Stop dev server, sinkronisasi seluruh source: src/, prisma/schema.prisma, scripts/, db/custom.db, public/ (logo, manifest, sitemap, download), config files (next.config.ts, tailwind.config.ts, postcss.config.mjs, components.json, tsconfig.json, eslint.config.mjs), .htaccess, .env, DEPLOY-IDWEBHOST.md
- Update package.json dengan script build:static dan pack
- Jalankan prisma generate + db push (Prisma Client v6.19.2)
- Restart dev server di port 3000, verifikasi HTTP 200
- ESLint: 0 error, 0 warning
- Verifikasi Agent Browser: hero + form konsultasi render, submit form lead berhasil (database: 3 -> 4 leads), Cek Izin AI berfungsi (API license-checker menghasilkan rekomendasi NIB/Ketenagakerjaan), chat widget AI merespons + lead capture, language switcher 30 bahasa (ID <-> EN tersimpan localStorage), footer lengkap, mobile responsive (hamburger menu OK)
- dev.log bersih tanpa error

Stage Summary:
- Website PusatPerizinan.com berhasil ter-install penuh dan berjalan di port 3000
- Semua fitur inti terverifikasi end-to-end: lead form, AI license checker, AI chat, i18n 30 bahasa, responsif mobile/desktop
- Database SQLite terisi data statistik (1.251 klien, 3.899 izin) + lead baru hasil test
- Script deploy tambahan tersedia: bun run build:static dan bun run pack (untuk hosting idwebhost)
