"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import {
  EmptyState, SkeletonRows, StatusBadge, SourceBadge, useAdminData, apiPatch,
  downloadCSV, formatRp, relativeTime, waLink, LEAD_STATUSES, triggerRefresh,
} from "@/components/admin/shared";
import { ChevronLeft, ChevronRight, Download, MessageCircle, NotebookPen, Search } from "lucide-react";

// ============================================================
// Tab 2 — LEADS: tabel lengkap + filter + aksi cepat
// ============================================================

interface LeadRow {
  id: string; name: string; whatsapp: string; email: string | null;
  businessType: string; package: string | null; source: string;
  status: string; estimatedValue: number; notes: string | null; createdAt: string;
}
interface LeadsData { rows: LeadRow[]; total: number; page: number; pages: number }

export function LeadsTab() {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [noteLead, setNoteLead] = useState<LeadRow | null>(null);
  const [noteText, setNoteText] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => { setDebounced(query); setPage(1); }, 400);
    return () => clearTimeout(t);
  }, [query]);

  const url = useMemo(() => {
    const p = new URLSearchParams({ query: debounced, status, source, sort, page: String(page) });
    return `/api/admin/leads?${p.toString()}`;
  }, [debounced, status, source, sort, page]);

  const { data, loading, reload } = useAdminData<LeadsData>(url);

  async function changeStatus(row: LeadRow, next: string) {
    const res = await apiPatch("/api/admin/leads", { id: row.id, status: next });
    if (!res.ok) {
      toast({ title: "Gagal mengubah status", description: res.error, variant: "destructive" });
    } else {
      toast({ title: `Status "${row.name}" → ${LEAD_STATUSES.find((s) => s.value === next)?.label}` });
      triggerRefresh();
    }
    reload();
  }

  async function saveNote() {
    if (!noteLead) return;
    setSaving(true);
    const res = await apiPatch("/api/admin/leads", { id: noteLead.id, notes: noteText });
    setSaving(false);
    if (!res.ok) {
      toast({ title: "Gagal menyimpan catatan", description: res.error, variant: "destructive" });
    } else {
      toast({ title: "Catatan tersimpan", description: noteLead.name });
      setNoteLead(null);
      reload();
      triggerRefresh();
    }
  }

  function exportCSV() {
    (async () => {
      try {
        const p = new URLSearchParams({ query: debounced, status, source, sort, all: "1" });
        const res = await fetch(`/api/admin/leads?${p.toString()}`, { cache: "no-store" });
        const json = await res.json();
        if (!json.success) throw new Error(json.error);
        const rows: LeadRow[] = json.data.rows;
        downloadCSV(
          `leads-pusatperizinan-${new Date().toISOString().slice(0, 10)}.csv`,
          ["Nama", "WhatsApp", "Jenis Usaha", "Paket", "Sumber", "Status", "Nilai Estimasi", "Catatan", "Terdaftar"],
          rows.map((r) => [r.name, r.whatsapp, r.businessType, r.package ?? "", r.source, r.status, r.estimatedValue, r.notes ?? "", new Date(r.createdAt).toLocaleString("id-ID")])
        );
        toast({ title: `CSV diekspor`, description: `${rows.length} baris (termasuk semua halaman filter ini).` });
      } catch (e) {
        toast({ title: "Ekspor gagal", description: e instanceof Error ? e.message : "", variant: "destructive" });
      }
    })();
  }

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <Card className="border-stone-800 bg-stone-900/50 shadow-none">
        <CardContent className="flex flex-wrap items-center gap-2 p-3">
          <div className="relative min-w-[180px] flex-1">
            <Search aria-hidden className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama / WA / jenis usaha…"
              className="min-h-[40px] border-stone-700 bg-stone-950/70 pl-9 text-sm text-stone-100 placeholder:text-stone-600"
              aria-label="Cari lead"
            />
          </div>
          <Select value={status} onValueChange={(v) => { setStatus(v === "all" ? "" : v); setPage(1); }}>
            <SelectTrigger className="min-h-[40px] w-[150px] border-stone-700 bg-stone-950/70 text-sm text-stone-100" aria-label="Filter status">
              <SelectValue placeholder="Semua status" />
            </SelectTrigger>
            <SelectContent className="border-stone-700 bg-stone-900 text-stone-100">
              <SelectItem value="all">Semua status</SelectItem>
              {LEAD_STATUSES.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={source} onValueChange={(v) => { setSource(v === "all" ? "" : v); setPage(1); }}>
            <SelectTrigger className="min-h-[40px] w-[140px] border-stone-700 bg-stone-950/70 text-sm text-stone-100" aria-label="Filter sumber">
              <SelectValue placeholder="Semua sumber" />
            </SelectTrigger>
            <SelectContent className="border-stone-700 bg-stone-900 text-stone-100">
              {["all", "landing", "chat", "checker", "popup", "konsultasi"].map((s) => (
                <SelectItem key={s} value={s}>{s === "all" ? "Semua sumber" : s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={(v) => { setSort(v); setPage(1); }}>
            <SelectTrigger className="min-h-[40px] w-[150px] border-stone-700 bg-stone-950/70 text-sm text-stone-100" aria-label="Urutkan">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-stone-700 bg-stone-900 text-stone-100">
              <SelectItem value="newest">Terbaru</SelectItem>
              <SelectItem value="oldest">Terlama</SelectItem>
              <SelectItem value="value">Nilai tertinggi</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={exportCSV} className="min-h-[40px] border-stone-700 bg-stone-950/70 text-sm">
            <Download aria-hidden className="mr-1.5 h-4 w-4" /> CSV
          </Button>
        </CardContent>
      </Card>

      {/* Tabel */}
      <Card className="border-stone-800 bg-stone-900/50 shadow-none">
        <CardContent className="p-0">
          {loading && !data ? (
            <div className="p-4"><SkeletonRows rows={6} /></div>
          ) : !data || data.rows.length === 0 ? (
            <EmptyState title="Tidak ada lead" sub="Coba ubah filter, atau isi data demo dari sidebar." />
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-stone-800 hover:bg-transparent">
                      <TableHead className="text-stone-400">Nama</TableHead>
                      <TableHead className="text-stone-400">Usaha</TableHead>
                      <TableHead className="text-stone-400">Nilai</TableHead>
                      <TableHead className="text-stone-400">Sumber</TableHead>
                      <TableHead className="text-stone-400">Status</TableHead>
                      <TableHead className="text-stone-400">Umur</TableHead>
                      <TableHead className="text-right text-stone-400">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.rows.map((r) => (
                      <TableRow key={r.id} className="border-stone-800/80">
                        <TableCell>
                          <p className="font-semibold text-stone-100">{r.name}</p>
                          <a href={waLink(r.whatsapp)} target="_blank" rel="noopener noreferrer" className="text-xs text-stone-500 hover:text-emerald-400">
                            +{r.whatsapp}
                          </a>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-stone-300">{r.businessType}</p>
                          <p className="text-xs text-stone-500">{r.package ?? "—"}</p>
                        </TableCell>
                        <TableCell className="whitespace-nowrap font-semibold text-emerald-300">{formatRp(r.estimatedValue)}</TableCell>
                        <TableCell><SourceBadge source={r.source} /></TableCell>
                        <TableCell>
                          <Select value={r.status} onValueChange={(v) => changeStatus(r, v)}>
                            <SelectTrigger
                              aria-label={`Ubah status ${r.name}`}
                              className="h-8 w-[125px] border-transparent bg-transparent p-1 text-xs hover:border-stone-700"
                            >
                              <span className="w-full text-left"><StatusBadge status={r.status} /></span>
                            </SelectTrigger>
                            <SelectContent className="border-stone-700 bg-stone-900 text-stone-100">
                              {LEAD_STATUSES.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-xs text-stone-500">{relativeTime(r.createdAt)}</TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-1">
                            <Button
                              variant="ghost" size="icon"
                              onClick={() => { setNoteLead(r); setNoteText(r.notes ?? ""); }}
                              className="h-8 w-8 text-stone-400 hover:text-stone-100"
                              aria-label={`Catatan untuk ${r.name}`}
                              title="Catatan"
                            >
                              <NotebookPen aria-hidden className="h-4 w-4" />
                            </Button>
                            <a
                              href={waLink(r.whatsapp, `Halo ${r.name}, saya tim PusatPerizinan.com. Menindaklanjuti kebutuhan ${r.businessType} Anda — kapan bisa kami bantu?`)}
                              target="_blank" rel="noopener noreferrer"
                              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-emerald-400 transition hover:bg-emerald-500/10"
                              aria-label={`Chat WhatsApp ${r.name}`}
                              title="Chat WhatsApp"
                            >
                              <MessageCircle aria-hidden className="h-4 w-4" />
                            </a>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Paginasi */}
              <div className="flex items-center justify-between border-t border-stone-800 px-4 py-3 text-sm">
                <p className="text-stone-500">
                  Halaman <strong className="text-stone-300">{data.page}</strong> dari {data.pages} · {data.total} lead
                </p>
                <div className="flex gap-1">
                  <Button variant="outline" size="icon" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}
                    className="h-8 w-8 border-stone-700" aria-label="Halaman sebelumnya">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" disabled={page >= data.pages} onClick={() => setPage((p) => p + 1)}
                    className="h-8 w-8 border-stone-700" aria-label="Halaman berikutnya">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Dialog catatan */}
      <Dialog open={!!noteLead} onOpenChange={(o) => !o && setNoteLead(null)}>
        <DialogContent className="border-stone-700 bg-stone-900 text-stone-100 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Catatan — {noteLead?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="lead-notes" className="text-stone-300">Hasil komunikasi, kebutuhan khusus, next step…</Label>
            <Textarea
              id="lead-notes"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              rows={5}
              className="border-stone-700 bg-stone-950/70 text-stone-100"
              placeholder="Contoh: sudah dihubungi 3/10, tertarik paket Plus Pajak, follow-up pekan depan…"
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setNoteLead(null)} className="text-stone-400">Batal</Button>
            <Button onClick={saveNote} disabled={saving} className="bg-emerald-500 font-semibold text-stone-950 hover:bg-emerald-400">
              {saving ? "Menyimpan…" : "Simpan Catatan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
