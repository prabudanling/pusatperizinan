"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { EmptyState, SkeletonRows, useAdminData, apiPatch, relativeTime, triggerRefresh } from "@/components/admin/shared";
import { ChevronDown, SearchCheck, FileSearch } from "lucide-react";

// ============================================================
// Tab 6 — AI CHECKER: hasil license checker & document checker
// ============================================================

interface LicenseRow {
  id: string; businessInput: string; sector: string | null; location: string | null;
  scale: string | null; result: string | null; whatsapp: string | null; createdAt: string;
}
interface DocRow {
  id: string; fileName: string; docCategory: string; fileType: string; fileSize: number;
  result: string | null; whatsapp: string | null; status: string; createdAt: string;
}
const DOC_STATUSES = [
  { value: "NEW", label: "Baru" },
  { value: "FOLLOWED_UP", label: "Sudah Follow-up" },
  { value: "CONVERTED", label: "Jadi Klien" },
];

function ResultBox({ raw }: { raw: string | null }) {
  if (!raw) return <p className="text-xs text-stone-500">Tidak ada hasil tersimpan.</p>;
  let pretty = raw;
  try { pretty = JSON.stringify(JSON.parse(raw), null, 2); } catch { /* biarkan apa adanya */ }
  return (
    <pre className="max-h-64 overflow-auto rounded-xl border border-stone-800 bg-stone-950 p-3 text-[11px] leading-relaxed text-stone-300">
      {pretty}
    </pre>
  );
}

export function ChecksTab() {
  const { data: lic, loading: licLoading } = useAdminData<{ rows: LicenseRow[] }>("/api/admin/checks?type=license", { intervalMs: 45_000 });
  const { data: doc, loading: docLoading, reload: docReload } = useAdminData<{ rows: DocRow[] }>("/api/admin/checks?type=document", { intervalMs: 45_000 });

  async function setDocStatus(id: string, status: string) {
    const res = await apiPatch("/api/admin/checks", { id, status });
    if (res.ok) triggerRefresh(); else docReload();
  }

  return (
    <Tabs defaultValue="license" className="space-y-4">
      <TabsList className="border border-stone-800 bg-stone-900/60">
        <TabsTrigger value="license" className="gap-1.5 data-[state=active]:bg-emerald-500/15 data-[state=active]:text-emerald-300">
          <SearchCheck aria-hidden className="h-4 w-4" /> Cek Izin ({lic?.rows.length ?? 0})
        </TabsTrigger>
        <TabsTrigger value="document" className="gap-1.5 data-[state=active]:bg-emerald-500/15 data-[state=active]:text-emerald-300">
          <FileSearch aria-hidden className="h-4 w-4" /> Cek Dokumen ({doc?.rows.length ?? 0})
        </TabsTrigger>
      </TabsList>

      {/* ---------- License checker ---------- */}
      <TabsContent value="license" className="space-y-2">
        {licLoading && !lic ? (
          <SkeletonRows rows={5} />
        ) : (lic?.rows.length ?? 0) === 0 ? (
          <EmptyState title="Belum ada pengecekan izin" sub="Hasil AI license checker pengunjung tampil di sini." />
        ) : (
          lic!.rows.map((r) => (
            <Collapsible key={r.id}>
              <Card className="border-stone-800 bg-stone-900/50 shadow-none">
                <div className="flex flex-wrap items-center gap-3 p-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-stone-100">{r.businessInput}</p>
                    <p className="text-xs text-stone-500">
                      {[r.sector, r.location, r.scale].filter(Boolean).join(" · ") || "—"} · {relativeTime(r.createdAt)}
                    </p>
                  </div>
                  {r.whatsapp && (
                    <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                      WA +{r.whatsapp.slice(-4).padStart(r.whatsapp.length, "•")}
                    </Badge>
                  )}
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" size="sm" className="border-stone-700 bg-stone-950/70 text-xs">
                      Lihat Hasil <ChevronDown aria-hidden className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent>
                  <div className="px-4 pb-4"><ResultBox raw={r.result} /></div>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))
        )}
      </TabsContent>

      {/* ---------- Document checker ---------- */}
      <TabsContent value="document" className="space-y-2">
        {docLoading && !doc ? (
          <SkeletonRows rows={5} />
        ) : (doc?.rows.length ?? 0) === 0 ? (
          <EmptyState title="Belum ada dokumen dianalisis" sub="Setiap upload di /cek-dokumen tercatat di sini." />
        ) : (
          doc!.rows.map((r) => (
            <Collapsible key={r.id}>
              <Card className="border-stone-800 bg-stone-900/50 shadow-none">
                <div className="flex flex-wrap items-center gap-3 p-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-stone-100">{r.fileName}</p>
                    <p className="text-xs text-stone-500">
                      {r.docCategory} · {(r.fileSize / 1024).toFixed(0)} KB · {relativeTime(r.createdAt)}
                    </p>
                  </div>
                  {r.whatsapp && (
                    <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                      WA tercatat
                    </Badge>
                  )}
                  <Select value={r.status} onValueChange={(v) => setDocStatus(r.id, v)}>
                    <SelectTrigger aria-label={`Status dokumen ${r.fileName}`} className="h-8 w-[150px] border-stone-700 bg-stone-950/70 text-xs text-stone-100">
                      {DOC_STATUSES.find((s) => s.value === r.status)?.label ?? r.status}
                    </SelectTrigger>
                    <SelectContent className="border-stone-700 bg-stone-900 text-stone-100">
                      {DOC_STATUSES.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" size="sm" className="border-stone-700 bg-stone-950/70 text-xs">
                      Hasil AI <ChevronDown aria-hidden className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent>
                  <div className="px-4 pb-4"><ResultBox raw={r.result} /></div>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))
        )}
      </TabsContent>
    </Tabs>
  );
}
