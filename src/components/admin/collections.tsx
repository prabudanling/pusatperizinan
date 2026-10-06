"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { EmptyState, SkeletonRows, useAdminData, apiPatch, downloadCSV, relativeTime, triggerRefresh } from "@/components/admin/shared";
import { useToast } from "@/hooks/use-toast";
import { Download, Star, Map, Mail } from "lucide-react";

// ============================================================
// Tab 7 — DATABASE: subscriber, roadmap request, testimoni DB
// ============================================================

interface SubRow { id: string; name: string; email: string; whatsapp: string | null; source: string; createdAt: string }
interface RoadRow { id: string; name: string; whatsapp: string; businessField: string; province: string; scale: string; capital: string; createdAt: string }
interface TestiRow { id: string; name: string; company: string | null; role: string | null; content: string; rating: number; published: boolean; createdAt: string }

function Stars({ n }: { n: number }) {
  return (
    <span aria-label={`Rating ${n} dari 5`} className="text-amber-400">
      {"★".repeat(n)}
      <span className="text-stone-700">{"★".repeat(Math.max(0, 5 - n))}</span>
    </span>
  );
}

export function CollectionsTab() {
  const { toast } = useToast();
  const { data: subs, loading: subsLoading } = useAdminData<{ rows: SubRow[] }>("/api/admin/collections?type=subscriber");
  const { data: road, loading: roadLoading } = useAdminData<{ rows: RoadRow[] }>("/api/admin/collections?type=roadmap");
  const { data: testi, loading: testiLoading, reload: testiReload } = useAdminData<{ rows: TestiRow[] }>("/api/admin/collections?type=testimonial");

  async function togglePublish(id: string, published: boolean) {
    const res = await apiPatch("/api/admin/collections", { id, published });
    if (res.ok) {
      toast({ title: published ? "Testimoni dipublikasikan" : "Testimoni disembunyikan" });
      triggerRefresh();
    } else {
      toast({ title: "Gagal mengubah", description: res.error, variant: "destructive" });
      testiReload();
    }
  }

  return (
    <Tabs defaultValue="subs" className="space-y-4">
      <TabsList className="border border-stone-800 bg-stone-900/60">
        <TabsTrigger value="subs" className="gap-1.5 data-[state=active]:bg-emerald-500/15 data-[state=active]:text-emerald-300">
          <Mail aria-hidden className="h-4 w-4" /> Subscriber ({subs?.rows.length ?? 0})
        </TabsTrigger>
        <TabsTrigger value="road" className="gap-1.5 data-[state=active]:bg-emerald-500/15 data-[state=active]:text-emerald-300">
          <Map aria-hidden className="h-4 w-4" /> Roadmap ({road?.rows.length ?? 0})
        </TabsTrigger>
        <TabsTrigger value="testi" className="gap-1.5 data-[state=active]:bg-emerald-500/15 data-[state=active]:text-emerald-300">
          <Star aria-hidden className="h-4 w-4" /> Testimoni DB ({testi?.rows.length ?? 0})
        </TabsTrigger>
      </TabsList>

      {/* ---------- Subscribers ---------- */}
      <TabsContent value="subs">
        <Card className="border-stone-800 bg-stone-900/50 shadow-none">
          <CardContent className="p-0">
            <div className="flex items-center justify-between px-4 pt-4">
              <p className="text-sm text-stone-400">Peserta kursus email & newsletter — aset remarketing gratis.</p>
              <Button
                variant="outline" size="sm"
                onClick={() => subs?.rows && downloadCSV(
                  `subscriber-${new Date().toISOString().slice(0, 10)}.csv`,
                  ["Nama", "Email", "WhatsApp", "Sumber", "Sejak"],
                  subs.rows.map((r) => [r.name, r.email, r.whatsapp ?? "", r.source, new Date(r.createdAt).toLocaleString("id-ID")])
                )}
                className="border-stone-700 bg-stone-950/70 text-xs"
              >
                <Download aria-hidden className="mr-1 h-3.5 w-3.5" /> CSV
              </Button>
            </div>
            {subsLoading && !subs ? (
              <div className="p-4"><SkeletonRows rows={5} /></div>
            ) : (subs?.rows.length ?? 0) === 0 ? (
              <EmptyState title="Belum ada subscriber" />
            ) : (
              <div className="mt-2 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-stone-800 hover:bg-transparent">
                      <TableHead className="text-stone-400">Nama</TableHead>
                      <TableHead className="text-stone-400">Email</TableHead>
                      <TableHead className="text-stone-400">Sumber</TableHead>
                      <TableHead className="text-stone-400">Gabung</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subs!.rows.map((r) => (
                      <TableRow key={r.id} className="border-stone-800/80">
                        <TableCell className="font-medium text-stone-100">{r.name}</TableCell>
                        <TableCell className="text-stone-300">{r.email}</TableCell>
                        <TableCell><Badge variant="outline" className="border-stone-700 text-stone-400">{r.source}</Badge></TableCell>
                        <TableCell className="text-xs text-stone-500">{relativeTime(r.createdAt)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* ---------- Roadmap ---------- */}
      <TabsContent value="road">
        <Card className="border-stone-800 bg-stone-900/50 shadow-none">
          <CardContent className="p-0">
            {roadLoading && !road ? (
              <div className="p-4"><SkeletonRows rows={4} /></div>
            ) : (road?.rows.length ?? 0) === 0 ? (
              <EmptyState title="Belum ada permintaan roadmap" sub="Dari halaman /roadmap — user minta peta jalan perizinan bisnisnya." />
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-stone-800 hover:bg-transparent">
                      <TableHead className="text-stone-400">Nama</TableHead>
                      <TableHead className="text-stone-400">Bidang</TableHead>
                      <TableHead className="text-stone-400">Provinsi</TableHead>
                      <TableHead className="text-stone-400">Skala</TableHead>
                      <TableHead className="text-stone-400">Modal</TableHead>
                      <TableHead className="text-stone-400">Masuk</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {road!.rows.map((r) => (
                      <TableRow key={r.id} className="border-stone-800/80">
                        <TableCell className="font-medium text-stone-100">{r.name}<p className="text-xs text-stone-500">+{r.whatsapp}</p></TableCell>
                        <TableCell className="text-stone-300">{r.businessField}</TableCell>
                        <TableCell className="text-stone-300">{r.province}</TableCell>
                        <TableCell><Badge variant="outline" className="border-stone-700 text-stone-400">{r.scale}</Badge></TableCell>
                        <TableCell className="text-stone-300">{r.capital}</TableCell>
                        <TableCell className="text-xs text-stone-500">{relativeTime(r.createdAt)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* ---------- Testimoni (DB) ---------- */}
      <TabsContent value="testi">
        <p className="mb-3 rounded-xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-xs text-amber-200">
          Ini testimoni yang tersimpan di database (hasil koleksi asli via follow-up WA). Testimoni statis di halaman situs dikelola terpisah di <code className="text-amber-300">src/lib/testimonials-data.ts</code>.
        </p>
        {testiLoading && !testi ? (
          <SkeletonRows rows={4} />
        ) : (testi?.rows.length ?? 0) === 0 ? (
          <EmptyState title="Belum ada testimoni di database" sub="Saat pelanggan asli mengirim review, tampil di sini dengan tombol publish." />
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {testi!.rows.map((t) => (
              <Card key={t.id} className="border-stone-800 bg-stone-900/50 shadow-none">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-stone-100">{t.name}</p>
                      <p className="text-xs text-stone-500">{[t.role, t.company].filter(Boolean).join(" · ")}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Stars n={t.rating} />
                      <Switch
                        checked={t.published}
                        onCheckedChange={(v) => togglePublish(t.id, v)}
                        aria-label={`Publikasikan testimoni ${t.name}`}
                      />
                    </div>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-stone-300">“{t.content}”</p>
                  <p className="mt-2 text-[11px] text-stone-600">{relativeTime(t.createdAt)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
