"use client";

// ============================================================
// PUSATPERIZINAN.COM — Header Sitewide (NAV TERKELOMPOKAN)
// ============================================================
// IA (information architecture) — 5 kelompok menu, tidak lagi
// 11 link datar yang membingungkan:
//   1. Layanan      → MEGA DROPDOWN 3 kolom + rail konsultasi
//   2. Paket & Biaya → dropdown (paket, bandingkan, biaya)
//   3. Informasi    → dropdown (blog, panduan, KBLI, syarat, dst)
//   4. Alat         → dropdown (Cek Izin AI, kalkulator, cek dokumen)
//   5. Perusahaan   → dropdown (tentang kami, kontak, testimoni, mitra, karier)
//
// Aturan penting:
//   • Semua anchor beranda memakai path absolut "/#xxx" sehingga
//     berfungsi dari HALAMAN MANA PUN (sebelumnya "#xxx" mati di
//     halaman selain beranda).
//   • Breakpoint: nav desktop tampil di xl+, hamburger xl:hidden —
//     menutup celah 1024–1280px yang sebelumnya tidak punya akses
//     menu sama sekali (bug lama: nav xl:flex tapi hamburger lg:hidden).
//   • Dropdown: hover-intent + klik + keyboard (Escape), aria-expanded,
//     animasi compositor-only (opacity/transform) — hormat
//     prefers-reduced-motion via MotionProvider global.
//   • i18n: kunci t() yang sudah ada dipakai bila tersedia; label baru
//     bilingual inline {id,en} — 28 bahasa lain fallback ke Indonesia
//     (pola konsisten dengan TeamSection).
// ============================================================

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeftRight,
  ArrowRight,
  Award,
  Banknote,
  Bot,
  Briefcase,
  Building2,
  CalendarCheck,
  Calculator,
  ChevronDown,
  Compass,
  Database,
  FileSearch,
  FileText,
  Globe2,
  HeartHandshake,
  Info,
  Landmark,
  LayoutGrid,
  MapPin,
  Menu,
  MessageSquareQuote,
  Newspaper,
  PhoneCall,
  Plane,
  Quote,
  Receipt,
  Route,
  ShieldCheck,
  Sparkles,
  Stamp,
  Star,
  Users,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/language-provider";
import { LanguageSwitcher } from "@/components/landing/language-switcher";

const WA_LINK =
  "https://wa.me/6281269999910?text=Halo%20PusatPerizinan%2C%20saya%20ingin%20konsultasi%20gratis";

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
  desc?: string;
}
interface NavColumn {
  title: string;
  items: NavItem[];
}
interface NavGroup {
  id: string;
  label: string;
  mega?: boolean;
  columns?: NavColumn[];
  items?: NavItem[];
}

/** Easing standar motion system Task 6 */
const EASE = [0.22, 1, 0.36, 1] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const { t, lang } = useLanguage();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  /** true jika menu terbuka lewat hover (desktop) — klik pertama tidak menutupnya */
  const openedByHover = useRef(false);

  const L = useCallback((id: string, en: string) => (lang === "en" ? en : id), [lang]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tutup dropdown saat navigasi hash/anchor (klik item)
  useEffect(() => {
    const close = () => setOpenGroup(null);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  // Klik di luar nav menutup dropdown (penting untuk perangkat sentuh
  // yang tidak punya mouseleave)
  useEffect(() => {
    if (!openGroup) return;
    const onDocClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenGroup(null);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [openGroup]);

  const clearTimers = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (openTimer.current) clearTimeout(openTimer.current);
  };

  const onEnter = (id: string) => {
    clearTimers();
    openTimer.current = setTimeout(() => {
      openedByHover.current = true;
      setOpenGroup(id);
    }, 40);
  };
  const onLeave = () => {
    clearTimers();
    closeTimer.current = setTimeout(() => setOpenGroup(null), 140);
  };
  /**
   * Klik trigger: idempotent saat dibuka via hover (tidak toggle-close),
   * toggle penuh untuk perangkat sentuh (klik ke-2 menutup).
   */
  const onTriggerClick = (id: string) => {
    setOpenGroup((prev) => {
      if (prev === id && !openedByHover.current) return null;
      openedByHover.current = false;
      return id;
    });
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpenGroup(null);
  };
  // Keyboard/focus: tutup jika fokus keluar dari area nav
  const onBlurArea = (e: React.FocusEvent) => {
    if (navRef.current && !navRef.current.contains(e.relatedTarget as Node)) {
      setOpenGroup(null);
    }
  };

  // ============================================================
  // DATA MENU — 5 kelompok (35 halaman terpetakan)
  // ============================================================
  const GROUPS: NavGroup[] = [
    {
      id: "layanan",
      label: t("navServices"),
      mega: true,
      columns: [
        {
          title: L("Perizinan & Legalitas", "Permits & Legal"),
          items: [
            { icon: LayoutGrid, label: L("Semua Layanan", "All Services"), href: "/layanan", desc: L("1.000+ halaman layanan hulu-hilir", "1,000+ end-to-end service pages") },
            { icon: FileText, label: L("Katalog Layanan", "Service Catalog"), href: "/katalog", desc: L("500+ paket terstruktur", "500+ structured packages") },
            { icon: Compass, label: L("Layanan per Industri", "Services by Industry"), href: "/industri", desc: L("Regulasi khusus sektor usaha", "Sector-specific regulations") },
            { icon: Stamp, label: L("Pendaftaran Merek", "Trademark Registration"), href: "/layanan/merek", desc: "DJKI Kemenkumham" },
            { icon: Award, label: L("Sertifikasi & ISO", "Certifications & ISO"), href: "/layanan/kategori/sertifikasi", desc: L("43+ sertifikasi, halal & SMK3", "43+ certifications, halal & SMK3") },
          ],
        },
        {
          title: L("Bisnis & Korporasi", "Business & Corporate"),
          items: [
            { icon: Building2, label: L("Pendirian PT, CV & PT Perorangan", "PT, CV & Sole PT Setup"), href: "/layanan/pt", desc: L("Badan usaha legal & siap operasi", "Legal entities ready to operate") },
            { icon: Globe2, label: L("PMA — Investor Asing", "PMA — Foreign Investors"), href: "/pma-company-registration", desc: L("English-speaking consultants", "English-speaking consultants") },
            { icon: Landmark, label: L("Solusi Korporat B2B", "Corporate Solutions B2B"), href: "/solusi-korporat", desc: L("Kepatuhan portofolio perusahaan", "Corporate compliance portfolio") },
            { icon: MapPin, label: L("Virtual Office", "Virtual Office"), href: "/virtual-office", desc: L("Alamat bergengsi SCBD Jakarta", "Premium SCBD Jakarta address") },
            { icon: Users, label: L("BUMDes & Desa", "BUMDes & Village Entities"), href: "/bumdes", desc: L("Legalitas unit usaha desa", "Village business entity legalities") },
          ],
        },
        {
          title: L("Spesialisasi", "Specializations"),
          items: [
            { icon: Receipt, label: L("Jasa Pajak", "Tax Services"), href: "/layanan/kategori/pajak", desc: "NPWP, SPT, PKP, Coretax" },
            { icon: Plane, label: L("Kerja Luar Negeri (PMI)", "Work Abroad (Migrant)"), href: "/layanan/kategori/kerja-luar-negeri", desc: L("Penempatan legal ke 17 negara", "Legal placement to 17 countries") },
            { icon: ShieldCheck, label: "PPTKIS / P3MI", href: "/layanan/pptkis", desc: L("Izin perusahaan penempatan PMI", "Migrant placement company permits") },
            { icon: Award, label: L("Izin Umroh & Haji", "Umrah & Hajj Licenses"), href: "/layanan/ppi-umroh", desc: "PPIU & PPIH Kemenag" },
            { icon: Briefcase, label: "RPTKA & KITAS Expatriat", href: "/layanan/rptka-kitas", desc: L("Tenaga kerja asing legal penuh", "Fully legal foreign hires") },
          ],
        },
      ],
    },
    {
      id: "paket",
      label: L("Paket & Biaya", "Packages & Pricing"),
      items: [
        { icon: Star, label: L("Paket & Harga", "Packages & Pricing"), href: "/paket", desc: L("Transparan, tanpa biaya tersembunyi", "Transparent, no hidden fees") },
        { icon: ArrowLeftRight, label: L("Bandingkan Paket", "Compare Packages"), href: "/bandingkan", desc: L("Temukan paket paling efisien", "Find the most efficient plan") },
        { icon: Briefcase, label: L("Paket Usaha Siap Jalan", "Ready-to-Run Business Packs"), href: "/paket-usaha", desc: L("Pendirian + izin dalam satu paket", "Incorporation + permits in one pack") },
        { icon: Banknote, label: L("Rincian Biaya", "Cost Breakdown"), href: "/biaya", desc: L("Estimasi biaya per layanan", "Cost estimates per service") },
      ],
    },
    {
      id: "informasi",
      label: L("Informasi", "Resources"),
      items: [
        { icon: Newspaper, label: L("Blog & Artikel", "Blog & Articles"), href: "/blog", desc: L("Kabar regulasi terbaru", "Latest regulatory updates") },
        { icon: FileText, label: L("Panduan Perizinan", "Permit Guides"), href: "/panduan", desc: L("Panduan praktik per jenis izin", "Practical guides per permit type") },
        { icon: Database, label: L("Kode KBLI", "KBLI Code Database"), href: "/kbli", desc: L("Cari kode lapangan usaha", "Find your business field code") },
        { icon: Compass, label: L("Syarat & Prosedur", "Requirements & Procedures"), href: "/syarat", desc: L("Dokumen yang perlu disiapkan", "Documents you need to prepare") },
        { icon: CalendarCheck, label: L("Kalender Kepatuhan", "Compliance Calendar"), href: "/kalender-kepatuhan", desc: L("Jatuh tempo lapor & pajak", "Filing & tax deadlines") },
        { icon: ShieldCheck, label: L("Kanal Resmi Pemerintah", "Official Government Channels"), href: "/kanal-resmi", desc: L("Portal & cek status otentik", "Authentic portals & status checks") },
        { icon: MessageSquareQuote, label: "FAQ", href: "/faq", desc: L("Pertanyaan yang sering diajukan", "Frequently asked questions") },
      ],
    },
    {
      id: "alat",
      label: L("Alat", "Tools"),
      items: [
        { icon: Bot, label: L("Cek Izin AI", "AI License Check"), href: "/cek-izin", desc: L("Analisis kebutuhan izin 60 detik", "60-second permit needs analysis") },
        { icon: Calculator, label: L("Kalkulator Biaya", "Cost Calculator"), href: "/kalkulator", desc: L("Hitung estimasi anggaran izin", "Estimate your permit budget") },
        { icon: Receipt, label: L("Kalkulator Pajak", "Tax Calculator"), href: "/kalkulator-pajak", desc: "PPh 21, PPN & PPh final" },
        { icon: FileSearch, label: L("Cek Dokumen", "Document Check"), href: "/cek-dokumen", desc: L("Validasi kelengkapan berkas", "Validate document completeness") },
        { icon: Route, label: "AI Roadmap Digitalisasi", href: "/roadmap", desc: L("Peta jalan digital usaha Anda", "Your business digital roadmap") },
      ],
    },
    {
      id: "perusahaan",
      label: L("Perusahaan", "Company"),
      items: [
        { icon: Info, label: L("Tentang Kami", "About Us"), href: "/tentang-kami", desc: L("Profil, legalitas & kantor kami", "Profile, licenses & our offices") },
        { icon: MapPin, label: L("Kontak", "Contact"), href: "/kontak", desc: L("WhatsApp, telepon, email & SCBD", "WhatsApp, phone, email & SCBD") },
        { icon: Quote, label: L("Testimoni Klien", "Client Testimonials"), href: "/testimoni", desc: L("Cerita 2.500+ klien", "Stories from 2,500+ clients") },
        { icon: HeartHandshake, label: L("Jadi Mitra", "Become a Partner"), href: "/mitra", desc: L("Buka cabang resmi di kota Anda — pusat yang mengurus", "Open an official branch — HQ runs everything") },
        { icon: Briefcase, label: L("Karier", "Careers"), href: "/lowongan-kerja", desc: L("Gabung tim ahli kami", "Join our expert team") },
      ],
    },
  ];

  const megaRail = (
    <div className="flex h-full flex-col justify-between gap-4 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-5">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
          {L("Butuh arahan?", "Not sure where to start?")}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-foreground/80">
          {L(
            "Konsultasi gratis 15 menit — tim kami pilihkan jalur izin paling efisien untuk bisnis Anda.",
            "Free 15-minute consultation — our team picks the most efficient licensing route for your business."
          )}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Button asChild size="sm" className="w-full rounded-full font-semibold shadow-md shadow-primary/25">
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
            <PhoneCall className="h-4 w-4" />
            {t("ctaFree")}
          </a>
        </Button>
        <a
          href="/cek-izin"
          className="group/link inline-flex items-center justify-center gap-1 text-[13px] font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          {L("Coba Cek Izin AI", "Try AI License Check")}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/90 backdrop-blur-md border-b shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          {/* Logo */}
          <a href="/#beranda" className="flex items-center gap-2.5 shrink-0" aria-label="PusatPerizinan.com - Beranda">
            <img src="/logo-icon.png" alt="Logo PusatPerizinan.com" className="h-9 w-9" />
            <div className="leading-tight">
              <span className="font-bold text-[15px] md:text-base tracking-tight text-foreground">
                Pusat<span className="text-primary">Perizinan</span>
                <span className="text-gold">.com</span>
              </span>
              <p className="text-[10px] text-muted-foreground font-medium hidden sm:block">
                {t("headerTagline")}
              </p>
            </div>
          </a>

          {/* Desktop Nav — 5 kelompok */}
          <nav
            className="hidden xl:flex items-center gap-0.5 h-full"
            aria-label="Navigasi utama"
            ref={navRef}
            onKeyDown={onKeyDown}
            onBlur={onBlurArea}
          >
            {GROUPS.map((group) => {
              const isOpen = openGroup === group.id;
              return (
                <div
                  key={group.id}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => onEnter(group.id)}
                  onMouseLeave={onLeave}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    aria-controls={`menu-${group.id}`}
                    onClick={() => onTriggerClick(group.id)}
                    className={cn(
                      "px-2.5 py-2 text-[13px] font-medium rounded-md transition-colors whitespace-nowrap inline-flex items-center gap-1",
                      isOpen ? "text-primary bg-accent" : "text-foreground/75 hover:text-primary hover:bg-accent"
                    )}
                  >
                    {group.label}
                    <ChevronDown
                      className={cn("h-3.5 w-3.5 transition-transform duration-200", isOpen && "rotate-180")}
                      aria-hidden="true"
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <div
                        id={`menu-${group.id}`}
                        className="absolute left-0 top-full pt-2 z-50"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.99 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -4, scale: 0.99 }}
                          transition={{ duration: 0.18, ease: EASE }}
                          className={cn(
                            "rounded-2xl border border-border/70 bg-background/95 backdrop-blur-xl shadow-2xl shadow-black/5 p-5",
                            group.mega
                              ? "w-[min(860px,calc(100vw-2rem))]"
                              : "w-[330px]"
                          )}
                        >
                          {group.mega && group.columns ? (
                            /* ===== MEGA MENU: 3 kolom + rail konsultasi ===== */
                            <div className="grid grid-cols-[1fr_1fr_1fr_224px] gap-6">
                              {group.columns.map((col) => (
                                <div key={col.title}>
                                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground px-2 pb-2">
                                    {col.title}
                                  </p>
                                  <ul className="space-y-0.5">
                                    {col.items.map((item) => (
                                      <li key={item.href + item.label}>
                                        <a
                                          href={item.href}
                                          onClick={() => setOpenGroup(null)}
                                          className="group/item flex items-start gap-2.5 rounded-lg px-2 py-2 hover:bg-accent transition-colors"
                                        >
                                          <item.icon
                                            className="mt-0.5 h-4 w-4 shrink-0 text-primary/70 group-hover/item:text-primary transition-colors"
                                            aria-hidden="true"
                                          />
                                          <span className="min-w-0">
                                            <span className="block text-[13px] font-semibold leading-snug">
                                              {item.label}
                                            </span>
                                            {item.desc && (
                                              <span className="mt-0.5 block text-[11.5px] leading-snug text-muted-foreground">
                                                {item.desc}
                                              </span>
                                            )}
                                          </span>
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                              <div>{megaRail}</div>
                            </div>
                          ) : (
                            /* ===== DROPDOWN BIASA ===== */
                            <ul className="space-y-0.5">
                              {group.items?.map((item) => (
                                <li key={item.href + item.label}>
                                  <a
                                    href={item.href}
                                    onClick={() => setOpenGroup(null)}
                                    className="group/item flex items-start gap-3 rounded-lg px-2.5 py-2 hover:bg-accent transition-colors"
                                  >
                                    <item.icon
                                      className="mt-0.5 h-4 w-4 shrink-0 text-primary/70 group-hover/item:text-primary transition-colors"
                                      aria-hidden="true"
                                    />
                                    <span className="min-w-0">
                                      <span className="block text-[13px] font-semibold leading-snug">
                                        {item.label}
                                      </span>
                                      {item.desc && (
                                        <span className="mt-0.5 block text-[11.5px] leading-snug text-muted-foreground">
                                          {item.desc}
                                        </span>
                                      )}
                                    </span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-2.5">
            <LanguageSwitcher />
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden 2xl:flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <PhoneCall className="h-4 w-4" />
              0812-6999-9910
            </a>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="rounded-full px-4 font-semibold border-primary/40 text-primary hover:bg-primary/10"
            >
              <a href="/checkout">
                <Wallet className="h-4 w-4" />
                {L("Pesan & Bayar", "Order & Pay")}
              </a>
            </Button>
            <Button asChild size="sm" className="rounded-full px-5 font-semibold shadow-md shadow-primary/25">
              <a href="/konsultasi">
                <Sparkles className="h-4 w-4" />
                {t("ctaFree")}
              </a>
            </Button>
          </div>

          {/* Mobile toggle — xl:hidden (menutup celah 1024–1280) */}
          <button
            className="xl:hidden p-2 rounded-md hover:bg-accent transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? L("Tutup menu", "Close menu") : L("Buka menu", "Open menu")}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu — accordion terkelompokan */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="xl:hidden border-t bg-background/95 backdrop-blur-md max-h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin"
          >
            <nav className="px-4 py-4 flex flex-col gap-1" aria-label="Navigasi mobile">
              <div className="flex items-center justify-between gap-3 pb-3 mb-2 border-b">
                <LanguageSwitcher />
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm font-medium text-primary"
                >
                  <PhoneCall className="h-4 w-4" />
                  0812-6999-9910
                </a>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {GROUPS.map((group) => (
                  <AccordionItem key={group.id} value={group.id} className="border-b border-border/60">
                    <AccordionTrigger className="px-3 py-3 text-sm font-semibold hover:no-underline [&>svg:last-child]:text-muted-foreground">
                      {group.label}
                    </AccordionTrigger>
                    <AccordionContent className="pb-2">
                      <ul className="flex flex-col gap-0.5">
                        {(group.columns
                          ? group.columns.flatMap((c) => c.items)
                          : group.items ?? []
                        ).map((item) => (
                          <li key={item.href + item.label}>
                            <a
                              href={item.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-start gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
                            >
                              <item.icon
                                className="mt-0.5 h-4 w-4 shrink-0 text-primary/70"
                                aria-hidden="true"
                              />
                              <span>{item.label}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-4 flex flex-col gap-2.5">
                <Button asChild variant="outline" className="rounded-full font-semibold border-primary/40 text-primary">
                  <a href="/checkout" onClick={() => setMobileOpen(false)}>
                    <Wallet className="h-4 w-4" />
                    {L("Pesan & Bayar Langsung", "Order & Pay Now")}
                  </a>
                </Button>
                <Button asChild className="rounded-full font-semibold">
                  <a href="/konsultasi" onClick={() => setMobileOpen(false)}>
                    <Sparkles className="h-4 w-4" />
                    {t("ctaFree")}
                  </a>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
