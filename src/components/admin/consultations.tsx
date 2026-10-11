"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EmptyState, SkeletonRows, useAdminData, apiPatch, relativeTime, waLink, triggerRefresh } from "@/components/admin/shared";
import { MessageCircle } from "lucide-react";

// ============================================================
// Tab 4 — KONSULTASI: permintaan jadwal konsultasi
// ============================================================

interface ConsultRow {
  id: string; name: string; whatsapp: string; topic: string;
  preferredDate: string | null; preferredTime: string | null;
  method: string; status: string; createdAt: string;
}
const STATUSES = [
  { value: "PENDING", label: "Menunggu", cls: "bg-amber-500/15 text-amber-300 border-amber-500/30" },
  { value: "CONFIRMED", label: "Dikonfirmasi", cls: "bg-teal-500/15 text-teal-300 border-teal-500/30" },
  { value: "DONE", label: "Selesai", cls: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" },
  { value: "CANCELLED", label: "Batal", cls: "bg-rose-500/15 text-rose-300 border-rose-500/30" },
];

export function ConsultationsTab() {
  const { data, loading, reload } = useAdminData<{ rows: ConsultRow[] }>("/api/admin/consultations", { intervalMs: 45_000 });
  const [busyId, setBusyId] = useState<string | null>(null);

  async function changeStatus(id: string, status: string) {
    setBusyId(id);
    const res = await apiPatch("/api/admin/consultations", { id, status });
    setBusyId(null);
    if (res.ok) triggerRefresh(); else reload();
  }

  const rows = data?.rows ?? [];
  const pending = rows.filter((r) => r.status === "PENDING").length;

  return (
    <div className="space-y-4">
      <Card className="border-stone-800 bg-stone-900/50 shadow-none">
        <CardContent className="p-0">
          {loading && !data ? (
            <div className="p-4"><SkeletonRows rows={5} /></div>
          ) : rows.length === 0 ? (
            <EmptyState title="Belum ada permintaan konsultasi" sub="Form konsultasi di situs akan mengisi tabel ini." />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-stone-800 hover:bg-transparent">
                    <TableHead className="text-stone-400">Nama</TableHead>
                    <TableHead className="text-stone-400">Topik</TableHead>
                    <TableHead className="text-stone-400">Jadwal Diinginkan</TableHead>
                    <TableHead className="text-stone-400">Metode</TableHead>
                    <TableHead className="text-stone-400">Status</TableHead>
                    <TableHead className="text-stone-400">Masuk</TableHead>
                    <TableHead className="text-right text-stone-400">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((r) => {
                    const st = STATUSES.find((s) => s.value === r.status);
                    return (
                      <TableRow key={r.id} className="border-stone-800/80">
                        <TableCell>
                          <p className="font-semibold text-stone-100">{r.name}</p>
                          <a href={waLink(r.whatsapp)} target="_blank" rel="noopener noreferrer" className="text-xs text-stone-500 hover:text-emerald-400">+{r.whatsapp}</a>
                        </TableCell>
                        <TableCell className="text-sm text-stone-300">{r.topic}</TableCell>
                        <TableCell className="text-sm text-stone-300">
                          {r.preferredDate ?? "—"}
                          {r.preferredTime && <Badge variant="outline" className="ml-2 border-stone-700 text-[10px] text-stone-400">{r.preferredTime}</Badge>}
                        </TableCell>
                        <TableCell><Badge variant="outline" className="border-stone-700 text-stone-300">{r.method}</Badge></TableCell>
                        <TableCell>
                          <Select value={r.status} onValueChange={(v) => changeStatus(r.id, v)} disabled={busyId === r.id}>
                            <SelectTrigger aria-label={`Status konsultasi ${r.name}`} className="h-8 w-[140px] border-transparent bg-transparent p-1 text-xs hover:border-stone-700">
                              <Badge variant="outline" className={st?.cls}>{st?.label ?? r.status}</Badge>
                            </SelectTrigger>
                            <SelectContent className="border-stone-700 bg-stone-900 text-stone-100">
                              {STATUSES.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-xs text-stone-500">{relativeTime(r.createdAt)}</TableCell>
                        <TableCell className="text-right">
                          <a
                            href={waLink(r.whatsapp, `Halo ${r.name}, konfirmasi jadwal konsultasi "${r.topic}" dari PusatPerizinan.com — apakah ${r.preferredDate ?? "jadwal yang dipilih"} ${r.preferredTime ?? ""} masih cocok?`)}
                            target="_blank" rel="noopener noreferrer"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-emerald-400 hover:bg-emerald-500/10"
                            aria-label={`Konfirmasi WA ke ${r.name}`}
                            title="Konfirmasi via WhatsApp"
                          >
                            <MessageCircle aria-hidden className="h-4 w-4" />
                          </a>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      {pending > 0 && (
        <p className="rounded-xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
          ⏳ {pending} permintaan menunggu konfirmasi — jangan biarkan calon klien menunggu lebih dari 1 jam.
        </p>
      )}
    </div>
  );
}
