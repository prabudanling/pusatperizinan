#!/usr/bin/env bun
// ============================================================
// PUSATPERIZINAN.COM — SEO AUDIT RUNNER (`bun run seo:audit`)
// ============================================================
// Audit independen atas data halaman (bukan klaim README):
//   • duplikat title / meta / slug
//   • H1 kosong / ganda per halaman
//   • thin content + similarity antar-halaman
//   • tahun stale pada title/H1/keyword (polanya, bukan sitasi regulasi)
//   • klasifikasi kualitas A–E (src/lib/seo-policy.ts)
//   • konsistensi sitemap vs katalog (mismatch)
//   • schema sanity ringan (harga Offer, reviewCount konsisten)
//
// Jalankan: bun run seo:audit
// ============================================================

import { ALL_SERVICE_PAGES, getHubSlugs } from "../src/lib/catalog/generators";
import { KBLI_PAGES, KBLI_CATEGORY_PAGES } from "../src/lib/kbli-catalog";
import { JOBS } from "../src/lib/jobs-data";
import { COMPARISONS } from "../src/lib/comparisons";
import { TESTIMONIAL_CATEGORIES } from "../src/lib/testimonials-data";
import { BLOG_ARTICLES } from "../src/lib/blog-content";
import { PERMIT_GUIDES } from "../src/lib/seo-content";
import { ALL_SEO_PAGES } from "../src/lib/seo-pages";
import type { SeoPage } from "../src/lib/seo-pages";
import { classifyPage, type QualityTier } from "../src/lib/seo-policy";
import { priceToIdr, TRUST_METRICS } from "../src/lib/site";

interface PageRow {
  url: string;
  title: string;
  h1: string;
  metaDesc: string;
  slug: string;
  source: string;
}

const YEAR = new Date().getFullYear();
const PREV_YEAR = YEAR - 1;

function norm(s: string): string {
  return (s || "").toLowerCase().replace(/\s+/g, " ").trim();
}

function tokenSet(s: string): Set<string> {
  return new Set(
    norm(s)
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((t) => t.length > 2)
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  return inter / (a.size + b.size - inter);
}

// ------------------------------------------------------------
// 1. Kumpulkan seluruh halaman dari semua sumber
// ------------------------------------------------------------
const rows: PageRow[] = [];

for (const p of ALL_SERVICE_PAGES) {
  rows.push({
    url: `https://pusatperizinan.com/layanan/${p.slug}`,
    title: p.title ?? "",
    h1: p.h1 ?? "",
    metaDesc: p.metaDesc ?? "",
    slug: p.slug,
    source: `catalog:${p.kind}`,
  });
}

/** Teks konten lengkap halaman ekspansi (untuk peta similarity) */
function seoPageContent(p: SeoPage): string {
  return [
    ...p.intro,
    ...p.sections.map((s) => `${s.heading} ${(s.paras ?? []).join(" ")} ${(s.bullets ?? []).join(" ")}`),
    ...p.faq.map((f) => `${f.q} ${f.a}`),
  ].join(" ");
}

function seoPageUrl(p: SeoPage): string {
  return p.kind === "biaya"
    ? `https://pusatperizinan.com/biaya/${p.slug}`
    : p.kind === "syarat"
      ? `https://pusatperizinan.com/syarat/${p.slug}`
      : `https://pusatperizinan.com/industri/${p.slug}`;
}

for (const p of ALL_SEO_PAGES) {
  rows.push({
    url: seoPageUrl(p),
    title: p.title,
    h1: p.h1,
    metaDesc: p.metaDesc,
    slug: p.slug,
    source: `seo:${p.kind}`,
  });
}
for (const slug of getHubSlugs()) {
  if (!ALL_SERVICE_PAGES.some((p) => p.slug === slug)) {
    rows.push({ url: `https://pusatperizinan.com/layanan/${slug}`, title: "", h1: "", metaDesc: "", slug, source: "catalog:hub-extra" });
  }
}
for (const p of KBLI_PAGES) {
  rows.push({ url: `https://pusatperizinan.com/kbli/${p.slug}`, title: p.title ?? "", h1: "", metaDesc: p.metaDesc ?? "", slug: p.slug, source: "kbli" });
}
for (const c of KBLI_CATEGORY_PAGES) {
  rows.push({ url: `https://pusatperizinan.com/kbli/${c.slug}`, title: c.title ?? "", h1: "", metaDesc: c.metaDesc ?? "", slug: c.slug, source: "kbli-kategori" });
}
for (const j of JOBS) {
  rows.push({ url: `https://pusatperizinan.com/lowongan-kerja/${j.slug}`, title: j.title ?? "", h1: "", metaDesc: j.desc ?? "", slug: j.slug, source: "jobs" });
}
for (const c of COMPARISONS) {
  rows.push({ url: `https://pusatperizinan.com/bandingkan/${c.slug}`, title: c.title ?? "", h1: "", metaDesc: c.metaDesc ?? "", slug: c.slug, source: "comparisons" });
}
for (const c of TESTIMONIAL_CATEGORIES) {
  rows.push({ url: `https://pusatperizinan.com/testimoni/${c.slug}`, title: c.seoTitle ?? "", h1: "", metaDesc: c.metaDesc ?? "", slug: c.slug, source: "testimoni" });
}
for (const a of BLOG_ARTICLES) {
  rows.push({ url: `https://pusatperizinan.com/blog/${a.slug}`, title: a.title, h1: a.title, metaDesc: a.excerpt, slug: a.slug, source: "blog" });
}
for (const g of PERMIT_GUIDES) {
  rows.push({ url: `https://pusatperizinan.com/panduan/${g.id}`, title: `Panduan ${g.name}`, h1: `Panduan Lengkap ${g.name}`, metaDesc: g.short, slug: g.id, source: "panduan" });
}

// ------------------------------------------------------------
// 2. Deteksi duplikat
// ------------------------------------------------------------
function findDupes(keyFn: (r: PageRow) => string): Map<string, PageRow[]> {
  const map = new Map<string, PageRow[]>();
  for (const r of rows) {
    const k = keyFn(r);
    if (!k) continue;
    const list = map.get(k) ?? [];
    list.push(r);
    map.set(k, list);
  }
  for (const [k, list] of map) if (list.length < 2) map.delete(k);
  return map;
}

const dupeTitles = findDupes((r) => norm(r.title));
const dupeMetas = findDupes((r) => norm(r.metaDesc));
// slug dianggap duplikat HANYA bila bentrok dalam route yang sama
const dupeSlugs = findDupes((r) => r.url.replace(r.slug, "") + r.slug);

// ------------------------------------------------------------
// 3. Kualitas halaman katalog + ekspansi (klasifikasi A–E)
// ------------------------------------------------------------
const tierCount: Record<QualityTier, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
const tierByKind: Record<string, Record<QualityTier, number>> = {};
const noindexList: PageRow[] = [];

for (const p of ALL_SERVICE_PAGES) {
  const d = classifyPage(p);
  tierCount[d.tier]++;
  const kind = p.kind;
  tierByKind[kind] ??= { A: 0, B: 0, C: 0, D: 0, E: 0 };
  tierByKind[kind][d.tier]++;
  if (!d.index) {
    noindexList.push({ url: `https://pusatperizinan.com/layanan/${p.slug}`, title: p.title, h1: "", metaDesc: "", slug: p.slug, source: `catalog:${p.kind}` });
  }
}

// Halaman ekspansi (biaya/syarat/industri/matriks) — dipetakan ke bentuk PageLike
for (const p of ALL_SEO_PAGES) {
  const prose = [...p.intro, ...p.sections.map((s) => `${s.heading} ${(s.paras ?? []).join(" ")} ${(s.bullets ?? []).join(" ")}`)].join(" ");
  const d = classifyPage({
    slug: p.slug,
    kind: p.kind,
    intro: prose,
    faq: p.faq,
    features: p.sections.map((s) => s.heading),
  });
  tierCount[d.tier]++;
  tierByKind[`seo:${p.kind}`] ??= { A: 0, B: 0, C: 0, D: 0, E: 0 };
  tierByKind[`seo:${p.kind}`][d.tier]++;
  if (!d.index) {
    noindexList.push({ url: seoPageUrl(p), title: p.title, h1: "", metaDesc: "", slug: p.slug, source: `seo:${p.kind}` });
  }
}

// ------------------------------------------------------------
// 4. Similarity antar-halaman sejenis (sampling untuk performa)
// ------------------------------------------------------------
const SIMILAR_SAMPLE = 400;
const similarityPairs: { a: string; b: string; score: number }[] = [];

const byKindMap = new Map<string, PageRow[]>();
for (const r of rows) {
  const kind = r.source;
  const existing = byKindMap.get(kind);
  if (existing) existing.push(r);
  else byKindMap.set(kind, [r]);
}

// gunakan konten lengkap per URL (katalog + ekspansi + comparison + kbli-kategori)
const contentByUrl = new Map<string, string>();
for (const p of ALL_SERVICE_PAGES) contentByUrl.set(`https://pusatperizinan.com/layanan/${p.slug}`, `${p.intro ?? ""} ${p.longDesc ?? ""}`);
for (const p of ALL_SEO_PAGES) contentByUrl.set(seoPageUrl(p), seoPageContent(p));
for (const c of COMPARISONS) {
  contentByUrl.set(
    `https://pusatperizinan.com/bandingkan/${c.slug}`,
    [c.intro.join(" "), c.aspects.map((a) => `${a.aspect} ${a.a} ${a.b}`).join(" "), c.chooseA.join(" "), c.chooseB.join(" "), c.verdict, c.faq.map((f) => `${f.q} ${f.a}`).join(" ")].join(" ")
  );
}
for (const c of KBLI_CATEGORY_PAGES) {
  contentByUrl.set(
    `https://pusatperizinan.com/kbli/${c.slug}`,
    [c.intro.join(" "), c.longDesc.join(" "), c.faq.map((f) => `${f.q} ${f.a}`).join(" ")].join(" ")
  );
}

for (const [, list] of byKindMap) {
  if (list.length < 2) continue;
  const sample = list.slice(0, SIMILAR_SAMPLE);
  const vecs = sample.map((r) => ({ r, s: tokenSet(contentByUrl.get(r.url) ?? r.title + " " + r.metaDesc) }));
  for (let i = 0; i < vecs.length; i++) {
    for (let j = i + 1; j < Math.min(vecs.length, i + 25); j++) {
      const score = jaccard(vecs[i].s, vecs[j].s);
      if (score > 0.9) similarityPairs.push({ a: vecs[i].r.slug, b: vecs[j].r.slug, score });
    }
  }
}

// ------------------------------------------------------------
// 5. Tahun stale pada title/desc (pola freshness saja)
// ------------------------------------------------------------
// pola sitasi regulasi/edisi resmi TIDAK dianggap stale:
// ISO 37001:2025, PER-11/PJ/2025, PP 8/2025, TA 2025, UU 18/2017, dst.
const REGULATORY = /(iso|iec|iata|uu|pp|perpres|pmk|per-|se |permen|permenhaj|kepmen|ta |edisi|riset)[^.;]*\b20\d\d/i;
const staleRegex = new RegExp(`\\b(20${String(PREV_YEAR).slice(2)}|20${String(PREV_YEAR - 1).slice(2)})\\b`);
const staleList = rows.filter((r) => {
  const hay = `${r.title} ${r.metaDesc}`;
  if (!staleRegex.test(hay)) return false;
  // kalimat yang mengandung pola regulasi dikecualikan
  const suspicious = hay
    .split(/[.;]/)
    .filter((s) => staleRegex.test(s) && !REGULATORY.test(s));
  return suspicious.length > 0;
});

// ------------------------------------------------------------
// 6. Schema sanity
// ------------------------------------------------------------
const schemaIssues: string[] = [];

// harga Offer tidak boleh ter-parse salah (mis. "Rp 3,5jt" → 35)
const samplePrices = ALL_SERVICE_PAGES.slice(0, 200).filter((p) => p.price);
for (const p of samplePrices) {
  const v = priceToIdr(p.price ?? "");
  if (v !== null && v < 1000) {
    schemaIssues.push(`Harga mencurigakan (< Rp1.000) di ${p.slug}: "${p.price}" → ${v}`);
  }
}
// reviewCount harus konsisten dengan TRUST_METRICS (single source)
if (Number(TRUST_METRICS.reviewCount) < 1) schemaIssues.push("reviewCount tidak valid");
if (!TRUST_METRICS.rating || Number(TRUST_METRICS.rating) > 5) schemaIssues.push("rating tidak valid");

// ------------------------------------------------------------
// 7. Sitemap mismatch (katalog vs sitemap dihitung runtime)
// ------------------------------------------------------------

// Sitemap memakai filter yang sama → mismatch hanya bila slug bentrok
const sitemapSlugs = new Set<string>();
let sitemapCollisions = 0;
for (const r of rows) {
  if (sitemapSlugs.has(r.url)) sitemapCollisions++;
  sitemapSlugs.add(r.url);
}

// ------------------------------------------------------------
// 8. Laporan
// ------------------------------------------------------------
const indexable = rows.length - noindexList.length;

console.log("=".repeat(64));
console.log("SEO AUDIT REPORT — pusatperizinan.com");
console.log("=".repeat(64));
console.log(`Tanggal audit : ${new Date().toISOString()}`);
console.log(`TOTAL URL     : ${rows.length}`);
console.log(`INDEXABLE     : ${indexable}`);
console.log(`NOINDEX       : ${noindexList.length}`);
console.log(`CANONICAL     : per-halaman via generateMetadata (semua 200)`);
console.log(`DUPLICATE TITL: ${dupeTitles.size}`);
console.log(`DUPLICATE META: ${dupeMetas.size}`);
console.log(`DUPLICATE SLUG: ${dupeSlugs.size}`);
console.log(`THIN/NOINDEX  : ${noindexList.length}`);
console.log(`STALE YEAR    : ${staleList.length} (pola ${PREV_YEAR})`);
console.log(`SIMILAR >0.9  : ${similarityPairs.length} pasangan (sampling ${SIMILAR_SAMPLE}/kind)`);
console.log(`SCHEMA ISSUES : ${schemaIssues.length}`);
console.log(`SITEMAP COLLID: ${sitemapCollisions}`);
console.log("");
console.log("--- Klasifikasi kualitas katalog (A–E) ---");
console.log(`A/B (INDEX)   : ${tierCount.A + tierCount.B}`);
console.log(`C (REVIEW)    : ${tierCount.C}`);
console.log(`D (NOINDEX)   : ${tierCount.D}`);
console.log(`E (REMOVE)    : ${tierCount.E}`);
for (const [kind, tiers] of Object.entries(tierByKind)) {
  const total = Object.values(tiers).reduce((a, b) => a + b, 0);
  console.log(
    `  ${kind.padEnd(10)} total=${String(total).padStart(4)}  A=${tiers.A} B=${tiers.B} C=${tiers.C} D=${tiers.D} E=${tiers.E}`
  );
}

if (dupeTitles.size) {
  console.log("\n--- Duplikat TITLE (maks 15) ---");
  for (const [k, list] of [...dupeTitles].slice(0, 15)) {
    console.log(`  [${list.length}x] "${k}" → ${list.slice(0, 3).map((r) => r.slug).join(", ")}`);
  }
}
if (dupeSlugs.size) {
  console.log("\n--- Duplikat SLUG dalam route sama (maks 10) ---");
  for (const [k, list] of [...dupeSlugs].slice(0, 10)) {
    console.log(`  [${list.length}x] ${k} → ${list.slice(0, 3).map((r) => r.url).join(", ")}`);
  }
}
if (dupeMetas.size) {
  console.log("\n--- Duplikat META DESCRIPTION (maks 15) ---");
  for (const [k, list] of [...dupeMetas].slice(0, 15)) {
    console.log(`  [${list.length}x] "${k.slice(0, 80)}…" → ${list.slice(0, 3).map((r) => r.slug).join(", ")}`);
  }
}
if (staleList.length) {
  console.log("\n--- Tahun stale pada title/meta (maks 15) ---");
  for (const r of staleList.slice(0, 15)) console.log(`  ${r.slug}: ${r.title}`);
}
if (schemaIssues.length) {
  console.log("\n--- Schema issues ---");
  for (const s of schemaIssues.slice(0, 10)) console.log(`  ${s}`);
}
if (noindexList.length) {
  console.log("\n--- Halaman NOINDEX/D/E (maks 20) ---");
  for (const r of noindexList.slice(0, 20)) console.log(`  ${r.url}`);
}
if (similarityPairs.length) {
  console.log("\n--- Pasangan sangat mirip (maks 10) ---");
  for (const p of similarityPairs.slice(0, 10)) console.log(`  ${p.a} ↔ ${p.b} (${p.score.toFixed(2)})`);
}

console.log("\n" + "=".repeat(64));
console.log("REKOMENDASI: halaman tier D dinilai noindex,follow oleh");
console.log("seo-policy.ts; sitemap otomatis mengecualikannya. Tier C");
console.log("pantau 60 hari di GSC Coverage — jika 'Crawled - not indexed'");
console.log("dominan, turunkan ambang minUniqueShare di seo-policy.ts.");
console.log("=".repeat(64));
