// ============================================================
// PUSATPERIZINAN.COM — Logo Processor (Task 22)
// Sumber: upload/Master LOGO Pusat Perizinan NEW OK (2).png
// Output di public/:
//   logo.png            → logo penuh (trim transparan)
//   logo-icon.png       → emblem PP persegi 512px (header/favicon/JSON-LD)
//   logo-icon-white.png → emblem putih 512px (footer gelap)
// ============================================================
import sharp from "sharp";
import path from "node:path";
import { mkdirSync } from "node:fs";

const SRC = path.join(process.cwd(), "upload", "Master LOGO Pusat Perizinan NEW OK (2).png");
const OUT = path.join(process.cwd(), "public");
mkdirSync(OUT, { recursive: true });

// ---------- 1. Trim border transparan ----------
const trimmed = await sharp(SRC).trim({ threshold: 12 }).png().toBuffer();
const meta = await sharp(trimmed).metadata();
const { data, info } = await sharp(trimmed).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width, H = info.height;
console.log(`Trimmed: ${W}x${H}`);

const alphaAt = (x, y) => data[(y * W + x) * 4 + 3];

// ---------- 2. Deteksi emblem (bagian atas) vs teks: cari gap baris kosong ----------
let contentStarted = false, emblemEnd = H;
let emptyRun = 0;
for (let y = 0; y < H; y++) {
  let has = false;
  for (let x = 0; x < W; x += 2) {
    if (alphaAt(x, y) > 16) { has = true; break; }
  }
  if (has) { contentStarted = true; emptyRun = 0; }
  else if (contentStarted) {
    emptyRun++;
    if (emptyRun >= 8) { emblemEnd = y - emptyRun + 1; break; } // gap ≥8 baris kosong
  }
}
console.log(`Emblem rows: 0..${emblemEnd} (${((emblemEnd / H) * 100).toFixed(1)}% tinggi)`);

// ---------- 3. Bounding box emblem ----------
let minX = W, maxX = 0, minY = H, maxY = 0;
for (let y = 0; y < emblemEnd; y++) {
  for (let x = 0; x < W; x++) {
    if (alphaAt(x, y) > 16) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
const bw = maxX - minX + 1, bh = maxY - minY + 1;
console.log(`Emblem bbox: x ${minX}..${maxX} (w=${bw}), y ${minY}..${maxY} (h=${bh})`);

// ---------- 4. Logo penuh ----------
await sharp(trimmed).png({ compressionLevel: 9 }).toFile(path.join(OUT, "logo.png"));

// ---------- 5. Emblem persegi 512px (kanvas transparan terpisah — teks tidak ikut) ----------
const pad = Math.round(Math.max(bw, bh) * 0.06);
const side = Math.max(bw, bh) + pad * 2;
// Sumber = bbox emblem saja (dibatasi emblemEnd agar teks "TOP KONSULTAN" tidak ikut)
const sx = Math.max(0, minX - pad);
const sy = Math.max(0, minY - pad);
const sw = Math.min(W - sx, bw + pad * 2);
const sh = Math.min(emblemEnd + Math.floor(pad / 2) - sy, H - sy);
// Offset tengah di kanvas persegi
const offX = Math.floor((side - sw) / 2);
const offY = Math.floor((side - sh) / 2);

const iconRGBA = Buffer.alloc(side * side * 4, 0);
const whiteRGBA = Buffer.alloc(side * side * 4, 0);
for (let y = 0; y < sh; y++) {
  for (let x = 0; x < sw; x++) {
    const srcIdx = ((sy + y) * W + (sx + x)) * 4;
    const dstIdx = ((offY + y) * side + (offX + x)) * 4;
    const a = data[srcIdx + 3];
    iconRGBA[dstIdx] = data[srcIdx]; iconRGBA[dstIdx + 1] = data[srcIdx + 1];
    iconRGBA[dstIdx + 2] = data[srcIdx + 2]; iconRGBA[dstIdx + 3] = a;
    // versi putih: RGB putih, alpha asli (dipertegas agar tegas di bg gelap)
    const wA = a > 140 ? 255 : a;
    whiteRGBA[dstIdx] = 255; whiteRGBA[dstIdx + 1] = 255; whiteRGBA[dstIdx + 2] = 255; whiteRGBA[dstIdx + 3] = wA;
  }
}
await sharp(iconRGBA, { raw: { width: side, height: side, channels: 4 } })
  .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 }).toFile(path.join(OUT, "logo-icon.png"));
await sharp(whiteRGBA, { raw: { width: side, height: side, channels: 4 } })
  .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 }).toFile(path.join(OUT, "logo-icon-white.png"));

// ---------- 6. Preview debug ----------
await sharp(iconRGBA, { raw: { width: side, height: side, channels: 4 } })
  .resize(300, 300, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .flatten({ background: "#ffffff" }).png().toFile("/tmp/preview-icon.png");

const fs = await import("node:fs");
for (const f of ["logo.png", "logo-icon.png", "logo-icon-white.png"]) {
  const st = fs.statSync(path.join(OUT, f));
  console.log(`✅ public/${f} — ${(st.size / 1024).toFixed(1)} KB`);
}
