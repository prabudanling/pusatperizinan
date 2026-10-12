"use client";

import { useCallback, useRef, useState } from "react";
import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  CircleHelp,
  FileImage,
  HelpCircle,
  Info,
  Loader2,
  Lock,
  RefreshCw,
  ScanSearch,
  Send,
  Sparkles,
  TriangleAlert,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";

// ============================================================
// AI CEK DOKUMEN — client uploader + result renderer
// Foto dikompres di browser, dikirim sebagai base64 ke
// /api/document-checker (VLM backend). Foto tidak disimpan.
// ============================================================

type DocStatus = "ok" | "warning" | "error" | "unknown";
type Severity = "high" | "medium" | "low";

interface DocResult {
  documentType: string;
  confidence: number;
  relevant: boolean;
  legibilityScore: number;
  summary: string;
  checks: { label: string; status: DocStatus; detail: string }[];
  issues: { severity: Severity; title: string; detail: string; fix: string }[];
  recommendations: string[];
  nextSteps: string[];
}

const CATEGORIES: { id: string; label: string }[] = [
  { id: "auto", label: "Deteksi Otomatis" },
  { id: "npwp", label: "NPWP" },
  { id: "nib", label: "NIB / OSS" },
  { id: "ktp", label: "KTP" },
  { id: "sertifikat-standar", label: "Sertifikat Standar" },
  { id: "sertifikasi-produk", label: "Halal / PIRT / BPOM" },
  { id: "paspor-pmi", label: "Paspor / Dokumen PMI" },
  { id: "kontrak-lainnya", label: "Kontrak / Lainnya" },
];

const MAX_FILE_MB = 5;
const MAX_DIMENSION = 1600;

async function compressImage(file: File): Promise<{ dataUrl: string; previewUrl: string }> {
  const previewUrl = URL.createObjectURL(file);
  const img = document.createElement("img");
  img.src = previewUrl;
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Gambar tidak dapat dibaca"));
  });

  const canvas = document.createElement("canvas");
  let { width, height } = img;
  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
    width = Math.round(width * ratio);
    height = Math.round(height * ratio);
  }
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Browser tidak mendukung pemrosesan gambar");
  ctx.drawImage(img, 0, 0, width, height);

  // Dua tingkat kualitas agar aman di bawah batas
  let dataUrl = canvas.toDataURL("image/jpeg", 0.85);
  if (dataUrl.length > 5_800_000) dataUrl = canvas.toDataURL("image/jpeg", 0.65);
  return { dataUrl, previewUrl };
}

function statusIcon(status: DocStatus) {
  switch (status) {
    case "ok":
      return <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" aria-hidden />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" aria-hidden />;
    case "error":
      return <XCircle className="h-5 w-5 text-red-600 shrink-0" aria-hidden />;
    default:
      return <CircleHelp className="h-5 w-5 text-muted-foreground shrink-0" aria-hidden />;
  }
}

function severityStyle(sev: Severity) {
  switch (sev) {
    case "high":
      return { badge: "bg-red-100 text-red-700 border-red-200", icon: <TriangleAlert className="h-4 w-4" aria-hidden /> };
    case "medium":
      return { badge: "bg-amber-100 text-amber-700 border-amber-200", icon: <AlertTriangle className="h-4 w-4" aria-hidden /> };
    default:
      return { badge: "bg-muted text-muted-foreground border-border", icon: <Info className="h-4 w-4" aria-hidden /> };
  }
}

function confidenceLabel(n: number) {
  if (n >= 85) return "Sangat yakin";
  if (n >= 65) return "Cukup yakin";
  return "Kurang yakin";
}

export function DocumentChecker() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [category, setCategory] = useState("auto");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DocResult | null>(null);
  const [source, setSource] = useState<"ai" | "fallback" | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    setError(null);
    setResult(null);
    setSource(null);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Format harus JPG, PNG, atau WebP.");
      return;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setError(`Ukuran foto maksimal ${MAX_FILE_MB} MB.`);
      return;
    }
    try {
      const { dataUrl, previewUrl } = await compressImage(file);
      setImageData(dataUrl);
      setPreviewUrl(previewUrl);
      setFileName(file.name);
      setFileSize(dataUrl.length);
    } catch {
      setError("Gambar tidak dapat dibaca. Coba foto lain.");
    }
  }, []);

  const reset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setImageData(null);
    setFileName("");
    setFileSize(0);
    setResult(null);
    setSource(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const analyze = async () => {
    if (!imageData) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/document-checker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageData, fileName, docCategory: category }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setError(json.error ?? "Gagal menganalisis. Coba lagi.");
      } else {
        setResult(json.result as DocResult);
        setSource(json.source);
      }
    } catch {
      setError("Koneksi terputus. Periksa internet Anda dan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const waText = result
    ? `Halo, saya baru memeriksa dokumen via AI Cek Dokumen PusatPerizinan.com.\n\nJenis terdeteksi: ${result.documentType}\nRingkasan: ${result.summary}\nMasalah utama: ${result.issues.map((i) => i.title).join("; ") || "tidak ada"}\n\nMohon dibantu langkah perbaikannya.`
    : "Halo, saya ingin bantuan pemeriksaan dokumen legalitas.";

  return (
    <div className="space-y-6">
      {/* ==== Upload area ==== */}
      {!previewUrl ? (
        <div
          role="button"
          tabIndex={0}
          aria-label="Unggah foto dokumen"
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click(); }}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            const file = e.dataTransfer.files?.[0];
            if (file) void handleFile(file);
          }}
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-colors min-h-[260px] flex flex-col items-center justify-center gap-3 ${
            dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/40"
          }`}
        >
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Camera className="h-8 w-8 text-primary" aria-hidden />
          </div>
          <p className="font-semibold text-lg">Tarik & lepas foto di sini, atau klik untuk memilih</p>
          <p className="text-sm text-muted-foreground">JPG, PNG, WebP • maks {MAX_FILE_MB} MB • dari kamera atau galeri</p>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
            <Lock className="h-3.5 w-3.5" aria-hidden /> Foto diproses langsung oleh AI & tidak disimpan di server kami
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            aria-label="Pilih file foto dokumen"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleFile(file);
            }}
          />
        </div>
      ) : (
        <div className="rounded-2xl border bg-card overflow-hidden">
          <div className="relative bg-muted/30 flex items-center justify-center p-4 max-h-[420px]">
            <img
              src={previewUrl}
              alt={`Pratinjau dokumen ${fileName}`}
              className="max-h-[380px] w-auto rounded-lg shadow-sm object-contain"
            />
            <button
              type="button"
              onClick={reset}
              aria-label="Hapus foto dan mulai ulang"
              className="absolute top-3 right-3 h-10 w-10 rounded-full bg-background/90 border shadow-sm flex items-center justify-center hover:bg-background transition-colors"
            >
              <XCircle className="h-5 w-5 text-muted-foreground" aria-hidden />
            </button>
          </div>
          <div className="p-4 border-t flex items-center gap-3 text-sm text-muted-foreground">
            <FileImage className="h-4 w-4 shrink-0" aria-hidden />
            <span className="truncate">{fileName}</span>
            <span className="shrink-0">({Math.round(fileSize / 1024)} KB terkompresi)</span>
          </div>
        </div>
      )}

      {/* ==== Kategori ==== */}
      <fieldset>
        <legend className="text-sm font-semibold mb-2 flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-primary" aria-hidden /> Kategori dokumen (opsional — membantu AI lebih akurat)
        </legend>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              aria-pressed={category === c.id}
              className={`rounded-full border px-3.5 py-2 text-sm font-medium transition-colors min-h-[40px] ${
                category === c.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:border-primary/50"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* ==== Error ==== */}
      {error && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden />
          {error}
        </div>
      )}

      {/* ==== Tombol analisis ==== */}
      {previewUrl && !result && (
        <Button
          onClick={analyze}
          disabled={loading}
          className="w-full h-14 text-base font-bold rounded-xl shadow-md"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" aria-hidden />
              AI sedang membaca dokumen Anda… (±20 detik)
            </>
          ) : (
            <>
              <ScanSearch className="h-5 w-5 mr-2" aria-hidden />
              Periksa dengan AI Sekarang — Gratis
            </>
          )}
        </Button>
      )}

      {/* ==== Loading skeleton ==== */}
      {loading && (
        <div className="rounded-2xl border bg-card p-6 space-y-4" aria-busy="true" aria-label="Sedang menganalisis">
          <div className="h-5 w-1/2 bg-muted animate-pulse rounded" />
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
          <div className="grid gap-3 sm:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      )}

      {/* ==== Hasil ==== */}
      {result && !loading && (
        <div className="space-y-5">
          {source === "fallback" && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-sm text-amber-800 flex items-start gap-2">
              <Info className="h-4 w-4 mt-0.5 shrink-0" aria-hidden />
              Analisis AI sedang sibuk — berikut checklist manual dari tim kami. Coba unggah ulang untuk analisis AI penuh.
            </div>
          )}

          {/* Ringkasan */}
          <div className={`rounded-2xl border p-5 ${result.relevant ? "bg-card" : "bg-amber-50 border-amber-200"}`}>
            {!result.relevant && (
              <p className="text-sm text-amber-800 mb-2 font-medium">
                Foto yang terdeteksi tampaknya bukan dokumen legalitas — berikut apa yang AI lihat:
              </p>
            )}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 px-3 py-1 text-xs font-semibold">
                <ScanSearch className="h-3.5 w-3.5" aria-hidden /> {result.documentType}
              </span>
              <span className="text-xs text-muted-foreground">
                Keyakinan AI: {result.confidence}% ({confidenceLabel(result.confidence)})
              </span>
            </div>
            <p className="text-sm leading-relaxed">{result.summary}</p>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                <span>Kualitas foto (keterbacaan)</span>
                <span className="font-semibold">{result.legibilityScore}/100</span>
              </div>
              <Progress value={result.legibilityScore} aria-label={`Keterbacaan foto ${result.legibilityScore} dari 100`} />
              {result.legibilityScore < 55 && (
                <p className="text-xs text-amber-700 mt-1.5 flex items-center gap-1">
                  <HelpCircle className="h-3.5 w-3.5" aria-hidden /> Foto kurang jelas — hasil pemeriksaan bisa melewatkan detail. Disarankan foto ulang dengan cahaya lebih baik.
                </p>
              )}
            </div>
          </div>

          {/* Checklist */}
          {result.checks.length > 0 && (
            <div>
              <h3 className="font-bold text-lg mb-3">Hasil Pemeriksaan</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {result.checks.map((c, i) => (
                  <div key={i} className="rounded-xl border bg-card p-4 flex gap-3">
                    {statusIcon(c.status)}
                    <div className="min-w-0">
                      <p className="font-semibold text-sm">{c.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{c.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Masalah */}
          {result.issues.length > 0 && (
            <div>
              <h3 className="font-bold text-lg mb-3">Masalah yang Terdeteksi</h3>
              <div className="space-y-3">
                {result.issues.map((iss, i) => {
                  const style = severityStyle(iss.severity);
                  return (
                    <div key={i} className="rounded-xl border bg-card p-4">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${style.badge}`}>
                          {style.icon}
                          {iss.severity === "high" ? "RISIKO TINGGI" : iss.severity === "medium" ? "Perlu perhatian" : "Catatan"}
                        </span>
                        <p className="font-semibold text-sm">{iss.title}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{iss.detail}</p>
                      {iss.fix && (
                        <p className="text-sm mt-2 flex items-start gap-1.5">
                          <RefreshCw className="h-3.5 w-3.5 mt-0.5 text-primary shrink-0" aria-hidden />
                          <span><span className="font-semibold">Saran perbaikan:</span> {iss.fix}</span>
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Rekomendasi & langkah */}
          {(result.recommendations.length > 0 || result.nextSteps.length > 0) && (
            <div className="grid gap-4 sm:grid-cols-2">
              {result.recommendations.length > 0 && (
                <div className="rounded-2xl border bg-card p-5">
                  <h3 className="font-bold mb-3 flex items-center gap-1.5">
                    <Info className="h-4 w-4 text-primary" aria-hidden /> Rekomendasi
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {result.recommendations.map((r, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {result.nextSteps.length > 0 && (
                <div className="rounded-2xl border bg-card p-5">
                  <h3 className="font-bold mb-3 flex items-center gap-1.5">
                    <Send className="h-4 w-4 text-primary" aria-hidden /> Langkah Berikutnya
                  </h3>
                  <ol className="space-y-2 text-sm">
                    {result.nextSteps.map((s, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="h-5 w-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-4 text-base font-bold text-primary-foreground shadow-md transition-all hover:shadow-lg min-h-[44px]"
            >
              <Send className="h-5 w-5" aria-hidden />
              Kirim Hasil Ini ke Konsultan — Respons &lt; 5 Menit
            </a>
            <Button variant="outline" onClick={reset} className="sm:w-auto h-14 rounded-xl min-h-[44px]">
              <Camera className="h-5 w-5 mr-2" aria-hidden /> Periksa Dokumen Lain
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            Hasil AI bersifat bantu awal dan tidak menggantikan verifikasi resmi instansi (DJP, OSS/Kemeninvestasi, BPJPH, BPOM, Imigrasi).
            Untuk kepastian hukum, konsultasikan dengan konsultan kami.
          </p>
        </div>
      )}
    </div>
  );
}

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
