import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SITE } from "@/lib/site-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ═══════════════════════════════════════════════════════════════════════════
   SEO GOD-MODE METADATA
   Semua sinyal ranking yang dikendalikan on-page dioptimalkan di sini:
   title template, description kaya keyword, canonical, hreflang,
   Open Graph, Twitter Card, robots directive, dan verifikasi tool.
   ═══════════════════════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),

  // ── Title & Description (formula: keyword utama + value prop + brand) ──
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  applicationName: SITE.name,
  authors: [{ name: SITE.legalName, url: SITE.url }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  category: "business",
  classification: "Jasa Perizinan Usaha, Legalitas Badan Usaha, Konsultasi Bisnis",

  // ── Alternates: canonical + hreflang ──
  alternates: {
    canonical: "/",
    languages: {
      "id-ID": "/",
    },
  },

  // ── Open Graph (Facebook, LinkedIn, WhatsApp preview) ──
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [
      {
        url: "/og-image.png",
        width: 1440,
        height: 720,
        alt: `${SITE.name} — Jasa pengurusan izin usaha tercepat dan terpercaya di Indonesia`,
        type: "image/png",
      },
    ],
  },

  // ── Twitter/X Card ──
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: ["/og-image.png"],
    creator: "@pusatperizinan",
  },

  // ── Robot directives: beri kebebasan penuh untuk indexing & AI crawler ──
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Icons ──
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/favicon.svg" }],
  },

  // ── Site verification (ganti dengan kode asli saat deploy) ──
  verification: {
    google: undefined,
    other: {
      "google-adsense-account": undefined,
    },
  },

  formatDetection: {
    telephone: true,
    email: true,
    address: true,
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
        {/* Preconnect ke situs sosial untuk performa prefetch */}
        <link rel="dns-prefetch" href="https://wa.me" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
