// ============================================================
// PUSATPERIZINAN.COM — WEB VITALS RUM ENDPOINT (M02/M25)
// ============================================================
// POST /api/vitals  → simpan 1 metrik CWV (ring buffer in-memory)
// GET  /api/vitals  → agregat JSON { count, p50/p75/p90 per metrik }
//
// Desain:
//   • Tanpa PII — hanya { name, value, id, rating, path, ts }.
//   • In-memory Map<metricName, number[]> per proses, ring buffer
//     maks 1000 sampel total (tertua dibuang). Enough untuk RUM
//     ringan tanpa infrastruktur; Ganti ke ClickHouse/GA4 nanti.
//   • Rate-limit sederhana: body > 2KB diabaikan (204 tetap,
//     agar beacon tidak retry).
// ============================================================

import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID_METRICS = new Set(["LCP", "INP", "CLS", "TTFB", "FCP"]);
const MAX_BODY_BYTES = 2 * 1024; // 2KB
const MAX_SAMPLES = 1000;

/** Ring buffer in-memory per metrik (modul-level, hidup selama proses). */
const store = new Map<string, number[]>();

function pushSample(name: string, value: number): void {
  const arr = store.get(name) ?? [];
  arr.push(value);
  while (arr.length + totalStored() > MAX_SAMPLES && store.size > 0) {
    evictOldest();
  }
  store.set(name, arr);
}

/** Total sampel tersimpan lintas metrik. */
function totalStored(): number {
  let n = 0;
  for (const arr of store.values()) n += arr.length;
  return n;
}

/** Buang sampel tertua (metrik pertama yang punya isi). */
function evictOldest(): void {
  for (const [name, arr] of store) {
    if (arr.length > 0) {
      arr.shift();
      if (arr.length === 0) store.delete(name);
      return;
    }
  }
}

function percentile(sorted: number[], p: number): number | null {
  if (sorted.length === 0) return null;
  const idx = Math.min(sorted.length - 1, Math.max(0, Math.ceil(p * sorted.length) - 1));
  return Number(sorted[idx].toFixed(2));
}

function round1(n: number): number {
  return Number(n.toFixed(2));
}

export async function POST(req: Request): Promise<Response> {
  const contentLength = Number(req.headers.get("content-length") ?? "0");

  let raw: string;
  if (contentLength > MAX_BODY_BYTES) {
    // Abaikan tanpa error — beacon jangan di-retry
    return new Response(null, { status: 204 });
  }
  try {
    raw = await req.text();
  } catch {
    return new Response(null, { status: 204 });
  }
  if (raw.length > MAX_BODY_BYTES) {
    return new Response(null, { status: 204 });
  }

  try {
    const body = JSON.parse(raw) as {
      name?: unknown;
      value?: unknown;
      id?: unknown;
      rating?: unknown;
      path?: unknown;
      ts?: unknown;
    };

    const name = typeof body.name === "string" ? body.name : "";
    const value = typeof body.value === "number" && Number.isFinite(body.value) ? body.value : NaN;

    if (!VALID_METRICS.has(name) || Number.isNaN(value)) {
      return new Response(null, { status: 204 });
    }

    pushSample(name, value);
  } catch {
    // Body bukan JSON valid — abaikan
  }

  return new Response(null, { status: 204 });
}

export async function GET(): Promise<Response> {
  const metrics: Record<
    string,
    { count: number; p50: number | null; p75: number | null; p90: number | null; avg: number | null }
  > = {};

  for (const name of VALID_METRICS) {
    const arr = store.get(name) ?? [];
    const sorted = [...arr].sort((a, b) => a - b);
    const avg = sorted.length > 0 ? sorted.reduce((s, v) => s + v, 0) / sorted.length : null;
    metrics[name] = {
      count: sorted.length,
      p50: percentile(sorted, 0.5),
      p75: percentile(sorted, 0.75),
      p90: percentile(sorted, 0.9),
      avg: avg === null ? null : round1(avg),
    };
  }

  return NextResponse.json(
    { count: totalStored(), metrics },
    { headers: { "cache-control": "no-store" } }
  );
}
