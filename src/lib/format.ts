// ============================================================
// PUSATPERIZINAN.COM — Utilitas Format (shared)
// ============================================================

/** Format tanggal ISO (YYYY-MM-DD) → "10 Januari 2026" (id-ID, deterministik — aman SSR). */
export function fmtDateID(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const bulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];
  if (!y || !m || !d) return iso;
  return `${d} ${bulan[m - 1]} ${y}`;
}
