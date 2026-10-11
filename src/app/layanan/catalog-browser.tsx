"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export interface CatalogItem {
  slug: string;
  title: string;
  desc: string;
  price: string;
  duration: string;
  popular: boolean;
}

interface Props {
  categories: {
    perizinan: CatalogItem[];
    pajak: CatalogItem[];
    pmi: CatalogItem[];
    sertifikasi: CatalogItem[];
  };
}

type TabKey = "semua" | "perizinan" | "pajak" | "pmi" | "sertifikasi";

export function CatalogBrowser({ categories }: Props) {
  const [tab, setTab] = useState<TabKey>("semua");
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    const list: (CatalogItem & { category: TabKey })[] = [];
    (Object.keys(categories) as TabKey[]).forEach((cat) => {
      categories[cat].forEach((item) => list.push({ ...item, category: cat }));
    });
    const q = query.toLowerCase().trim();
    let filtered = tab === "semua" ? list : list.filter((i) => i.category === tab);
    if (q) {
      filtered = filtered.filter(
        (i) => i.title.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [categories, tab, query]);

  return (
    <div>
      {/* Kontrol */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-6">
        <Tabs value={tab} onValueChange={(v) => setTab(v as TabKey)}>
          <TabsList className="grid w-full sm:w-auto grid-cols-5 h-auto p-1">
            <TabsTrigger value="semua" className="text-xs sm:text-sm">Semua</TabsTrigger>
            <TabsTrigger value="perizinan" className="text-xs sm:text-sm">Perizinan</TabsTrigger>
            <TabsTrigger value="pajak" className="text-xs sm:text-sm">Pajak</TabsTrigger>
            <TabsTrigger value="pmi" className="text-xs sm:text-sm">Kerja LN</TabsTrigger>
            <TabsTrigger value="sertifikasi" className="text-xs sm:text-sm">Sertifikasi & ISO</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari layanan… (mis. NIB, SPT, Jepang)"
            className="pl-9"
            aria-label="Cari layanan"
          />
        </div>
      </div>

      {/* Hasil */}
      <p className="text-sm text-muted-foreground mb-4" role="status">
        Menampilkan <strong className="text-foreground">{items.length}</strong> layanan
        {query && <> untuk “{query}”</>}
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/layanan/${item.slug}`}
            className={cn(
              "group flex flex-col rounded-xl border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-md",
              item.popular && "border-primary/40 bg-primary/[0.03]"
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <Badge
                variant="secondary"
                className={cn(
                  "text-[10px] uppercase tracking-wide shrink-0",
                  item.category === "perizinan" && "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
                  item.category === "pajak" && "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
                  item.category === "pmi" && "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300"
                )}
              >
                {item.category === "pmi" ? "Kerja LN" : item.category}
              </Badge>
              {item.popular && (
                <Badge className="bg-gold/15 text-gold border border-gold/30 text-[10px] gap-0.5 shrink-0">
                  <Sparkles className="h-2.5 w-2.5" aria-hidden /> Populer
                </Badge>
              )}
            </div>
            <h3 className="mt-2.5 font-semibold leading-snug group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2 flex-1">{item.desc}</p>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="font-semibold text-primary">Mulai {item.price}</span>
              <span className="flex items-center gap-1 text-muted-foreground group-hover:text-primary transition-colors">
                Detail <ArrowRight className="h-3 w-3" aria-hidden />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {items.length === 0 && (
        <div className="rounded-xl border border-dashed p-10 text-center">
          <p className="text-sm text-muted-foreground">
            Tidak ada layanan yang cocok dengan pencarian “{query}”.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => {
              setQuery("");
              setTab("semua");
            }}
          >
            Reset pencarian
          </Button>
        </div>
      )}
    </div>
  );
}
