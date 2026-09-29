"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Building2,
  CalendarDays,
  MapPin,
  Search,
  SearchX,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  EMPLOYMENT_TYPE_LABEL,
  JOB_CATEGORY_LABEL,
  formatJobDate,
  formatSalaryRange,
  type Job,
} from "@/lib/jobs";

type TabKey = "semua" | "pmi" | "kantor" | "lapangan";

function matchTab(job: Job, tab: TabKey): boolean {
  switch (tab) {
    case "pmi":
      // Semua penempatan luar negeri (PMI), termasuk jalur lapangan/proyek di luar negeri
      return job.location.country !== "Indonesia";
    case "kantor":
      return job.category === "kantor";
    case "lapangan":
      return job.category === "lapangan";
    default:
      return true;
  }
}

export function JobBrowser({ jobs }: { jobs: Job[] }) {
  const [tab, setTab] = useState<TabKey>("semua");
  const [query, setQuery] = useState("");

  const visibility = useMemo(() => {
    const q = query.toLowerCase().trim();
    const map: Record<string, boolean> = {};
    let visibleCount = 0;
    for (const job of jobs) {
      const okTab = matchTab(job, tab);
      const okQuery =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.location.city.toLowerCase().includes(q);
      const ok = okTab && okQuery;
      map[job.slug] = ok;
      if (ok) visibleCount += 1;
    }
    return { map, visibleCount };
  }, [jobs, tab, query]);

  return (
    <div>
      {/* Kontrol filter + pencarian */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-6">
        <Tabs value={tab} onValueChange={(v) => setTab(v as TabKey)}>
          <TabsList className="grid w-full sm:w-auto grid-cols-4 h-auto p-1">
            <TabsTrigger value="semua" className="text-xs sm:text-sm px-2 sm:px-3">
              Semua
            </TabsTrigger>
            <TabsTrigger value="pmi" className="text-xs sm:text-sm px-2 sm:px-3">
              Luar Negeri (PMI)
            </TabsTrigger>
            <TabsTrigger value="kantor" className="text-xs sm:text-sm px-2 sm:px-3">
              Kantor Pusat
            </TabsTrigger>
            <TabsTrigger value="lapangan" className="text-xs sm:text-sm px-2 sm:px-3">
              Lapangan &amp; Proyek
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari posisi atau kota… (mis. Tokyo, pajak)"
            className="pl-9"
            aria-label="Cari lowongan"
          />
        </div>
      </div>

      {/* Status hasil */}
      <p className="text-sm text-muted-foreground mb-4" role="status">
        Menampilkan <strong className="text-foreground">{visibility.visibleCount}</strong> dari{" "}
        <strong className="text-foreground">{jobs.length}</strong> lowongan
        {query && <> untuk &ldquo;{query}&rdquo;</>}
      </p>

      {/* Grid kartu — SEMUA lowongan tetap di DOM (SEO), filter hanya menyembunyikan */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => {
          const visible = visibility.map[job.slug];
          return (
            <article
              key={job.slug}
              className={cn(
                "group flex flex-col rounded-2xl border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md",
                job.featured && "border-gold/40 bg-gold/[0.03]",
                !visible && "hidden"
              )}
              aria-hidden={!visible}
            >
              <div className="flex items-start justify-between gap-2">
                <Badge
                  variant="secondary"
                  className={cn(
                    "text-[10px] uppercase tracking-wide shrink-0",
                    job.category === "pmi" &&
                      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
                    job.category === "kantor" &&
                      "bg-stone-100 text-stone-800 dark:bg-stone-900/40 dark:text-stone-300",
                    job.category === "lapangan" &&
                      "bg-amber-50 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                  )}
                >
                  {JOB_CATEGORY_LABEL[job.category]}
                </Badge>
                {job.featured && (
                  <Badge className="bg-amber-100 text-amber-800 border border-amber-300 text-[10px] gap-0.5 shrink-0 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-800">
                    <Sparkles className="h-2.5 w-2.5" aria-hidden /> Unggulan
                  </Badge>
                )}
              </div>

              <h3 className="mt-3 text-[15px] font-bold leading-snug group-hover:text-primary transition-colors">
                <Link href={`/lowongan/${job.slug}`} className="outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
                  {job.title}
                </Link>
              </h3>

              <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                <Building2 className="h-3.5 w-3.5 shrink-0" aria-hidden />
                <span className="truncate">{job.company}</span>
                {job.category !== "kantor" && (
                  <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-primary" aria-label="Employer terverifikasi" />
                )}
              </p>

              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                {job.location.city}, {job.location.country}
              </p>

              <p className="mt-3 flex items-center gap-1.5 font-semibold text-primary text-sm">
                <Banknote className="h-4 w-4 shrink-0" aria-hidden />
                {formatSalaryRange(job.salary)}
                <span className="font-normal text-muted-foreground text-xs">/bln</span>
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
                <Badge variant="outline" className="font-medium">
                  {EMPLOYMENT_TYPE_LABEL[job.employmentType]}
                </Badge>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                  {formatJobDate(job.datePosted)}
                </span>
              </div>

              <Button asChild className="mt-4 w-full">
                <Link href={`/lowongan/${job.slug}`}>
                  Detail &amp; Lamar
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </article>
          );
        })}
      </div>

      {/* Empty state */}
      {visibility.visibleCount === 0 && (
        <div className="rounded-2xl border border-dashed p-10 text-center">
          <SearchX className="mx-auto h-10 w-10 text-muted-foreground/50" aria-hidden />
          <p className="mt-3 text-sm font-semibold">Lowongan tidak ditemukan</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Coba kata kunci lain atau reset filter untuk melihat semua lowongan aktif.
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
            Reset filter
          </Button>
        </div>
      )}
    </div>
  );
}
