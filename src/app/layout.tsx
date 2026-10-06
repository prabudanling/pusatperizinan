import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SeoJsonLd } from "@/components/landing/seo-jsonld";
import { Analytics } from "@/components/landing/analytics";
import { LanguageProvider } from "@/lib/i18n/language-provider";
import { SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ============================================================
// PUSATPERIZINAN.COM — Metadata SEO Supercharged
// Dibangun untuk mendominasi pencarian perizinan Indonesia
// ============================================================



export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "PusatPerizinan.com — Jasa Pengurusan Perizinan Usaha #1 Indonesia | NIB, PT, CV, Halal, BPOM, PBG/SLF, AMDAL",
    template: "%s | PusatPerizinan.com",
  },
  description:
    "Konsultan perizinan usaha terbaik Indonesia: NIB 1 hari, pendirian PT 3 hari, sertifikasi halal, izin BPOM/PIRT, PBG & SLF, izin lingkungan, PMA, izin umroh (PPIU) & haji (PPIH), registrasi IATA, izin usaha Arab Saudi (MISA), RKAB tambang. Melayani 38 provinsi & 514 kabupaten/kota. Panduan perizinan terlengkap + AI checker + kalkulator biaya gratis. Kantor SCBD se-lantai Bursa Efek Indonesia. Garansi 100% uang kembali.",
  keywords: [
    // inti layanan
    "jasa perizinan usaha", "jasa pengurusan izin usaha", "konsultan perizinan", "konsultan izin usaha",
    "jasa pendirian PT", "biaya pendirian PT", "cara mendirikan PT", "syarat pendirian PT",
    "jasa pendirian CV", "biaya pendirian CV", "syarat pendirian CV",
    "jasa pendirian PMA", "pendirian PMA untuk asing", "syarat PMA Indonesia",
    // NIB & OSS
    "cara membuat NIB", "biaya NIB", "syarat NIB", "NIB online", "NIB tanpa badan usaha",
    "OSS RBA", "cara daftar OSS", "sertifikat standar", "level risiko KBLI", "OSS beli",
    // sertifikasi produk
    "sertifikasi halal", "biaya sertifikasi halal", "cara daftar sertifikat halal", "SEHATI halal",
    "izin BPOM", "cara daftar BPOM", "PIRT online", "biaya PIRT", "izin edar produk",
    "CPPOB", "sertifikat CPPOB home industry",
    // bangunan & lingkungan
    "PBG online", "cara mengurus PBG", "SLF gedung", "biaya SLF", "pengganti IMB",
    "AMDAL", "UKL UPL", "SPPL online", "biaya AMDAL", "izin lingkungan usaha",
    // sektor
    "izin usaha kuliner", "izin kafe", "izin restoran", "izin klinik", "SIA klinik", "izin apotek",
    "TDAU pariwisata", "izin travel", "izin tambang", "IUP", "IUPK", "izin ekspor impor",
    "izin konstruksi", "SBU konstruksi", "izin logistik", "TDUP",
    // travel ibadah & aviasi & internasional
    "izin umroh", "izin haji", "syarat izin umroh", "biaya izin umroh", "PPIU", "PPIH", "SIPU", "SPPU",
    "izin travel umroh", "cara jadi PPIU", "registrasi IATA", "akreditasi IATA", "IATA agent Indonesia",
    "izin usaha arab saudi", "MISA license", "MISA saudi arabia", "buka usaha di arab saudi", "commercial registration saudi",
    "RKAB", "RKAB 3 tahunan", "perpanjangan IUP", "izin jual batubara", "MODI minerba", "izin pertambangan",
    // jangkauan
    "konsultan perizinan se indonesia", "jasa perizinan 38 provinsi", "perizinan 514 kabupaten kota",
    // pajak
    "NPWP usaha", "PPh final 0.5", "pajak UMKM", "SPPKP", "pengukuhan PKP", "LKPM",
    // KBLI & panduan
    "KBLI", "cari KBLI usaha", "daftar KBLI", "KBLI terlaris", "panduan perizinan",
    "izin usaha", "legalitas usaha", "legalitas UMKM", "urus izin murah",
    // blog & content hub
    "blog perizinan", "artikel perizinan usaha", "panduan perizinan lengkap", "kursus email perizinan gratis",
    "panduan NIB 2026", "biaya pendirian PT 2026", "syarat izin usaha 2026", "pusat pengetahuan perizinan",
    // lokasi
    "konsultan perizinan jakarta", "jasa perizinan SCBD", "konsultan izin jakarta selatan",
    "jasa perizinan bandung", "jasa perizinan surabaya", "jasa perizinan bali", "perizinan PMA bali",
    // brand
    "pusat perizinan", "pusatperizinan", "pusatperizinan.com",
  ],
  authors: [{ name: "PusatPerizinan.com", url: SITE_URL }],
  creator: "PusatPerizinan.com",
  publisher: "PT Digital Bisnis Manajemen",
  alternates: {
    canonical: "/",
    // CATATAN AUDIT: blok hreflang ?lang=xx dihapus — ?lang= diproses client-side
    // sehingga tidak menyajikan konten berbeda per URL (berisiko sinyal duplikat).
    // hreflang hanya dikembalikan bila versi bahasa per-URL yang sesungguhnya dibuat.
  },
  category: "Business Legal Services",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo-icon.png",
    shortcut: "/logo-icon.png",
    apple: "/logo-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: "PusatPerizinan.com",
    title: "PusatPerizinan.com — Urus Semua Izin Usaha, Tinggal Terima Beres",
    description:
      "Konsultan perizinan #1 Indonesia dari kantor SCBD. NIB 1 hari, PT 3 hari, Halal, BPOM, PBG/SLF, AMDAL, PMA, Izin Umroh/Haji (PPIU/PPIH), IATA, Arab Saudi (MISA), RKAB tambang — garansi 100%. Melayani 38 provinsi & 514 kabupaten/kota.",
    images: [
      {
        url: "/og-pusatperizinan.png",
        width: 1440,
        height: 736,
        alt: "PusatPerizinan.com — Urus Izin Usaha, Tinggal Beres. Konsultan Perizinan #1 Indonesia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PusatPerizinan.com — Konsultan Perizinan Usaha #1 Indonesia",
    description:
      "NIB 1 hari, PT 3 hari, garansi 100%. Panduan perizinan terlengkap Indonesia + Cek Izin AI gratis.",
    images: ["/og-pusatperizinan.png"],
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#059669",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* CATATAN AUDIT: canonical hardcode DIHAPUS — sebelumnya menyebabkan
            canonical GANDA di semua 2.830 halaman (hardcode homepage vs canonical
            per-halaman dari generateMetadata). Homepage kini memakai canonical
            dari alternates.canonical di atas. */}
        {/* P0-06: token placeholder DIHAPUS — pasang token asli sesuai
            docs/SEARCH-CONSOLE-ANALYTICS.md lalu unpublish placeholder. */}
        {/* TODO(deploy): <meta name="google-site-verification" content="TOKEN_ASLI" /> */}
        <meta name="geo.region" content="ID-JK" />
        <meta name="geo.placename" content="Jakarta Selatan" />
        <meta name="geo.position" content="-6.2249;106.809" />
        <meta name="ICBM" content="-6.2249, 106.809" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <LanguageProvider>
          {children}
          <SeoJsonLd />
          <Analytics />
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
