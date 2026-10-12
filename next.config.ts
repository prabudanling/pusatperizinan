import type { NextConfig } from "next";

// ============================================================
// PUSATPERIZINAN.COM — Next Config
// DEV  : output "standalone" (sandbox, bun run dev)
// BUILD: BUILD_STATIC=1 → output "export" → folder out/ berisi
//        HTML + CSS + JavaScript MURNI (tanpa Node.js runtime),
//        siap di-upload ke shared hosting idwebhost (cPanel).
// ============================================================

const isStaticExport = process.env.BUILD_STATIC === "1";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        // Mode hosting statis: prerender semua halaman jadi file HTML
        output: "export" as const,
        // next/image dioptimalkan server → di hosting statis pakai mode unoptimized
        images: { unoptimized: true },
      }
    : { output: "standalone" as const }),
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
