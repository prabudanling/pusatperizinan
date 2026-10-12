import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, adminPassword, createToken, verifyToken } from "@/lib/admin-auth";

// ============================================================
// POST /api/admin/auth — login (password → cookie httpOnly)
// GET  /api/admin/auth — cek sesi
// DELETE /api/admin/auth — logout
// ============================================================

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    if (!password || password !== adminPassword()) {
      return NextResponse.json(
        { success: false, error: "Password salah. Coba lagi." },
        { status: 401 }
      );
    }
    const { token, maxAge } = createToken();
    const res = NextResponse.json({ success: true, data: { authed: true } });
    res.cookies.set(ADMIN_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // sandbox/dev; saat produksi HTTPS aktifkan secure
      path: "/",
      maxAge,
    });
    return res;
  } catch {
    return NextResponse.json({ success: false, error: "Request tidak valid" }, { status: 400 });
  }
}

export async function GET() {
  const store = await cookies();
  const authed = verifyToken(store.get(ADMIN_COOKIE)?.value);
  return NextResponse.json({ success: true, data: { authed } });
}

export async function DELETE() {
  const res = NextResponse.json({ success: true, data: { authed: false } });
  res.cookies.set(ADMIN_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
