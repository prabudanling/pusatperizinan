# Aktivasi Search Console dan pengukuran konsultasi

## Domain dan Search Console

Pemeriksaan 6 Oktober 2026: apex `https://pusatperizinan.com/` merespons 308 ke `https://www.pusatperizinan.com/`, sementara canonical HTML menunjuk apex. Kode menggunakan apex melalui `SITE_URL`.

Sebelum rilis, selaraskan primary domain di hosting dengan keputusan apex yang sudah ada. Atur www → apex dan pastikan apex merespons 200, tanpa loop. Alternatif memilih www memerlukan migrasi konsisten semua canonical, sitemap, URL schema, dan redirect; jangan mengubah salah satu saja.

Verifikasi Domain Property di Search Console melalui DNS (mencakup kedua host). Untuk URL-prefix dengan verifikasi HTML, isi `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` dengan token asli sebelum build; metadata akan mengeluarkan tag verifikasi. Jangan memasukkan placeholder.

Setelah deploy:
1. Pastikan empat varian http/https + www/apex berakhir di satu URL HTTPS berstatus 200.
2. Periksa beranda, /layanan/nib, /layanan/pt dan /blog lewat URL Inspection.
3. Submit sitemap dari host final; periksa satu canonical per halaman.
4. Pantau Pages, Performance, dan Core Web Vitals. Permintaan indeks bukan jaminan pengindeksan.

## GA4

Isi `NEXT_PUBLIC_GA_ID` dengan Measurement ID asli, lalu build ulang. Tanpa ID valid, script dan pelacak klik tidak diaktifkan. Tidak ada akun Analytics yang telah dihubungkan oleh perubahan kode ini.

| Event | Kondisi | Arti |
|---|---|---|
| whatsapp_click | Klik tautan wa.me atau api.whatsapp.com | Niat menghubungi, belum membuktikan pesan terkirim |
| lead_submit | API formulir hero merespons HTTP sukses dan success=true | Permintaan berhasil dicatat API |

Pelacak klik mengirim `page_path` tanpa query. Event hero hanya mengirim `form_id`; tidak mengirim nama, nomor telepon, atau isi kebutuhan. Cakupan ini tidak mencakup form lain atau pembukaan WhatsApp lewat JavaScript.

Audit pengaturan Enhanced Measurement sebelum mengaktifkan GA4. Matikan pengukuran outbound clicks/form interactions otomatis jika URL atau formulir mengandung data pribadi, karena tautan WhatsApp dapat mengandung draft pesan dalam query. Gunakan event khusus di atas. Sesuaikan aktivasi Analytics dengan kebijakan privasi dan mekanisme persetujuan yang berlaku untuk bisnis.

Uji DebugView: klik WhatsApp → satu event intent; submit API berhasil → satu lead_submit; respons error → tidak ada lead_submit. Jangan menjumlahkan kedua event sebagai jumlah pelanggan.

## KPI mingguan

- Search Console: impresi, klik, CTR, query dan landing page, segmentasi perangkat.
- Analytics: sesi organik, engagement, klik WhatsApp, lead_submit; konfigurasi channel secara konsisten.
- CRM: konsultasi unik, lead berkualitas, penawaran, transaksi, omzet, laba kotor.
- Rasio lead organik = lead unik yang teratribusi organik ÷ sesi organik pada periode yang sama.
- Jangan membagi seluruh lead dari semua kanal dengan klik organik.
- Rekonsiliasi calon pelanggan dari form dan WhatsApp agar tidak dihitung dua kali.
