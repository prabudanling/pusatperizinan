// ============================================================
// PUSATPERIZINAN.COM — PAYMENT CONFIG RESOLVER
// ============================================================
// Menentukan jalur pembayaran aktif dari environment variables:
//   1. MIDTRANS_SERVER_KEY + MIDTRANS_CLIENT_KEY  → Midtrans Snap
//   2. TRIPAY_API_KEY + TRIPAY_PRIVATE_KEY + TRIPAY_MERCHANT_CODE → Tripay
//   3. PAYMENT_DEMO_MODE=true (tanpa gateway)     → Mode Uji Coba
//   4. Fallback                                   → Transfer manual
//
// AMAN: bila kunci gateway terpasang, mode uji coba TIDAK AKAN
// dipakai — mustahil order produksi tertukar dengan simulasi.
// ============================================================

export type PaymentProvider = "midtrans" | "tripay" | "demo" | "manual";

export interface PaymentMethod {
  code: string;
  label: string;
  group: "qris" | "va" | "ewallet" | "retail" | "all";
}

export interface PaymentConfig {
  provider: PaymentProvider;
  /** sandbox | production | demo | manual */
  mode: string;
  /** Teks status untuk ditampilkan di checkout. */
  label: string;
  /** Metode yang WAJIB dipilih user (Tripay); kosong = provider pilih sendiri. */
  methods: PaymentMethod[];
  /** Info rekening transfer manual (fallback). */
  manualInfo?: string;
}

const METHOD_LABELS: Record<string, string> = {
  QRIS: "QRIS — semua e-wallet & m-banking",
  QRISC: "QRIS Custom",
  BRIVA: "Virtual Account BRI",
  BCAVA: "Virtual Account BCA",
  BNIVA: "Virtual Account BNI",
  MANDIRIVA: "Virtual Account Mandiri",
  PERMATAVA: "Virtual Account Permata",
  SHOPEEPAY: "ShopeePay",
  OVO: "OVO",
  DANA: "DANA",
  GOPAY: "GoPay",
  ALFAMART: "Alfamart",
  INDOMARET: "Indomaret",
};

function methodGroup(code: string): PaymentMethod["group"] {
  if (code.startsWith("QRIS")) return "qris";
  if (code.endsWith("VA")) return "va";
  if (["SHOPEEPAY", "OVO", "DANA", "GOPAY"].includes(code)) return "ewallet";
  if (["ALFAMART", "INDOMARET"].includes(code)) return "retail";
  return "all";
}

export function getMidtransKeys() {
  const serverKey = process.env.MIDTRANS_SERVER_KEY || "";
  const clientKey = process.env.MIDTRANS_CLIENT_KEY || "";
  const isProduction = process.env.MIDTRANS_IS_PRODUCTION === "true";
  return { serverKey, clientKey, isProduction, ok: !!(serverKey && clientKey) };
}

export function getTripayKeys() {
  const apiKey = process.env.TRIPAY_API_KEY || "";
  const privateKey = process.env.TRIPAY_PRIVATE_KEY || "";
  const merchantCode = process.env.TRIPAY_MERCHANT_CODE || "";
  const isProduction = process.env.TRIPAY_IS_PRODUCTION === "true";
  return { apiKey, privateKey, merchantCode, isProduction, ok: !!(apiKey && privateKey && merchantCode) };
}

export function getPaymentConfig(): PaymentConfig {
  const mt = getMidtransKeys();
  if (mt.ok) {
    return {
      provider: "midtrans",
      mode: mt.isProduction ? "production" : "sandbox",
      label: "Semua metode otomatis: QRIS, VA semua bank, GoPay/ShopeePay/DANA, kartu kredit & retail",
      methods: [],
    };
  }

  const tp = getTripayKeys();
  if (tp.ok) {
    const codes = (process.env.TRIPAY_METHODS || "QRIS,BRIVA,BCAVA,BNIVA,MANDIRIVA,SHOPEEPAY,ALFAMART,INDOMARET")
      .split(",")
      .map((c) => c.trim().toUpperCase())
      .filter(Boolean);
    return {
      provider: "tripay",
      mode: tp.isProduction ? "production" : "sandbox",
      label: "Pilih metode pembayaran favoritmu:",
      methods: codes.map((code) => ({
        code,
        label: METHOD_LABELS[code] || code,
        group: methodGroup(code),
      })),
    };
  }

  if (process.env.PAYMENT_DEMO_MODE === "true") {
    return {
      provider: "demo",
      mode: "demo",
      label: "MODE UJI COBA — pembayaran disimulasikan. Daftar Midtrans/Tripay untuk menerima uang sungguhan.",
      methods: [],
    };
  }

  return {
    provider: "manual",
    mode: "manual",
    label: "Transfer manual + konfirmasi WhatsApp",
    methods: [],
    manualInfo: process.env.BANK_TRANSFER_INFO || "",
  };
}

export const APP_URL_FALLBACK = "https://pusatperizinan.com";
