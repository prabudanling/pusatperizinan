// ============================================================
// PUSATPERIZINAN.COM — Halaman 404 Branded
// Static export akan merender file ini sebagai out/404.html
// (dirujuk oleh .htaccess: ErrorDocument 404 /404.html)
// ============================================================

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-16 text-center">
      <img src="/logo-icon.png" alt="Logo PusatPerizinan.com" className="h-16 w-16 mb-6" />
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Error 404</p>
      <h1 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
        Halaman Tidak Ditemukan
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground leading-relaxed">
        Maaf, halaman yang Anda cari tidak tersedia atau sudah dipindahkan.
        Kembali ke beranda untuk lanjut mengurus izin usaha Anda — NIB 1 hari,
        PT 3 hari, garansi 100%.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow hover:opacity-90 transition min-h-[44px]"
        >
          ← Kembali ke Beranda
        </a>
        <a
          href="https://wa.me/6281269999910"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-accent transition min-h-[44px]"
        >
          Tanya via WhatsApp
        </a>
      </div>
    </main>
  );
}
