# Google Search Console & GA4 — Panduan Aktivasi

## 1. Search Console (WAJIB — sekarang masih token placeholder)

Buka `src/app/layout.tsx`, ganti:

```tsx
<meta name="google-site-verification" content="pusatperizinan-gwt-token" />
```

dengan token asli dari [search.google.com/search-console](https://search.google.com/search-console)
→ properti `https://pusatperizinan.com` (domain/DNS atau HTML tag).

Setelah terverifikasi:
1. Submit sitemap: `https://pusatperizinan.com/sitemap.xml`
2. Minta pengindeksan untuk 20 URL prioritas (homepage, /layanan, /blog, /kbli,
   10 halaman layanan utama: nib, pt, cv, halal, bpom, pbg, + /panduan/nib, /panduan/pt)
3. Pantau mingguan: Coverage (Valid vs Excluded + alasan), Core Web Vitals,
   & laporan hasil pencarian (CTR per query).

## 2. GA4 (opsional, env-driven)

1. Buat properti GA4 → salin Measurement ID (`G-XXXXXXXXXX`)
2. Isi di `.env`: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
3. Komponen `Analytics` otomatis merender gtag. Tanpa ID, tidak ada script.

Event konversi yang disarankan (gunakan `trackEvent()` dari
`src/components/landing/analytics.tsx`):

| Event | Trigger | Catatan |
|---|---|---|
| `whatsapp_click` | klik tautan wa.me | sumber lead utama |
| `lead_submit` | form konsultasi sukses | konversi primer |
| `chat_message` | pesan AI chat terkirim | indikator engagement |
| `license_check` | cek izin AI | tool engagement |

## 3. Dashboard KPI mingguan

- Impressions, clicks, CTR, posisi rata-rata (GSC → Performance)
- Halaman terindeks vs dikecualikan (GSC → Pages)
- Query & landing page teratas
- Leads: `SELECT count(*) FROM "Lead" WHERE status='NEW'` (admin dashboard)
- Konversi = leads ÷ klik organik (target awal 3–5%)
