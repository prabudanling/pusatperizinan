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
// PUSATPERIZINAN.COM — shared metadata; canonical URLs belong to each page.
// ============================================================


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Jasa Perizinan Usaha, NIB & Pendirian PT | PusatPerizinan.com",
    template: "%s | PusatPerizinan.com",
  },
  description:
    "Butuh NIB, pendirian PT/CV, atau izin usaha? Pelajari syarat, proses, dan estimasi biaya. Konsultasikan kebutuhan usaha Anda dengan PusatPerizinan.com.",
  authors: [{ name: "PusatPerizinan.com", url: SITE_URL }],
  creator: "PusatPerizinan.com",
  publisher: "PT Digital Bisnis Manajemen",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
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
    siteName: "PusatPerizinan.com",
    title: "Jasa Perizinan Usaha, NIB & Pendirian PT",
    description:
      "Pelajari syarat, proses, dan estimasi biaya perizinan. Temukan layanan yang sesuai dan konsultasikan kebutuhan usaha Anda.",
    images: [
      {
        url: "/og-pusatperizinan.png",
        width: 1440,
        height: 736,
        alt: "PusatPerizinan.com — Konsultasi Perizinan Usaha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PusatPerizinan.com — Konsultasi Perizinan Usaha",
    description:
      "Pelajari persyaratan dan estimasi biaya NIB, PT/CV, serta izin usaha. Konsultasikan kebutuhan usaha Anda.",
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
