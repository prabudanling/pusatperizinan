// ============================================================
// PUSATPERIZINAN.COM — Utilitas Katalog (bebas siklus import)
// Dipakai bersama oleh generators.ts & certifications.ts
// ============================================================

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function parsePrice(price: string): number {
  const clean = price.replace(/\./g, "").toLowerCase();
  const match = clean.match(/(\d+)(?:,(\d+))?\s*(jt|rb|juta|ribu)?/);
  if (!match) return 0;
  const num = parseInt(match[1] || "0", 10);
  const frac = match[2] ? parseInt(match[2], 10) : 0;
  let val = num + (frac ? frac / Math.pow(10, match[2]?.length || 1) : 0);
  const unit = match[3];
  if (unit === "jt" || unit === "juta") val *= 1_000_000;
  else if (unit === "rb" || unit === "ribu") val *= 1_000;
  return Math.round(val);
}
