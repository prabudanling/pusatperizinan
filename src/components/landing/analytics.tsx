import Script from "next/script";

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

/** Helper event tracking — aman dipanggil walau GA belum aktif. */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", name, params);
}
