"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, PhoneCall, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/language-provider";
import { LanguageSwitcher } from "@/components/landing/language-switcher";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NAV_ITEMS = [
    { label: t("navServices"), href: "#layanan" },
    { label: t("navCheckAI"), href: "#cek-izin" },
    { label: t("navCalculator"), href: "#kalkulator" },
    { label: t("navGuides"), href: "#panduan" },
    { label: t("navBlog"), href: "#blog" },
    { label: t("navCoverage"), href: "#jangkauan" },
    { label: t("navPricing"), href: "#harga" },
    { label: t("navFaq"), href: "#faq" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          {/* Logo */}
          <a href="#beranda" className="flex items-center gap-2.5 shrink-0" aria-label="PusatPerizinan.com - Beranda">
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

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1" aria-label="Navigasi utama">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-2 py-2 text-[13px] xl:text-sm font-medium text-foreground/75 hover:text-primary rounded-md hover:bg-accent transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-2.5">
            <LanguageSwitcher />
            <a
              href="https://wa.me/6281269999910?text=Halo%20PusatPerizinan%2C%20saya%20ingin%20konsultasi%20gratis"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <PhoneCall className="h-4 w-4" />
              0812-6999-9910
            </a>
            <Button asChild size="sm" className="rounded-full px-5 font-semibold shadow-md shadow-primary/25">
              <a href="#konsultasi">
                <Sparkles className="h-4 w-4" />
                {t("ctaFree")}
              </a>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-accent transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden border-t bg-background/95 backdrop-blur-md max-h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin"
        >
          <nav className="px-4 py-4 flex flex-col gap-1" aria-label="Navigasi mobile">
            <div className="flex items-center justify-between gap-3 pb-3 mb-2 border-b">
              <LanguageSwitcher />
              <a
                href="https://wa.me/6281269999910?text=Halo%20PusatPerizinan%2C%20saya%20ingin%20konsultasi%20gratis"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium text-primary"
              >
                <PhoneCall className="h-4 w-4" />
                0812-6999-9910
              </a>
            </div>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm font-medium rounded-md hover:bg-accent transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Button asChild className="mt-3 rounded-full font-semibold">
              <a href="#konsultasi" onClick={() => setOpen(false)}>
                <Sparkles className="h-4 w-4" />
                {t("ctaFree")}
              </a>
            </Button>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
