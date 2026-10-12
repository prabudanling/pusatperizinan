"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SkeletonRows, EmptyState, useAdminData, apiPatch, formatRp, relativeTime, LEAD_STATUSES, triggerRefresh } from "@/components/admin/shared";
import { useToast } from "@/hooks/use-toast";
import { GripVertical, MessageCircle } from "lucide-react";
import { waLink } from "@/components/admin/shared";

// ============================================================
// Tab 3 — PIPELINE KANBAN (drag & drop native HTML5)
// Seret kartu antar kolom untuk memindahkan status lead.
// ============================================================

interface LeadRow {
  id: string; name: string; whatsapp: string; businessType: string;
  package: string | null; status: string; estimatedValue: number; createdAt: string;
}
type Column = (typeof LEAD_STATUSES)[number];

export function PipelineTab() {
  const { toast } = useToast();
  const { data, loading, reload } = useAdminData<{ rows: LeadRow[] }>("/api/admin/leads?all=1", { intervalMs: 30_000 });
  const [dragId, setDragId] = useState<string | null>(null);
  const [overCol, setOverCol] = useState<string | null>(null);

  const rows = data?.rows ?? [];
  const byStatus = (s: string) => rows.filter((r) => r.status === s);
  const colTotal = (s: string) => byStatus(s).reduce((a, b) => a + b.estimatedValue, 0);

  async function moveTo(leadId: string, status: string) {
    const lead = rows.find((r) => r.id === leadId);
    if (!lead || lead.status === status) return;
    // optimistik
    lead.status = status;
    const res = await apiPatch("/api/admin/leads", { id: leadId, status });
    if (!res.ok) {
      toast({ title: "Gagal memindahkan lead", description: res.error, variant: "destructive" });
      reload();
    } else {
      const label = LEAD_STATUSES.find((s) => s.value === status)?.label;
      toast({ title: `${lead.name} → ${label}` });
      triggerRefresh();
    }
  }

  if (loading && !data) return <SkeletonRows rows={6} />;

  return (
    <div className="space-y-4">
      <p className="text-sm text-stone-400">
        Seret kartu antar kolom untuk memperbarui status · total nilai per kolom dihitung otomatis
      </p>

      {rows.length === 0 ? (
        <EmptyState title="Pipeline kosong" sub="Belum ada lead. Isi data demo dari sidebar untuk melihat kanban beraksi." />
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-4">
          {LEAD_STATUSES.map((col: Column) => {
            const items = byStatus(col.value);
            const won = col.value === "CLOSED_WON";
            const lost = col.value === "CLOSED_LOST";
            return (
              <section
                key={col.value}
                aria-label={`Kolom ${col.label}`}
                onDragOver={(e) => { e.preventDefault(); setOverCol(col.value); }}
                onDragLeave={() => setOverCol((c) => (c === col.value ? null : c))}
                onDrop={(e) => {
                  e.preventDefault();
                  setOverCol(null);
                  if (dragId) moveTo(dragId, col.value);
                  setDragId(null);
                }}
                className={`flex w-[270px] shrink-0 flex-col rounded-2xl border p-2.5 transition-colors ${
                  overCol === col.value
                    ? "border-emerald-500/50 bg-emerald-500/5"
                    : won
                      ? "border-emerald-500/20 bg-stone-900/60"
                      : lost
                        ? "border-rose-500/15 bg-stone-900/40"
                        : "border-stone-800 bg-stone-900/50"
                }`}
              >
                <header className="mb-2 flex items-center justify-between px-1.5 pt-1">
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${col.color.replace("bg-", "bg-").split(" ")[0]}`} />
                    <h3 className="text-sm font-bold text-stone-200">{col.label}</h3>
                    <span className="rounded-full bg-stone-800 px-2 py-0.5 text-[11px] font-semibold text-stone-400">{items.length}</span>
                  </div>
                  <span className={`text-[11px] font-semibold ${won ? "text-emerald-400" : "text-stone-500"}`}>
                    {formatRp(colTotal(col.value)).replace("Rp ", "")}
                  </span>
                </header>

                <div className="flex-1 space-y-2">
                  {items.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-stone-800 py-6 text-center text-xs text-stone-600">
                      Kosong — seret kartu ke sini
                    </p>
                  ) : (
                    items.map((l) => (
                      <article
                        key={l.id}
                        draggable
                        onDragStart={() => setDragId(l.id)}
                        onDragEnd={() => setDragId(null)}
                        className={`group cursor-grab rounded-xl border border-stone-800 bg-stone-950/70 p-3 shadow-sm transition-all hover:border-stone-600 active:cursor-grabbing ${
                          dragId === l.id ? "opacity-40" : ""
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <GripVertical aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-stone-700 group-hover:text-stone-500" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-stone-100">{l.name}</p>
                            <p className="truncate text-xs text-stone-500">{l.businessType} · {relativeTime(l.createdAt)}</p>
                            <div className="mt-2 flex items-center justify-between gap-2">
                              <span className="text-xs font-bold text-emerald-300">{formatRp(l.estimatedValue)}</span>
                              <a
                                href={waLink(l.whatsapp, `Halo ${l.name}, ada update dari PusatPerizinan.com untuk kebutuhan ${l.businessType} Anda.`)}
                                target="_blank" rel="noopener noreferrer"
                                className="inline-flex h-7 w-7 items-center justify-center rounded-md text-emerald-400 hover:bg-emerald-500/10"
                                aria-label={`Chat ${l.name}`}
                                title="Chat WhatsApp"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MessageCircle aria-hidden className="h-3.5 w-3.5" />
                              </a>
                            </div>
                            {l.package && <p className="mt-1 text-[11px] text-stone-600">Paket: {l.package}</p>}
                          </div>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              </section>
            );
          })}
        </div>
      )}

      <Card className="border-stone-800 bg-stone-900/50 shadow-none">
        <CardContent className="p-4 text-xs text-stone-500">
          💡 Tips: kartu di kolom <strong className="text-stone-300">Closing ✓</strong> otomatis dihitung sebagai revenue.
          Nilai estimasi bisa diubah di tab <strong className="text-stone-300">Leads</strong> melalui catatan & pengelolaan lead.
        </CardContent>
      </Card>
    </div>
  );
}
