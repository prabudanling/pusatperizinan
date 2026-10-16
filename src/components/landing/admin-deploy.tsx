"use client";

// ============================================================
// PUSATPERIZINAN.COM — Admin Deploy Console (PRIVAT)
// ------------------------------------------------------------
// Akses: buka situs dengan ?admin=1  →  /?admin=1
// Password: PusatPerizinan2026!
// Fungsi: unduh SEMUA artefak deploy terbaru — paket statis
// upload-only (tanpa Node.js) untuk shared hosting idwebhost,
// plus panduan, checklist, katalog PDF, dan manifest.
// Sumber data: /download/pack-info.json (schema v2 — ditulis
// otomatis oleh scripts/deploy-pack.mjs saat rebuild).
// TIDAK tampil di halaman publik, TIDAK ada link dari footer.
// ============================================================

import { useCallback, useEffect, useState } from "react";
import {
  KeyRound,
  HardDriveDownload,
  X,
  Minus,
  Plus,
  FileArchive,
  Fingerprint,
  ShieldCheck,
  Loader2,
  FileText,
  FileJson,
  FileBadge,
  Clock,
  Sparkles,
  AlertTriangle,
  Download,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ADMIN_PASSWORD = "PusatPerizinan2026!";
const FALLBACK_FILE = "pusatperizinan-static-hosting.tar.gz";

interface PackFile {
  name: string;
  kind: "pack" | "doc" | "meta";
  label: string;
  bytes: number;
  sizeLabel: string;
  mtime?: string;
}

interface PackInfo {
  schema?: number;
  file: string;
  sizeBytes: number;
  sizeLabel?: string;
  md5: string;
  fileCount: number;
  htmlCount?: number;
  mode?: "light" | "full";
  modeLabel?: string;
  builtAt: string;
  note?: string;
  files?: PackFile[];
}

const KIND_ICON: Record<PackFile["kind"], LucideIcon> = {
  pack: FileArchive,
  doc: FileText,
  meta: FileJson,
};

function formatMB(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/** Format tanggal id-ID WIB — hanya dirender setelah unlock (client), aman hydration */
function formatWib(iso: string): string {
  try {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

/** Usia artefak dalam jam (fallback Infinity bila tak terbaca) */
function ageHours(iso?: string): number {
  if (!iso) return Infinity;
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return Infinity;
  return (Date.now() - t) / 36e5;
}

function FreshnessBadge({ iso }: { iso?: string }) {
  const h = ageHours(iso);
  if (!Number.isFinite(h)) return null;
  if (h < 24) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
        <Sparkles className="h-3 w-3" aria-hidden="true" /> Terbaru
      </span>
    );
  }
  if (h > 24 * 30) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-600 dark:text-amber-500">
        <AlertTriangle className="h-3 w-3" aria-hidden="true" /> &gt; 30 hari — pertimbangkan rebuild
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
      <Clock className="h-3 w-3" aria-hidden="true" /> {h < 48 ? "1 hari lalu" : `${Math.round(h / 24)} hari lalu`}
    </span>
  );
}

export function AdminDeploy() {
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState("");
  const [info, setInfo] = useState<PackInfo | null>(null);
  const [loadingInfo, setLoadingInfo] = useState(false);

  // Deteksi ?admin=1 — hanya di client, aman dari hydration mismatch
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("admin") === "1") setEnabled(true);
    } catch {
      /* abaikan */
    }
  }, []);

  const loadInfo = useCallback(async () => {
    setLoadingInfo(true);
    try {
      const res = await fetch(`/download/pack-info.json?t=${Date.now()}`, { cache: "no-store" });
      if (res.ok) setInfo((await res.json()) as PackInfo);
    } catch {
      // info tidak terbaca → tombol unduh tetap tampil dengan nama fallback
    } finally {
      setLoadingInfo(false);
    }
  }, []);

  const unlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === ADMIN_PASSWORD) {
      setUnlocked(true);
      setPassError("");
      setPass("");
      loadInfo();
    } else {
      setPassError("Password salah. Coba lagi.");
    }
  };

  const close = () => {
    setEnabled(false);
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete("admin");
      window.history.replaceState({}, "", url.toString());
    } catch {
      /* abaikan */
    }
  };

  if (!enabled) return null;

  const file = info?.file ?? FALLBACK_FILE;
  const listFiles: PackFile[] =
    info?.files && info.files.length > 0
      ? info.files
      : [{ name: file, kind: "pack", label: "Paket deploy utama", bytes: info?.sizeBytes ?? 0, sizeLabel: "" }];

  return (
    <aside
      aria-label="Admin Deploy Console (privat)"
      className="fixed bottom-4 left-4 z-[60] w-[360px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-emerald-900/20 bg-card text-card-foreground shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 bg-[oklch(0.23_0.03_165)] px-4 py-2.5 text-white">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="h-4 w-4 text-amber-400" aria-hidden="true" />
          Deploy Hosting · Privat
        </p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Perkecil panel" : "Perbesar panel"}
            className="rounded-md p-1 hover:bg-white/10 transition"
          >
            {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={close}
            aria-label="Tutup panel admin"
            className="rounded-md p-1 hover:bg-white/10 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {open && (
        <div className="max-h-[min(70vh,560px)] overflow-y-auto scrollbar-thin p-4">
          {!unlocked ? (
            /* ---------- Gerbang password ---------- */
            <form onSubmit={unlock} className="space-y-3">
              <label htmlFor="admin-pass" className="block text-xs font-medium text-muted-foreground">
                Panel ini hanya untuk pemilik situs. Masukkan password admin:
              </label>
              <div className="flex items-center gap-2">
                <KeyRound className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                <Input
                  id="admin-pass"
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="Password admin"
                  autoComplete="off"
                  autoFocus
                  className="h-9"
                />
              </div>
              {passError && (
                <p role="alert" className="text-xs font-medium text-destructive">
                  {passError}
                </p>
              )}
              <Button type="submit" size="sm" className="w-full min-h-[44px] font-semibold">
                Buka Kunci Panel
              </Button>
            </form>
          ) : (
            /* ---------- Panel terbuka ---------- */
            <div className="space-y-3">
              <p className="text-xs leading-relaxed text-muted-foreground">
                Paket deploy <strong>HTML + CSS + JavaScript murni</strong> — sudah di-build khusus
                untuk shared hosting <strong>tanpa Node.js</strong>. Cukup upload &amp; extract ke
                <code className="mx-1 rounded bg-muted px-1 py-0.5 text-[11px]">public_html</code>.
              </p>

              {/* Ringkasan paket utama */}
              <dl className="space-y-1.5 rounded-xl border bg-muted/40 p-3 text-xs">
                <div className="flex items-center gap-2">
                  <dt className="flex items-center gap-1.5 text-muted-foreground">
                    <FileArchive className="h-3.5 w-3.5" aria-hidden="true" /> Paket
                  </dt>
                  <dd className="ml-auto truncate font-semibold" title={file}>
                    {file}
                  </dd>
                </div>
                {info ? (
                  <>
                    <div className="flex items-center gap-2">
                      <dt className="text-muted-foreground">Ukuran</dt>
                      <dd className="ml-auto font-semibold">
                        {info.sizeLabel ?? formatMB(info.sizeBytes)}
                        {typeof info.htmlCount === "number" ? ` · ${info.htmlCount} hal.` : ""}
                      </dd>
                    </div>
                    {info.mode && (
                      <div className="flex items-center gap-2">
                        <dt className="text-muted-foreground">Mode build</dt>
                        <dd className="ml-auto">
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                              info.mode === "light"
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : "bg-amber-500/10 text-amber-600 dark:text-amber-500"
                            }`}
                            title={info.modeLabel}
                          >
                            {info.mode}
                          </span>
                        </dd>
                      </div>
                    )}
                    <div className="flex items-start gap-2">
                      <dt className="flex items-center gap-1.5 text-muted-foreground">
                        <Fingerprint className="h-3.5 w-3.5" aria-hidden="true" /> MD5
                      </dt>
                      <dd className="ml-auto max-w-[150px] truncate font-mono text-[10px]" title={info.md5}>
                        {info.md5}
                      </dd>
                    </div>
                    <div className="flex items-start gap-2">
                      <dt className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" /> Dibangun
                      </dt>
                      <dd className="ml-auto text-right">
                        <span className="block font-semibold">{formatWib(info.builtAt)} WIB</span>
                        <span className="mt-1 inline-block">
                          <FreshnessBadge iso={info.builtAt} />
                        </span>
                      </dd>
                    </div>
                  </>
                ) : loadingInfo ? (
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" /> Memuat info paket…
                  </p>
                ) : (
                  <p className="text-muted-foreground">
                    Info paket belum terbaca — paket mungkin belum di-build. Tombol di bawah tetap
                    bisa dicoba.
                  </p>
                )}
              </dl>

              {/* CTA unduh paket utama */}
              <a
                href={`/download/${file}`}
                download
                className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow hover:opacity-90 transition"
              >
                <HardDriveDownload className="h-4 w-4" aria-hidden="true" />
                Unduh Paket Upload-Only (.tar.gz)
              </a>

              {/* Semua artefak download — selalu terbaru dari pack-info.json */}
              <div className="rounded-xl border p-3">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Semua file unduhan ({listFiles.length})
                </p>
                <ul className="mt-2 space-y-1.5">
                  {listFiles.map((f) => {
                    const Icon = KIND_ICON[f.kind] ?? FileBadge;
                    const fresh = ageHours(f.mtime) < 24;
                    return (
                      <li
                        key={f.name}
                        className="flex items-center gap-2.5 rounded-lg border bg-background/60 px-2.5 py-2"
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                            f.kind === "pack"
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}
                          aria-hidden="true"
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-1.5">
                            <span className="truncate text-[12px] font-semibold" title={f.name}>
                              {f.label}
                            </span>
                            {fresh && (
                              <span
                                className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500"
                                title="Diperbarui dalam 24 jam terakhir"
                              />
                            )}
                          </span>
                          <span className="mt-0.5 block truncate text-[10.5px] text-muted-foreground" title={f.name}>
                            {f.name}
                            {f.sizeLabel ? ` · ${f.sizeLabel}` : ""}
                            {f.mtime && Number.isFinite(ageHours(f.mtime)) ? ` · ${formatWib(f.mtime)}` : ""}
                          </span>
                        </span>
                        <a
                          href={`/download/${f.name}`}
                          download
                          aria-label={`Unduh ${f.label}`}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-primary transition hover:bg-primary/10"
                        >
                          <Download className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-2 flex items-start gap-1.5 text-[10.5px] leading-relaxed text-muted-foreground">
                  <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500" aria-hidden="true" />
                  Titik hijau = diperbarui dalam 24 jam terakhir. Daftar &amp; tanggal mengikuti
                  rebuild terakhir (pack-info.json schema v2).
                </p>
              </div>

              <p className="text-[11px] leading-relaxed text-muted-foreground">
                <strong>Cara pakai:</strong> cPanel idwebhost → File Manager → public_html → Upload →
                klik kanan → Extract. Detail lengkap ada di <em>DEPLOY-IDWEBHOST.md</em>.
              </p>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
