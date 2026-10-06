"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export interface KbliCard {
  code: string;
  slug: string;
  title: string;
  category: string;
  categoryIcon: string;
  risk: string;
  desc: string;
}

interface Props {
  items: KbliCard[];
  categories: { id: string; name: string; icon: string }[];
}

const RISK_COLORS: Record<string, string> = {
  rendah: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  "menengah-rendah": "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  "menengah-tinggi": "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
  tinggi: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
};

export function KbliBrowser({ items, categories }: Props) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("semua");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    let list = cat === "semua" ? items : items.filter((i) => i.category === cat);
    if (q) {
      list = list.filter(
        (i) => i.code.includes(q) || i.title.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q)
      );
    }
    return list.slice(0, 60);
  }, [items, cat, query]);

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between mb-6">
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari kode atau bidang usaha… (mis. 56101, restoran, kopi)"
            className="pl-9"
            aria-label="Cari KBLI"
          />
        </div>
        <p className="text-sm text-muted-foreground shrink-0" role="status">
          <strong className="text-foreground">{filtered.length}</strong> KBLI ditemukan
          {filtered.length >= 60 && " (batas tampilan)"}
        </p>
      </div>

      <Tabs value={cat} onValueChange={setCat} className="mb-6">
        <TabsList className="flex flex-wrap h-auto gap-1 p-1 w-full">
          <TabsTrigger value="semua" className="text-xs">Semua</TabsTrigger>
          {categories.map((c) => (
            <TabsTrigger key={c.id} value={c.id} className="text-xs">
              <span aria-hidden className="mr-1">{c.icon}</span>
              {c.name.split(" ")[0]}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <Link
            key={item.slug}
            href={`/kbli/${item.slug}`}
            className="group rounded-xl border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-2">
              <Badge variant="outline" className="font-mono font-bold text-xs shrink-0">
                {item.code}
              </Badge>
              <Badge className={cn("text-[10px] uppercase tracking-wide shrink-0", RISK_COLORS[item.risk] ?? "")}>
                {item.risk.replace("-", " ")}
              </Badge>
            </div>
            <h3 className="mt-2.5 font-semibold leading-snug group-hover:text-primary transition-colors">
              <span aria-hidden className="mr-1.5">{item.categoryIcon}</span>
              {item.title}
            </h3>
            <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2 flex-1">{item.desc}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
              Lihat izin & pajak <ArrowRight className="h-3 w-3" aria-hidden />
            </span>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed p-10 text-center">
          <p className="text-sm text-muted-foreground">
            Tidak ada KBLI yang cocok dengan “{query}” di kategori ini.
          </p>
          <p className="mt-2 text-xs text-muted-foreground/70">
            Butuh KBLI di luar database? <Link href="/roadmap" className="text-primary font-semibold hover:underline">Gunakan AI Roadmap Generator</Link> — AI kami menemukan kode terbaik untuk usaha Anda.
          </p>
        </div>
      )}
    </div>
  );
}
