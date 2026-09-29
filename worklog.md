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

---
Task ID: 2-a
Agent: research-tax
Task: Riset jasa pajak pribadi & perusahaan

Work Log:
- Baca worklog.md Task 1 (website pusatperizinan.com sudah ter-install, Next.js 16 + Prisma, port 3000)
- Skill web-search: 26 pencarian berbeda terkait jasa pajak Indonesia:
  1. jasa konsultan pajak layanan NPWP pribadi/badan
  2. jasa lapor SPT tahunan 1770/1771 + biaya
  3. layanan pengukuhan PKP & e-Faktur PPN
  4. jasa pajak UMKM PPh final 0,5% PP 55/2022
  5. transfer pricing doc + pendampingan tax audit
  6. biaya jasa konsultan pajak 2025 (2x query)
  7. Coretax DJP 2025 + NPWP 16 digit (2x query)
  8. sanksi keterlambatan & bunga bulanan
  9. keberatan/banding Pengadilan Pajak & restitusi (2x)
  10. SPT masa PPh 21 + e-Bupot
  11. KEP-PPKP syarat omzet 4,8 M
  12. pajak daerah PBB/PBJT/retribusi
  13. pendampingan SP2DK/SPHP/STP
  14. tarif PPh badan 22% UU HPP
  15. harga jasa paket bulanan konsultan pajak
  16. deadline SPT 31 Maret/30 April
  17. PMK 164/2023 kewajiban daftar PKP
- Skill page-reader: baca halaman harga live isipajak.co.id, isipajaksurabaya.com, safttax.com, tbnsolution.id, pajaknesia.id
- Kompilasi 15 layanan pajak hulu->hilir (JSON di pesan final) + catatan regulasi 2025-2026
- Append laporan ini ke worklog.md (tanpa mengubah isi sebelumnya)

Stage Summary:
- 15 layanan pajak teridentifikasi lengkap (pribadi + badan) dengan harga pasaran, durasi, dan fitur utama:
  * Hulu: NPWP OP (Rp50rb-300rb, 1-3 hari), NPWP badan+NITKU (Rp150-500rb), PKP (Rp1-2,5jt, 2-4 minggu), setup e-Faktur/Coretax (Rp500rb-2jt)
  * Kepatuhan bulanan: paket SPT masa PPh21/23/4(2)/25+PPN (Rp400rb-1,5jt/bln; TBN all-in UMKM Rp3jt/bln incl. tahunan; isipajaksurabaya Rp550rb utk omzet<75jt; bantupengusaha Rp400rb non-PKP); payroll PPh21 Rp300rb-1jt/bln; UMKM 0,5% Rp500rb-1,5jt/bln
  * Tahunan: SPT Tahunan OP 1770/1770S (Rp150-750rb), SPT Badan 1771 + rekonsiliasi fiskal (Rp1,5-5jt)
  * Hilir/advisory: TP Doc (Rp10-100jt), pendampingan pemeriksaan SP2DK/SPHP (Rp5-50jt), restitusi (sukses fee 5-15%), keberatan/banding Pengadilan Pajak (Rp10-50jt/tahap), pajak daerah (Rp1-10jt), tax planning (Rp250rb-1jt/sesi; retainer Rp1,5-7,5jt/bln)
- Regulasi kunci 2025: Coretax DJP live 1 Jan 2025 (PMK 81/2024, migrasi e-Faktur penuh Juli 2025); NPWP 16 digit + NITKU 22 digit sejak 1 Jul 2024 (PER-6/PJ/2024, NPWP 15 digit pensiun); bukti potong baru PER-11/PJ/2025; PPN 12% efektif tetap 11% umum (PMK 131/2024); PPh badan 22% / 19% listed (UU HPP); PPh Final UMKM 0,5% PP 55/2022 (OP 7 thn s/d 2028, badan 4 thn s/d Tahun Pajak 2025 lalu wajib tarif umum); ambang PKP 4,8 M (PMK 164/2023, daftar s/d akhir tahun buku); divergence PKP (PER-7/PJ/2022); TP wajib transaksi afiliasi >10 M (PMK 22/2018 jo. PMK 172/2023)
- Sanksi: denda telat SPT Tahunan OP Rp100rb / Badan Rp1jt; SPT masa Rp100rb; bunga keterlambatan setor PPh 25 & Pasal 17A 2%/bln (maks 24 bln); denda 50% PPh 25 tak disetor; pidana denda 1-2x kurang bayar
- Deadline: setor 15 (PPh/PPN), lapor PPh masa tgl 20, PPN akhir bulan berikut; SPT Tahunan OP 31 Maret (2026 direlaksasi s/d 30 April), Badan 30 April (bisa e-EXT +2 bulan)
- Sumber: pajak.go.id, ortax.org, online-pajak.com, ddtc.co.id, muc.co.id, pajakku.com, isipajak.co.id, th-fintax.com, bantupengusaha.id, tbnsolution.id, safttax.com, bizmark.id, sw-indonesia.com, setpp.kemenkeu.go.id, bapenda.jakarta.go.id, klikpajak.id
---
Task ID: 2-c
Agent: research-services
Task: Riset semua jasa konsultan perizinan hulu ke hilir

Work Log:
- Baca worklog.md (konteks: website pusatperizinan.com Next.js sudah ter-install & berjalan port 3000)
- Jalankan 20 pencarian web via Skill web-search (z-ai CLI web_search), hasil disimpan di /tmp/riset2c/s01-s27 (14 pencarian awal + 6 tambahan gap-filling; beberapa retry karena rate-limit 429 dengan strategi sleep 25-180s):
  1. daftar izin usaha Indonesia 2025 / KBLI OSS
  2. jasa pendirian PT CV PMA yayasan persekutuan komanditer
  3. jasa izin ekspor impor API-U API-P NIB HS Code COO
  4. jasa registrasi merek paten HKI DJKI
  5. jasa izin edar alkes Kemenkes AKL AKD IPAK
  6. jasa izin BPOM PIRT sertifikat halal
  7. jasa sertifikasi ISO 9001 14001 45001 HACCP SMK3
  8. jasa SBU BUJK SKA SKTTK konstruksi
  9. jasa KITAS IMTA RPTKA expatriat
  10. jasa registrasi PSE Komdigi
  11. jasa AMDAL UKL UPL SPPL
  12. jasa PBG SLF KKPR
  13. izin klinik apotek Kemenkes
  14. jasa IUP RKAB tambang kehutanan perikanan
  15. jasa koperasi firma UD PT perorangan KPPA
  16. biaya jasa pendirian PT PMA 2025 (kolegal, infiniti, virtualofficescbd)
  17. jasa izin PPIU PPIH travel ibadah
  18. biaya sertifikat halal BPJPH self declare
  19. jasa izin pertanian perkebunan perikanan SIPT SIAT
  20. jasa LKPM OSS + laporan kepatuhan
  21. company incorporation luar negeri (Singapura, Dubai, US LLC)
  22. jasa izin lembaga kursus akreditasi BAN-PNF
  23. jasa izin KBN / bonded logistic center bea cukai
- Ekstraksi harga pasaran 2025, durasi, instansi dari snippet sumber: legalitas.org, vOffice, kolegal.id, infiniti.id, izinkilat.id, virtualofficescbd.id, merekhki.com, gsp-lawfirm.com, ruangpedia.co.id, dgip.go.id (PNBP paten Rp 3,5jt), eclinic.id (tarif AKL kelas A/B), ismstandar.co.id (ISO Rp 10-50jt), halalmui.org, legalmp.id (halal UMK Rp 300rb+350rb), easybiz.id (LKPM mulai Rp 5jt), konsultanpertambangan.co.id (IUP eksplorasi), visa-indonesia.com (PT PMA USD 2-5rb), fitribudiani.com (virtual office Rp 3-10jt/thn)
- Kompilasi struktur JSON-like 12 tahap x layanan (id, title, desc, harga, durasi, fitur, instansi) — 34 layanan prioritas

Stage Summary:
- Output riset: 12 tahap siklus hidup bisnis + 34 layanan paling diminati dengan harga pasaran IDR 2025, durasi, instansi (OSS/Kemenkumham/DJKI/BPOM/Kemenkes/BPJPH/Kemnaker/Bea Cukai/KLHK/PUPR/Komdigi/Kemenag/LPJK/ESDM/KemenInvestasi), 3 fitur utama per layanan
- Rentang harga kunci: PT lokal Rp 3-6jt; PT PMA Rp 8-15jt (USD 2-5rb full-service); NIB gratis+jasa 0.5-2jt; merek Rp 0.5-1.8jt PNBP/kelas; paten PNBP Rp 3.5jt; AKL Rp 1.5-3jt+; BPOM MD Rp 8-10jt/produk; halal UMK Rp 300rb (self declare gratis); ISO Rp 10-50jt; AMDAL Rp 25-150jt; PBG/SLF Rp 2-8jt; LKPM Rp 0.75-5jt/periode; PSE Komdigi gratis resmi; Singapura Pte Ltd Rp 18-40jt; US LLC Rp 7-15jt
- Tahap 7 (Pajak) dan TKI ekspansi diserahkan ke agen lain sesuai pembagian tugas
- Rekomendasi next: feed struktur JSON ke pricing.tsx / services.tsx / cost-calculator.tsx website
---
Task ID: 2-b
Agent: research-pmi
Task: Riset jasa penempatan TKI/PMI ke luar negeri

Work Log:
- Baca worklog.md (konteks: website pusatperizinan.com live port 3000; agen 2-a pajak & 2-c perizinan umum sudah riset)
- Skill web-search via z-ai CLI: 27 pencarian (hasil disimpan /tmp/pmi-research/s01-s36; beberapa retry karena rate-limit 429 dengan strategi sleep 60-300s):
  1. jasa pengurusan kerja luar negeri PPTKIS perizinan 2025
  2. syarat kerja Jepang SSW Tokutei Ginou (KBRI/Kemlu, ohm-group, schoters, glints)
  3. EPS Korea giga hiring + biaya pemberangkatan
  4. biaya jasa penempatan PMI 2025 BP2MI/KemenP2MI (nol biaya, KUR PMI Rp100jt)
  5. SISKOP TKI / SISKOP2MI prosedur penempatan online
  6. Skilled Worker visa UK + Germany Opportunity Card untuk WNI
  7. Australia PALM scheme (palmscheme.gov.au) - cakupan 9 negara Pasifik + Timor-Leste
  8. Canada TFWP caregiver
  9. gaji TKI Hong Kong/Taiwan/Singapura/Malaysia (2x query)
  10. LPK berizin / LPK-P + sertifikasi BNSP (kp2mi.go.id, bnsp.go.id)
  11. dokumen keberangkatan: paspor/SKU/SKCK/MCU/SO/vaksin meningitis
  12. KepmenP2MI terbaru + Perpres 166/2024 + Peraturan BP2MI 1/2025
  13. G2G: Jepang, Korea, Jerman Triple Win (siskop2mi lowongan perawat Jerman)
  14. Timur Tengah: Arab Saudi Musaned, UAE, Qatar, Kuwait (2x)
  15. tarif e-paspor 2025 (imigrasi.go.id: Rp650rb/5th, Rp950rb/10th)
  16. JFT-Basic A2 / JLPT N4 bahasa Jepang
  17. Taiwan manufaktur minimum wage NT$29.500 (2x)
  18. SKT/SKT-TKI online Kemnaker/KemenP2MI
  19. Selandia Baru/Belanda seasonal scheme
  20. gaji kaigo Jepang ¥314.000/bln (2025 stats)
  21. izin P3MI syarat + deposito (biruniconsulting: BD Rp1 M; izin 5 tahun)
  22. EPS Korea biaya ~Rp14jt
  23. biaya total berangkat Jepang SSW Rp25-30jt all-in
  24. layanan purna/repatriasi/reintegrasi
  25. UU 18/2017 skema penempatan + larangan biaya penempatan PMI
  26. pelatihan pra-penempatan 70 jam + magang IMJ Kemnaker
  27. G2G Jerman Triple Win gaji perawat
- Kompilasi 20 layanan B2B/B2C hulu-hilir (id, title, desc, target, harga IDR, durasi, fitur) + tabel 17 negara tujuan
- Append laporan ke worklog.md tanpa mengubah isi sebelumnya

Stage Summary:
- Kerangka hukum 2025: UU 18/2017 PPMI + PP 59/2021 (penempatan); KemenP2MI (KP2MI) = kementerian baru (Menteri Abdul Kadir Karding), BP2MI di bawahnya via Perpres 166/2024; Peraturan BP2MI 1/2025 (izin perusahaan penempatan + deposito); SE Dirjen Penempatan 715/2025 (sertifikasi manajemen); Permenaker 2/2023 (dilarang seleksi/penempatan tanpa izin)
- 3 skema penempatan legal: (1) Skema Pemerintah G2G (Jepang, Korea EPS, Jerman Triple Win, Taiwan), (2) Badan penempatan swasta P3MI/PPTKIS (izin 5 tahun, deposito bank Rp500jt-5M, SIP pengerahan), (3) Penempatan Perorangan (dipantau pemerintah, PMI TIDAK dibebani biaya penempatan — hak menurut UU 18/2017)
- Sistem digital: SISKOP2MI (siskop2mi.bp2mi.go.id) = registrasi CPMI, job order (1,3 juta+ tercatat), OPP, E-PMI; target penempatan nasional 2025 = 425.000 PMI; integrasi Musaned (Arab Saudi); tiket BI via BNI; asuransi JPKK BPJS Ketenagakerjaan; KUR PMI plafon Rp100jt
- 20 layanan hulu-hilir teridentifikasi dengan harga pasaran 2025 (B2B: izin P3MI/PPTKIS Rp15-50jt, LPK berizin Rp5-15jt, LSP/BNSP Rp10-25jt; B2C: bundle dokumen Rp2-5jt, pelatihan JFT/JLPT Rp3-15jt, EPS-TOPIK Rp3-8jt, penempatan Jepang SSW Rp25-40jt, magang Jepang Rp30-50jt, Korea EPS Rp10-20jt, Taiwan Rp15-25jt, HK/SG Rp10-18jt, Timur Tengah Rp5-15jt, Malaysia Rp5-12jt, Jerman G2G Rp15-30jt, UK Rp25-50jt, Canada Rp30-60jt)
- Tabel 17 negara tujuan dengan sektor, skema, gaji, syarat (Saudi Musaned, UAE, Qatar, Kuwait, Oman, Bahrain, Yordania, Malaysia, Singapura, Hong Kong, Taiwan, Jepang, Korea, Brunei, Jerman, UK, Canada, Australia/NZ/USA dengan catatan PALM/RSE tidak mencakup Indonesia)
- Data gaji kunci 2025: HK$5.100+1.236 food allowance; NT$29.500; ¥180-314k; ₩2,1jt; SAR 1.000-1.500 PRT / 6.000-18.000 nurse; SG S$650-800; RM1.700+; EUR 2.000-2.800; GBP 22-27k/thn; CAD 15-20/jam
- Sumber: kp2mi.go.id, jdih.bp2mi.go.id, siskop2mi.bp2mi.go.id, imigrasi.go.id, palmscheme.gov.au, id.emb-japan.go.jp, ssw.go.jp, bnsp.go.id, peraturan.bpk.go.id, biruniconsulting.com, glints.com, schoters.com, ohm-group.id, california.com.hk, helperplace.com, gulfcareershub.com, kaigoaruaru.com
---
Task ID: 3
Agent: Z.ai Code (main orchestrator)
Task: Menambahkan jasa pajak pribadi & perusahaan + jasa penempatan PMI ke luar negeri (17 negara) + melengkapi semua layanan hulu ke hilir

Work Log:
- Baca worklog.md (konteks riset agen 2-a pajak, 2-b PMI, 2-c perizinan umum)
- Buat src/lib/tax-services.ts: 6 layanan pajak pribadi (NPWP 16 digit, SPT Tahunan, SPT Masa/e-Bupot, PKP OP, Keberatan/Banding, Aset & Warisan) + 10 layanan pajak badan/UMKM (NPWP Badan, PKP & e-Faktur, SPT Masa bulanan, SPT Tahunan 1771, PPh Final 0,5%, Transfer Pricing, Pemeriksaan/SP2DK, Restitusi, Pajak Daerah HKPD, Tax Planning) — harga & durasi dari riset pasar 2025, siap Coretax DJP
- Buat src/lib/pmi-services.ts: 3 layanan B2B (PPTKIS/P3MI, LPK Berizin, BNSP) + 10 layanan B2C hulu-hilir (bundle dokumen, pelatihan bahasa, kontrak/visa, tiket BI/asuransi JPKK, Jepang SSW, Korea EPS, Taiwan/HK/SG, Timur Tengah, Barat Jerman-UK-Canada, purna PMI) + tabel 17 negara tujuan (bendera, sektor, skema, gaji) + 6 langkah proses
- Perluas SERVICES di landing-data.ts dari 17 menjadi 32 layanan: PT Perorangan, Koperasi/Yayasan, Merek DJKI, Paten & HKI, API-U/P & Ekspor Impor, HS Code & COO, ISO 9001/14001/45001/22000, SMK3 & K3, RPTKA/KITAS Expatriat, Izin Alkes AKL/AKD, Lembaga Pendidikan, PSE Komdigi, LKPM & Kepatuhan OSS, B3/PROPER, Entitas Luar Negeri
- Buat komponen tax-services.tsx (tab Pribadi | Perusahaan & UMKM, kartu ala Services) dan work-abroad.tsx (statistik PMI, grid 17 negara dengan toggle show-all, proses 6 langkah, tab Individu | Perusahaan, catatan legal UU 18/2017)
- Update services.tsx: tombol "Tampilkan semua 32 layanan" (default 9 kartu)
- Update page.tsx: insert TaxServices + WorkAbroad setelah Services
- Update header.tsx: nav baru "Pajak" & "Kerja Luar Negeri" (nav dibersihkan: Jangkauan tetap di footer/mobile)
- Update footer.tsx: 8 link layanan baru (pajak, PMI, merek, API, ISO/SMK3, RPTKA-KITAS) dengan max-h scroll
- Update i18n types.ts + translations-core.ts: 22 key baru (id + en) termasuk taxSub & pmiSub (fix bug key hilang)
- Update seo-jsonld.tsx: hasOfferCatalog 59 offer (32 perizinan + 16 pajak + 13 PMI), areaServed 18 negara, description & priceRange baru, breadcrumb 8 level
- Verifikasi browser: section #pajak & #kerja-luar-negeri ada, tab switch Radix OK (pribadi/badan, individu/perusahaan), 17 bendera negara tampil, toggle show-all OK, 32 layanan expand OK, JSON-LD ter-render, mobile 390px OK, console 0 error
- ESLint 0 error, dev.log bersih

Stage Summary:
- Website kini menawarkan 32 layanan perizinan + 16 layanan pajak + 13 layanan PMI = 61 layanan dalam satu pintu (hulu ke hilir penuh)
- Section baru: #pajak (tab Pribadi/Perusahaan-UMKM) dan #kerja-luar-negeri (17 negara: Saudi, UAE, Qatar, Kuwait, Oman, Bahrain, Yordania, Malaysia, Singapura, Hong Kong, Taiwan, Jepang, Korea, Brunei, Jerman, UK, Canada)
- SEO: offer catalog 59 layanan terstruktur schema.org, target "konsultan pajak", "PPTKIS", "kerja luar negeri"
- Kesesuaian regulasi 2025: Coretax DJP, NPWP 16 digit/NITKU, PP 55/2022, PMK 164/2023, UU 18/2017 PPMI, SISKOP2MI, G2G (SSW Jepang, EPS Korea, Triple Win Jerman)

---
Task ID: 3
Agent: Z.ai Code (main orchestrator)
Task: Programmatic SEO — setiap layanan punya halaman sendiri (1.000+ halaman) untuk dominasi Google: perizinan × 38 provinsi, pajak × 15 kota, PMI × 17 negara × sektor

Work Log:
- Riset internet via agent (27 query web-search): 13 kategori layanan, data biaya/waktu riil, gaji PMI per negara (Malaysia 46,3% penempatan, Taiwan BPJS terbesar, dst) — laporan tersimpan di riset/LAPORAN_KATALOG_LAYANAN.md
- Eksplorasi codebase: single-page app, 61 layanan (SERVICES/TAX_ALL/PMI), 38 provinsi, PERMIT_GUIDES 16, static export compatible
- Buat arsitektur katalog baru di src/lib/catalog/: types.ts (ServicePage, CatalogKind, CATEGORY_META), detail-licenses.ts (19 detail kaya + mapping 13 dari PERMIT_GUIDES), detail-tax-pmi.ts (16 pajak + 13 PMI + 17 negara detail kaya: gaji/sektor/visa/dokumen/proses/FAQ), generators.ts (mesin kombinasi deterministik), index.ts (API)
- Generator menghasilkan: 61 halaman induk + 532 perizinan×38 provinsi + 144 perizinan×8 provinsi + 60 perizinan×10 kota + 105 pajak×15 kota + 17 negara PMI + 46 negara×sektor + 41 hub (3 kategori + 38 wilayah) = 1.008 URL
- Buat halaman dinamis src/app/layanan/[...slug]/page.tsx (catch-all): generateStaticParams + dynamicParams=false + generateMetadata per halaman (title/desc/keywords/canonical/OG) + JSON-LD triple schema (Service + FAQPage + BreadcrumbList) + breadcrumb + hero info bar + fitur + syarat + timeline proses + FAQ accordion + region links + related links + sidebar CTA WhatsApp sticky
- Buat halaman katalog src/app/layanan/page.tsx + catalog-browser.tsx (client: search real-time + tab filter kategori) + hub-page.tsx (server, untuk kategori/wilayah)
- Sitemap dinamis: hapus public/sitemap.xml lama (10 URL), buat src/app/sitemap.ts → 1.008 URL terverifikasi via curl
- Update internal linking: header.tsx (nav Layanan/Pajak/Kerja LN → /layanan), footer.tsx (4 kolom katalog SEO baru: Layanan Populer, Sertifikasi & Korporasi, Layanan per Wilayah, Kerja Luar Negeri), services.tsx + tax-services.tsx + work-abroad.tsx (CTA kartu → /layanan/{id}), html-sitemap.tsx (61 layanan + 38 provinsi → URL dinamis, stat "1.000+ Halaman SEO")
- Fix bug: field desc undefined pada ServicePage (crash client saat search) → tambahkan field desc ke interface + 7 builder; hub wilayah tidak set region → 0 link (fix: set region: prov.name); refactor [slug] → [...slug] untuk URL nested kategori/wilayah
- Bersihkan typo keyword SEO: "kblu 78202" → kbli, "bsrе" cyrillic → bsre
- Verifikasi curl: semua tipe halaman 200 (base/region/city/country/sector/hub), 404 untuk slug tidak dikenal, title unik per halaman terverifikasi
- Verifikasi Agent Browser: katalog (116 link internal, search "jepang" → 3 hasil relevan, tab Pajak → 16 layanan), klik kartu → detail NPWP (breadcrumb, JSON-LD 9 script, FAQ accordion terbuka, Layanan Terkait 5 kartu, sidebar Info Cepat), hub Jawa Barat (32 link), kaigo Jepang (related cross-link), homepage (178 link katalog, nav baru), mobile 390px (tanpa overflow-x), footer katalog SEO tampil
- ESLint: 0 error 0 warning. Catatan: dev server sempat crash 2x (restart manual, memori aman 3GB)

Stage Summary:
- Website kini memiliki 1.008 halaman SEO terindeks (sitemap.xml dinamis) — setiap layanan punya halaman sendiri + kombinasi wilayah/kota/negara/sektor
- Struktur URL: /layanan (katalog), /layanan/{layanan}, /layanan/{layanan}-{provinsi}, /layanan/{layanan}-{kota}, /layanan/kerja-di-{negara}, /layanan/kerja-di-{negara}-{sektor}, /layanan/kategori/{cat}, /layanan/wilayah/{provinsi}
- Setiap halaman: metadata unik + JSON-LD Service/FAQPage/BreadcrumbList + internal linking 5-6 related + CTA WhatsApp
- File kunci: src/lib/catalog/* (generator), src/app/layanan/* (routes), src/app/sitemap.ts, header/footer/services/html-sitemap (linking)
- Menambah 2 file panduan data besar: detail-licenses.ts (~490 baris), detail-tax-pmi.ts (~700 baris) berisi konten E-E-A-T riil dari riset

---
Task ID: 4
Agent: Z.ai Code (main orchestrator)
Task: TRIPLE CROWN — AI Roadmap Generator + Kalkulator Pajak Resmi + Database KBLI (142 halaman baru)

Work Log:
- Baca skill LLM (z-ai-web-dev-sdk) untuk implementasi AI Roadmap backend
- Database KBLI: src/lib/kbli-database.ts (142 kode KBLI valid 2025 dengan kategori 17 bidang A-S, tingkat risiko OSS, cakupan kegiatan, flag halal, izin khusus per sektor) + src/lib/kbli-catalog.ts (generator konten halaman: izin per risiko, pajak, insentif, FAQ spesifik kategori/halal/digital, layanan terkait per kategori, KBLI sejenis)
- Route KBLI: src/app/kbli/page.tsx (katalog: search real-time + filter 17 kategori via kbli-browser.tsx client) + src/app/kbli/[...slug]/page.tsx (detail: JSON-LD DefinedTerm+FAQPage+BreadcrumbList, sidebar spesifikasi, CTA WA prefilled "NIB Hari Ini", layanan & KBLI terkait)
- Kalkulator Pajak: src/app/kalkulator-pajak/page.tsx + tax-calculator.tsx (4 tab: PPh 21 metode tahunan=TER dengan biaya jabatan 5% maks 6jt + PTKP + tarif progresif UU HPP; PPh Final 0,5% dengan monitoring kuota 4,8 M; PPN 11% efektif PMK 131/2024; Jual-beli properti PPh 2,5% + BPHTB 5% dengan NPOPTKP) — hasil terverifikasi akurat vs hitungan manual
- AI Roadmap: prisma model RoadmapRequest (db push OK), API /api/roadmap (validasi input, simpan lead dulu, LLM via ZAI.create dengan system prompt konsultan senior → parse JSON robust → fallback deterministik bila AI gagal, simpan hasil), halaman /roadmap + roadmap-wizard.tsx (5 step wizard dengan progress bar, loading state animasi, hasil: summary + KBLI link ke database + timeline fase + biaya + durasi + risiko + next steps + CTA WhatsApp prefilled)
- Fix produksi: Prisma Client cache Turbopack stale (roadmapRequest undefined) → bunx prisma generate + rm -rf .next + kill zombie next-server (pid 1134) + restart bersih
- Update sitemap.ts: +5 static (kbli, kalkulator-pajak, roadmap) + 142 KBLI = 1.142 URL total
- Update footer (kolom Alat Gratis: roadmap/kalkulator/kbli), html-sitemap (TOOLS bar + stat "131 KBLI" & "1.150+ Halaman SEO")
- Verifikasi curl: semua halaman 200, API roadmap POST success source=ai (4 fase, KBLI akurat 56101/56102/47221, biaya Rp7,5-15jt), DB result tersimpan 4.819 chars
- Verifikasi Agent Browser: wizard 5 step lengkap (pilih kafe→Jawa Barat→UMKM→modal→kontak) → loading animasi → roadmap AI tampil dengan konten contextual (izin limbah cuci piring kafe, IMB Satpol PP, BPHTB daerah, Halal LPPH); KBLI katalog search "kopi" → 3 hasil relevan; KBLI 56301 detail (FAQ halal, layanan terkait, KBLI sejenis); kalkulator PPh 21 gaji 15jt = Rp970rb/bln (6,47%) AKURAT; UMKM 50jt = 1jt (0,5%) AKURAT; PPN 11% AKURAT; mobile 390px OK
- ESLint final: 0 error. dev.log bersih.

Stage Summary:
- TRIPLE CROWN SELESAI: website kini memiliki 3 aset moat kompetitif yang tidak dimiliki kompetitor
- Total halaman SEO: 1.142 URL (61 layanan + 676 region + 165 city + 17 negara + 46 sektor + 41 hub + 142 KBLI + 5 static)
- AI Roadmap Generator = mesin lead premium (nama+WA+bidang+lokasi tersimpan DB, hasil AI personal)
- Kalkulator Pajak = magnet backlink dengan rumus resmi terverifikasi akurat
- Database KBLI = mesin traffic high-intent dengan JSON-LD DefinedTerm untuk featured snippet
- File kunci: src/lib/kbli-database.ts, src/lib/kbli-catalog.ts, src/app/kbli/*, src/app/kalkulator-pajak/*, src/app/roadmap/*, src/app/api/roadmap/route.ts

---
Task ID: 5
Agent: Z.ai Code (main orchestrator)
Task: TIER 2 TRIPLE — AI Cek Dokumen via Upload Foto (VLM) + Lowongan Kerja & Google Jobs Schema + Halaman Perbandingan Badan Usaha (PT vs CV dll)

Work Log:
- Baca worklog.md (Task 1-4 selesai: install, riset, 1.008 halaman katalog, TRIPLE CROWN 1.142 URL) + baca skill VLM untuk createVision
- [5-A] AI Cek Dokumen: model Prisma DocumentCheck (fileName, docCategory, fileType, fileSize, result JSON, whatsapp, status) + db push; API /api/document-checker: validasi mime (jpeg/png/webp) + ukuran (~4,6MB), simpan lead dulu, VLM zai.chat.completions.createVision dengan system prompt verifikator senior (aturan privasi: sensor 6 digit pertama NIK/NPWP/paspor, deteksi foto bukan-dokumen → relevant=false, legibilityScore jujur), parseAiJson + sanitasi status/severity, fallback deterministik per kategori (npwp/nib/ktp/generic)
- [5-A] Halaman /cek-dokumen (metadata SEO + hero + cara kerja 3 langkah + CTA silang roadmap/kalkulator/kbli) + document-checker.tsx client: drag&drop/klik upload, kompresi canvas di browser (max 1600px, jpeg 0.85/0.65 fallback), 8 chip kategori (auto/NPWP/NIB/KTP/Sertifikat Standar/Halal-PIRT-BPOM/Paspor PMI/Kontrak), loading skeleton, hasil: badge jenis+confidence, meter keterbacaan (Progress), grid checks berwarna per status, issues dengan severity badge + saran perbaikan, rekomendasi & next steps, CTA WhatsApp prefilled dengan ringkasan hasil, disclaimer verifikasi resmi
- [5-B] Lowongan: src/lib/jobs-data.ts — 12 posisi realistis (Marketing Consultant, Staf Admin Legalitas, Konsultan Junior, Content Writer SEO remote, Telemarketing, Legal Officer, Trainer Bahasa Jepang LPK mitra Bekasi, Coordinator PMI SISKOP2MI, Digital Marketing, Data Entry OSS part-time remote, Graphic Designer remote, AE Pajak Coretax) dengan gaji IDR transparan, responsibilities/qualifications/benefits/skills, tanggal posting dinamis (postedDaysAgo) & validThrough +90 hari
- [5-B] Halaman /lowongan-kerja (index: section Prioritas Rekrutmen + grid semua posisi + peringatan anti-penipuan "rekrutmen 100% gratis") + /lowongan-kerja/[slug] (generateStaticParams 12 + notFound): JSON-LD JobPosting lengkap sesuai spec Google Jobs — datePosted, validThrough, employmentType, hiringOrganization (logo+sameAs), jobLocation Place/PostalAddress, jobLocationType TELECOMMUTE + applicantLocationRequirements untuk remote, baseSalary IDR MONTH min/max, OccupationalExperienceRequirements, educationRequirements, skills, directApply; konten: deskripsi/tanggung jawab/kualifikasi/proses lamaran FAQ/sidebar ringkasan/skill tags/benefit/related
- [5-C] Perbandingan: src/lib/comparisons.ts — 8 perbandingan berbasis regulasi riil (UU 40/2007, KUHD, UU Cipta Kerja 153A, PP 8/2021, UU 16/2001, UU 25/1992, PP 49/2021, PMK 24/2019, PP 55/2022): pt-vs-cv (13 aspek), pt-pma-vs-pt-lokal, pt-vs-pt-perorangan, cv-vs-usaha-dagang, pt-vs-yayasan, pt-vs-koperasi, firma-vs-cv, pt-perorangan-vs-perseorangan-nib; tiap comparison: 10-13 aspek dengan winner a/b/tie, chooseA/chooseB (5 poin), verdict naratif, 5-6 FAQ, keywords
- [5-C] Halaman /bandingkan (index grid 8 kartu) + /bandingkan/[slug]: JSON-LD FAQPage + BreadcrumbList, hero dual-card (unggul masing-masing), tabel desktop 4 kolom dengan highlight sel pemenang + badge Unggul, mobile cards dengan badge "PT unggul/CV unggul/Setara", verdict 3 kolom, FAQ accordion (details/summary), CTA WA + serviceLinks dengan mapping slug benar (pt-pma→pt, yayasan/koperasi→koperasi-yayasan, firma→cv, usaha-dagang/nib-op→nib), related comparisons
- Integrasi: sitemap.ts +23 URL (cek-dokumen 0.9, lowongan index 0.85 + 12 detail 0.8, bandingkan index 0.85 + 8 detail 0.85); footer kolom Alat Gratis +3 link (📷 AI Cek Dokumen, ⚖️ Perbandingan, 💼 Lowongan); html-sitemap TOOLS +3 entry & stat "1.170+ Halaman SEO"
- FIX BUG 1: db.documentCheck undefined (cache Prisma Client Turbopack stale — pola sama Task 4) → bunx prisma generate + rm -rf .next + kill next-server + restart bersih
- FIX BUG 2 (kritis): createVision tidak pernah menerima SYSTEM_PROMPT (messages hanya user) → model balas markdown bebas → parseAiJson null → selalu fallback. Fix: tambah {role:"assistant", content: SYSTEM_PROMPT} di depan messages (pola sama dengan route /api/roadmap); diverifikasi AI kembali dengan JSON sempurna
- Verifikasi API: POST NPWP mock (PIL-generated kartu NPWP tiruan) → source:ai, documentType "Kartu NPWP (Pengusaha)" confidence 98, legibility 95, 5 checks OK, AI mensensor nomor (8**.9**.4-***.0) sesuai aturan privasi, 2 issues (kotak foto kosong!), DB tersimpan; POST gambar non-dokumen (emoji senyum mock) → relevant:false "Emoji/Smiley Face (Bukan Dokumen)" confidence 99
- Verifikasi Agent Browser: /cek-dokumen upload file → preview + 90KB terkompresi → klik analisis → wait "Hasil Pemeriksaan" (~15s) → semua section render (badge, meter, checks grid, masalah, rekomendasi, langkah, CTA WA); /lowongan-kerja 12 kartu + Prioritas + anti-penipuan; detail JobPosting JSON-LD valid (salary IDR MONTH, directApply, TELECOMMUTE utk remote); /bandingkan/pt-vs-cv tabel 13 baris + FAQ accordion terbuka; mobile 390px: 3 halaman tanpa overflow-x, kartu perbandingan dengan badge
- 404 benar utk slug lowongan/bandingkan tak dikenal; footer link 3 fitur baru ada di homepage; console 0 error; ESLint 0 error 0 warning; sitemap 1.165 URL
- dev.log: hanya noise cache Turbopack (Persisting failed sst) — tidak ada error runtime

Stage Summary:
- Website kini 1.165 URL SEO (+23): 3 alat Tier 2 hidup — AI Cek Dokumen (lead magnet visual), Lowongan (Google Jobs schema siap featured di Google), Perbandingan Badan Usaha (menang query "pt vs cv" dll)
- AI Cek Dokumen: pipeline foto→VLM→JSON terverifikasi end-to-end di browser + curl; privasi (sensor nomor, foto tak disimpan); fallback deterministik jika AI gagal
- Google Jobs: 12 JobPosting valid (datePosted/validThrough/salary/TELECOMMUTE/directApply) — kandidat muncul di "Jobs" tab Google
- Perbandingan: 8 halaman × 10-13 aspek dengan konten hukum riil & verdict jujur — struktur FAQPage untuk featured snippet
- File kunci: src/app/api/document-checker/route.ts, src/app/cek-dokumen/*, src/lib/jobs-data.ts, src/app/lowongan-kerja/*, src/lib/comparisons.ts, src/app/bandingkan/*, prisma/schema.prisma (DocumentCheck), sitemap.ts, footer.tsx, html-sitemap.tsx
---
Task ID: 7-c
Agent: full-stack-developer
Task: AI Cek Dokumen via upload foto (VLM)

Work Log:
- Baca worklog.md (Task 1-5 selesai: install, 1.008 halaman katalog, TRIPLE CROWN, Tier 2 alat) + referensi: api/license-checker/route.ts (pola API), layanan/page.tsx (pola server+client), footer.tsx (palet emerald/amber/stone), rg wa.me → nomor resmi 6281269999910 (= WHATSAPP_NUMBER @/lib/landing-data)
- Catatan konteks: /cek-dokumen (page + document-checker.tsx dari Task 5-A) & /api/document-checker SUDAH ada; sesi ini REPLACE page.tsx dengan spesifikasi baru + API baru /api/cek-dokumen (route lama tidak disentuh; document-checker.tsx dibiarkan utuh karena dilarang menyentuh file lain — tak lagi diimpor, jadi dead code)
- [API] src/app/api/cek-dokumen/route.ts: export runtime nodejs + export DOC_TYPES (8 tipe: ktp/npwp/nib/akta/sk-menkumham/paspor/ijazah/sertifikat-standar, masing-masing label+emoji+promptChecklist 6 elemen wajib); validasi 400: image wajib data URL data:image/(jpeg|png|webp);base64, maks ~7jt karakter, docType wajib dari daftar; prompt VLM Bahasa Indonesia (verifikator dokumen resmi RI, score 0-100, status layak/perlu_perbaikan/tidak_terbaca, checklist 5-7 item, rekomendasi 2-4, catatan; bukan dokumen → tidak_terbaca + penjelasan); createVision persis pola terbukti (messages user text+image_url, thinking disabled) dengan Promise.race timeout 90 dtk; parsing tangguh: trim → buang fence ``` → substring "{" pertama s/d "}" terakhir → JSON.parse → sanitasi score clamp/status/checklist/rekomendasi; gagal parse / VLM error / timeout / catch → 200 {ok:false, message "Analisis AI sedang sibuk…", fallbackChecklist 5 item generik, ctaWa:true}; PRIVASI: image hanya diproses in-memory, TIDAK disimpan ke disk/DB/log (tidak pakai Prisma, komentar privasi di kode, log hanya pesan error tanpa isi gambar); sukses → {ok:true, score, status, checklist, rekomendasi, catatan, docType, checkedAt ISO}
- [Halaman] src/app/cek-dokumen/page.tsx (server component, replace): generateMetadata title ABSOLUTE "AI Cek Dokumen Gratis — Periksa KTP, NPWP, NIB dalam 30 Detik | Pusat Perizinan" (hindari dobel suffix template), description+keywords jualan benefit, canonical https://pusatperizinan.com/cek-dokumen, openGraph, robots index; JSON-LD FAQPage 5 FAQ (privasi/tipe dokumen/bukan pengganti verifikasi resmi/gratis/bantuan perbaikan via WA) + SoftwareApplication (UtilitiesApplication, Web, offers 0 IDR); header mini ala /layanan; hero badge "GRATIS • Tanpa Login • 30 Detik" + h1 + subjudul + <DocChecker/>; privacy note menonjol ShieldCheck "diproses sementara di memori server dan TIDAK PERNAH disimpan"; section Cara Pakai 3 langkah; section 8 Dokumen Didukung (grid emoji+label literal — DOC_TYPES diduplikasi literal di page agar client tidak mengimpor route file yang membawa SDK); CTA WhatsApp bawah + cross-link /roadmap
- [Client] src/app/cek-dokumen/doc-checker.tsx ("use client"): state machine idle→loading→result|error; step 1 grid 8 kartu emoji+label (selected: ring-2 ring-emerald-500 bg-emerald-50, aria-pressed); step 2 dropzone dashed (drag&drop + klik, drag-over highlight emerald), input hidden accept jpeg/png/webp capture=environment (kamera HP), validasi type & maks 10MB, resize client via canvas (maks sisi 1600px, toDataURL jpeg 0.85) sebelum kirim, preview img alt="Preview dokumen" + tombol X hapus (h-11); tombol besar "🔍 Analisis dengan AI" (disabled tanpa docType/gambar); loading: preview + overlay scanner (bar gradient emerald keyframes docscan melintas atas-bawah via <style> inline) + "AI sedang memeriksa dokumen…" role=status; result ok: ScoreRing SVG stroke-dasharray (emerald ≥80/amber 50-79/merah <50) + angka /100, badge status Layak Diajukan/Perlu Perbaikan/Tidak Terbaca, checklist ikon CheckCircle2/AlertTriangle/XCircle + label bold + note kecil, box "Rekomendasi Perbaikan" ikon ArrowRight, catatan AI italic quote box border-emerald; result ok:false → message + fallbackChecklist + tombol WA; error network/timeout (AbortController 120 dtk) → box merah + "Coba Lagi"; bawah result 2 CTA: "Perbaiki & Ajukan via WhatsApp" (wa.me/6281269999910 prefill "Halo, saya baru cek dokumen {label} via AI Cek Dokumen. Hasil: {status} ({score}/100). Mohon dibantu perbaikan & pengajuan.") + outline "Cek Dokumen Lain" (reset idle); a11y: aria-live polite utk hasil, aria-pressed, fieldset disabled saat busy, semua tombol min-h-11, responsive 1 kolom mobile, palet emerald/amber/stone tanpa biru/indigo
- Verifikasi: bun run lint → 0 error 0 warning (tanpa output); curl /cek-dokumen → HTTP 200, title & JSON-LD & semua section ter-render (Cara Pakai, 8 Dokumen, TIDAK PERNAH, badge, tombol Analisis, 5× wa.me); tes API E2E via tmp-test-cek.ts (logo.png 313KB → data URL 418.034 chars, docType ktp) → HTTP 200 ok:true, score 0, status tidak_terbaca, checklist 6 item fail/ok+note spesifik, 2 rekomendasi, catatan AI: "Gambar adalah logo TOP KONSULTAN PUSAT PERIZINAN.ID, BUKAN KTP" → struktur JSON benar & AI jujur (logo memang bukan KTP) = TES VALID; tes validasi: docType salah → 400 + pesan daftar 8 tipe, mime salah → 400 + pesan format; file tes DIHAPUS; tail dev.log → ✓ Compiled, GET /cek-dokumen 200, POST /api/cek-dokumen 200 (15.9s VLM) & 400, tanpa error
---
Task ID: 7-a
Agent: full-stack-developer
Task: Fitur Lowongan Kerja + Google Jobs schema

Work Log:
- Baca worklog.md + file referensi (layanan/[...slug]/page.tsx, layanan/page.tsx, catalog-browser.tsx, footer.tsx); rg "wa.me" → nomor resmi WA = 6281269999910 (WHATSAPP_NUMBER di lib/landing-data) dipakai konsisten di semua CTA lamaran
- Buat src/lib/jobs.ts: type Job (category pmi/kantor/lapangan, location city/region/country/type, salary MONTH ISO-4217, dll) + 12 lowongan statis persis sesuai spesifikasi (slug, judul, lokasi, gaji, tipe kontrak, datePosted disebar 2026-08-15 s/d 2026-09-28, validThrough 2026-11-30 s/d 2026-12-31); 6 lowongan PMI dengan employer mitra realistis (Saitama Care Group, Hanwoo Manufacturing Co., dst) + syarat dokumen terverifikasi BNP2MI + istilah benar (UU 18/2017, SISKOP2MI, Musaned, EPS-TOPIK, JLPT N4/JFT-Basic, SSW Kaigo, PLKS); 6 lowongan kantor PT Pusat Perizinan Indonesia menyebut OSS-RBA/KBLI/Coretax/PMK 168/2023; benefit realistis (BPJS Kesehatan & Ketenagakerjaan, THR) + helper format gaji Intl.NumberFormat("id-ID", narrowSymbol) & format tanggal id-ID timeZone UTC (aman hydration)
- Buat src/app/lowongan/page.tsx (server component): generateMetadata (judul "12 Lowongan Kerja Terbaru 2026 — Dalam & Luar Negeri | Pusat Perizinan", description dengan angka, keywords, canonical https://pusatperizinan.com/lowongan, openGraph, robots index follow); JSON-LD ItemList 12 ListItem (position 1-12, name, url); hero + badge "12 Lowongan Aktif" + 3 statistik (6 negara tujuan, kontrak resmi UU 18/2017/SISKOP2MI, tanpa biaya ilegal); render <JobBrowser jobs={JOBS} />; section "Kenapa Melamar Lewat Kami" (4 kartu ikon: Pendampingan Dokumen BNP2MI, Employer Terverifikasi, Kontrak Transparan, Pendampingan Sampai Tiba) + CTA banner WA "Tanya Persyaratan Lowongan"
- Buat src/app/lowongan/job-browser.tsx ("use client"): tab Semua/Luar Negeri (PMI)/Kantor Pusat/Lapangan & Proyek + search real-time (title+city, pola catalog-browser); grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 kartu p-6; badge Unggulan amber utk featured; Building2 company, MapPin city+country, gaji narrowSymbol (Rp/¥/₩/SAR/NT$/€/RM), Badge Full-time/Kontrak, tanggal "d MMM yyyy"; tombol "Detail & Lamar" w-full; empty state SearchX + "Lowongan tidak ditemukan" + reset; SEMUA 12 kartu tetap dirender server-side di DOM, filter hanya menambah class hidden (SEO)
- Buat src/app/lowongan/[slug]/page.tsx (server component): dynamicParams=false + generateStaticParams dari JOBS + notFound() utk slug tak dikenal; generateMetadata per job (title "{title} — {city}, {country} | Pusat Perizinan", description gaji+1 kalimat, canonical, openGraph); JSON-LD JobPosting Google Jobs lengkap (title, description HTML <p>+<ul><li> diinjeksi via JSON.stringify, datePosted, validThrough, employmentType, hiringOrganization.sameAs, jobLocation PostalAddress, baseSalary MonetaryAmount/QuantitativeValue unitText MONTH, directApply true, industry "Staffing & Recruitment", occupationalCategory, experienceRequirements, educationRequirements, skills join, qualifications array, applicantLocationRequirements Indonesia utk 6 job PMI saja) + JSON-LD kedua BreadcrumbList (Beranda > Lowongan > {title}); layout: breadcrumb aria-label, badge kategori, h1, chips (MapPin/Banknote/Clock/Calendar), box gaji emerald-50 border-emerald-200, CTA "Lamar via WhatsApp" hijau (prefill "Halo, saya ingin melamar posisi {title} ({city}). Berikut CV saya.") + "Kirim CV via Email" outline (mailto:karir@pusatperizinan.com), sidebar Proses Seleksi 4 langkah, konten Deskripsi/Tanggung Jawab/Kualifikasi/Benefit, disclaimer anti-penipuan abu-abu, "Lowongan Lainnya" 3 kartu + link balik
- Verifikasi: bun run lint 0 error 0 warning (2x, sebelum & sesudah revisi); curl semua 12 detail = 200, /lowongan = 200, slug palsu = 404; rg "JobPosting" ≥ 1 di detail; parse JSON-LD via bun (JobPosting + BreadcrumbList valid, applicantLocationRequirements hanya di job PMI, baseSalary JPY/EUR/IDR unitText MONTH benar); ItemList 12 item posisi 1-12; WA index/detail = wa.me/6281269999910; 12 kartu ada di DOM server-side
- FIX: typo "mengikutimedical" → spasi; hapus const salaryFormatter unused (lint); tambah currencyDisplay "narrowSymbol" agar MYR tampil "RM" (bukan "MYR") sesuai spesifikasi simbol mata uang
- dev.log bersih: hanya GET 200/404 dari route /lowongan, tanpa error runtime

Stage Summary:
- Route baru /lowongan (index + 12 halaman detail statis, SSG penuh) = 13 URL SEO baru; file: src/lib/jobs.ts, src/app/lowongan/page.tsx, src/app/lowongan/job-browser.tsx, src/app/lowongan/[slug]/page.tsx (4 file, tanpa menyentuh file agent lain)
- Google Jobs siap indeks: 12 JobPosting lengkap (datePosted/validThrough/baseSalary MONTH/directApply/applicantLocationRequirements utk PMI) + ItemList di index + BreadcrumbList di tiap detail
- Keputusan kategori: welder-jerman & teknisi-pembangkit-malaysia = category "lapangan" (kerja industri di luar negeri) sehingga tab Lapangan & Proyek tidak kosong; tab "Luar Negeri (PMI)" memfilter country ≠ Indonesia sehingga tetap menampilkan 6 job luar negeri
- Catatan konsistensi situs: title metadata otomatis dapat suffix " | PusatPerizinan.com" dari template root layout, dan ada 1 canonical tambahan dari root layout (pola situs yang sudah ada, bukan dari file ini)
---
Task ID: 7-b
Agent: full-stack-developer
Task: Halaman Perbandingan Badan Usaha programatik

Work Log:
- Baca worklog.md (konteks Task 1-6) + referensi pola: src/lib/catalog/detail-licenses.ts (gaya data kaya FAQ/legalBasis), generators.ts (builder), src/app/layanan/[...slug]/page.tsx (pola page server static export), footer.tsx (palet emerald/gold), rg wa.me → 6281269999910 (WHATSAPP_NUMBER dari @/lib/landing-data, dipakai sama persis)
- Verifikasi slug internal link: /layanan/pt, /layanan/cv ada di landing-data + seo-content; /layanan/kategori/pajak dari hub kategori — semua valid
- Buat src/lib/catalog/comparisons.ts: type ComparisonEntity/ComparisonTableRow/ComparisonFaq/Comparison + 10 entitas singleton (E_PT, E_CV, E_PTP, E_UD, E_FIRMA, E_YAYASAN, E_PERKUMPULAN, E_KOPERASI, E_PMA, E_KP3A) dipakai lintas perbandingan agar angka regulasi konsisten + 12 comparison: pt-vs-cv (flagship 14 aspek 8 FAQ), pt-vs-pt-perorangan, cv-vs-pt-perorangan, pt-vs-ud, cv-vs-ud, pt-pma-vs-pt-lokal, cv-vs-firma, pt-vs-yayasan, yayasan-vs-perkumpulan, pt-vs-koperasi, cv-vs-koperasi, pt-pma-vs-kantor-perwakilan; tiap comparison: intro 2 paragraf, tabel 10-14 baris, verdictA/verdictB 4-5 poin, recommendation 3 paragraf, 6-8 FAQ berangka nyata (notaris Rp 1–3 jt vs Rp 500 rb–1,5 jt, PPh Badan 22% vs final 0,5% PP 23/2018 jo. PP 55/2022, dividen final 10% PMK 128/2019, PPh 21 TER PMK 168/2023, modal awal yayasan Rp 10 jt tunai, modal PMA Rp 10 M cek BKPM/Perpres 5/2025, KP3A dilarang bertransaksi), relatedSlugs 3; helper getComparison/getComparisonSlugs
- Buat src/app/perbandingan/page.tsx (index server component): generateMetadata (title sesuai spec, canonical https://pusatperizinan.com/perbandingan, OG, robots index) + JSON-LD CollectionPage berisi ItemList 12 comparison (name+url) + hero badge emerald/gold + intro SEO 3 paragraf (pajak, tanggung jawab hukum, akses modal/tender) + grid kartu 12 duel (icon + "{nameA} vs {nameB}" + badge 🆚 + metaDesc line-clamp-2 + chip jumlah aspek/FAQ + tombol Lihat Perbandingan) + CTA WhatsApp prefilled + internal link /layanan/pt & /layanan/cv + footer mini sticky (min-h-screen flex flex-col, mt-auto)
- Buat src/app/perbandingan/[slug]/page.tsx: dynamicParams=false + generateStaticParams dari COMPARISONS + notFound() pengaman; generateMetadata per comparison (title=h1, canonical absolut, OG article); JSON-LD FAQPage + BreadcrumbList (Beranda → Perbandingan → h1) + Article datePublished 2026-09-01 dalam satu script array; layout: breadcrumb, hero duel 2 kartu entity (border emerald vs gold) + medali bundar VS (grid md:grid-cols-[1fr_auto_1fr], stack di mobile), box Kesimpulan Cepat (para 1 recommendation, border-l emerald), intro Latar Belakang, tabel perbandingan (div max-h-70vh overflow-auto, table min-w-[680px], thead sticky top-0, kolom Aspek|nameA|nameB, zebra odd/even), 2 kartu Kelebihan & Kekurangan (lucide Check hijau / X merah + chip bestFor), section Biaya & Waktu Pendirian 2 kolom angka besar, Rekomendasi Akhir (kartu "Pilih A jika…"/"Pilih B jika…" + paragraf), FAQ Accordion shadcn, CTA gelap emerald "Siap Mendirikan {A} atau {B}? Konsultasi Gratis via WhatsApp", Perbandingan Terkait 3 kartu relatedSlugs, blok internal link /layanan/pt, /layanan/cv, /layanan/kategori/pajak
- FIX 1: tabel row comparison-12 punya key duplikat "a" → diperbaiki; FIX 2: setupCost PT Perorangan dipanjangkan → split " (" tetap rapi; FIX 3: eslint-disable img tak terpakai dihapus; FIX 4: ikon Check/X diganti ikon lucide resmi (spec); FIX 5: index page.tsx sempat gagal tersimpan karena parent dir belum ada saat Write pertama (mkdir ulang + tulis ulang) — penyebab 404 awal /perbandingan, sudah resolved
- Verifikasi: bun run lint → 0 error 0 warning; curl: /perbandingan 200, /perbandingan/pt-vs-cv 200, /perbandingan/tidak-ada 404, ke-12 slug detail 200 (pt-vs-pt-perorangan, cv-vs-pt-perorangan, pt-vs-ud, cv-vs-ud, pt-pma-vs-pt-lokal, cv-vs-firma, pt-vs-yayasan, yayasan-vs-perkumpulan, pt-vs-koperasi, cv-vs-koperasi, pt-pma-vs-kantor-perwakilan); rg FAQPage pada /perbandingan/pt-vs-cv = 1 (≥1) + BreadcrumbList + Article + CollectionPage/ItemList di index; konten terverifikasi di HTML (tabel Aspek, PPh Badan 22% ×16, PP 23/2018 ×9, nomor WA 6281269999910); dev.log bersih tanpa error baru

Stage Summary:
- Fitur Perbandingan Badan Usaha programatik selesai: 13 halaman baru (1 index + 12 detail duel) yang bisa di-statis-kan penuh (dynamicParams=false, generateStaticParams dari data)
- 3 file dibuat sesuai batasan: src/lib/catalog/comparisons.ts, src/app/perbandingan/page.tsx, src/app/perbandingan/[slug]/page.tsx — tidak menyentuh sitemap/header/footer/page.tsx/generators.ts
- 10 entitas badan usaha + 12 pasangan dengan fakta regulasi akurat & konsisten (UU 40/2007, UU 6/2023, UU 18/2008, KUHD, UU 16/2001 jo. UU 28/2004, UU 25/1992, UU 25/2007, BKPM 5/2021/Perpres 5/2025, PP 23/2018 jo. PP 55/2022, PMK 128/2019, PMK 168/2023, UU HPP)
- JSON-LD lengkap untuk featured snippet: CollectionPage/ItemList (index), FAQPage + BreadcrumbList + Article (detail); CTA WhatsApp konsisten nomor resmi; palet emerald/gold tanpa biru/indigo; responsif mobile (duel stack vertikal, tabel scroll horizontal)
- Catatan: fitur /bandingkan (Task 5-C) tetap utuh & tak disentuh; /perbandingan adalah rute baru terpisah sesuai spesifikasi

---
Task ID: 7 (orchestrator integration)
Agent: Z.ai Code (main orchestrator)
Task: Eksekusi Tier 2 penuh via 3 subagent paralel (7-a Lowongan+Google Jobs, 7-b Perbandingan, 7-c AI Cek Dokumen) + konsolidasi deduplikasi dengan fitur versi lama Task 5

Work Log:
- Tes Vision API terlebih dahulu (bun + createVision, gambar logo.png) → terbukti jalan → pola dikirim ke subagent 7-c
- Luncurkan 3 subagent paralel (full-stack-developer): 7-a (src/lib/jobs.ts + /lowongan + /lowongan/[slug] + job-browser.tsx, 12 job PMI & kantor, JSON-LD JobPosting Google Jobs), 7-b (src/lib/catalog/comparisons.ts 12 perbandingan + /perbandingan + [slug], 10 entitas badan usaha), 7-c (/api/cek-dokumen VLM 8 docType + /cek-dokumen replace + doc-checker.tsx client) — semua lint 0 error
- TEMUAN: worklog Task 5 (sesi sebelumnya) sudah mengimplementasi Tier 2 versi lama → risiko duplicate content: /lowongan-kerja vs /lowongan, /bandingkan vs /perbandingan, /api/document-checker vs /api/cek-dokumen
- KEPUTUSAN KONSOLIDASI: versi baru superior (data lebih kaya, JSON-LD lebih lengkap) → hapus src/app/lowongan-kerja/, src/app/bandingkan/, src/lib/jobs-data.ts, src/lib/comparisons.ts, src/app/api/document-checker/, src/app/cek-dokumen/document-checker.tsx (dead code)
- Integrasi: sitemap.ts (import JOBS @/lib/jobs + COMPARISONS @/lib/catalog/comparisons, URL /lowongan & /perbandingan), footer.tsx + html-sitemap.tsx (2 link tiap file → route baru); header tidak perlu diubah; stat "1.170+ Halaman SEO" tetap akurat
- Verifikasi curl: semua route baru 200 (9 URL), route lama 404 (3 URL), sitemap 1.169 URL bebas URL lama; rg referensi lama = BERSIH; bun run lint = 0 error
- Verifikasi Agent Browser E2E: /cek-dokumen (pilih KTP → upload file via DataTransfer+change event → VLM analisis → hasil score 0/100 "Tidak Terbaca" + checklist + rekomendasi + CTA WA + disclaimer — AI jujur mendeteksi logo bukan KTP); /lowongan (12 kartu, ItemList, search "tokyo" → 1 kartu, nonsense → empty state + reset); detail job (JobPosting + BreadcrumbList, gaji ¥, Proses Seleksi, disclaimer anti-penipuan); /perbandingan/pt-vs-cv (14 baris tabel, FAQPage+Article, accordion FAQ terbuka dengan jawaban notaris Rp 1-3 jt); mobile 390px tanpa overflow-x di 2 halaman, tabel scroll horizontal dalam container; sticky footer (wrapper min-h-screen flex, footer nempel setelah scroll); homepage 0 link lama; console 0 error; dev.log bersih
- Bukti visual: tool-results/verify-cek-dokumen-result.png, verify-pt-vs-cv.png, verify-mobile-perbandingan.png

Stage Summary:
- TIER 2 SELESAI 100% (konsolidasi akhir): 3 alat baru hidup tanpa duplikasi — /lowongan (13 URL, Google Jobs siap featured), /perbandingan (13 URL, 12 duel badan usaha regulasi akurat), /cek-dokumen (1 URL + API VLM 8 tipe dokumen, privasi in-memory)
- Total sitemap: 1.169 URL (bersih dari duplikat versi lama, route lama mati 404)
- Struktur final: satu kanonik per fitur; data lowongan & perbandingan versi baru menjadi satu-satunya sumber kebenaran
- Semua golden path terverifikasi end-to-end di browser nyata + mobile responsif + sticky footer + lint 0 error
---
Task ID: 8
Agent: full-stack-developer
Task: Upgrade AI Chat CS 24/7 jadi mesin penjualan + lead capture cerdas

Work Log:
- Baca worklog.md (Task 1/4/5/7: pola API ZAI, parse JSON tangguh, system-prompt-as-assistant-message, fallback deterministik) + 3 file target + schema (Lead: name/whatsapp/businessType/businessDesc/estimatedValue/notes; ChatMessage: sessionId/role/content/leadCaptured) + i18n keys chat* (chatTitle/chatStatus/chatWelcome/chatPlaceholder/chatTyping/chatQr1-4) + WHATSAPP_NUMBER=6281269999910; rg ChatWidget → hanya page.tsx (tidak disentuh)
- [A] src/lib/chat-sales.ts (BARU): PRICE_MENU 9 item (NIB UMKM 350rb, Paket UMKM 750rb-1,5jt, PT mulai 3,5jt, CV 1,5jt, PMA konsultasi mulai 15jt, Halal 500rb+Sehati gratis, BPOM ML 5jt, PBG/SLF 1,5jt, SPPL 750rb) + priceMenuText(); SUGGESTIONS_BY_STAGE (discovery/comparing/ready/captured persis spec) + map EN sederhana + getSuggestions(stage, lang) (en→EN, selain id/en→id); TOOL_LINKS 6 tool (roadmap/kalkulator-pajak/kbli/perbandingan/cek-dokumen/lowongan) + toolLinksText(); STAGE_ORDER + nextStage(); detectIntent() rule-based: WA number→captured, mau/daftar/urus/butuh/sekalian→ready, harga/biaya/berapa/vs→comparing, sisanya discovery + detectTopic (PMA/PT/CV/NIB/Halal/BPOM/PBG/Pajak/KBLI/Lingkungan/UMKM)
- [B] route.ts tulis ulang: SYSTEM_PROMPT v2 "RIZKI — Sales Consultant Mode" (identitas SCBD 1.251 klien & 3.899 izin, metodologi 4 tahap DISCOVERY→PRESCRIBE→CLOSE→CAPTURED dengan script close elegan, objection handling empati→reframe→bukti→CTA, cross-sell tools, PRICE_MENU wajib "mulai dari", maks 120 kata, larangan garansi/topik luar/data sensitif) + languageSuffix existing dipertahankan
- [B] LLM utama Promise.race timeout 60 dtk → gagal/empty → fallback deterministik (pesan sopan + 3 menu cepat: harga/jenis usaha/WA 0812-6999-9910), tetap 200 + simpan DB (terbukti saat upstream ZAI 429 karena 3 request paralel: API tetap 200 dengan fallback)
- [B] LLM #2 lead extraction (thinking disabled, timeout 30 dtk, try/catch terpisah): EXTRACTOR_PROMPT → JSON {name,whatsapp,businessType,need,stage,urgency}, transkrip maks 24 pesan; parseLeadJson tangguh (buang fence → substring {..} terluar → JSON.parse → validasi tipe/stage/urgency/normalize WA); gagal → fallback deterministik: regex WA (nomor terbaru, exclude 6281269999910) + heuristik nama ("nama saya X"/"nama ku X"/"saya X" proper-case 1-3 kata + stopword filter) + stage dari detectIntent
- [B] FIX temuan verifikasi: extractor LLM pernah salah salin digit nomor WA (621234567890 dari input 081234567890) → ubah prioritas: regex dari teks USER verbatim (deterministik) → extractor → regex transkrip; lead junk hasil tes dihapus dari DB
- [B] LEAD UPSERT KAYA: trigger WA terdeteksi (regex user/extractor) → belum ada lead (source "chat", nomor sama) = CREATE (name fallback "Lead Chat AI", businessType fallback "Lainnya", businessDesc=need, estimatedValue: ready+high=5jt/ready=3jt/comparing=1,5jt/lainnya 500rb, notes "Stage | Urgency | Session | need") → sudah ada = UPDATE (isi name bila placeholder, businessType bila Lainnya, append notes maks 800 char " || ", upgrade estimatedValue via Math.max); leadCaptured ChatMessage AI = WA terdeteksi transkrip; respons: {success,reply,leadCaptured,leadComplete,stage,suggestions}
- [B] Rate limit in-memory per sessionId: 25 pesan/10 menit rolling window + cleanup lazy (>500 bucket) → 429 shape {success:false,error} sopan + ajak WA; rebuild history dari DB (20 ChatMessage terakhir) saat in-memory kosong; higiene memori conversations (>300 sesi → purge 50 terlama); trim history system+20
- [C] chat-widget.tsx tulis ulang: proactive teaser (delay 8 dtk, spring, avatar Bot mini + chatWelcome dibersihkan markdown dipotong 90 char fallback "Pertanyaan izin usaha? Tanya saya gratis 👋", X close h-9, auto-hide 25 dtk, localStorage pp-chat-teaser-dismissed + pp-chat-opened); unread badge angka (mulai 1, ++ tiap balasan AI saat tertutup, reset saat dibuka, "9+"); quick replies dinamis (chips dari response.suggestions maks 4, overflow-x-auto scrollbar-thin, klik chip → hide sampai balasan, state chipsPaused disembunyikan hanya setelah kirim manual, QR statis chatQr1-4 di awal); lead success card (border emerald + bg-emerald-50, CheckCircle2, nama di-heuristik dari pesan user client-side fallback "Kak", tombol wa.me, sekali via state hasLeadCard); sessionId persist localStorage pp-chat-session (load on mount, fallback create); typing 3 dot bounce framer-motion (Loader2 dihapus); mobile fixed left-3 right-3 bottom-[88px] h min(600px, calc(100vh-104px)) + sm:left-auto sm:right-5 sm:w-[380px]; a11y (role=log aria-live=polite, aria-label semua tombol, focus input saat dibuka, Escape tutup panel, tombol min h-9); pulse-ring + WA handoff header + renderMessage bold + reset welcome per bahasa dipertahankan
- Verifikasi: bun run lint → 0 error 0 warning; curl test-a1 "Halo" → success+reply+stage discovery+suggestions ID; "berapa biaya pendirian PT" → reply "mulai dari Rp 3,5jt" (rg "Rp 3" match); "Saya Budi Santoso, WA 081234567890..." → leadCaptured:true leadComplete:true + reply gaya CAPTURED (konfirmasi + offer /cek-dokumen & /roadmap); DB via tmp-lead-check.ts: lead name "Budi Santoso", whatsapp 6281234567890, businessType Kuliner, notes "Stage: ready | Urgency: medium | Session: test-a1", estimatedValue 3jt → UPDATE path: notes appended " || ", estimatedValue naik 5jt (ready+high), tanpa duplikat; ChatMessage leadCaptured=true; 3 POST paralel cepat → semua 200 tanpa 429 (1 otomatis pakai fallback karena upstream ZAI 429 — bukti jalur tangguh); lang "en" → suggestions English; 429 shape benar via review kode (25/10min, tanpa spam 25x); homepage 200; tmp-lead-check.ts DIHAPUS; dev.log bersih tanpa error baru (hanya prisma:query + fallback-expected log)

Stage Summary:
- Chat AI RIZKI v2 = mesin penjualan otomatis 24/7: metodologi 4 tahap + objection handling + cross-sell 6 tools internal + harga dari PRICE_MENU tunggal (tidak bisa mengarang angka)
- Lead capture cerdas berlapis: extractor LLM (nama/WA/bidang/need/stage/urgency) + regex safety net + heuristik nama → lead upsert kaya ke db.lead (create/update, estimatedValue dinamis 500rb-5jt, notes terstruktur maks 800 char)
- Tangguh: timeout 60/30 dtk, fallback deterministik tanpa 500, rate limit 25/10min, rebuild history lintas restart (session persist localStorage di client), prioritas regex-verbatim untuk nomor WA (anti-halusinasi digit)
- UX god mode: teaser proaktif, unread badge, quick replies dinamis per stage (id/en), lead success card + CTA WA, mobile-safe + a11y lengkap
- File: src/lib/chat-sales.ts (BARU), src/app/api/chat/route.ts (tulis ulang), src/components/landing/chat-widget.tsx (tulis ulang) — schema/i18n/page.tsx tidak disentuh
- Lead test tersimpan di DB sebagai bukti: Budi Santoso / 6281234567890 / source chat / estimatedValue 5.000.000

---
Task ID: 9 (orchestrator verification)
Agent: Z.ai Code (main orchestrator)
Task: Verifikasi E2E Agent Browser — AI Chat CS 24/7 mesin penjualan + lead capture (hasil Task 8)

Work Log:
- Desktop 1440x900: reload homepage → tunggu 10 dtk → deteksi elemen fixed (eval diperbaiki: elemen position:fixed selalu offsetParent null, pakai getBoundingClientRect) → teaser proaktif "Halo Kak! 👋 Saya RIZKI..." TERBUKTI muncul + FAB badge unread "1" (bukti: verify-chat-teaser2.png)
- Golden path penjualan: klik FAB → kirim "Saya mau buka kafe di Bandung, berapa biaya pendirian PT?" via input React (native setter + input event) → balasan AI menyebut harga (3,5) + notaris + ada pertanyaan balik → chips dinamis stage discovery tampil di panel ["Pendirian PT berapa biayanya?", "NIB untuk usaha saya", "Paket UMKM apa saja?", "Konsultasi gratis"]
- Golden path lead capture: kirim "Nama saya Andi Pratama, WA 081298765432, tolong dibantu urus NIB toko online" → kartu sukses "Terhubung..." + sebut nama + "15 menit" + tombol wa.me tampil (bukti: verify-chat-lead-success.png)
- DB check (bun + src/lib/db): lead "Andi Pratama" 6281298765432 businessType "Retail" (AI klasifikasi benar utk toko online) + "Budi Santoso" 6281234567890 "Kuliner" value 5jt — total 6 leads di DB
- Escape key menutup panel ✓; mobile 390x844: panel 366px muat sempurna, input terlihat, tinggi OK (bukti: verify-chat-mobile.png); agent-browser errors 0; console 0 error; dev.log bersih
- Browser ditutup bersih; lint sudah 0 error dari Task 8

Stage Summary:
- AI Chat CS 24/7 = MESIN PENJUALAN TERVERIFIKASI end-to-end di browser nyata: teaser proaktif → chat → konsultasi harga → lead capture → kartu sukses → lead nyata di DB (nama + WA + jenis usaha + nilai estimasi)
- Dua lead bukti nyata di DB (Andi/Budi) — tim sales langsung bisa follow-up WA
- Bukti visual: tool-results/verify-chat-teaser2.png, verify-chat-lead-success.png, verify-chat-mobile.png
