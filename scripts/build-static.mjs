// ============================================================
// PUSATPERIZINAN.COM — Build Static Export (HTML+CSS+JS murni)
// ------------------------------------------------------------
// API routes (chat AI, leads, dll.) hanya jalan di dev server —
// handler POST tidak bisa diekspor statis, jadi script ini:
//   1. Menggeser src/app/api keluar dari pohon build
//   2. (PACK_LIGHT=1) Menggeser rute DINAMIS long-tail (± 9.500
//      halaman layanan/kbli/panduan/dll.) agar paket hosting
//      statis tetap ringan & cepat di-upload via cPanel
//   3. Menjalankan `next build` dengan BUILD_STATIC=1 (output:"export")
//   4. POST-PROSES SEO: memangkas sitemap seksi + RSS feed agar
//      hanya memuat URL yang benar-benar ada di out/, menulis
//      indeks out/sitemap.xml (mode export tidak punya rewrite
//      /sitemap.xml → /api/sitemap-index), dan menyinkronkan
//      baris Sitemap: di robots.txt
//   5. Menempelkan .htaccess ke out/
//   6. Mengembalikan SEMUA folder yang digeser (dev server
//      membutuhkannya)
// Hasil: folder out/ — siap dipack & di-upload ke idwebhost.
//
// Mode:
//   PACK_LIGHT=1  → paket ringan: halaman inti saja (default rekommendasi
//                   untuk shared hosting; ukuran ± 10-20 MB)
//   (tanpa flag)  → ekspor PENUH ± 9.500+ halaman (butuh RAM/waktu besar)
//
// Jalankan: PACK_LIGHT=1 node scripts/build-static.mjs
// ============================================================
import { existsSync, renameSync, rmSync, cpSync, mkdirSync, readdirSync, statSync, readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";

const ROOT = process.cwd();
const API_DIR = path.join(ROOT, "src", "app", "api");
const API_HOLD = path.join(ROOT, ".api-static-hold");
const OUT_DIR = path.join(ROOT, "out");
const HTACCESS = path.join(ROOT, ".htaccess");
const LIGHT = process.env.PACK_LIGHT === "1";

// Rute dinamis long-tail yang digeser saat PACK_LIGHT=1.
// Index statisnya (layanan/, kbli/, blog/, dsb.) TETAP ikut.
const LIGHT_ROUTES = [
  "src/app/[slug]",                 // ± 500 halaman jasa slug
  "src/app/layanan/[...slug]",      // ± 8.700 halaman layanan + hub
  "src/app/kbli/[...slug]",         // 148 kode + 17 kategori
  "src/app/panduan/[id]",           // 16 detail panduan (HUB /panduan TETAP ikut — nav header menunjuknya sejak Task 12)
  "src/app/industri/[slug]",        // industri per sektor (+ [service])
  "src/app/biaya/[slug]",
  "src/app/syarat/[slug]",
  "src/app/bandingkan/[slug]",
  "src/app/testimoni/[kategori]",
  "src/app/katalog/[kategori]",
  // blog/[slug] TIDAK digeser — artikel blog ikut dalam paket (±15 statis
  // + CMS ter-bake) agar menu Informasi → Blog tetap hidup di hosting statis
  "src/app/lowongan-kerja/[slug]",
  "src/app/payment",                // status pembayaran per-order (runtime, bukan statis)
  "src/app/admin",                  // dashboard admin (DB runtime — tidak relevan statis)
];
const ROUTES_HOLD = path.join(ROOT, ".routes-static-hold");

// Next.js mensyaratkan `dynamicParams` berupa literal statis — ekspresi
// tidak bisa diparse. Saat export build, file berikut di-patch SEMENTARA
// menjadi `false` (semua halaman memang sudah pre-generated / dipangkas),
// lalu konten aslinya dipulihkan di finally agar dev server tetap on-demand.
const DYNAMIC_PARAMS_FILES = [
  "src/app/sitemap/[id]/route.ts",
  "src/app/[slug]/page.tsx",
  "src/app/blog/[slug]/page.tsx",
  "src/app/layanan/[...slug]/page.tsx",
  "src/app/kbli/[...slug]/page.tsx",
];
const fileBackups = [];

function neutralizeDynamicParams() {
  for (const rel of DYNAMIC_PARAMS_FILES) {
    const fp = path.join(ROOT, rel);
    if (!existsSync(fp)) continue;
    const orig = readFileSync(fp, "utf8");
    const patched = orig.replace(
      /export const dynamicParams = [^;]+;/,
      "export const dynamicParams = false; // [build-static] patch sementara — dipulihkan otomatis"
    );
    if (patched !== orig) {
      writeFileSync(fp, patched, "utf8");
      fileBackups.push([fp, orig]);
      console.log(`🔧 dynamicParams → false (sementara): ${rel}`);
    }
  }
}

function restoreDynamicParams() {
  for (const [fp, orig] of fileBackups) writeFileSync(fp, orig, "utf8");
  if (fileBackups.length) console.log(`↩️  ${fileBackups.length} file dynamicParams dipulihkan`);
}

// Halaman `force-dynamic` (baca DB per-request) tidak bisa di-export.
// Saat build statis di-patch SEMENTARA menjadi `force-static` — konten CMS
// ter-bake saat build — lalu dipulihkan agar dev/standalone tetap dinamis.
const FORCE_STATIC_FILES = ["src/app/blog/page.tsx"];
const forceStaticBackups = [];

function neutralizeForceDynamic() {
  for (const rel of FORCE_STATIC_FILES) {
    const fp = path.join(ROOT, rel);
    if (!existsSync(fp)) continue;
    const orig = readFileSync(fp, "utf8");
    const patched = orig.replace(
      /export const dynamic = "force-dynamic";/,
      "export const dynamic = \"force-static\"; // [build-static] patch sementara — dipulihkan otomatis"
    );
    if (patched !== orig) {
      writeFileSync(fp, patched, "utf8");
      forceStaticBackups.push([fp, orig]);
      console.log(`🔧 force-dynamic → force-static (sementara): ${rel}`);
    }
  }
}

function restoreForceDynamic() {
  for (const [fp, orig] of forceStaticBackups) writeFileSync(fp, orig, "utf8");
  if (forceStaticBackups.length) console.log(`↩️  ${forceStaticBackups.length} file force-dynamic dipulihkan`);
}

const holdName = (rel) => rel.replace(/[\\/\[\].]+/g, "_");

function shiftOut(relDir, holdDir) {
  const src = path.join(ROOT, relDir);
  if (!existsSync(src)) return false;
  rmSync(holdDir, { recursive: true, force: true });
  renameSync(src, holdDir);
  return true;
}

function restoreIn(holdDir, relDir) {
  const dst = path.join(ROOT, relDir);
  if (existsSync(holdDir)) {
    if (existsSync(dst)) rmSync(dst, { recursive: true, force: true });
    renameSync(holdDir, dst);
    return true;
  }
  return false;
}

console.log("📦 BUILD STATIC EXPORT — pusatperizinan.com (tanpa Node.js di hosting)");
console.log("──────────────────────────────────────────────────────────────────────");
if (LIGHT) {
  console.log("🪶 Mode: PACK_LIGHT — rute dinamis long-tail digeser (paket ringan)");
}

// 1. Geser API routes keluar dari build (fitur runtime — tidak dibutuhkan hosting statis)
const moved = [];
if (existsSync(API_DIR)) {
  rmSync(API_HOLD, { recursive: true, force: true });
  renameSync(API_DIR, API_HOLD);
  moved.push([API_HOLD, "src/app/api"]);
  console.log("↔️  API routes digeser sementara ke .api-static-hold/");
} else if (existsSync(API_HOLD)) {
  console.log("ℹ️  .api-static-hold sudah ada (kemungkinan build sebelumnya gagal) — dipakai ulang");
}

// 1b. PACK_LIGHT: geser rute dinamis long-tail
if (LIGHT) {
  rmSync(ROUTES_HOLD, { recursive: true, force: true });
  mkdirSync(ROUTES_HOLD, { recursive: true });
  for (const rel of LIGHT_ROUTES) {
    const hn = path.join(ROUTES_HOLD, holdName(rel));
    if (shiftOut(rel, hn)) {
      moved.push([hn, rel]);
      console.log(`↔️  ${rel} digeser (long-tail)`);
    }
  }
}

// 1c. Patch dynamicParams → false untuk validasi export (dipulihkan di finally)
neutralizeDynamicParams();
neutralizeForceDynamic();

let exitCode = 0;
try {
  // 2. Build dengan output: export (Next.js 16)
  const res = spawnSync("npx", ["next", "build"], {
    stdio: "inherit",
    env: { ...process.env, BUILD_STATIC: "1", NEXT_TELEMETRY_DISABLED: "1" },
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

  // 4. POST-PROSES SEO (sitemap index + prune + robots)
  postProcessSeo(OUT_DIR);

  // 4b. Marker mode build — dibaca deploy-pack.mjs (deteksi deterministik)
  writeFileSync(path.join(OUT_DIR, ".pack-mode"), LIGHT ? "light" : "full", "utf8");

  console.log("✅ Static export selesai → out/");
} catch (err) {
  console.error("❌", err.message);
  exitCode = 1;
} finally {
  // 5. SELALU kembalikan semua folder yang digeser agar dev server tetap utuh
  restoreDynamicParams();
  restoreForceDynamic();
  for (const [hn, rel] of moved) {
    if (restoreIn(hn, rel)) console.log(`↩️  ${rel} dikembalikan`);
  }
  if (existsSync(ROUTES_HOLD)) rmSync(ROUTES_HOLD, { recursive: true, force: true });
}

process.exit(exitCode);

// ============================================================
// POST-PROSES SEO — hanya memakai file hasil export (tanpa data app)
// ============================================================
function postProcessSeo(outDir) {
  const SITE_FALLBACK = "https://pusatperizinan.com";

  // -- Kumpulkan semua halaman HTML yang ADA --
  const existingPaths = new Set();
  (function walk(dir) {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.name === "index.html" || e.name.endsWith(".html")) {
        const rel = path.relative(outDir, full).replace(/\\/g, "/");
        const urlPath = rel === "index.html"
          ? "/"
          : "/" + rel.replace(/\/index\.html$/, "").replace(/\.html$/, "");
        existingPaths.add(urlPath);
      }
    }
  })(outDir);
  console.log(`🗺️  Halaman terdeteksi di out/: ${existingPaths.size}`);

  const pathExists = (p) => {
    if (!p) return false;
    if (p === "/") return existingPaths.has("/");
    const clean = p.replace(/\/+$/, "");
    return existingPaths.has(clean) || existingPaths.has(`${clean}/`);
  };

  // -- Origin dari sitemap seksi (fallback ke domain produksi) --
  let origin = SITE_FALLBACK;
  const sitemapDir = path.join(outDir, "sitemap");
  if (existsSync(sitemapDir)) {
    for (const f of readdirSync(sitemapDir)) {
      if (!f.endsWith(".xml")) continue;
      const m = readFileSync(path.join(sitemapDir, f), "utf8").match(/<loc>\s*(https?:\/\/[^\/<\s]+)/);
      if (m) { origin = m[1]; break; }
    }
  }

  // -- Prune tiap seksi sitemap: buang <url> yang halamannya tidak ada --
  const survivingSections = [];
  if (existsSync(sitemapDir)) {
    for (const f of readdirSync(sitemapDir).sort()) {
      if (!f.endsWith(".xml")) continue;
      const fp = path.join(sitemapDir, f);
      const xml = readFileSync(fp, "utf8");
      const blocks = xml.match(/<url>[\s\S]*?<\/url>/g) ?? [];
      const kept = blocks.filter((b) => {
        const loc = b.match(/<loc>\s*([^<\s]+)\s*<\/loc>/)?.[1] ?? "";
        let p = "/";
        try { p = new URL(loc).pathname; } catch { return false; }
        return pathExists(p);
      });
      if (kept.length === 0) {
        rmSync(fp, { force: true });
        console.log(`   ✂️  sitemap/${f} kosong setelah prune → dihapus`);
        continue;
      }
      const header = xml.slice(0, xml.indexOf("<url>"));
      const footer = "</urlset>";
      writeFileSync(fp, header + kept.join("\n") + "\n" + footer, "utf8");
      survivingSections.push(f);
      console.log(`   ✂️  sitemap/${f}: ${blocks.length} → ${kept.length} URL`);
    }
  }

  // -- Tulis indeks out/sitemap.xml (mode export tidak punya rewrite) --
  if (survivingSections.length > 0) {
    const idx = `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      survivingSections.map((s) => `  <sitemap><loc>${origin}/sitemap/${s}</loc></sitemap>`).join("\n") +
      `\n</sitemapindex>\n`;
    writeFileSync(path.join(outDir, "sitemap.xml"), idx, "utf8");
    console.log(`✅ out/sitemap.xml (indeks, ${survivingSections.length} seksi) ditulis`);
  } else if (!existsSync(path.join(outDir, "sitemap.xml"))) {
    // Fallback minimal: sitemap indeks tunggal berisi homepage
    writeFileSync(
      path.join(outDir, "sitemap.xml"),
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${SITE_FALLBACK}/</loc></url>\n</urlset>\n`,
      "utf8"
    );
    console.log("⚠️  Tidak ada seksi sitemap — fallback out/sitemap.xml berisi homepage");
  }

  // -- Sinkronkan baris Sitemap: di robots.txt dengan seksi yang hidup --
  const robotsPath = path.join(outDir, "robots.txt");
  if (existsSync(robotsPath) && survivingSections.length > 0) {
    const lines = readFileSync(robotsPath, "utf8").split("\n").filter((l) => !/^sitemap:/i.test(l.trim()));
    while (lines.length && lines[lines.length - 1].trim() === "") lines.pop();
    lines.push("", "# Sitemap (disinkronkan otomatis saat build statis)");
    for (const s of survivingSections) lines.push(`Sitemap: ${origin}/sitemap/${s}`);
    lines.push(`Sitemap: ${origin}/sitemap.xml`, "");
    writeFileSync(robotsPath, lines.join("\n"), "utf8");
    console.log("✅ robots.txt: baris Sitemap disinkronkan dengan seksi tersisa");
  }

  // -- Prune RSS feed (out/feed.xml): buang <item> yang halamannya tidak ada --
  const feedPath = path.join(outDir, "feed.xml");
  if (existsSync(feedPath)) {
    const xml = readFileSync(feedPath, "utf8");
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
    const kept = items.filter((b) => {
      const link = b.match(/<link>\s*([^<\s]+)\s*<\/link>/)?.[1] ?? "";
      try { return pathExists(new URL(link).pathname); } catch { return false; }
    });
    if (items.length > 0 && kept.length !== items.length) {
      const head = xml.slice(0, xml.indexOf("<item>"));
      const tail = xml.slice(xml.lastIndexOf("</item>") + "</item>".length);
      writeFileSync(feedPath, head + kept.join("\n") + tail, "utf8");
      console.log(`✅ feed.xml dipangkas: ${items.length} → ${kept.length} item`);
    }
  }
}
