import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

// ============================================================
// /admin — Command Center Admin PusatPerizinan.com
// Server component: noindex (halaman internal, bukan untuk SEO)
// ============================================================

export const metadata: Metadata = {
  title: "Admin Command Center",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
