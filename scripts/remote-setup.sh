#!/usr/bin/env bash
# ============================================================
# PUSATPERIZINAN.COM — Setup & kontrol di server Hostinger
# ------------------------------------------------------------
# Dijalankan SEKALI via hPanel → Terminal (atau SSH), dari
# folder aplikasi, untuk menyiapkan schema database SQLite.
# Aman diulang (idempoten).
#
# Pemakaian:
#   cd ~/domains/NAMADOMAIN/nodeapp      # folder Application root Anda
#   bash .deploy/remote-setup.sh
# ============================================================
set -uo pipefail

APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$APP_DIR"

echo "Folder aplikasi : $APP_DIR"
echo "Node            : $(node -v 2>/dev/null || echo 'node tidak ada di PATH — jalankan dari hPanel Terminal')"
echo ""

# 1. Pastikan file env ada
if [[ ! -f .env.production ]]; then
  echo "⚠  .env.production belum ada. Contoh minimal:"
  echo '   DATABASE_URL=file:'"$APP_DIR"'/db/custom.db'
  echo '   ADMIN_PASSWORD=KataSandiKuatAnda'
  echo '   ADMIN_SECRET=stringAcakPanjang32KarakterLebih'
  echo "   → buat via File Manager, lalu jalankan ulang script ini."
fi

# 2. Database SQLite — buat jika belum ada
mkdir -p db
DB_PATH="${DATABASE_URL#file:}"
[[ -z "${DB_PATH//}" || "$DB_PATH" == "\$DATABASE_URL" ]] && DB_PATH="$APP_DIR/db/custom.db"
echo "Database        : $DB_PATH"
[[ -f "$DB_PATH" ]] || touch "$DB_PATH"

# 3. Schema Prisma (idempoten — hanya menambah tabel yang belum ada)
TABLES=$(sqlite3 "$DB_PATH" ".tables" 2>/dev/null || echo "")
if echo "$TABLES" | grep -q "Lead"; then
  echo "✓ Schema database sudah ada — lewati."
else
  echo "→ Menulis schema Prisma (pertama kali, ±1-2 menit)..."
  if [[ ! -d node_modules/prisma ]]; then
    npm install --no-save prisma@6 --loglevel=error || {
      echo "❌ Gagal install prisma — cek koneksi/kouta server."; exit 1;
    }
  fi
  npx --no-install prisma db push --accept-data-loss --skip-generate --schema .deploy/schema.prisma && \
    echo "✓ Schema database siap." || echo "❌ db push gagal — periksa pesan di atas."
fi

# 4. Restart aplikasi Passenger
mkdir -p tmp
touch tmp/restart.txt
echo "✓ Aplikasi di-restart (tmp/restart.txt)."
echo ""
echo "Selesai. Buka domain Anda — jika 502, lihat crash.log / PANDUAN-DEPLOY-HOSTINGER.md (bagian troubleshooting)."
