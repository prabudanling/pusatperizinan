"use client";

import Link from "next/link";
import { ShieldCheck, MapPin, Mail, PhoneCall } from "lucide-react";
import { WHATSAPP_DISPLAY } from "@/lib/landing-data";
import { useLanguage } from "@/lib/i18n/language-provider";
import { LanguageSwitcher } from "@/components/landing/language-switcher";

const SERVICE_LINKS = [
  { label: "NIB & OSS-RBA", href: "/layanan/nib" },
  { label: "Pendirian PT & PMA", href: "/layanan/pt" },
  { label: "Jasa Pajak Pribadi & Badan", href: "/layanan/kategori/pajak" },
  { label: "NPWP & SPT Tahunan", href: "/layanan/tax-npwp-op" },
  { label: "Kerja Luar Negeri (PMI)", href: "/layanan/kategori/kerja-luar-negeri" },
  { label: "Kerja di Jepang (SSW)", href: "/layanan/kerja-di-jp" },
  { label: "Izin PPTKIS / P3MI", href: "/layanan/pptkis" },
  { label: "Izin Umroh (PPIU)", href: "/layanan/ppi-umroh" },
  { label: "Izin Haji (PPIH)", href: "/layanan/ppi-haji" },
  { label: "Katalog Sertifikasi (43+)", href: "/layanan/kategori/sertifikasi" },
  { label: "Pendirian Travel Umrah (PT+PPIU)", href: "/layanan/paket-pendirian-travel-umrah" },
  { label: "Upgrade PIHK (Haji Khusus)", href: "/layanan/upgrade-ppiu-ke-pihk" },
  { label: "ISO 9001:2026", href: "/layanan/iso-9001" },
  { label: "ISO 27001 Keamanan Informasi", href: "/layanan/iso-27001" },
  { label: "Halal Jasa (PP 42/2024)", href: "/layanan/halal-jasa-restoran" },
  { label: "SBU LPJK untuk Tender", href: "/layanan/sbu-lpjk" },
  { label: "Pendaftaran Merek (DJKI)", href: "/layanan/merek" },
  { label: "API Ekspor Impor & COO", href: "/layanan/api-impex" },
  { label: "ISO & SMK3", href: "/layanan/iso" },
  { label: "RPTKA, KITAS Expatriat", href: "/layanan/rptka-kitas" },
  { label: "Registrasi IATA", href: "/layanan/iata" },
  { label: "Izin Usaha Arab Saudi (MISA)", href: "/layanan/saudi-arabia" },
  { label: "RKAB & Kepatuhan Tambang", href: "/layanan/rkab-tambang" },
  { label: "Sertifikasi Halal", href: "/layanan/halal" },
];

const POPULAR_REGIONS = [
  { label: "Layanan di DKI Jakarta", href: "/layanan/wilayah/dki-jakarta" },
  { label: "Layanan di Jawa Barat", href: "/layanan/wilayah/jawa-barat" },
  { label: "Layanan di Jawa Tengah", href: "/layanan/wilayah/jawa-tengah" },
  { label: "Layanan di Jawa Timur", href: "/layanan/wilayah/jawa-timur" },
  { label: "Layanan di Bali", href: "/layanan/wilayah/bali" },
  { label: "Layanan di Sumatera Utara", href: "/layanan/wilayah/sumatera-utara" },
];

const COUNTRY_LINKS = [
  { label: "🇯🇵 Jepang (SSW)", href: "/layanan/kerja-di-jp" },
  { label: "🇰🇷 Korea Selatan (EPS)", href: "/layanan/kerja-di-kr" },
  { label: "🇹🇼 Taiwan", href: "/layanan/kerja-di-tw" },
  { label: "🇲🇾 Malaysia", href: "/layanan/kerja-di-my" },
  { label: "🇸🇬 Singapura", href: "/layanan/kerja-di-sg" },
  { label: "🇸🇦 Arab Saudi", href: "/layanan/kerja-di-sa" },
  { label: "🇭🇰 Hong Kong", href: "/layanan/kerja-di-hk" },
  { label: "🇩🇪 Jerman (Triple Win)", href: "/layanan/kerja-di-de" },
];

const COMPANY_LINKS = [
  { label: "Alat Gratis: AI Roadmap", href: "/roadmap" },
  { label: "Kalkulator Pajak", href: "/kalkulator-pajak" },
  { label: "Database KBLI", href: "/kbli" },
  { label: "Kenapa Kami", href: "#keunggulan" },
  { label: "Cara Kerja", href: "#cara-kerja" },
  { label: "Blog Perizinan", href: "#blog" },
  { label: "Kursus Email Gratis", href: "#kursus" },
  { label: "Kalkulator Biaya", href: "#kalkulator" },
  { label: "Jangkauan Nasional", href: "#jangkauan" },
  { label: "Harga", href: "#harga" },
  { label: "Testimoni", href: "#testimoni" },
  { label: "FAQ", href: "#faq" },
  { label: "Cek Izin AI", href: "#cek-izin" },
  { label: "Peta Situs", href: "#peta-situs" },
];

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="mt-auto bg-[oklch(0.23_0.03_165)] text-emerald-50/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Baris katalog SEO */}
        <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-6 pb-10 border-b border-white/10">
          <nav aria-label="Layanan" className="md:col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Layanan Populer</h3>
            <ul className="mt-4 space-y-2.5">
              {SERVICE_LINKS.slice(0, 8).map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-emerald-100/70 hover:text-emerald-300 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="/layanan" className="text-sm font-semibold text-emerald-300 hover:text-white transition-colors">
                  → Semua {1000}+ Halaman Layanan
                </a>
              </li>
            </ul>
          </nav>
          <nav aria-label="Layanan lanjutan">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Sertifikasi & Korporasi</h3>
            <ul className="mt-4 space-y-2.5">
              {SERVICE_LINKS.slice(8).map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-emerald-100/70 hover:text-emerald-300 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Wilayah">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Layanan per Wilayah</h3>
            <ul className="mt-4 space-y-2.5">
              {POPULAR_REGIONS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-emerald-100/70 hover:text-emerald-300 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="/layanan#wilayah" className="text-sm font-semibold text-emerald-300 hover:text-white transition-colors">
                  → 38 Provinsi Lainnya
                </a>
              </li>
            </ul>
          </nav>
          <nav aria-label="Negara tujuan PMI">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Kerja Luar Negeri</h3>
            <ul className="mt-4 space-y-2.5">
              {COUNTRY_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-emerald-100/70 hover:text-emerald-300 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="/layanan#negara" className="text-sm font-semibold text-emerald-300 hover:text-white transition-colors">
                  → 17 Negara Tujuan
                </a>
              </li>
            </ul>
          </nav>
          <nav aria-label="Alat gratis">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Alat Gratis</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href="/katalog" className="text-sm text-emerald-100/70 hover:text-emerald-300 transition-colors">
                  🗂️ Katalog Lengkap 140+ Layanan (31 Divisi)
                </a>
              </li>
              <li>
                <a href="/paket" className="text-sm text-emerald-100/70 hover:text-emerald-300 transition-colors">
                  🎁 Paket Bundel Hemat (GO UMRAH, dll.)
                </a>
              </li>
              <li>
                <a href="/roadmap" className="text-sm text-emerald-100/70 hover:text-emerald-300 transition-colors">
                  🤖 AI Roadmap Perizinan 12 Bulan
                </a>
              </li>
              <li>
                <a href="/kalkulator-pajak" className="text-sm text-emerald-100/70 hover:text-emerald-300 transition-colors">
                  🧮 Kalkulator Pajak (PPh 21, UMKM, PPN)
                </a>
              </li>
              <li>
                <a href="/kbli" className="text-sm text-emerald-100/70 hover:text-emerald-300 transition-colors">
                  📚 Database KBLI 2025
                </a>
              </li>
              <li>
                <a href="/cek-dokumen" className="text-sm text-emerald-100/70 hover:text-emerald-300 transition-colors">
                  📷 AI Cek Dokumen (Upload Foto)
                </a>
              </li>
              <li>
                <a href="/bandingkan" className="text-sm text-emerald-100/70 hover:text-emerald-300 transition-colors">
                  ⚖️ Perbandingan Badan Usaha (PT vs CV)
                </a>
              </li>
              <li>
                <a href="/lowongan-kerja" className="text-sm text-emerald-100/70 hover:text-emerald-300 transition-colors">
                  💼 Lowongan Kerja Terbaru
                </a>
              </li>
              <li>
                <a href="/testimoni" className="text-sm text-emerald-100/70 hover:text-emerald-300 transition-colors">
                  ⭐ Testimoni Klien (4,9/5)
                </a>
              </li>
              <li>
                <a href="/virtual-office" className="text-sm text-emerald-100/70 hover:text-emerald-300 transition-colors">
                  🏢 Virtual Office (48 Lokasi, Mulai 500rb/bln)
                </a>
              </li>
              <li>
                <a href="/kanal-resmi" className="text-sm text-emerald-100/70 hover:text-emerald-300 transition-colors">
                  🏛️ Direktori Kanal Resmi Pemerintah
                </a>
              </li>
              <li>
                <a href="#cek-izin" className="text-sm text-emerald-100/70 hover:text-emerald-300 transition-colors">
                  ✨ Cek Izin AI
                </a>
              </li>
              <li>
                <a href="#kalkulator" className="text-sm text-emerald-100/70 hover:text-emerald-300 transition-colors">
                  💰 Kalkulator Biaya Layanan
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 mt-10">
          {/* Brand */}
          <div className="lg:pr-6">
            <a href="#beranda" className="flex items-center gap-2.5">
              <img src="/logo-icon-white.png" alt="Logo PusatPerizinan.com" className="h-10 w-10" />
              <span className="font-bold text-lg text-white">
                Pusat<span className="text-emerald-400">Perizinan</span>
                <span className="text-amber-400">.com</span>
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-emerald-100/70">
              {t("footerTagline")}
            </p>
            <div className="mt-5 flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-3">
              <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
              <p className="text-xs text-emerald-100/80">
                {t("footerVerified")}
              </p>
            </div>
            {/* Language switcher — 30 bahasa dunia */}
            <div className="mt-4 [&_[role=combobox]]:border-white/15 [&_[role=combobox]]:bg-white/5 [&_[role=combobox]]:text-emerald-50 [&_[role=combobox]]:hover:bg-white/10 [&_[role=combobox]]:shadow-none">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Layanan">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">{t("footerColServices")}</h3>
            <ul className="mt-4 space-y-2.5 max-h-96 overflow-y-auto scrollbar-thin pr-2">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-emerald-100/70 hover:text-emerald-300 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Perusahaan">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">{t("footerColCompany")}</h3>
            <ul className="mt-4 space-y-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-emerald-100/70 hover:text-emerald-300 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">{t("footerColContact")}</h3>
            <ul className="mt-4 space-y-3.5">
              <li>
                <a
                  href={`https://wa.me/6281269999910`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-sm text-emerald-100/70 hover:text-emerald-300 transition-colors"
                >
                  <PhoneCall className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>
                    WhatsApp {WHATSAPP_DISPLAY}
                    <br />
                    <span className="text-xs text-emerald-200/50">{t("footerHours")}</span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-emerald-100/70">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                halo@pusatperizinan.com
              </li>
              <li className="flex items-start gap-2.5 text-sm text-emerald-100/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>
                  Indonesia Stock Exchange Building, Lantai 5
                  <br />
                  SCBD Lot 13, Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan 12190
                  <span className="block text-xs text-emerald-200/50 mt-0.5">
                    {t("footerNote")}
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-7 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 pr-2 sm:pr-24 text-center sm:text-left">
          <p className="text-xs text-emerald-100/50">
            {t("footerRights").replace("{year}", String(new Date().getFullYear()))}
          </p>
          <nav aria-label="Tautan legal" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 sm:pr-10">
            <Link href="/tentang-kami" className="text-xs text-emerald-100/50 hover:text-emerald-300 transition-colors">Tentang Kami</Link>
            <span aria-hidden>·</span>
            <Link href="/kontak" className="text-xs text-emerald-100/50 hover:text-emerald-300 transition-colors">Kontak</Link>
            <span aria-hidden>·</span>
            <Link href="/kebijakan-privasi" className="text-xs text-emerald-100/50 hover:text-emerald-300 transition-colors">Privasi</Link>
            <span aria-hidden>·</span>
            <Link href="/syarat-ketentuan" className="text-xs text-emerald-100/50 hover:text-emerald-300 transition-colors">Syarat &amp; Ketentuan</Link>
          </nav>
          <p className="text-xs text-emerald-100/50 sm:pr-10">
            {t("footerMade")}
          </p>
        </div>
      </div>
    </footer>
  );
}
