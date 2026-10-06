# PusatPerizinan.com — audit SEO dan konversi, 6 Oktober 2026

## Cakupan dan kesimpulan

Audit membaca kode pada commit 1d773346f79ccf4958c8205eaa7e1578f4cd7c9e, menjalankan audit katalog dan build lokal, serta mengambil HTML dan respons beranda publik. Belum memiliki Search Console, GA4, CRM, pengaturan Vercel, atau pengukuran Core Web Vitals lapangan. Tidak ada peringkat, volume pencarian, pendapatan, atau penalti yang dapat disimpulkan dari pemeriksaan ini.

Aset sudah besar: audit data menghitung 4.564 URL dalam cakupannya dan 4.239 halaman katalog layanan. Prioritas berikutnya adalah kualitas, kepercayaan, konsistensi domain, dan konversi. Memperbanyak halaman otomatis belum menjadi kebutuhan yang terbukti.

## Temuan dan tindakan

| Prioritas | Bukti | Tindakan/status |
|---|---|---|
| P0 | Apex live mengirim 308 ke www, sedangkan canonical beranda mengacu apex | Perlu menyelaraskan primary domain di hosting; kode mempertahankan keputusan apex agar tidak memicu migrasi host sepihak |
| P0 | Form hero lama menganggap pembukaan WhatsApp sebagai pengiriman berhasil | Diperbaiki: pesan fallback eksplisit, data form dipertahankan, tidak ada success/event lead sebelum API mengonfirmasi |
| P1 | SeoJsonLd pada root memasukkan FAQ, blog, daftar review, dan breadcrumb beranda ke seluruh URL | Diperbaiki: identitas global saja; FAQ hanya di beranda, schema spesifik tetap pada route masing-masing |
| P1 | Breadcrumb global merangkai halaman menu setingkat sebagai jalur hierarki | Dihapus; breadcrumb layanan tetap mengikuti halaman sebenarnya |
| P1 | Review count 890 pada identitas global vs 1.247 pada schema layanan; bukti review tidak diperiksa | Hapus rating/review global dan schema layanan. Review di halaman testimoni lain dan klaim UI masih perlu audit bukti oleh pemilik |
| P1 | Sitemap mengisi tanggal sekarang setiap build untuk mayoritas URL | Diperbaiki: hanya artikel dengan updatedAt editorial menggunakan lastModified |
| P1 | Root mewariskan canonical beranda | Canonical beranda dipindah ke page.tsx; halaman lain memakai canonical masing-masing |
| P1 | Aturan /api/ hanya dalam grup robots wildcard sementara Googlebot punya grup tersendiri | Disatukan menjadi satu grup; bukan kontrol keamanan admin |
| P1 | Meta beranda sangat panjang, banyak kata kunci, superlatif dan janji durasi | Dirapikan menjadi judul/deskripsi berorientasi kebutuhan; meta keywords global dihapus |
| P1 | Animasi hero diawali opacity:0 pada HTML server | Konten hero langsung terlihat sebelum JavaScript |
| P1 | Tidak ada implementasi event konsultasi di kode sebelumnya | Ditambahkan event intent WhatsApp dan konfirmasi lead hero; tetap memerlukan ID GA4 asli |
| P2 | 1.337 pasangan dengan Jaccard >0,9 pada sampel audit 400/kind | Review editorial lokal; angka ini bukan audit semua pasangan atau deteksi penalti Google |
| P2 | HTML beranda live sekitar 1 MB sebelum kompresi | Ukur LCP/INP/CLS dan ukuran transfer; kurangi payload schema dan evaluasi pemuatan seluruh kamus bahasa serta banyak bagian beranda |
| P2 | Classifier SEO mengukur panjang teks/FAQ/bullet, bukan keunikan dan kebenaran | Perbaiki tipe longDesc agar menerima array; keputusan indeks massal tetap perlu editorial dan data GSC |

Label lolos dari skrip internal bukan bukti situs lolos Google. Audit lama bahkan mencetak “semua 200” tanpa mengakses URL; pesan itu diperbaiki. Tidak ditemukan duplikat title/meta/slug dalam cakupan skrip, namun konten antarhalaman masih bisa sangat mirip.

## Strategi agar kunjungan menjadi pendapatan

Pilih dahulu tiga layanan berdasarkan kapasitas tim, laba kotor, dan bukti permintaan. Kandidat dari katalog yang sudah ada: NIB/OSS, pendirian PT/CV, dan sertifikasi produk. Ini kandidat, bukan kesimpulan tentang layanan paling menguntungkan.

Bangun halaman layanan dengan urutan: kebutuhan pelanggan → siapa yang cocok → hasil pekerjaan → dokumen → langkah proses → biaya jasa dan biaya pihak ketiga → faktor durasi → bukti pengalaman → pertanyaan umum → konsultasi. Cantumkan keterbatasan dan syarat penawaran secara jelas. Hindari klaim “pasti terbit”, “nomor satu”, atau garansi tanpa syarat tertulis dan bukti.

Gunakan navigasi baru “Apa yang ingin Anda urus?” untuk menuju layanan yang tepat. Pertahankan alat cek dokumen dan perbandingan yang benar-benar membantu keputusan. Evaluasi keberhasilannya dari tindakan lanjutan dan kepuasan pengguna; durasi kunjungan yang panjang bisa juga berarti pengguna bingung.

| Kelompok pencarian calon pelanggan | Halaman tujuan yang ada | Materi yang perlu diperdalam |
|---|---|---|
| jasa pengurusan NIB, syarat NIB | /layanan/nib, /panduan/nib | ruang lingkup pendampingan, persiapan dokumen, rincian biaya yang berlaku |
| biaya pendirian PT, jasa pendirian CV | /layanan/pt, /layanan/cv | komponen penawaran, perbedaan kebutuhan, tahapan dan faktor durasi |
| jasa sertifikasi halal, izin BPOM | /layanan/halal, /layanan/bpom | kriteria produk, proses yang relevan, sumber resmi dan tanggal pemeriksaan |
| perizinan + wilayah | halaman wilayah yang sudah ada | pengalaman lokal yang dapat dibuktikan, jalur layanan, institusi relevan dan perbedaan proses nyata |

Kata kunci di atas adalah hipotesis intent. Validasi volume, impresi, posisi, CTR, dan konversi dengan data aktual sebelum menambah banyak konten. Semua rincian regulasi, biaya resmi, dan estimasi durasi perlu diperiksa penanggung jawab yang kompeten terhadap sumber resmi terbaru.

Untuk pendapatan berulang, uji pendampingan kepatuhan bagi klien yang memang membutuhkan dan sesuai kapasitas tim. Jelaskan manfaat, ruang lingkup, harga, serta penghentian layanan. Pisahkan saran informatif dari penjualan jasa. Jangan menyembunyikan akses layanan pemerintah yang bisa digunakan langsung oleh pelanggan.

## Rencana 30–90 hari

- Hari 1–7: review PR, selaraskan host, deploy, verifikasi canonical/robots/sitemap live, hubungkan GSC/GA4, buktikan form dan WhatsApp berfungsi pada ponsel. Audit klaim rating, jumlah klien, status verifikasi, dan garansi.
- Hari 8–30: pilih tiga layanan prioritas; perbaiki 10 halaman utama berdasarkan kebutuhan pelanggan dan bukti bisnis; hubungkan panduan ke layanan; catat baseline lead dan transaksi. Review sampel halaman wilayah sebelum mengubah noindex/canonical massal.
- Hari 31–60: ukur Core Web Vitals, sederhanakan bagian beranda berdasarkan penggunaan, kurangi payload bahasa yang tidak diperlukan, publikasikan studi kasus berizin dan disertai bukti. Tinjau halaman dengan impresi tinggi tetapi CTR rendah.
- Hari 61–90: evaluasi sesi organik → konsultasi berkualitas → penawaran → transaksi → laba kotor. Perluas hanya klaster yang bernilai. Perbarui materi berdasarkan perubahan substansial, bukan mengganti tahun saja.

Rumus perencanaan: omzet organik = sesi organik × rasio lead unik × rasio closing × nilai transaksi rata-rata. Ukur setiap faktor sendiri; ini bukan proyeksi atau janji pendapatan. Tambahkan margin, biaya akuisisi, refund, dan beban pelayanan sebelum menilai keuntungan.

## Validasi dan batas rilis

- Enam pengujian regresi SEO lulus: schema global, FAQ beranda, tipe classifier, sitemap dan tanggal, tujuan shortcut, serta keterlihatan hero tanpa JavaScript.
- Build produksi Next.js mode standalone berhasil; 4.633 entri digenerasi pada log build. Angka berbeda dari audit katalog karena cakupan build lebih luas.
- Pemeriksaan TypeScript penuh belum bersih: baseline 122 diagnostic, sesudah perubahan 118, tanpa jenis diagnostic baru pada perbandingan. Tiga error longDesc dan satu error pembacaan deskripsi lowongan pada skrip audit terselesaikan. Konfigurasi lama masih ignoreBuildErrors=true; build berhasil bukan bukti typecheck bersih.
- Lint file TypeScript/TSX yang diubah dan git diff --check lulus.
- Uji browser interaktif belum berjalan: Chromium tidak tersedia dan unduhan browser gagal. Alur fallback dan tracking masih perlu smoke test pada preview sebelum rilis. Tidak ada form produksi yang dikirim.
- Belum mengubah hosting, DNS, akun Analytics, atau menerbitkan ke produksi. Core Web Vitals dan indeks Google belum diverifikasi.
- Mode static export memiliki keterbatasan API dan admin server. Jangan menggunakan paket statis tanpa menguji alur kontak dan route yang membutuhkan server.

## Referensi resmi

- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://developers.google.com/search/docs/appearance/structured-data/review-snippet
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://developers.google.com/search/docs/crawling-indexing/canonicalization
