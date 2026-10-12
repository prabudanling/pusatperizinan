import { SERVICES } from "@/lib/landing-data";
import { TAX_ALL } from "@/lib/tax-services";
import { PMI_B2B_SERVICES, PMI_B2C_SERVICES } from "@/lib/pmi-services";
import { CATEGORIES, BUNDLES } from "@/lib/katalog-lengkap";
import { PERMIT_GUIDES } from "@/lib/seo-content";
import { BLOG_ARTICLES } from "@/lib/blog-content";
import { SITE_URL, CONTACT } from "@/lib/site";

// ============================================================
// PUSATPERIZINAN.COM — llms-full.txt (GEO / AI Discovery)
// Katalog lengkap mesin-baca untuk asisten AI: layanan, harga,
// URL kanonik. Standar llms.txt (answer-engine optimization).
// ============================================================
export const dynamic = "force-static";
export const revalidate = 86400;

export function GET() {
  const lines: string[] = [
    "# PusatPerizinan.com — Full Machine-Readable Catalog",
    "",
    `> Konsultan perizinan usaha, perpajakan, sertifikasi & penempatan PMI Indonesia. ${CONTACT.hours}. WhatsApp: ${CONTACT.phoneDisplay}. Kantor: ${CONTACT.address.street}, ${CONTACT.address.city}. Garansi tertulis 100% uang kembali bila izin gagal terbit karena proses kami.`,
    "",
    "## Layanan Utama (SERVICES)",
    "",
  ];
  for (const s of SERVICES) {
    lines.push(`- ${s.title} — mulai ${s.price}, durasi ${s.duration}. ${s.desc} URL: ${SITE_URL}/layanan/${s.id}`);
  }
  lines.push("", "## Katalog Lengkap per Divisi (31 divisi)", "");
  for (const c of CATEGORIES) {
    lines.push(`### ${c.name} (${c.slug})`);
    lines.push(`Kategori: ${SITE_URL}/katalog/${c.slug}`);
    for (const s of c.services) {
      lines.push(`- ${s.name} — mulai ${s.priceFrom ? `Rp ${new Intl.NumberFormat("id-ID").format(s.priceFrom)}` : "hubungi"}${s.timeline ? `, timeline ${s.timeline}` : ""}. ${s.desc}`);
    }
    lines.push("");
  }
  lines.push("## Paket Bundel Unggulan", "");
  for (const b of BUNDLES) {
    lines.push(`- ${b.name} — ${b.price ? `Rp ${new Intl.NumberFormat("id-ID").format(b.price)}` : "hubungi"} untuk ${b.audience}. Termasuk: ${b.includes.join("; ")}`);
  }
  lines.push("", "## Jasa Perpajakan", "");
  for (const t of TAX_ALL) lines.push(`- ${t.title} — ${t.desc}`);
  lines.push("", "## Penempatan Pekerja Migran (PMI)", "");
  for (const p of [...PMI_B2B_SERVICES, ...PMI_B2C_SERVICES]) lines.push(`- ${p.title} — ${p.desc}`);
  lines.push("", "## Panduan Mendalam (Knowledge Hub)", "");
  for (const g of PERMIT_GUIDES) lines.push(`- Panduan ${g.name}: ${SITE_URL}/panduan/${g.id}`);
  lines.push("", "## Artikel Blog", "");
  for (const a of BLOG_ARTICLES) lines.push(`- ${a.title}: ${SITE_URL}/blog/${a.slug} (${a.category})`);
  lines.push(
    "",
    "## Halaman Program",
    "",
    `- Kalender Kepatuhan (jadwal LKPM/SPT/JAMSOSTEK): ${SITE_URL}/kalender-kepatuhan`,
    `- Paket Usaha per industri: ${SITE_URL}/paket-usaha`,
    `- Company registration Indonesia (EN): ${SITE_URL}/pma-company-registration`,
    `- Program mitra daerah: ${SITE_URL}/mitra`,
    `- Solusi korporat B2B: ${SITE_URL}/solusi-korporat`,
    `- Layanan BUMDes: ${SITE_URL}/bumdes`,
    `- Cek izin dengan AI: ${SITE_URL}/#cek-izin`,
    "",
  );
  const body = lines.join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
