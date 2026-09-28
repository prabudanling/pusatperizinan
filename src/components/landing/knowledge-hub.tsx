"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Building2,
  MapPinned,
  Hash,
  Landmark,
  Clock,
  Wallet,
  FileText,
  ChevronRight,
  Lightbulb,
  Scale,
  Layers,
  BadgeCheck,
  Languages,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import {
  PERMIT_GUIDES,
  SECTOR_GUIDES,
  REGION_GUIDES,
  KBLI_POPULAR,
} from "@/lib/seo-content";
import { BLOG_ARTICLES } from "@/lib/blog-content";
import { useLanguage } from "@/lib/i18n/language-provider";

function riskBadgeClass(risk: string): string {
  const r = risk.toLowerCase();
  if (r === "rendah") return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300";
  if (r.startsWith("menengah rendah")) return "bg-lime-100 text-lime-800 dark:bg-lime-900/40 dark:text-lime-300";
  if (r === "menengah") return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300";
  if (r.startsWith("menengah tinggi")) return "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300";
  if (r === "tinggi") return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300";
  return "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300";
}

/** Artikel blog yang terkait dengan panduan izin tertentu (internal-link architecture) */
function relatedBlogForGuide(guideId: string) {
  return BLOG_ARTICLES.filter((a) => a.relatedGuides.includes(guideId));
}

export function KnowledgeHub() {
  const { t } = useLanguage();
  const [tab, setTab] = useState("izin");
  const [openGuide, setOpenGuide] = useState("");

  // Internal-link architecture: buka panduan tertentu dari blog / peta situs
  useEffect(() => {
    const onOpenGuide = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (!id) return;
      setTab("izin");
      setOpenGuide(id);
      setTimeout(() => {
        document
          .getElementById(`panduan-${id}`)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    };
    window.addEventListener("open-guide", onOpenGuide);
    return () => window.removeEventListener("open-guide", onOpenGuide);
  }, []);

  return (
    <section id="panduan" className="py-20 md:py-28 scroll-mt-20" aria-label="Panduan lengkap perizinan">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="outline" className="rounded-full border-primary/30 bg-primary/5 text-primary font-semibold px-4 py-1">
            <BookOpen className="h-3.5 w-3.5 mr-1.5" />
            Knowledge Base Terlengkap
          </Badge>
          <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight">
            {t("hubT1")}{" "}
            <span className="text-gradient-brand">{t("hubTHigh")}</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            {t("hubSub")}
          </p>
          <p className="mt-2.5 flex items-center justify-center gap-1.5 text-xs text-muted-foreground/85">
            <Languages className="h-3.5 w-3.5 text-primary" aria-hidden /> {t("contentNote")}
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab} className="mt-12">
          <TabsList className="mx-auto grid w-full max-w-2xl grid-cols-4 h-auto p-1 rounded-2xl bg-secondary/70">
            <TabsTrigger value="izin" className="rounded-xl py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm font-semibold flex-col sm:flex-row gap-1">
              <FileText className="h-4 w-4" /> {t("tabPerIzin")}
            </TabsTrigger>
            <TabsTrigger value="sektor" className="rounded-xl py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm font-semibold flex-col sm:flex-row gap-1">
              <Layers className="h-4 w-4" /> {t("tabPerSektor")}
            </TabsTrigger>
            <TabsTrigger value="wilayah" className="rounded-xl py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm font-semibold flex-col sm:flex-row gap-1">
              <MapPinned className="h-4 w-4" /> {t("tabPerWilayah")}
            </TabsTrigger>
            <TabsTrigger value="kbli" className="rounded-xl py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm font-semibold flex-col sm:flex-row gap-1">
              <Hash className="h-4 w-4" /> {t("tabKbli")}
            </TabsTrigger>
          </TabsList>

          {/* ===== TAB 1: PER IZIN ===== */}
          <TabsContent value="izin" className="mt-8">
            <p className="text-center text-sm text-muted-foreground mb-6">
              {PERMIT_GUIDES.length} panduan mendalam — klik untuk membuka detail lengkap setiap izin
            </p>
            <Accordion
              type="single"
              collapsible
              value={openGuide}
              onValueChange={setOpenGuide}
              className="space-y-3"
            >
              {PERMIT_GUIDES.map((guide) => (
                <AccordionItem
                  key={guide.id}
                  value={guide.id}
                  id={`panduan-${guide.id}`}
                  className="border border-border/70 rounded-2xl bg-card px-5 data-[state=open]:border-primary/30 data-[state=open]:shadow-lg last:border-b scroll-mt-24"
                >
                  <AccordionTrigger className="py-4 hover:no-underline hover:text-primary">
                    <div className="flex items-center gap-3.5 text-left">
                      <div className="h-10 w-10 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <Landmark className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[15px] sm:text-base leading-tight">{guide.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1 font-normal normal-case">
                          {guide.authority} • {guide.timeline}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <div className="grid lg:grid-cols-2 gap-6 pt-1">
                      {/* Kiri: penjelasan */}
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge className="rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold">
                            <Wallet className="h-3 w-3 mr-1" />
                            {guide.cost}
                          </Badge>
                          <Badge className="rounded-full bg-gold/10 text-gold-foreground border border-gold/25 font-semibold">
                            <Clock className="h-3 w-3 mr-1" />
                            {guide.timeline}
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground/85 leading-relaxed">{guide.short}</p>
                        <details className="group">
                          <summary className="text-sm font-semibold text-primary cursor-pointer select-none hover:underline">
                            Baca penjelasan lengkap ↓
                          </summary>
                          <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">{guide.long}</p>
                        </details>
                        <div className="rounded-xl bg-secondary/60 p-4">
                          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-1.5">
                            Dasar Hukum
                          </p>
                          <p className="text-[13px] text-foreground/80">{guide.legalBasis}</p>
                        </div>
                      </div>

                      {/* Kanan: persyaratan, langkah, tips */}
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">
                            Persyaratan
                          </p>
                          <ul className="space-y-1.5">
                            {guide.requirements.map((r, i) => (
                              <li key={i} className="flex items-start gap-2 text-[13px] text-foreground/85">
                                <BadgeCheck className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">
                            Alur Proses di Kami
                          </p>
                          <ol className="space-y-1.5">
                            {guide.steps.map((s, i) => (
                              <li key={i} className="flex items-start gap-2 text-[13px] text-foreground/85">
                                <span className="mt-0.5 h-4.5 w-4.5 shrink-0 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">
                                  {i + 1}
                                </span>
                                {s}
                              </li>
                            ))}
                          </ol>
                        </div>
                        <div className="rounded-xl border border-gold/30 bg-gold/5 p-4">
                          <p className="flex items-center gap-1.5 text-xs font-bold text-gold-foreground mb-1.5">
                            <Lightbulb className="h-3.5 w-3.5" /> Tips Ahli
                          </p>
                          <ul className="space-y-1">
                            {guide.tips.map((t, i) => (
                              <li key={i} className="text-[12px] text-foreground/80">• {t}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <a
                            href="#konsultasi"
                            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-md shadow-primary/25 hover:shadow-primary/40 transition-shadow"
                          >
                            Urus {guide.name.split(" ")[0]} sekarang
                            <ChevronRight className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* FAQ mini per izin */}
                    <div className="mt-5 pt-4 border-t">
                      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">
                        Sering Ditanya
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        {guide.faq.map((f, i) => (
                          <div key={i} className="rounded-xl bg-secondary/50 p-3.5">
                            <p className="text-[13px] font-bold">{f.q}</p>
                            <p className="text-[12px] text-muted-foreground mt-1 leading-relaxed">{f.a}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Cross-link: artikel blog terkait (internal link architecture) */}
                    {relatedBlogForGuide(guide.id).length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">
                          Baca Juga di Blog Kami
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {relatedBlogForGuide(guide.id).map((a) => (
                            <a
                              key={a.slug}
                              href="#blog"
                              onClick={() =>
                                window.dispatchEvent(
                                  new CustomEvent("open-blog-article", { detail: a.slug })
                                )
                              }
                              className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/5 px-3.5 py-1.5 text-[12px] font-semibold text-primary hover:bg-primary/10 transition-colors"
                            >
                              <BookOpen className="h-3.5 w-3.5" />
                              {a.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          {/* ===== TAB 2: PER SEKTOR ===== */}
          <TabsContent value="sektor" className="mt-8">
            <p className="text-center text-sm text-muted-foreground mb-6">
              Izin apa saja yang dibutuhkan bidang usaha Anda? Pilih sektornya:
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SECTOR_GUIDES.map((sector, i) => (
                <motion.div
                  key={sector.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 4) * 0.06 }}
                >
                  <Card className="h-full border-border/70 hover:border-primary/30 hover:shadow-lg transition-all">
                    <CardContent className="p-5">
                      <h3 className="font-bold text-[15px]">{sector.name}</h3>
                      <p className="mt-2 text-[12.5px] text-muted-foreground leading-relaxed">{sector.desc}</p>
                      <div className="mt-3.5">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-primary mb-1.5">
                          Izin yang dibutuhkan
                        </p>
                        <ul className="space-y-1">
                          {sector.permits.map((p, j) => (
                            <li key={j} className="flex items-start gap-1.5 text-[12px] text-foreground/85">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-3 rounded-lg bg-secondary/60 px-3 py-2">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                          Petunjuk KBLI
                        </p>
                        <p className="text-[11.5px] text-foreground/80 mt-0.5">{sector.kbliHint}</p>
                      </div>
                      <p className="mt-2.5 text-[11px] italic text-muted-foreground">{sector.caseNote}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* ===== TAB 3: PER WILAYAH ===== */}
          <TabsContent value="wilayah" className="mt-8">
            <p className="text-center text-sm text-muted-foreground mb-6">
              Kami menangani perizinan di seluruh 38 provinsi & 514 kabupaten/kota — ini profil per wilayah utama:
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {REGION_GUIDES.map((region, i) => (
                <motion.div
                  key={region.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.06 }}
                >
                  <Card className="h-full border-border/70 hover:border-primary/30 hover:shadow-lg transition-all">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2.5">
                        <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                          <MapPinned className="h-4.5 w-4.5" />
                        </div>
                        <h3 className="font-bold text-[15px]">{region.name}</h3>
                      </div>
                      <p className="mt-3 text-[13px] text-muted-foreground leading-relaxed">{region.note}</p>
                      <div className="mt-3 rounded-lg bg-primary/5 border border-primary/15 px-3 py-2">
                        <p className="text-[12px] text-foreground/85 font-medium">{region.fastFacts}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* ===== TAB 4: KBLI ===== */}
          <TabsContent value="kbli" className="mt-8">
            <p className="text-center text-sm text-muted-foreground mb-6">
              20 KBLI paling populer beserta tingkat risikonya — salah pilih KBLI = salah pajak!
            </p>
            <Card className="overflow-hidden border-border/70">
              <div className="overflow-x-auto scrollbar-thin">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-secondary/70 text-left">
                      <th className="px-4 py-3 font-bold text-xs uppercase tracking-wide">Kode</th>
                      <th className="px-4 py-3 font-bold text-xs uppercase tracking-wide">Nama KBLI</th>
                      <th className="px-4 py-3 font-bold text-xs uppercase tracking-wide">Sektor</th>
                      <th className="px-4 py-3 font-bold text-xs uppercase tracking-wide">Level Risiko</th>
                    </tr>
                  </thead>
                  <tbody>
                    {KBLI_POPULAR.map((kbli, i) => (
                      <tr
                        key={kbli.code}
                        className={`border-t border-border/60 hover:bg-primary/5 transition-colors ${i % 2 ? "bg-card" : "bg-background/40"}`}
                      >
                        <td className="px-4 py-3 font-mono font-bold text-primary">{kbli.code}</td>
                        <td className="px-4 py-3 text-foreground/85">{kbli.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{kbli.sector}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${riskBadgeClass(kbli.risk)}`}>
                            {kbli.risk}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/5 to-gold/5 p-4">
              <p className="text-sm text-foreground/85 flex items-center gap-2">
                <Scale className="h-4.5 w-4.5 text-primary shrink-0" />
                KBLI usaha Anda tidak ada di daftar? Ada 5.700+ kode lain — kami petakan yang paling menguntungkan.
              </p>
              <a
                href="#konsultasi"
                className="shrink-0 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-md shadow-primary/25 hover:shadow-primary/40 transition-shadow"
              >
                Konsultasi KBLI Gratis
              </a>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
