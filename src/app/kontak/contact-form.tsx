"use client";

import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Send,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CONTACT } from "@/lib/site";

// ============================================================
// PUSATPERIZINAN.COM — ContactForm (/kontak)
// Lead capture ujung funnel → POST /api/leads (server action route).
// KONTRAK API (src/app/api/leads/route.ts — dibaca, tidak diubah):
//   { name, whatsapp, email?, businessType?, businessDesc?, package?, source? }
//   - name      : string, min. 2 karakter (wajib)
//   - whatsapp  : string; API men-strip non-digit lalu mewajibkan 9–15 digit
//   - businessType: bila dikirim HARUS anggota SECTORS → kita kirim "Lainnya"
//     (valid) dan meletakkan kebutuhan utama di awal businessDesc agar
//     informasi tetap masuk ke admin dashboard + notifikasi
//   - source    : "kontak" (segmentasi lead di Mission Control)
// ============================================================

const KEBUTUHAN = [
  "NIB & OSS",
  "Pendirian PT/CV",
  "Sertifikasi Halal",
  "BPOM/PIRT",
  "Pajak",
  "Lainnya",
] as const;

type Status = "idle" | "loading" | "success" | "error";

interface FieldErrors {
  nama?: string;
  whatsapp?: string;
}

export function ContactForm() {
  const [nama, setNama] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [kebutuhan, setKebutuhan] = useState<string>("NIB & OSS");
  const [pesan, setPesan] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const waDigits = whatsapp.replace(/[^0-9]/g, "");

  // Fallback WhatsApp bila submit gagal — lead tetap masuk, tidak hangus.
  const waFallbackHref = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    `Halo, saya ${nama.trim() || "(nama)"} ingin konsultasi perizinan. Kebutuhan: ${kebutuhan}.${pesan.trim() ? ` ${pesan.trim()}` : ""}`
  )}`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");

    // Honeypot terisi = bot → buang diam-diam (tampilkan sukses agar bot tidak belajar).
    if (honeypot) {
      setStatus("success");
      return;
    }

    // Validasi klien — sedikit lebih ketat & sinkron dengan validasi API.
    const errors: FieldErrors = {};
    if (nama.trim().length < 2) {
      errors.nama = "Nama wajib diisi (min. 2 karakter).";
    }
    if (waDigits.length < 9 || waDigits.length > 15) {
      errors.whatsapp = "Nomor WhatsApp tidak valid (isi 9–15 digit).";
    } else if (!/^(08|62)/.test(waDigits)) {
      errors.whatsapp = "Nomor harus diawali 08 atau 62.";
    }
    setFieldErrors(errors);
    if (errors.nama || errors.whatsapp) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nama.trim(),
          whatsapp: waDigits,
          businessType: "Lainnya",
          businessDesc: `Kebutuhan: ${kebutuhan}${pesan.trim() ? ` — ${pesan.trim()}` : ""}`,
          source: "kontak",
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(
          typeof json.error === "string" ? json.error : "Terjadi kesalahan. Coba lagi."
        );
      }
      // Sukses: panel inline TAMPIL (form tidak diganti) + reset isian.
      setStatus("success");
      setNama("");
      setWhatsapp("");
      setKebutuhan("NIB & OSS");
      setPesan("");
      setFieldErrors({});
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Terjadi kesalahan. Coba lagi.");
    }
  }

  return (
    <div className="glass-card rounded-2xl border border-primary/15 p-6 shadow-sm sm:p-8">
      {/* Panel sukses — inline, form tetap tersedia */}
      {status === "success" && (
        <div
          role="status"
          className="mb-6 flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/5 p-4"
        >
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
          <div>
            <p className="font-semibold text-foreground">Formulir berhasil dikirim.</p>
            <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
              Terima kasih! Konsultan kami menghubungi Anda {"<"} 1 jam kerja via
              WhatsApp {CONTACT.phoneDisplay}.
            </p>
          </div>
        </div>
      )}

      {/* Panel gagal — inline merah + fallback WhatsApp */}
      {status === "error" && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/5 p-4"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" aria-hidden />
          <div>
            <p className="text-sm font-semibold text-destructive">
              Pengiriman gagal: {errorMsg}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Butuh bantuan segera?{" "}
              <a
                href={waFallbackHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
              >
                <MessageCircle className="h-3.5 w-3.5" aria-hidden />
                Chat WhatsApp langsung
              </a>
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Honeypot anti-bot — tak terlihat manusia, tak ter-tab */}
        <div aria-hidden="true" className="hidden">
          <Label htmlFor="company_website">Company website</Label>
          <Input
            id="company_website"
            name="company_website"
            type="text"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Nama */}
          <div className="sm:col-span-1">
            <Label htmlFor="nama" className="mb-1.5 block">
              Nama Lengkap <span className="text-destructive">*</span>
            </Label>
            <Input
              id="nama"
              name="nama"
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="cth. Budi Santoso"
              maxLength={100}
              required
              aria-required="true"
              aria-invalid={Boolean(fieldErrors.nama)}
              aria-describedby={fieldErrors.nama ? "nama-error" : undefined}
              className={fieldErrors.nama ? "border-destructive" : undefined}
            />
            {fieldErrors.nama && (
              <p id="nama-error" className="mt-1.5 text-xs font-medium text-destructive">
                {fieldErrors.nama}
              </p>
            )}
          </div>

          {/* WhatsApp */}
          <div className="sm:col-span-1">
            <Label htmlFor="whatsapp" className="mb-1.5 block">
              Nomor WhatsApp <span className="text-destructive">*</span>
            </Label>
            <Input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              inputMode="numeric"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="08xxxxxxxxxx"
              pattern="[0-9\-+ ]{9,17}"
              maxLength={17}
              required
              aria-required="true"
              aria-invalid={Boolean(fieldErrors.whatsapp)}
              aria-describedby={
                fieldErrors.whatsapp ? "whatsapp-error" : "whatsapp-hint"
              }
              className={fieldErrors.whatsapp ? "border-destructive" : undefined}
            />
            {fieldErrors.whatsapp ? (
              <p id="whatsapp-error" className="mt-1.5 text-xs font-medium text-destructive">
                {fieldErrors.whatsapp}
              </p>
            ) : (
              <p id="whatsapp-hint" className="mt-1.5 text-xs text-muted-foreground">
                Konsultan menghubungi lewat sini — bukan telepon sales.
              </p>
            )}
          </div>

          {/* Kebutuhan utama */}
          <div className="sm:col-span-2">
            <Label htmlFor="kebutuhan" className="mb-1.5 block">
              Kebutuhan Utama
            </Label>
            <Select value={kebutuhan} onValueChange={(v) => setKebutuhan(v)}>
              <SelectTrigger
                id="kebutuhan"
                aria-label="Kebutuhan utama"
                aria-required="true"
                className="w-full"
              >
                <SelectValue placeholder="Pilih kebutuhan utama" />
              </SelectTrigger>
              <SelectContent>
                {KEBUTUHAN.map((k) => (
                  <SelectItem key={k} value={k}>
                    {k}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Pesan (opsional) */}
          <div className="sm:col-span-2">
            <Label htmlFor="pesan" className="mb-1.5 block">
              Ceritakan Rencana Usaha Anda{" "}
              <span className="font-normal text-muted-foreground">(opsional)</span>
            </Label>
            <Textarea
              id="pesan"
              name="pesan"
              value={pesan}
              onChange={(e) => setPesan(e.target.value)}
              placeholder="cth. Saya mau buka kafe di Bekasi — perlu NIB, izin PIRT, dan sertifikat halal. Kira-kira biaya dan lamanya berapa?"
              rows={4}
              maxLength={1000}
            />
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          size="lg"
          disabled={status === "loading"}
          className="mt-6 w-full gap-2 text-base font-semibold"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Mengirim…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden />
              Kirim &amp; Minta Konsultasi Gratis
            </>
          )}
        </Button>

        <p className="mt-4 flex items-start gap-1.5 text-xs leading-relaxed text-muted-foreground">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
          <span>
            Data Anda aman — hanya dipakai untuk konsultasi &amp; pengurusan izin
            Anda, sesuai UU PDP 27/2022.{" "}
            <Link href="/kebijakan-privasi" className="font-semibold text-primary hover:underline">
              Kebijakan Privasi
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
}
