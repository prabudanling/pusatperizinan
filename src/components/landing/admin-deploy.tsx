"use client";

// ============================================================
// PUSATPERIZINAN.COM — Admin Deploy Console (PRIVAT)
// ------------------------------------------------------------
// Akses: buka situs dengan ?admin=1  →  /?admin=1
// Password: PusatPerizinan2026!
// Fungsi: unduh paket deploy statis (upload-only, tanpa Node.js)
// untuk shared hosting idwebhost. TIDAK tampil di halaman publik,
// TIDAK ada link dari footer (sesuai permintaan).
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ADMIN_PASSWORD = "PusatPerizinan2026!";
const FALLBACK_FILE = "pusatperizinan-static-hosting.tar.gz";

interface PackInfo {
  file: string;
  sizeBytes: number;
  md5: string;
  fileCount: number;
  builtAt: string;
  note?: string;
}

function formatMB(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
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

  return (
    <aside
      aria-label="Admin Deploy Console (privat)"
      className="fixed bottom-4 left-4 z-[60] w-[330px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-emerald-900/20 bg-card text-card-foreground shadow-2xl"
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
        <div className="p-4">
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
                      <dd className="ml-auto font-semibold">{formatMB(info.sizeBytes)}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <dt className="text-muted-foreground">Jumlah file</dt>
                      <dd className="ml-auto font-semibold">{info.fileCount}</dd>
                    </div>
                    <div className="flex items-start gap-2">
                      <dt className="flex items-center gap-1.5 text-muted-foreground">
                        <Fingerprint className="h-3.5 w-3.5" aria-hidden="true" /> MD5
                      </dt>
                      <dd className="ml-auto max-w-[150px] truncate font-mono text-[10px]" title={info.md5}>
                        {info.md5}
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

              <a
                href={`/download/${file}`}
                download
                className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow hover:opacity-90 transition"
              >
                <HardDriveDownload className="h-4 w-4" aria-hidden="true" />
                Unduh Paket Upload-Only (.tar.gz)
              </a>

              <p className="text-[11px] leading-relaxed text-muted-foreground">
                <strong>Cara pakai:</strong> cPanel idwebhost → File Manager → public_html → Upload →
                klik kanan → Extract. Detail lengkap ada di <em>DEPLOY-IDWEBHOST.md</em> di dalam paket.
              </p>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
