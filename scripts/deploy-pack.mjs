// ============================================================
// PUSATPERIZINAN.COM — Deploy Pack Builder (Upload-Only)
// ------------------------------------------------------------
// Membungkus hasil static export (out/) menjadi SATU file tar.gz
// berisi HTML + CSS + JavaScript MURNI + .htaccess + panduan.
// Tanpa Node.js, tanpa server.js, tanpa .env, tanpa prisma runtime —
// user cukup UPLOAD & EXTRACT ke public_html idwebhost.
// Prasyarat : folder out/ ada (jalankan `npm run build:static` dulu)
// Hasil     : public/download/pusatperizinan-static-hosting.tar.gz
//             + pack-info.json + ISI-PACK.txt + DEPLOY-IDWEBHOST.md
//             (salinan juga ditempel ke out/download/ agar situs
//              statis yang live pun bisa menyajikannya)
// Jalankan  : node scripts/deploy-pack.mjs   (alias: npm run pack)
// ============================================================
import { existsSync, mkdirSync, rmSync, cpSync, writeFileSync, readdirSync, statSync, readFileSync, renameSync } from "node:fs";
import { createHash } from "node:crypto";
import { execSync } from "node:child_process";
import path from "node:path";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "out");
const STAGING = path.join(ROOT, ".pack-staging");
const DOWNLOAD = path.join(ROOT, "public", "download");
const PACK_NAME = "pusatperizinan-static-hosting.tar.gz";
const TMP_TAR = path.join(ROOT, ".pack-tmp.tar.gz");

console.log("🗜️  DEPLOY PACK (upload-only, tanpa Node.js) — pusatperizinan.com");
console.log("──────────────────────────────────────────────────────────────────");

// ---------- 0. Prasyarat ----------
if (!existsSync(OUT)) {
  console.error("❌ Folder out/ tidak ditemukan.");
  console.error("   Jalankan dulu:  npm run build:static");
  process.exit(1);
}

// ---------- 1. Siapkan staging (out/ minus folder download/) ----------
rmSync(STAGING, { recursive: true, force: true });
mkdirSync(STAGING, { recursive: true });
cpSync(OUT, STAGING, {
  recursive: true,
  filter: (src) => !src.includes(`${path.sep}download${path.sep}`) && !src.endsWith(`${path.sep}download`),
});
console.log("📁 Staging disiapkan dari out/ (folder download/ dikecualikan)");

// ---------- 2. Tempel .htaccess + panduan deploy ----------
const htaccessSrc = path.join(ROOT, ".htaccess");
if (existsSync(htaccessSrc)) {
  cpSync(htaccessSrc, path.join(STAGING, ".htaccess"));
}
const docSrc = path.join(ROOT, "DEPLOY-IDWEBHOST.md");
if (existsSync(docSrc)) {
  cpSync(docSrc, path.join(STAGING, "DEPLOY-IDWEBHOST.md"));
}

// ---------- 3. Hitung isi staging ----------
function walkCount(dir) {
  let count = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) count += walkCount(full);
    else count += 1;
  }
  return count;
}
const fileCount = walkCount(STAGING);

// ---------- 4. ISI-PACK.txt (checklist di dalam paket) ----------
const isiPack = `════════════════════════════════════════════════════════════
 PUSATPERIZINAN.COM — ISI PAKET DEPLOY (STATIC / UPLOAD-ONLY)
 Dibangun khusus untuk shared hosting TANPA Node.js (idwebhost)
════════════════════════════════════════════════════════════

Konten paket : ${fileCount} file (HTML + CSS + JavaScript murni)
Node.js      : TIDAK DIBUTUHKAN ✅
PHP          : TIDAK DIBUTUHKAN ✅ (hosting Anda cukup punya Apache/LiteSpeed)
Database     : TIDAK ADA — semua konten sudah "dibakar" ke HTML saat build
Terminal/SSH : TIDAK DIPERLUKAN ✅

STRUKTUR UTAMA
──────────────
  index.html              → halaman utama (lengkap: 30 bahasa, SEO, WA)
  404.html                → halaman error 404 branded
  _next/                  → aset CSS + JS + font (nama file ber-hash)
  .htaccess               → routing, 404, kompresi GZIP, cache browser
  robots.txt              → instruksi mesin pencari
  sitemap.xml             → peta situs SEO
  manifest.json, logo.png  → PWA & ikon
  logo-icon.png            → emblem persegi (favicon/header)
  download/               → salinan paket ini (boleh dihapus di hosting)
  DEPLOY-IDWEBHOST.md     → panduan lengkap langkah upload
  ISI-PACK.txt            → file yang sedang Anda baca

LANGKAH UPLOAD (± 5 MENIT)
──────────────────────────
  1. Login cPanel idwebhost → buka "File Manager"
  2. Masuk folder public_html (atau folder subdomain tujuan)
  3. Upload file pusatperizinan-static-hosting.tar.gz
  4. Klik kanan file → "Extract" → tujuan public_html → OK
  5. Settings File Manager → centang "Show Hidden Files"
     → pastikan .htaccess ikut ter-extract di public_html
  6. Hapus file .tar.gz dari public_html (opsional, agar rapi)
  7. Buka https://domain-anda.com → SELESAI 🎉

CATATAN PENTING
───────────────
  • Form kontak & AI chat otomatis fallback ke WhatsApp resmi
    0812-6999-9910 — lead TETAP masuk tanpa server sekalipun.
  • Update konten: konten ter-bake saat build. Minta rebuild di
    sandbox, lalu upload ulang paket baru (extract menimpa).
  • SSL gratis: cPanel → SSL/TLS Status → Run AutoSSL.
    Lalu aktifkan redirect HTTPS di .htaccess (hapus tanda #).

════════════════════════════════════════════════════════════
 Dibangun otomatis oleh deploy-pack.mjs — PT Pusat Perizinan
 Digital Nusantara · pusatperizinan.com
════════════════════════════════════════════════════════════
`;
writeFileSync(path.join(STAGING, "ISI-PACK.txt"), isiPack, "utf8");

// ---------- 5. Kompres tar.gz (tmp → rename, anti file korup) ----------
if (existsSync(TMP_TAR)) rmSync(TMP_TAR, { force: true });
execSync(`tar -czf "${TMP_TAR}" -C "${STAGING}" .`, { stdio: "pipe" });

// ---------- 6. Verifikasi tar (harus berisi index.html & .htaccess) ----------
const tarList = execSync(`tar -tzf "${TMP_TAR}"`, { encoding: "utf8" });
const hasIndex = tarList.includes("index.html");
const hasHtaccess = tarList.includes(".htaccess");
const has404 = tarList.includes("404.html");
if (!hasIndex || !hasHtaccess || !has404) {
  console.error(`❌ TAR tidak lengkap! index=${hasIndex} .htaccess=${hasHtaccess} 404=${has404}`);
  process.exit(1);
}
console.log(`✅ Tar terverifikasi: index.html ✓  .htaccess ✓  404.html ✓`);

// ---------- 7. Penempatan hasil ----------
mkdirSync(DOWNLOAD, { recursive: true });
const finalPath = path.join(DOWNLOAD, PACK_NAME);
rmSync(finalPath, { force: true });
renameSync(TMP_TAR, finalPath);

const sizeBytes = statSync(finalPath).size;
const md5 = createHash("md5").update(readFileSync(finalPath)).digest("hex");
const builtAt = new Date().toISOString();

const packInfo = {
  file: PACK_NAME,
  sizeBytes,
  sizeLabel: `${(sizeBytes / (1024 * 1024)).toFixed(2)} MB`,
  md5,
  fileCount,
  builtAt,
  target: "idwebhost shared hosting (cPanel) — tanpa Node.js",
  note: "Upload & extract ke public_html. Lihat DEPLOY-IDWEBHOST.md.",
};
writeFileSync(path.join(DOWNLOAD, "pack-info.json"), JSON.stringify(packInfo, null, 2), "utf8");
cpSync(docSrc, path.join(DOWNLOAD, "DEPLOY-IDWEBHOST.md"), { force: true });
writeFileSync(path.join(DOWNLOAD, "ISI-PACK.txt"), isiPack, "utf8");

// ---------- 8. Tempel salinan ke out/download/ agar situs statis live pun bisa menyajikan ----------
const outDownload = path.join(OUT, "download");
mkdirSync(outDownload, { recursive: true });
cpSync(finalPath, path.join(outDownload, PACK_NAME));
cpSync(path.join(DOWNLOAD, "pack-info.json"), path.join(outDownload, "pack-info.json"));
cpSync(path.join(DOWNLOAD, "ISI-PACK.txt"), path.join(outDownload, "ISI-PACK.txt"));
cpSync(path.join(DOWNLOAD, "DEPLOY-IDWEBHOST.md"), path.join(outDownload, "DEPLOY-IDWEBHOST.md"));

// ---------- 9. Bersih-bersih ----------
rmSync(STAGING, { recursive: true, force: true });

console.log("──────────────────────────────────────────────────────────────────");
console.log(`✅ PACK SIAP: public/download/${PACK_NAME}`);
console.log(`   Ukuran : ${packInfo.sizeLabel} · File: ${fileCount} · MD5: ${md5}`);
console.log(`   Dibangun: ${builtAt}`);
console.log(`   Salinan juga ditempel ke out/download/ (untuk situs statis live)`);
