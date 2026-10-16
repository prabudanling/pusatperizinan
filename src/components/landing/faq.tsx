"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { FAQS } from "@/lib/landing-data";
import { useLanguage } from "@/lib/i18n/language-provider";
import { faqUiT } from "@/lib/faq-data";

export function Faq() {
  const { t, lang } = useLanguage();
  // Tombol "Lihat semua FAQ" memakai string i18n halaman /faq
  // (FAQ_UI 30 bahasa) mengikuti bahasa aktif.
  const viewAllHref = "/faq";
  const viewAllLabel = faqUiT(lang, "allFaqCta");

  return (
    <section id="faq" className="py-20 md:py-28 scroll-mt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Badge variant="outline" className="rounded-full border-primary/30 bg-primary/5 text-primary font-semibold px-4 py-1">
            FAQ
          </Badge>
          <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight">
            {t("faqT1")} <span className="text-gradient-brand">{t("faqTHigh")}</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            {t("faqSub")}
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-12 space-y-3">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border border-border/70 rounded-xl px-5 bg-card data-[state=open]:border-primary/30 data-[state=open]:shadow-md transition-all last:border-b"
            >
              <AccordionTrigger className="text-left font-semibold text-[15px] py-4 hover:no-underline hover:text-primary">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* CTA ke halaman FAQ pusat (51 Q&A, pencarian, 10 kategori) */}
        <div className="mt-10 text-center">
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
          >
            {viewAllLabel}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
