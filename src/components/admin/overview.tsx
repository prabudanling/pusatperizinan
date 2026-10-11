"use client";

import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SkeletonRows, EmptyState, useAdminData, compactRp, formatRp, relativeTime, StatusBadge, SourceBadge, waLink } from "@/components/admin/shared";
import {
  Users, Wallet, TrendingUp, Activity, MessageSquare, SearchCheck, FileSearch, Mail,
  UserPlus, CalendarClock, Map, ArrowUpRight, ArrowDownRight, Flame, ExternalLink,
} from "lucide-react";

// ============================================================
// Tab 1 — MISSION CONTROL OVERVIEW
// ============================================================

type Series = { d: string; label: string; c: number }[];
interface OverviewData {
  kpis: {
    leadsTotal: number; leads30: number; leadsPrev30: number; leads7: number;
    pipelineValue: number; wonValue: number; wonCount: number; convRate: number;
    consultsPending: number; chat24h: number; chatSessions: number;
    checks7: number; docsTotal: number; subsTotal: number; subs30: number;
    roadTotal: number; testiTotal: number;
  };
  series: { leads: Series; checks: Series; docs: Series; subs: Series };
  bySource: { name: string; count: number }[];
  byStatus: { status: string; count: number; value: number }[];
  hotLeads: {
    id: string; name: string; whatsapp: string; businessType: string;
    status: string; source: string; estimatedValue: number; createdAt: string;
  }[];
  activity: { type: string; title: string; sub: string; at: string }[];
  generatedAt: string;
}

const CHART_COLORS = ["#34d399", "#fbbf24", "#2dd4bf", "#a3e635", "#fb7185", "#a8a29e"];
const STATUS_LABEL: Record<string, string> = {
  NEW: "Baru", CONTACTED: "Dihubungi", CONSULTED: "Konsultasi",
  CLOSED_WON: "Closing", CLOSED_LOST: "Hilang",
};

function ChartTip({ active, payload, label }: { active?: boolean; payload?: Array<{ name?: string; value?: number | string; color?: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-stone-700 bg-stone-900/95 px-3 py-2 text-xs shadow-xl">
      {label && <p className="mb-1 font-semibold text-stone-300">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} className="flex items-center gap-2 text-stone-200">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
          {p.name}: <strong>{typeof p.value === "number" ? p.value.toLocaleString("id-ID") : p.value}</strong>
        </p>
      ))}
    </div>
  );
}

function Spark({ data, color = "#34d399" }: { data: Series; color?: string }) {
  const tail = data.slice(-14);
  return (
    <div className="h-10 w-full" aria-hidden>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={tail} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id={`sp-${color.slice(1)}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.5} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="c" stroke={color} strokeWidth={1.6} fill={`url(#sp-${color.slice(1)})`} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function KpiCard({
  icon: Icon, label, value, sub, up, spark, sparkColor,
}: {
  icon: React.ElementType; label: string; value: string; sub?: string;
  up?: boolean; spark?: Series; sparkColor?: string;
}) {
  return (
    <Card className="border-stone-800 bg-stone-900/50 shadow-none">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-700/80 bg-stone-800/60">
            <Icon aria-hidden className="h-4.5 w-4.5 text-emerald-400" />
          </div>
          {up !== undefined && (
            <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${up ? "text-emerald-400" : "text-rose-400"}`}>
              {up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
              {up ? "naik" : "turun"}
            </span>
          )}
        </div>
        <p className="mt-3 truncate text-2xl font-extrabold tracking-tight text-stone-50">{value}</p>
        <p className="text-xs font-medium text-stone-400">{label}</p>
        {sub && <p className="mt-1 text-[11px] text-stone-500">{sub}</p>}
        {spark && spark.some((p) => p.c > 0) && (
          <div className="mt-2 -mb-1">
            <Spark data={spark} color={sparkColor} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Funnel({ byStatus, total }: { byStatus: OverviewData["byStatus"]; total: number }) {
  const count = (arr: string[]) => byStatus.filter((s) => arr.includes(s.status)).reduce((a, b) => a + b.count, 0);
  const stages = [
    { label: "Leads Masuk", n: total, color: "from-emerald-500 to-emerald-400" },
    { label: "Dihubungi+", n: count(["CONTACTED", "CONSULTED", "CLOSED_WON", "CLOSED_LOST"]), color: "from-teal-500 to-teal-400" },
    { label: "Konsultasi+", n: count(["CONSULTED", "CLOSED_WON", "CLOSED_LOST"]), color: "from-amber-500 to-amber-400" },
    { label: "Closing", n: count(["CLOSED_WON"]), color: "from-lime-500 to-lime-400" },
  ];
  const max = Math.max(total, 1);
  return (
    <div className="space-y-3">
      {stages.map((s) => (
        <div key={s.label}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="font-medium text-stone-300">{s.label}</span>
            <span className="text-stone-400">
              <strong className="text-stone-100">{s.n}</strong>
              <span className="ml-1 text-stone-500">({Math.round((s.n / max) * 100)}%)</span>
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-stone-800">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${s.color} transition-all duration-700`}
              style={{ width: `${Math.max((s.n / max) * 100, s.n > 0 ? 4 : 0)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

const ACT_META: Record<string, { icon: React.ElementType; cls: string }> = {
  lead: { icon: UserPlus, cls: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25" },
  consult: { icon: CalendarClock, cls: "text-purple-400 bg-purple-500/10 border-purple-500/25" },
  chat: { icon: MessageSquare, cls: "text-teal-400 bg-teal-500/10 border-teal-500/25" },
  check: { icon: SearchCheck, cls: "text-amber-400 bg-amber-500/10 border-amber-500/25" },
  doc: { icon: FileSearch, cls: "text-orange-400 bg-orange-500/10 border-orange-500/25" },
  sub: { icon: Mail, cls: "text-lime-400 bg-lime-500/10 border-lime-500/25" },
  road: { icon: Map, cls: "text-stone-300 bg-stone-500/10 border-stone-500/25" },
};

export function OverviewTab() {
  const { data, loading, error } = useAdminData<OverviewData>("/api/admin/overview", { intervalMs: 20_000 });

  if (loading && !data) return <SkeletonRows rows={8} />;
  if (error && !data) return <EmptyState title="Gagal memuat overview" sub={error} />;
  if (!data) return null;

  const { kpis, series, bySource, byStatus, hotLeads, activity } = data;
  const pieData = byStatus.map((s) => ({ name: STATUS_LABEL[s.status] ?? s.status, value: s.count }));

  return (
    <div className="space-y-4">
      {/* ---------- KPI ---------- */}
      <section aria-label="KPI utama" className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard icon={Users} label="Total Leads" value={kpis.leadsTotal.toLocaleString("id-ID")}
          sub={`${kpis.leads30} bulan ini · ${kpis.leadsPrev30} bulan lalu`}
          up={kpis.leads30 >= kpis.leadsPrev30} spark={series.leads} />
        <KpiCard icon={Wallet} label="Nilai Pipeline" value={compactRp(kpis.pipelineValue)}
          sub={`Sudah closing: ${compactRp(kpis.wonValue)}`} />
        <KpiCard icon={TrendingUp} label="Closing Rate" value={`${kpis.convRate}%`}
          sub={`${kpis.wonCount} lead menjadi klien`} />
        <KpiCard icon={Activity} label="Leads 7 Hari" value={kpis.leads7.toLocaleString("id-ID")}
          sub={`${kpis.consultsPending} konsultasi menunggu`} />
        <KpiCard icon={MessageSquare} label="Chat 24 Jam" value={kpis.chat24h.toLocaleString("id-ID")}
          sub={`${kpis.chatSessions} sesi percakapan total`} sparkColor="#2dd4bf" />
        <KpiCard icon={SearchCheck} label="Cek Izin 7 Hari" value={kpis.checks7.toLocaleString("id-ID")}
          sub="AI license checker" spark={series.checks} sparkColor="#fbbf24" />
        <KpiCard icon={FileSearch} label="Dokumen Dianalisis" value={kpis.docsTotal.toLocaleString("id-ID")}
          sub="AI document checker" spark={series.docs} sparkColor="#fb923c" />
        <KpiCard icon={Mail} label="Subscriber" value={kpis.subsTotal.toLocaleString("id-ID")}
          sub={`+${kpis.subs30} bulan ini`} up={kpis.subs30 > 0} spark={series.subs} sparkColor="#a3e635" />
      </section>

      {/* ---------- Grafik utama ---------- */}
      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="border-stone-800 bg-stone-900/50 shadow-none lg:col-span-2">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm font-semibold text-stone-300">Aliran Leads — 30 Hari Terakhir</CardTitle>
          </CardHeader>
          <CardContent className="pt-3">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={series.leads} margin={{ top: 6, right: 6, bottom: 0, left: -18 }}>
                  <defs>
                    <linearGradient id="gLead" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#34d399" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" strokeOpacity={0.4} vertical={false} />
                  <XAxis dataKey="label" tick={{ fill: "#78716c", fontSize: 11 }} tickLine={false} axisLine={false} interval={5} />
                  <YAxis tick={{ fill: "#78716c", fontSize: 11 }} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip content={<ChartTip />} cursor={{ stroke: "#57534e", strokeOpacity: 0.4 }} />
                  <Area type="monotone" dataKey="c" name="Leads" stroke="#34d399" strokeWidth={2.2} fill="url(#gLead)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-stone-800 bg-stone-900/50 shadow-none">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm font-semibold text-stone-300">Distribusi Status Pipeline</CardTitle>
          </CardHeader>
          <CardContent className="pt-3">
            {pieData.length === 0 ? (
              <EmptyState title="Belum ada lead" />
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" innerRadius="58%" outerRadius="85%" paddingAngle={3} stroke="none">
                      {pieData.map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
            <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1">
              {pieData.map((p, i) => (
                <span key={p.name} className="inline-flex items-center gap-1.5 text-[11px] text-stone-400">
                  <span className="h-2 w-2 rounded-full" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                  {p.name}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ---------- Sumber · Funnel · Aktivitas ---------- */}
      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="border-stone-800 bg-stone-900/50 shadow-none">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm font-semibold text-stone-300">Leads per Sumber</CardTitle>
          </CardHeader>
          <CardContent className="pt-3">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bySource} margin={{ top: 6, right: 6, bottom: 0, left: -22 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" strokeOpacity={0.4} vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: "#78716c", fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: "#78716c", fontSize: 11 }} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip content={<ChartTip />} cursor={{ fill: "#57534e", fillOpacity: 0.12 }} />
                  <Bar dataKey="count" name="Leads" radius={[6, 6, 0, 0]}>
                    {bySource.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-stone-800 bg-stone-900/50 shadow-none">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm font-semibold text-stone-300">Funnel Konversi</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <Funnel byStatus={byStatus} total={kpis.leadsTotal} />
          </CardContent>
        </Card>

        <Card className="border-stone-800 bg-stone-900/50 shadow-none">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm font-semibold text-stone-300">Aktivitas Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="max-h-72 space-y-2.5 overflow-y-auto pt-3">
            {activity.length === 0 ? (
              <EmptyState title="Belum ada aktivitas" sub="Aktivitas lead, chat, dan checker akan muncul di sini." />
            ) : (
              activity.map((a, i) => {
                const meta = ACT_META[a.type] ?? ACT_META.road;
                const Icon = meta.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${meta.cls}`}>
                      <Icon aria-hidden className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-stone-200">{a.title}</p>
                      <p className="truncate text-xs text-stone-500">{a.sub}</p>
                      <p className="text-[11px] text-stone-600">{relativeTime(a.at)}</p>
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      </section>

      {/* ---------- Leads panas ---------- */}
      <section>
        <Card className="border-stone-800 bg-stone-900/50 shadow-none">
          <CardHeader className="flex-row items-center gap-2 pb-0">
            <Flame aria-hidden className="h-4 w-4 text-amber-400" />
            <CardTitle className="text-sm font-semibold text-stone-300">Leads Panas — Nilai Tertinggi, Belum Closing</CardTitle>
          </CardHeader>
          <CardContent className="pt-3">
            {hotLeads.length === 0 ? (
              <EmptyState title="Belum ada leads panas" sub="Isi data demo dari sidebar untuk melihat simulasi." />
            ) : (
              <ul className="divide-y divide-stone-800/80">
                {hotLeads.map((l) => (
                  <li key={l.id} className="flex flex-wrap items-center gap-3 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-stone-100">{l.name}</p>
                      <p className="truncate text-xs text-stone-500">
                        {l.businessType} · {relativeTime(l.createdAt)}
                      </p>
                    </div>
                    <SourceBadge source={l.source} />
                    <StatusBadge status={l.status} />
                    <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                      {formatRp(l.estimatedValue)}
                    </Badge>
                    <a
                      href={waLink(l.whatsapp, `Halo ${l.name}, saya tim PusatPerizinan.com. Menindaklanjuti ketertarikan Anda — ada yang bisa kami bantu?`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-stone-700 bg-stone-900 px-3 text-xs font-semibold text-stone-200 transition hover:border-emerald-500/40 hover:text-emerald-300"
                    >
                      Chat WA <ExternalLink aria-hidden className="h-3 w-3" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
