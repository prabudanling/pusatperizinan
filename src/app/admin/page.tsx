import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyToken } from "@/lib/admin-auth";
import { AdminLogin } from "@/components/admin/login";
import { AdminDashboard } from "@/components/admin/dashboard";

// ============================================================
// PUSATPERIZINAN.COM — MISSION CONTROL (Admin Dashboard)
// URL diskrit, noindex, dilindungi password (cookie httpOnly).
// ============================================================

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mission Control — Admin PusatPerizinan",
  robots: { index: false, follow: false, nocache: true },
};

export default async function AdminPage() {
  const store = await cookies();
  const authed = verifyToken(store.get(ADMIN_COOKIE)?.value);

  if (!authed) {
    return <AdminLogin />;
  }
  return <AdminDashboard />;
}
