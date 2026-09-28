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
