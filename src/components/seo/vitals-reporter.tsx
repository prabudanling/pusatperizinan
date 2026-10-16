"use client";

// ============================================================
// PUSATPERIZINAN.COM — WEB VITALS RUM REPORTER (M02/M25)
// ============================================================
// Client component tanpa UI (return null) yang mengirim Core Web
// Vitals ke endpoint internal /api/vitals:
//   • LCP, INP, CLS, TTFB, FCP (web-vitals v6 — atribusi otomatis)
//   • Kirim via navigator.sendBeacon (tidak blok unload),
//     fallback fetch POST keepalive.
//   • TANPA PII: hanya name/value/id/rating + path + timestamp.
//     Tidak ada IP, UA, referer, atau data form.
//
// Pemakaian (root layout — dipasang owner):
//   import VitalsReporter from "@/components/seo/vitals-reporter";
//   <VitalsReporter />
// ============================================================

import { useEffect } from "react";
import { onLCP, onINP, onCLS, onTTFB, onFCP, type Metric } from "web-vitals";

const ENDPOINT = "/api/vitals";

/** Kirim 1 metrik — sendBeacon dulu, fallback fetch keepalive. */
function reportMetric(metric: Metric): void {
  // Tanpa PII: nama metrik, nilai, id unik sesi-metrik, rating, path, waktu.
  const payload = JSON.stringify({
    name: metric.name,
    value: metric.value,
    id: metric.id,
    rating: metric.rating,
    path: location.pathname,
    ts: Date.now(),
  });

  if (typeof navigator.sendBeacon === "function") {
    const blob = new Blob([payload], { type: "application/json" });
    if (navigator.sendBeacon(ENDPOINT, blob)) return;
  }

  // Fallback bila sendBeacon tidak tersedia / antrian penuh
  void fetch(ENDPOINT, {
    method: "POST",
    body: payload,
    keepalive: true,
    headers: { "content-type": "application/json" },
  }).catch(() => {
    /* RUM tidak boleh membuat error di console user */
  });
}

export default function VitalsReporter() {
  useEffect(() => {
    onLCP(reportMetric);
    onINP(reportMetric);
    onCLS(reportMetric);
    onTTFB(reportMetric);
    onFCP(reportMetric);
  }, []);

  return null;
}
