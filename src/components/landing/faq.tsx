"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { FAQS } from "@/lib/landing-data";
import { useLanguage } from "@/lib/i18n/language-provider";

export function Faq() {
  const { t } = useLanguage();
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
      </div>
    </section>
  );
}
