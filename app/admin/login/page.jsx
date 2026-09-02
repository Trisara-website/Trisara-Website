"use client";

import { useState } from "react";
import { LockKeyhole, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Invalid credentials.");
      window.location.href = "/admin";
    } catch (err) {
      setError(err.message);
    } finally { setLoading(false); }
  }

  return (
    <main className="min-h-screen bg-[#f8f5ef] px-5 py-16">
      <div className="mx-auto max-w-md rounded-2xl border border-ink/10 bg-white p-8 shadow-[0_30px_80px_-45px_rgba(0,0,0,.35)]">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-maroon text-white"><LockKeyhole size={24} /></div>
          <p className="text-xs uppercase tracking-[4px] text-vermillion">Trisara</p>
          <h1 className="mt-2 font-display text-3xl">Admin Portal</h1>
          <p className="mt-2 text-sm text-ink/55">Sign in to manage leads and bookings.</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <input autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="w-full rounded-lg border border-ink/15 bg-paper px-4 py-3 outline-none focus:border-maroon" />
          <input autoComplete="current-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full rounded-lg border border-ink/15 bg-paper px-4 py-3 outline-none focus:border-maroon" />
          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-lg bg-maroon px-4 py-3 text-sm font-semibold uppercase tracking-[1.5px] text-white transition hover:bg-maroonDeep disabled:opacity-60">
            {loading ? "Signing in…" : "Sign in"} <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </main>
  );
}
