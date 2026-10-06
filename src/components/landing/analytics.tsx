import Script from "next/script";
import { ConversionTracker } from "./conversion-tracker";

// ============================================================
// PUSATPERIZINAN.COM — GA4 (PHASE 11)
// Aktif HANYA bila NEXT_PUBLIC_GA_ID diisi (mis. G-XXXXXXXXXX).
// Tanpa ID → tidak ada script pihak ketiga → performa tetap bersih.
// Konfigurasi event konversi disarankan:
//   - whatsapp_click  (semua tautan wa.me)
//   - lead_submit     (form konsultasi)
//   - chat_message    (AI chat RIZKI)
// Lihat docs/SEARCH-CONSOLE-ANALYTICS.md untuk panduan penuh.
// ============================================================

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId || !/^G-[A-Z0-9]{8,}$/.test(gaId)) return null;

  return (
    <>
      <ConversionTracker />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
