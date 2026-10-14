import crypto from "crypto";

// ============================================================
// PUSATPERIZINAN.COM — Admin Auth (ringan, tanpa dependency baru)
// Token = HMAC-SHA256(expiry) tersimpan di cookie httpOnly.
// Password diatur lewat env ADMIN_PASSWORD (fallback utk sandbox).
// ============================================================

export const ADMIN_COOKIE = "pp_admin_token";
const TTL_MS = 12 * 60 * 60 * 1000; // sesi 12 jam

function secret(): string {
  return process.env.ADMIN_SECRET || "pusatperizinan-mission-control-secret";
}

export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || "admin2026";
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", secret()).update(payload).digest("hex");
}

export function createToken(): { token: string; maxAge: number } {
  const expiry = Date.now() + TTL_MS;
  const payload = String(expiry);
  const token = `${payload}.${sign(payload)}`;
  return { token, maxAge: Math.floor(TTL_MS / 1000) };
}

export function verifyToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expiry = Number(payload);
  if (!Number.isFinite(expiry) || expiry < Date.now()) return false;
  const expected = sign(payload);
  // perbandingan konstan-waktu sederhana
  if (expected.length !== sig.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
}
