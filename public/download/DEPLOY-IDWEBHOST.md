# 🚀 Panduan Deploy — pusatperizinan.com di idwebhost (Tanpa Node.js)

> **Situs ini sudah di-BUILD untuk Anda.** Isi paket = **HTML + CSS + JavaScript murni**.
> Tidak butuh Node.js, tidak butuh PHP, tidak butuh terminal/SSH, tidak ada database —
> cukup **Upload → Extract → Selesai**. Total waktu: ± 5 menit.

---

## 📦 Isi Paket (`pusatperizinan-static-hosting.tar.gz`)

| File / Folder              | Fungsi                                                        |
| -------------------------- | ------------------------------------------------------------- |
| `index.html`               | Halaman utama lengkap (30 bahasa, SEO JSON-LD, WhatsApp)      |
| `404.html`                 | Halaman error 404 branded                                     |
| `_next/`                   | Aset CSS + JS + font (nama file ber-hash, cache permanen)     |
| `.htaccess`                | Routing, 404, kompresi GZIP, cache browser (Apache/LiteSpeed) |
| `robots.txt`, `sitemap.xml`| SEO                                                           |
| `manifest.json`, `logo.png`, `logo-icon.png` | PWA & ikon                                                |
| `download/`                | Salinan paket ini (boleh dihapus di hosting)                  |
| `ISI-PACK.txt`             | Checklist isi paket                                           |
| `DEPLOY-IDWEBHOST.md`      | File panduan ini                                              |

---

## 🪜 Langkah Upload (cPanel idwebhost)

1. **Login cPanel** idwebhost Anda.
2. Buka **File Manager**.
3. Masuk ke folder **`public_html`** (domain utama). Untuk subdomain, masuk ke folder subdomain-nya, mis. `public_html/toko`.
4. Klik **Upload** → pilih file `pusatperizinan-static-hosting.tar.gz` → tunggu selesai.
5. Kembali ke File Manager → **klik kanan** file `.tar.gz` tadi → **Extract** → pastikan tujuannya `public_html` → **OK**.
6. Di File Manager: **Settings → centang "Show Hidden Files (dotfiles)"** → pastikan **`.htaccess`** ikut ter-extract di `public_html`. **File ini wajib ada** (mengatur 404, kompresi, dan cache).
7. (Disarankan) Hapus file `.tar.gz` dari `public_html` agar rapi, dan hapus `index.html` / `index.php` **bawaan hosting** jika ada (halaman "domain berhasil di-parking" milik idwebhost).
8. Buka `https://domain-anda.com` → **SELESAI 🎉**

---

## ✅ Setelah Live — Checklist

- [ ] Halaman utama terbuka dengan hero + form konsultasi.
- [ ] Ganti bahasa via switcher (30 bahasa, termasuk Arab RTL) berfungsi.
- [ ] Tombol WhatsApp membuka chat ke **0812-6999-9910**.
- [ ] Kalkulator biaya berjalan (murni JavaScript).
- [ ] `https://domain/404-test-tidak-ada` menampilkan halaman 404 branded.

## 🔐 SSL / HTTPS (Gratis)

1. cPanel → **SSL/TLS Status** → **Run AutoSSL** (Let's Encrypt) untuk domain Anda.
2. (Opsional) Paksa `https://`: buka `.htaccess` di File Manager → Edit → hapus tanda `#` pada 3 baris blok **HTTPS otomatis** di bagian bawah → Save.

---

## ⚙️ Perilaku Fitur di Hosting Statis

Situs ini 100% statis — dan **semua jalur konversi tetap hidup**:

| Fitur                          | Status di hosting statis                                                     |
| ------------------------------ | ---------------------------------------------------------------------------- |
| Seluruh tampilan & animasi     | ✅ Berjalan penuh (HTML+CSS+JS)                                              |
| 30 bahasa + RTL Arab           | ✅ Berjalan penuh (client-side)                                              |
| SEO JSON-LD, sitemap, robots   | ✅ Ter-bake di HTML                                                          |
| Kalkulator biaya               | ✅ Berjalan penuh (client-side)                                              |
| Form konsultasi (hero & CTA)   | 🔁 Otomatis **fallback ke WhatsApp resmi** — data lead tetap masuk ke WA Anda |
| AI Chat RIZKI / Cek Izin AI    | 🔁 Otomatis **fallback ke WhatsApp** saat API tidak tersedia                  |
| Statistik counter              | 🔁 Menampilkan nilai bawaan (fallback aman)                                   |
| Newsletter/kursus email        | 🔁 Menampilkan pesan koneksi — peserta diarahkan via WA                       |

> Bila kelak pindah ke VPS/hosting Node.js, fitur API penuh (AI chat live, database leads)
> bisa diaktifkan kembali tanpa mengubah tampilan.

---

## 🔄 Update Konten di Masa Depan

Konten sudah **"dibakar" ke HTML saat build** (inilah rasa situs yang super cepat & aman).
Alur update:

1. Ajukan perubahan (teks, harga, foto, konsultan baru) di project ini.
2. Paket baru akan di-build ulang → file `pusatperizinan-static-hosting.tar.gz` baru.
3. Upload & **Extract** ulang ke `public_html` (menimpa file lama) → selesai, ± 5 menit.

> ⚠️ Tidak ada CMS online di hosting statis — perubahan konten selalu melalui rebuild di atas.

---

## 🛠️ Troubleshooting

| Gejala                                          | Solusi                                                                                     |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Masih muncul halaman default idwebhost          | Hapus `index.html` / `index.php` **bawaan hosting** di `public_html`.                       |
| Halaman error / 404 saat buka subfolder         | Pastikan **`.htaccess`** ter-upload (aktifkan *Show Hidden Files*).                        |
| Tampilan polos / CSS hilang                     | Cek folder `_next/` ter-extract penuh → lalu hard refresh `Ctrl+F5`.                       |
| Ganti bahasa tidak berfungsi                    | Pastikan file JS di `_next/static/` utuh (tidak ada yang gagal upload).                     |
| WhatsApp tidak terbuka                          | Cek popup blocker browser; link WA tetap bisa ditekan lama → *Copy link*.                   |
| Ingin redirect www / non-www                    | Tambahkan rule rewrite di `.htaccess` (bisa diminta, tinggal tempel).                       |

---

**PT Digital Bisnis Manajemen** · pusatperizinan.com · WA 0812-6999-9910
*Dibangun otomatis oleh pipeline deploy statis — jangan menyerah sebelum semua selesai.* 💪
