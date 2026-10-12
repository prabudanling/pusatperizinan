// ============================================================
// PUSATPERIZINAN.COM — Post-build portable
// ------------------------------------------------------------
// Setelah `next build`, salin aset statis ke bundle standalone
// (dipakai di Hostinger/VPS: `node .next/standalone/server.js`).
//
// Di Vercel: build dikelola Vercel sendiri → script ini no-op.
// Jalur lain (VPS/shared dengan Node): salin .next/static dan
// public/ ke .next/standalone/ bila folder tersebut ada.
// ============================================================
import { existsSync, cpSync, rmSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const STANDALONE = path.join(ROOT, ".next", "standalone");

// Vercel / target tanpa standalone → tidak ada yang perlu dilakukan
if (process.env.VERCEL === "1" || !existsSync(STANDALONE)) {
  console.log(
    process.env.VERCEL === "1"
      ? "↩️  VERCEL terdeteksi — post-build dilewati (build dikelola Vercel)."
      : "↩️  .next/standalone tidak ditemukan — post-build dilewati."
  );
  process.exit(0);
}

console.log("📦 Post-build standalone — menyalin aset statis...");
const staticSrc = path.join(ROOT, ".next", "static");
const staticDst = path.join(STANDALONE, ".next", "static");
if (existsSync(staticSrc)) {
  rmSync(staticDst, { recursive: true, force: true });
  cpSync(staticSrc, staticDst, { recursive: true });
  console.log("  ✓ .next/static → .next/standalone/.next/static");
} else {
  console.warn("  ⚠ .next/static tidak ditemukan (build belum selesai?)");
}

const publicSrc = path.join(ROOT, "public");
const publicDst = path.join(STANDALONE, "public");
if (existsSync(publicSrc)) {
  rmSync(publicDst, { recursive: true, force: true });
  cpSync(publicSrc, publicDst, { recursive: true });
  console.log("  ✓ public/ → .next/standalone/public/");
} else {
  console.warn("  ⚠ public/ tidak ditemukan");
}

console.log("✅ Post-build selesai. Jalankan: NODE_ENV=production node .next/standalone/server.js");
