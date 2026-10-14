// ============================================================
// PUSATPERIZINAN.COM — Startup file untuk Passenger (Hostinger)
// ------------------------------------------------------------
// Diisi di hPanel → Node.js → "Application startup file".
//
// Tugas:
//  1. Memuat .env.production (database, password admin, dll.)
//  2. Menjamin NODE_ENV=production
//  3. Menjalankan server Next.js standalone (server.js)
//
// Passenger menyuntik PORT otomatis — server Next standalone
// membacanya, jadi tidak perlu diatur manual.
// ============================================================
const fs = require("node:fs");
const path = require("node:path");

function loadEnvFile(file) {
  if (!fs.existsSync(file)) return 0;
  let count = 0;
  for (const raw of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!m) continue;
    const [, key, rawVal] = m;
    if (process.env[key] === undefined) {
      process.env[key] = rawVal.replace(/^["']|["']$/g, "");
      count++;
    }
  }
  return count;
}

const here = __dirname;
const loaded =
  loadEnvFile(path.join(here, ".env.production")) +
  loadEnvFile(path.join(here, ".env"));

process.env.NODE_ENV = "production";

console.log(
  `[passenger.js] berjalan di ${here} | PORT=${process.env.PORT || "(auto)"} | env dimuat: ${loaded}`
);
console.log(`[passenger.js] DATABASE_URL=${process.env.DATABASE_URL || "(TIDAK DISET!)"}`);

try {
  require("./server.js");
} catch (err) {
  console.error("[passenger.js] GAGAL menjalankan server.js:", err);
  // Jangan biarkan Passenger loop-crash tanpa jejak — tulis jejak ke file
  fs.writeFileSync(path.join(here, "crash.log"), `${new Date().toISOString()}\n${err.stack}\n`);
  throw err;
}
