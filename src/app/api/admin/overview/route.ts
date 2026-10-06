import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { ADMIN_COOKIE, verifyToken } from "@/lib/admin-auth";

// ============================================================
// GET /api/admin/overview — Satu endpoint, seluruh KPI mission control:
// KPI utama + tren 30 hari + distribusi + funnel + aktivitas + leads panas
// ============================================================

const DAY = 24 * 60 * 60 * 1000;

async function guard(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(ADMIN_COOKIE)?.value);
}

function fillDays(rows: Array<{ d: string; c: number }>, days: number) {
  const map = new Map(rows.map((r) => [r.d, r.c]));
  const out: { d: string; label: string; c: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(Date.now() - i * DAY);
    const key = date.toISOString().slice(0, 10);
    out.push({
      d: key,
      label: date.toLocaleDateString("id-ID", { day: "numeric", month: "short" }),
      c: map.get(key) ?? 0,
    });
  }
  return out;
}

async function daySeries(model: "lead" | "licenseCheck" | "subscriber" | "documentCheck", days: number) {
  const since = new Date(Date.now() - days * DAY);
  const table = Prisma.sql`"${Prisma.raw(
    model === "lead" ? "Lead" : model === "licenseCheck" ? "LicenseCheck" : model === "subscriber" ? "Subscriber" : "DocumentCheck"
  )}"`;
  const rows = (await db.$queryRaw(
    Prisma.sql`SELECT strftime('%Y-%m-%d', "createdAt") as d, COUNT(*) as c FROM ${table} WHERE "createdAt" >= ${since.toISOString()} GROUP BY d ORDER BY d`
  )) as unknown as Array<{ d: string; c: bigint }>;
  return fillDays(rows.map((r) => ({ d: r.d, c: Number(r.c) })), days);
}

export async function GET() {
  if (!(await guard())) {
    return NextResponse.json({ success: false, error: "Tidak terautentikasi" }, { status: 401 });
  }
  try {
    const d30 = new Date(Date.now() - 30 * DAY);
    const d60 = new Date(Date.now() - 60 * DAY);
    const d7 = new Date(Date.now() - 7 * DAY);
    const d1 = new Date(Date.now() - DAY);

    const [
      leadsTotal, leads30, leadsPrev30, leads7, wonCount, pipelineRows,
      consultsPending, chat24h, sessions, checks7, docsTotal, subsTotal, subs30,
      bySourceRows, hotLeads, seriesLeads, seriesChecks, seriesDocs, seriesSubs,
      lastLead, lastConsult, lastChat, lastCheck, lastDoc, lastSub, lastRoad,
      roadTotal, testiTotal,
    ] = await Promise.all([
      db.lead.count(),
      db.lead.count({ where: { createdAt: { gte: d30 } } }),
      db.lead.count({ where: { createdAt: { gte: d60, lt: d30 } } }),
      db.lead.count({ where: { createdAt: { gte: d7 } } }),
      db.lead.count({ where: { status: "CLOSED_WON" } }),
      db.lead.groupBy({ by: ["status"], _count: { _all: true }, _sum: { estimatedValue: true } }),
      db.consultation.count({ where: { status: "PENDING" } }),
      db.chatMessage.count({ where: { role: "user", createdAt: { gte: d1 } } }),
      db.chatMessage.groupBy({ by: ["sessionId"], _count: { _all: true } }),
      db.licenseCheck.count({ where: { createdAt: { gte: d7 } } }),
      db.documentCheck.count(),
      db.subscriber.count(),
      db.subscriber.count({ where: { createdAt: { gte: d30 } } }),
      db.lead.groupBy({ by: ["source"], _count: { _all: true } }),
      db.lead.findMany({
        where: { status: { in: ["NEW", "CONTACTED"] } },
        orderBy: [{ estimatedValue: "desc" }, { createdAt: "desc" }],
        take: 5,
      }),
      daySeries("lead", 30),
      daySeries("licenseCheck", 30),
      daySeries("documentCheck", 30),
      daySeries("subscriber", 30),
      db.lead.findFirst({ orderBy: { createdAt: "desc" } }),
      db.consultation.findFirst({ orderBy: { createdAt: "desc" } }),
      db.chatMessage.findFirst({ where: { role: "user" }, orderBy: { createdAt: "desc" } }),
      db.licenseCheck.findFirst({ orderBy: { createdAt: "desc" } }),
      db.documentCheck.findFirst({ orderBy: { createdAt: "desc" } }),
      db.subscriber.findFirst({ orderBy: { createdAt: "desc" } }),
      db.roadmapRequest.findFirst({ orderBy: { createdAt: "desc" } }),
      db.roadmapRequest.count(),
      db.testimonial.count(),
    ]);

    const byStatus = pipelineRows.map((r) => ({
      status: r.status,
      count: r._count._all,
      value: r._sum.estimatedValue ?? 0,
    }));
    const pipelineValue = byStatus
      .filter((s) => !["CLOSED_LOST"].includes(s.status))
      .reduce((a, b) => a + b.value, 0);
    const wonValue = byStatus.find((s) => s.status === "CLOSED_WON")?.value ?? 0;
    const convRate = leadsTotal > 0 ? Math.round((wonCount / leadsTotal) * 1000) / 10 : 0;

    type Act = { type: string; title: string; sub: string; at: Date };
    const activity: Act[] = [];
    if (lastLead) activity.push({ type: "lead", title: `Lead baru: ${lastLead.name}`, sub: `${lastLead.businessType} · ${lastLead.source} · Rp ${lastLead.estimatedValue.toLocaleString("id-ID")}`, at: lastLead.createdAt });
    if (lastConsult) activity.push({ type: "consult", title: `Konsultasi: ${lastConsult.name}`, sub: lastConsult.topic, at: lastConsult.createdAt });
    if (lastChat) activity.push({ type: "chat", title: "Pesan baru di chat RIZKI", sub: lastChat.content.slice(0, 60), at: lastChat.createdAt });
    if (lastCheck) activity.push({ type: "check", title: "Cek izin AI dijalankan", sub: lastCheck.businessInput.slice(0, 60), at: lastCheck.createdAt });
    if (lastDoc) activity.push({ type: "doc", title: `Dokumen dianalisis: ${lastDoc.fileName}`, sub: lastDoc.docCategory, at: lastDoc.createdAt });
    if (lastSub) activity.push({ type: "sub", title: `Subscriber baru: ${lastSub.name}`, sub: lastSub.source, at: lastSub.createdAt });
    if (lastRoad) activity.push({ type: "road", title: `Permintaan roadmap: ${lastRoad.name}`, sub: `${lastRoad.businessField} · ${lastRoad.province}`, at: lastRoad.createdAt });

    return NextResponse.json({
      success: true,
      data: {
        kpis: {
          leadsTotal, leads30, leadsPrev30, leads7,
          pipelineValue, wonValue, wonCount, convRate,
          consultsPending, chat24h, chatSessions: sessions.length,
          checks7, docsTotal, subsTotal, subs30,
          roadTotal, testiTotal,
        },
        series: { leads: seriesLeads, checks: seriesChecks, docs: seriesDocs, subs: seriesSubs },
        bySource: bySourceRows.map((r) => ({ name: r.source, count: r._count._all })),
        byStatus,
        hotLeads,
        activity: activity.sort((a, b) => b.at.getTime() - a.at.getTime()).slice(0, 8),
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: e instanceof Error ? e.message : "Gagal memuat overview" },
      { status: 500 }
    );
  }
}
