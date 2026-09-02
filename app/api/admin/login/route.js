import { NextResponse } from "next/server";
import { getAdminCredentials, setAdminCookie } from "@/lib/admin-auth";

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const credentials = getAdminCredentials();
    if (username !== credentials.username || password !== credentials.password) {
      return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
    }
    const response = NextResponse.json({ ok: true });
    setAdminCookie(response, username);
    return response;
  } catch {
    return NextResponse.json({ error: "Unable to sign in." }, { status: 400 });
  }
}
