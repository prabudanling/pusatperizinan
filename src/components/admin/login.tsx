"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Loader2, KeyRound } from "lucide-react";

// ============================================================
// Gerbang login Mission Control — minimalis, aman, cepat
// ============================================================

export function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (!json.success) {
        setError(json.error || "Login gagal");
        return;
      }
      router.refresh(); // server page kini melihat cookie valid
    } catch {
      setError("Koneksi bermasalah. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-stone-950 px-4">
      {/* Ambient emerald glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-amber-500/5 blur-3xl" />
      </div>

      <section className="relative w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10">
            <ShieldCheck className="h-8 w-8 text-emerald-400" aria-hidden />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-stone-100">Mission Control</h1>
          <p className="mt-1 text-sm text-stone-400">PusatPerizinan.com · Panel Admin</p>
        </div>

        <form
          onSubmit={submit}
          className="rounded-2xl border border-stone-800 bg-stone-900/70 p-6 shadow-2xl backdrop-blur"
        >
          <div className="space-y-2">
            <Label htmlFor="admin-password" className="text-stone-300">
              Password Admin
            </Label>
            <div className="relative">
              <KeyRound aria-hidden className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
              <Input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                className="min-h-[44px] border-stone-700 bg-stone-950/80 pl-10 text-stone-100 placeholder:text-stone-600 focus-visible:ring-emerald-500/40"
                autoFocus
                required
              />
            </div>
          </div>

          {error && (
            <p role="alert" className="mt-3 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading || password.length === 0}
            className="mt-5 min-h-[44px] w-full bg-emerald-500 font-semibold text-stone-950 hover:bg-emerald-400"
          >
            {loading ? (
              <>
                <Loader2 aria-hidden className="mr-2 h-4 w-4 animate-spin" /> Memverifikasi…
              </>
            ) : (
              "Masuk Mission Control"
            )}
          </Button>

          <p className="mt-4 text-center text-xs text-stone-500">
            Sesi berlaku 12 jam · Terenkripsi httpOnly
          </p>
        </form>
      </section>
    </main>
  );
}
