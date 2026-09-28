"use client";

import { ShieldCheck, MapPin, Mail, PhoneCall } from "lucide-react";
import { WHATSAPP_DISPLAY } from "@/lib/landing-data";
import { useLanguage } from "@/lib/i18n/language-provider";
import { LanguageSwitcher } from "@/components/landing/language-switcher";

const SERVICE_LINKS = [
  { label: "NIB & OSS-RBA", href: "#layanan-nib" },
  { label: "Pendirian PT & PMA", href: "#layanan-pt" },
  { label: "Izin Umroh (PPIU)", href: "#layanan-ppi-umroh" },
  { label: "Izin Haji (PPIH)", href: "#layanan-ppi-haji" },
  { label: "Registrasi IATA", href: "#layanan-iata" },
  { label: "Izin Usaha Arab Saudi (MISA)", href: "#layanan-saudi-arabia" },
  { label: "RKAB & Kepatuhan Tambang", href: "#layanan-rkab-tambang" },
  { label: "Sertifikasi Halal", href: "#layanan-halal" },
];

const COMPANY_LINKS = [
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
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
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
            <ul className="mt-4 space-y-2.5">
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
          <p className="text-xs text-emerald-100/50 sm:pr-10">
            {t("footerMade")}
          </p>
        </div>
      </div>
    </footer>
  );
}
