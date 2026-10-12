"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Search, X, FileDown } from "lucide-react";
import {
  LAYANAN_500,
  slugOf,
  fmtIdr,
  diskonLabel,
  LAYANAN_KATEGORI,
  LAYANAN_STATS,
} from "@/lib/layanan-500";

// ============================================================
// PUSATPERIZINAN.COM — Browser Katalog 500 Layanan (client)
// Search instan (nama/kode) + filter kategori & sub-kategori +
// load-more bertahap agar DOM ringan di perangkat mobile.
// Deep-link & navigasi in-page via hash (external system):
// /katalog#kat-BU → filter kategori BU; /katalog#BU-PT → filter sub.
// Pakai useSyncExternalStore agar aman SSR/hidrasi & lint-bersih.
// ============================================================

const PAGE_SIZE = 36;

function subscribeHash(onChange: () => void): () => void {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

const getHash = (): string => window.location.hash.replace("#", "");
const getServerHash = (): string => "";

/** Parse hash → filter kategori/sub (pure). */
function parseHash(hash: string): { kat: string | null; sub: string | null } {
  const h = decodeURIComponent(hash).trim();
  if (!h) return { kat: null, sub: null };
  if (h.startsWith("kat-")) {
    const kode = h.slice(4);
    return LAYANAN_KATEGORI.some((k) => k.kode === kode)
      ? { kat: kode, sub: null }
      : { kat: null, sub: null };
  }
  for (const k of LAYANAN_KATEGORI) {
    const sk = k.sub.find((x) => x.kode === h);
    if (sk) return { kat: k.kode, sub: sk.kode };
  }
  return { kat: null, sub: null };
}

export default function Katalog500Browser() {
  const hash = useSyncExternalStore(subscribeHash, getHash, getServerHash);
  const parsed = useMemo(() => parseHash(hash), [hash]);

  // Null = ikuti filter dari hash; non-null = override pilihan user.
  const [userQ, setUserQ] = useState("");
  const [userKat, setUserKat] = useState<string | null>(null);
  const [userSub, setUserSub] = useState<string | null>(null);
  const [limit, setLimit] = useState(PAGE_SIZE);

  const q = userQ;
  const kat = userKat ?? parsed.kat ?? "ALL";
  const sub = userSub ?? parsed.sub ?? "ALL";

  const subOptions = useMemo(
    () =>
      kat === "ALL"
        ? LAYANAN_KATEGORI.flatMap((k) => k.sub)
        : (LAYANAN_KATEGORI.find((k) => k.kode === kat)?.sub ?? []),
    [kat]
  );

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return LAYANAN_500.filter((s) => {
      if (kat !== "ALL" && s.kategori_kode !== kat) return false;
      if (sub !== "ALL" && s.sub_kode !== sub) return false;
      if (!needle) return true;
      return (
        s.nama.toLowerCase().includes(needle) ||
        s.kode.toLowerCase().includes(needle) ||
        s.sub.toLowerCase().includes(needle) ||
        s.deskripsi.toLowerCase().includes(needle)
      );
    });
  }, [q, kat, sub]);

  const shown = filtered.slice(0, limit);

  function reset() {
    setUserQ("");
    setUserKat(null);
    setUserSub(null);
    setLimit(PAGE_SIZE);
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm md:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" aria-hidden />
            <input
              type="search"
              value={q}
              onChange={(e) => {
                setUserQ(e.target.value);
                setLimit(PAGE_SIZE);
              }}
              placeholder="Cari nama layanan atau kode item — mis. NIB, halal, BU-PT-001…"
              aria-label="Cari layanan di katalog 500 layanan"
              className="w-full rounded-xl border border-stone-300 bg-white py-2.5 pl-9 pr-9 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
            {q && (
              <button
                onClick={() => setUserQ("")}
                aria-label="Hapus pencarian"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-600"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            )}
          </div>
          <select
            value={kat}
            onChange={(e) => {
              setUserKat(e.target.value);
              setUserSub("ALL");
              setLimit(PAGE_SIZE);
            }}
            aria-label="Filter kategori besar"
            className="rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500"
          >
            <option value="ALL">Semua Kategori ({LAYANAN_STATS.total})</option>
            {LAYANAN_KATEGORI.map((k) => (
              <option key={k.kode} value={k.kode}>
                {k.kode} — {k.nama} ({k.total})
              </option>
            ))}
          </select>
          <select
            value={sub}
            onChange={(e) => {
              setUserSub(e.target.value);
              setLimit(PAGE_SIZE);
            }}
            aria-label="Filter sub-kategori"
            className="rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500"
          >
            <option value="ALL">Semua Sub-Kategori ({subOptions.length})</option>
            {subOptions.map((sk) => (
              <option key={sk.kode} value={sk.kode}>
                {sk.kode} — {sk.nama} ({sk.layanan.length})
              </option>
            ))}
          </select>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
          <p aria-live="polite">
            Menampilkan <strong className="text-stone-800">{shown.length}</strong> dari{" "}
            <strong className="text-stone-800">{filtered.length}</strong> layanan
            {q || kat !== "ALL" || sub !== "ALL" ? " (terfilter)" : ""} · kupon {LAYANAN_STATS.diskonMin}–
            {LAYANAN_STATS.diskonMax}%
          </p>
          {(q || kat !== "ALL" || sub !== "ALL") && (
            <button onClick={reset} className="font-semibold text-emerald-700 hover:underline">
              Reset filter
            </button>
          )}
        </div>
      </div>

      {/* Grid hasil */}
      {shown.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-10 text-center">
          <p className="font-semibold text-stone-700">Tidak ada layanan yang cocok.</p>
          <p className="mt-1 text-sm text-stone-500">
            Coba kata kunci lain, atau konsultasi gratis — kebutuhan Anda mungkin kami tangani lewat kombinasi layanan.
          </p>
          <button onClick={reset} className="mt-4 rounded-xl bg-emerald-800 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-700">
            Reset pencarian
          </button>
        </div>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Daftar layanan">
          {shown.map((s) => (
            <li key={s.kode}>
              <Link
                href={`/${slugOf(s)}`}
                className="group flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-bold text-emerald-700">{s.kode}</span>
                  <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-700">
                    -{Math.round(s.diskon * 100)}%
                  </span>
                </div>
                <h3 className="mt-2 font-bold leading-snug text-stone-900 group-hover:text-emerald-800">{s.nama}</h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-stone-500">{s.deskripsi}</p>
                <div className="mt-auto pt-3">
                  <p className="text-sm">
                    <span className="text-stone-400 line-through">{fmtIdr(s.harga)}</span>{" "}
                    <span className="text-lg font-extrabold text-emerald-800">{fmtIdr(s.harga_diskon)}</span>
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-amber-600">{diskonLabel(s)} · {s.sub}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Load more */}
      {shown.length < filtered.length && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setLimit((n) => n + PAGE_SIZE)}
            className="rounded-xl border border-emerald-800 px-6 py-3 text-sm font-bold text-emerald-800 transition hover:bg-emerald-800 hover:text-white"
          >
            Tampilkan lebih banyak ({filtered.length - shown.length} lagi)
          </button>
        </div>
      )}

      {/* Download katalog PDF */}
      <div className="mt-10 rounded-2xl bg-emerald-50 p-5 text-center md:p-6">
        <p className="font-bold text-stone-900">Ingin versi lengkap untuk dibaca offline?</p>
        <p className="mt-1 text-sm text-stone-600">
          Unduh katalog resmi 500 layanan (edisi {new Date().getFullYear()}) — lengkap dengan kode item & harga kupon.
        </p>
        <a
          href="/download/katalog-500-layanan-pusatperizinan.pdf"
          download
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-800 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
        >
          <FileDown className="h-4 w-4" aria-hidden />
          Unduh Katalog PDF (500 Layanan)
        </a>
      </div>
    </div>
  );
}
