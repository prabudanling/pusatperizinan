// ============================================================
// PUSATPERIZINAN.COM — Build Static Export (HTML+CSS+JS murni)
// ------------------------------------------------------------
// API routes (chat AI, leads, dll.) hanya jalan di dev server —
// handler POST tidak bisa diekspor statis, jadi script ini:
//   1. Menggeser src/app/api keluar dari pohon build
//   2. Menjalankan `next build` dengan BUILD_STATIC=1 (output:"export")
//   3. Menempelkan .htaccess ke out/
//   4. Mengembalikan API routes (dev server membutuhkannya)
// Hasil: folder out/ — siap dipack & di-upload ke idwebhost.
// Jalankan: node scripts/build-static.mjs   (alias: npm run build:static)
// ============================================================
import { existsSync, renameSync, rmSync, cpSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";

const ROOT = process.cwd();
const API_DIR = path.join(ROOT, "src", "app", "api");
const API_HOLD = path.join(ROOT, ".api-static-hold");
const OUT_DIR = path.join(ROOT, "out");
const HTACCESS = path.join(ROOT, ".htaccess");

console.log("📦 BUILD STATIC EXPORT — pusatperizinan.com (tanpa Node.js di hosting)");
console.log("──────────────────────────────────────────────────────────────────────");

// 1. Geser API routes keluar dari build (fitur runtime — tidak dibutuhkan hosting statis)
if (existsSync(API_DIR)) {
  rmSync(API_HOLD, { recursive: true, force: true });
  renameSync(API_DIR, API_HOLD);
  console.log("↔️  API routes digeser sementara ke .api-static-hold/");
} else if (existsSync(API_HOLD)) {
  console.log("ℹ️  .api-static-hold sudah ada (kemungkinan build sebelumnya gagal) — dipakai ulang");
}

let exitCode = 0;
try {
  // 2. Build dengan output: export (Next.js 16)
  const res = spawnSync("npx", ["next", "build"], {
    stdio: "inherit",
    env: { ...process.env, BUILD_STATIC: "1" },
    shell: process.platform === "win32",
  });
  exitCode = res.status ?? 1;
  if (exitCode !== 0) throw new Error("`next build` gagal — periksa log di atas");

  if (!existsSync(OUT_DIR)) throw new Error("Folder out/ tidak ditemukan setelah build");

  // 3. .htaccess WAJIB ikut (routing/404/cache/gzip untuk Apache & LiteSpeed)
  if (existsSync(HTACCESS)) {
    cpSync(HTACCESS, path.join(OUT_DIR, ".htaccess"));
    console.log("✅ .htaccess ditempelkan ke out/");
  } else {
    console.warn("⚠️  .htaccess tidak ditemukan di root — 404 & cache tidak akan aktif!");
  }

  console.log("✅ Static export selesai → out/");
} catch (err) {
  console.error("❌", err.message);
  exitCode = 1;
} finally {
  // 4. SELALU kembalikan API routes agar dev server tetap utuh
  if (existsSync(API_HOLD)) {
    if (existsSync(API_DIR)) rmSync(API_DIR, { recursive: true, force: true });
    renameSync(API_HOLD, API_DIR);
    console.log("↩️  API routes dikembalikan ke src/app/api");
  }
}

process.exit(exitCode);
