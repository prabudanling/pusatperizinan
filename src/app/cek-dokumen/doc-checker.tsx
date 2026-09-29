"use client";

import { useCallback, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Loader2,
  RefreshCw,
  ShieldCheck,
  UploadCloud,
  X,
  XCircle,
} from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";

// ============================================================
// DocChecker — AI Cek Dokumen via upload foto (VLM)
// State machine: idle → (pilih docType + upload) → loading → result | error
// ============================================================

export interface DocTypeMeta {
  id: string;
  label: string;
  emoji: string;
}

interface ChecklistItem {
  label: string;
  status: "ok" | "warning" | "fail";
  note: string;
}

interface ApiSuccess {
  ok: true;
  score: number;
  status: "layak" | "perlu_perbaikan" | "tidak_terbaca";
  checklist: ChecklistItem[];
  rekomendasi: string[];
  catatan: string;
  docType: string;
  checkedAt: string;
}

interface ApiFallback {
  ok: false;
  message: string;
  fallbackChecklist: string[];
  ctaWa: boolean;
}

type ApiResponse = ApiSuccess | ApiFallback;
type Phase = "idle" | "loading" | "result" | "error";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_MB = 10;
const MAX_SIDE = 1600;
const FETCH_TIMEOUT_MS = 120_000;

const STATUS_META: Record<
  ApiSuccess["status"],
  { label: string; badge: string; dot: string }
> = {
  layak: {
    label: "Layak Diajukan",
    badge: "bg-emerald-100 text-emerald-800 border border-emerald-300",
    dot: "bg-emerald-500",
  },
  perlu_perbaikan: {
    label: "Perlu Perbaikan",
    badge: "bg-amber-100 text-amber-800 border border-amber-300",
    dot: "bg-amber-500",
  },
  tidak_terbaca: {
    label: "Tidak Terbaca",
    badge: "bg-red-100 text-red-800 border border-red-300",
    dot: "bg-red-500",
  },
};

/** Resize gambar di client via canvas: sisi terpanjang maks 1600px, JPEG 0.85 */
function resizeImage(dataUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      try {
        const scale = Math.min(1, MAX_SIDE / Math.max(img.width, img.height));
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(dataUrl);
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      } catch {
        resolve(dataUrl);
      }
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Gagal membaca file"));
    reader.readAsDataURL(file);
  });
}

function formatCheckedAt(iso: string): string {
  try {
    return new Date(iso).toLocaleString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function ScoreRing({ score }: { score: number }) {
  const clamped = Math.max(0, Math.min(100, Math.round(score)));
  const color = clamped >= 80 ? "#10b981" : clamped >= 50 ? "#f59e0b" : "#ef4444";
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped / 100);
  return (
    <div className="relative h-32 w-32 shrink-0 sm:h-36 sm:w-36">
      <svg
        viewBox="0 0 120 120"
        className="h-full w-full -rotate-90"
        role="img"
        aria-label={`Skor kelayakan dokumen ${clamped} dari 100`}
      >
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#e7e5e4" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-extrabold leading-none sm:text-4xl" style={{ color }}>
          {clamped}
        </span>
        <span className="mt-1 text-xs font-medium text-muted-foreground">/100</span>
      </div>
    </div>
  );
}

export function DocChecker({ docTypes }: { docTypes: DocTypeMeta[] }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [docTypeId, setDocTypeId] = useState<string | null>(null);
  const [image, setImage] = useState<{ dataUrl: string; name: string } | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const selectedDocType = docTypes.find((d) => d.id === docTypeId) ?? null;
  const busy = phase === "loading";

  const handleFile = useCallback(async (file: File | null | undefined) => {
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setFileError("Format tidak didukung. Gunakan foto JPG, PNG, atau WebP.");
      return;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setFileError(`Ukuran file maksimal ${MAX_FILE_MB}MB. Kompres dulu atau ambil foto ulang.`);
      return;
    }
    setFileError(null);
    try {
      const raw = await readFileAsDataUrl(file);
      const resized = await resizeImage(raw);
      setImage({ dataUrl: resized, name: file.name });
    } catch {
      setFileError("Gagal membaca file. Coba file lain.");
    }
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (busy) return;
      const file = e.dataTransfer.files?.[0];
      void handleFile(file);
    },
    [busy, handleFile]
  );

  async function analyze() {
    if (!selectedDocType || !image || busy) return;
    setPhase("loading");
    setErrorMessage(null);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    try {
      const res = await fetch("/api/cek-dokumen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: image.dataUrl, docType: selectedDocType.id }),
        signal: controller.signal,
      });
      const json: unknown = await res.json().catch(() => null);
      if (res.ok && json && typeof json === "object" && "ok" in json) {
        setResult(json as ApiResponse);
        setPhase("result");
        return;
      }
      const msg =
        json && typeof json === "object" && "error" in json
          ? String((json as { error: unknown }).error)
          : "Terjadi kesalahan saat memeriksa dokumen.";
      setErrorMessage(msg);
      setPhase("error");
    } catch {
      setErrorMessage(
        "Koneksi bermasalah atau waktu tunggu habis. Periksa internet Anda, lalu coba lagi."
      );
      setPhase("error");
    } finally {
      clearTimeout(timer);
    }
  }

  function resetAll() {
    setPhase("idle");
    setResult(null);
    setImage(null);
    setDocTypeId(null);
    setFileError(null);
    setErrorMessage(null);
  }

  // ---------- RESULT ----------
  if (phase === "result" && result) {
    const waBase = `https://wa.me/${WHATSAPP_NUMBER}`;

    if (result.ok) {
      const meta = STATUS_META[result.status];
      const waText = `Halo, saya baru cek dokumen ${selectedDocType?.label ?? result.docType} via AI Cek Dokumen. Hasil: ${meta.label} (${Math.round(result.score)}/100). Mohon dibantu perbaikan & pengajuan.`;
      return (
        <div
          className="rounded-2xl border bg-card p-4 shadow-sm sm:p-6"
          aria-live="polite"
          data-testid="doc-checker-result"
        >
          {/* Skor & status */}
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-6">
            <ScoreRing score={result.score} />
            <div className="min-w-0 flex-1 text-center sm:text-left">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold ${meta.badge}`}>
                <span className={`h-2 w-2 rounded-full ${meta.dot}`} aria-hidden />
                {meta.label}
              </span>
              <p className="mt-2 text-sm text-muted-foreground">
                Dokumen: <span className="font-semibold text-foreground">
                  {selectedDocType?.emoji} {selectedDocType?.label ?? result.docType}
                </span>
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Diperiksa {formatCheckedAt(result.checkedAt)} oleh AI verifikator
              </p>
            </div>
          </div>

          {/* Checklist */}
          <section aria-label="Checklist pemeriksaan" className="mt-6">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
              <ClipboardCheck className="h-4 w-4 text-primary" aria-hidden />
              Checklist Pemeriksaan
            </h3>
            <ul className="mt-3 grid gap-2.5">
              {result.checklist.map((item, i) => (
                <li
                  key={`${item.label}-${i}`}
                  className="flex items-start gap-3 rounded-xl border bg-background/60 p-3"
                >
                  {item.status === "ok" ? (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
                  ) : item.status === "warning" ? (
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" aria-hidden />
                  ) : (
                    <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" aria-hidden />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-bold leading-snug">{item.label}</p>
                    {item.note ? (
                      <p className="mt-0.5 text-xs text-muted-foreground">{item.note}</p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Rekomendasi */}
          {result.rekomendasi.length > 0 ? (
            <section aria-label="Rekomendasi perbaikan" className="mt-5 rounded-xl border border-amber-200 bg-amber-50/60 p-4">
              <h3 className="text-sm font-bold text-amber-900">Rekomendasi Perbaikan</h3>
              <ul className="mt-2.5 grid gap-2">
                {result.rekomendasi.map((rec, i) => (
                  <li key={`rec-${i}`} className="flex items-start gap-2 text-sm text-amber-900">
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* Catatan AI */}
          {result.catatan ? (
            <blockquote className="mt-4 rounded-r-xl border-l-4 border-emerald-500 bg-emerald-50/60 p-4">
              <p className="text-sm italic leading-relaxed text-emerald-900">
                &ldquo;{result.catatan}&rdquo;
              </p>
              <footer className="mt-1.5 text-xs font-medium not-italic text-emerald-700">
                — Catatan AI Verifikator
              </footer>
            </blockquote>
          ) : null}

          {/* CTA */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={`${waBase}?text=${encodeURIComponent(waText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:shadow-lg"
            >
              Perbaiki &amp; Ajukan via WhatsApp
            </a>
            <button
              type="button"
              onClick={resetAll}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border-2 border-primary/30 bg-card px-5 py-3 text-sm font-semibold transition-all hover:border-primary"
            >
              <RefreshCw className="h-4 w-4" aria-hidden />
              Cek Dokumen Lain
            </button>
          </div>

          <p className="mt-3 text-center text-[11px] leading-relaxed text-muted-foreground">
            Hasil ini adalah pre-check awal, bukan keputusan resmi instansi. Untuk kepastian akhir, dokumen tetap diverifikasi oleh instansi penerbit.
          </p>
        </div>
      );
    }

    // ok:false → fallback
    return (
      <div className="rounded-2xl border bg-card p-4 shadow-sm sm:p-6" aria-live="polite">
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/60 p-4">
          <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-amber-500" aria-hidden />
          <div>
            <p className="font-bold text-amber-900">{result.message}</p>
            <p className="mt-1 text-sm text-amber-800">
              Sementara itu, pastikan foto Anda memenuhi checklist umum berikut lalu coba lagi:
            </p>
          </div>
        </div>
        <ul className="mt-4 grid gap-2.5">
          {result.fallbackChecklist.map((item, i) => (
            <li key={`fb-${i}`} className="flex items-start gap-3 rounded-xl border bg-background/60 p-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
              <p className="text-sm font-medium">{item}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={`${waBase}?text=${encodeURIComponent("Halo, saya cek dokumen via AI Cek Dokumen tapi analisis belum tersedia. Mohon dibantu pemeriksaan manual.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:shadow-lg"
          >
            Tanya Konsultan via WhatsApp
          </a>
          <button
            type="button"
            onClick={resetAll}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border-2 border-primary/30 bg-card px-5 py-3 text-sm font-semibold transition-all hover:border-primary"
          >
            <RefreshCw className="h-4 w-4" aria-hidden />
            Cek Dokumen Lain
          </button>
        </div>
      </div>
    );
  }

  // ---------- FORM (idle / loading / error) ----------
  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm sm:p-6">
      {/* Step 1 — pilih jenis dokumen */}
      <fieldset disabled={busy} className="disabled:opacity-60">
        <legend className="text-sm font-bold">
          1. Pilih jenis dokumen <span className="text-red-500" aria-hidden>*</span>
          <span className="sr-only">(wajib)</span>
        </legend>
        <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {docTypes.map((d) => {
            const active = docTypeId === d.id;
            return (
              <button
                key={d.id}
                type="button"
                aria-pressed={active}
                onClick={() => setDocTypeId(d.id)}
                className={`flex min-h-11 flex-col items-center justify-center gap-1 rounded-xl border px-2 py-2.5 text-center transition-all ${
                  active
                    ? "ring-2 ring-emerald-500 bg-emerald-50 border-emerald-500 shadow-sm"
                    : "border-stone-200 bg-background hover:border-emerald-400 hover:bg-emerald-50/40"
                }`}
              >
                <span className="text-xl leading-none" aria-hidden>{d.emoji}</span>
                <span className="text-[11px] font-semibold leading-tight sm:text-xs">{d.label}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Step 2 — upload foto */}
      <fieldset disabled={busy} className="mt-6 disabled:opacity-60">
        <legend className="text-sm font-bold">
          2. Upload foto dokumen <span className="text-red-500" aria-hidden>*</span>
          <span className="sr-only">(wajib)</span>
        </legend>

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/jpeg,image/png,image/webp"
          capture="environment"
          aria-label="Pilih atau ambil foto dokumen"
          onChange={(e) => {
            void handleFile(e.target.files?.[0]);
            e.target.value = "";
          }}
        />

        {image ? (
          <div className="relative mt-3 overflow-hidden rounded-xl border bg-stone-50">
            <img
              src={image.dataUrl}
              alt="Preview dokumen"
              className="mx-auto max-h-80 w-auto max-w-full object-contain"
            />
            {/* Overlay scanner saat loading */}
            {busy ? (
              <div
                className="absolute inset-0 bg-stone-950/25"
                role="status"
                aria-label="AI sedang memeriksa dokumen"
              >
                <style>{`@keyframes docscan { 0% { top: -6px; } 50% { top: calc(100% - 6px); } 100% { top: -6px; } } .doc-scan-bar { animation: docscan 2.2s ease-in-out infinite; }`}</style>
                <div className="doc-scan-bar absolute left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400/0 via-emerald-400 to-emerald-400/0 shadow-[0_0_18px_rgba(16,185,129,0.9)]" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-stone-950/55 px-3 py-2.5">
                  <Loader2 className="h-4 w-4 animate-spin text-emerald-300" aria-hidden />
                  <span className="text-xs font-semibold text-white sm:text-sm">
                    AI sedang memeriksa dokumen…
                  </span>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setImage(null)}
                aria-label="Hapus gambar"
                className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full bg-stone-950/65 text-white shadow-md transition-colors hover:bg-red-600"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            )}
          </div>
        ) : (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              if (!busy) setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            className={`mt-3 rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors sm:py-10 ${
              dragOver ? "border-emerald-500 bg-emerald-50" : "border-stone-300 bg-background"
            }`}
          >
            <UploadCloud className="mx-auto h-10 w-10 text-emerald-600" aria-hidden />
            <p className="mt-3 text-sm font-semibold">
              Tarik &amp; lepas foto di sini, atau{" "}
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="font-bold text-primary underline underline-offset-4 hover:text-emerald-700"
              >
                pilih file / ambil kamera
              </button>
            </p>
            <p className="mt-1.5 text-xs text-muted-foreground">
              JPG, PNG, atau WebP • maksimal {MAX_FILE_MB}MB • foto langsung dari kamera HP juga bisa
            </p>
          </div>
        )}

        {fileError ? (
          <p className="mt-2.5 flex items-start gap-1.5 text-sm font-medium text-red-600" role="alert">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {fileError}
          </p>
        ) : null}
      </fieldset>

      {/* Error network/timeout */}
      {phase === "error" && errorMessage ? (
        <div
          className="mt-5 flex flex-col gap-3 rounded-xl border border-red-300 bg-red-50 p-4 sm:flex-row sm:items-center"
          role="alert"
        >
          <div className="flex flex-1 items-start gap-2.5">
            <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" aria-hidden />
            <p className="text-sm font-medium text-red-800">{errorMessage}</p>
          </div>
          <button
            type="button"
            onClick={() => void analyze()}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700"
          >
            <RefreshCw className="h-4 w-4" aria-hidden />
            Coba Lagi
          </button>
        </div>
      ) : null}

      {/* Submit */}
      <button
        type="button"
        onClick={() => void analyze()}
        disabled={!docTypeId || !image || busy}
        className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-bold text-primary-foreground shadow-md transition-all hover:bg-emerald-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-primary"
        aria-describedby="doc-checker-hint"
      >
        {busy ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            Memeriksa…
          </>
        ) : (
          <>
            <Camera className="h-5 w-5" aria-hidden />
            🔍 Analisis dengan AI
          </>
        )}
      </button>
      <p id="doc-checker-hint" className="mt-2.5 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden />
        Foto diproses sementara di memori — tidak pernah disimpan.
      </p>
    </div>
  );
}
