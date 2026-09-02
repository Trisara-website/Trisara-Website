"use client";

import { useEffect, useState } from "react";
import { Search, CalendarDays, LogOut, RefreshCw, Users, CheckCircle2, XCircle, ShieldAlert, CalendarCheck2, ChevronDown } from "lucide-react";

const STATUSES = ["new", "qualified", "unqualified", "spam", "booked"];
const TYPES = ["all", "booking", "enquiry", "offer"];
const statusLabel = { new: "New", qualified: "Qualified", unqualified: "Unqualified", spam: "Spam", booked: "Booked" };
const typeLabel = { booking: "Booking", enquiry: "Enquiry", offer: "Offer" };

function formatDate(value) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

function StatusBadge({ status }) {
  const cls = { new: "bg-slate-100 text-slate-700", qualified: "bg-emerald-50 text-emerald-700", unqualified: "bg-amber-50 text-amber-700", spam: "bg-red-50 text-red-700", booked: "bg-blue-50 text-blue-700" }[status] || "bg-slate-100 text-slate-700";
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${cls}`}>{statusLabel[status] || status}</span>;
}

function StatCard({ icon: Icon, label, value }) {
  return <div className="rounded-xl border border-ink/10 bg-white p-4"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-paper text-maroon"><Icon size={18} /></div><div><div className="text-xs uppercase tracking-[1.5px] text-ink/45">{label}</div><div className="mt-1 text-xl font-semibold">{value}</div></div></div></div>;
}

export default function AdminPage() {
  const [leads, setLeads] = useState([]);
  const [booked, setBooked] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [activeTab, setActiveTab] = useState("leads");
  const [updating, setUpdating] = useState("");
  const [counts, setCounts] = useState({});

  async function load() {
    setLoading(true); setError("");
    try {
      const params = new URLSearchParams({ type, status, search, from, to, limit: "500" });
      const res = await fetch(`/api/admin/leads?${params.toString()}`, { cache: "no-store" });
      if (res.status === 401) { window.location.href = "/admin/login"; return; }
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Could not load leads.");
      setLeads(body.leads || []); setCounts(body.counts || {});
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  }

  useEffect(() => { load(); }, [type, status, from, to]);
  useEffect(() => { const t = setTimeout(() => load(), 350); return () => clearTimeout(t); }, [search]);

  async function updateStatus(lead, nextStatus) {
    if (lead.status === nextStatus) return;
    setUpdating(lead.id);
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: lead.type, status: nextStatus }) });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Could not update status.");
      setLeads((current) => current.map((item) => item.id === lead.id && item.type === lead.type ? { ...item, status: nextStatus, updatedAt: new Date().toISOString() } : item));
      if (nextStatus === "booked") setActiveTab("booked");
      await load();
    } catch (err) { setError(err.message); } finally { setUpdating(""); }
  }

  async function logout() { await fetch("/api/admin/logout", { method: "POST" }); window.location.href = "/admin/login"; }

  async function loadBooked() {
    try {
      const res = await fetch("/api/admin/leads?type=all&status=booked&limit=500", { cache: "no-store" });
      if (res.status === 401) { window.location.href = "/admin/login"; return; }
      const body = await res.json();
      if (res.ok) setBooked(body.leads || []);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    if (activeTab === "booked") loadBooked();
  }, [activeTab]);

  return (
    <main className="min-h-screen bg-[#f8f5ef] px-4 pb-16 pt-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div><p className="text-xs uppercase tracking-[4px] text-vermillion">Trisara</p><h1 className="mt-1 font-display text-3xl md:text-4xl">Lead Management</h1><p className="mt-1 text-sm text-ink/55">Review, qualify and track every website lead.</p></div>
          <div className="flex gap-2"><button onClick={load} className="inline-flex items-center gap-2 rounded-lg border border-ink/10 bg-white px-4 py-2.5 text-sm"><RefreshCw size={15} /> Refresh</button><button onClick={logout} className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm text-white"><LogOut size={15} /> Sign out</button></div>
        </header>

        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard icon={Users} label="All loaded" value={counts.all ?? 0} /><StatCard icon={Users} label="New" value={counts.new ?? 0} /><StatCard icon={CheckCircle2} label="Qualified" value={counts.qualified ?? 0} /><StatCard icon={ShieldAlert} label="Spam" value={counts.spam ?? 0} /><StatCard icon={CalendarCheck2} label="Booked" value={counts.booked ?? 0} />
        </div>

        <div className="mb-5 flex rounded-xl border border-ink/10 bg-white p-1">
          <button onClick={() => setActiveTab("leads")} className={`flex-1 rounded-lg px-4 py-3 text-sm font-semibold ${activeTab === "leads" ? "bg-maroon text-white" : "text-ink/60"}`}>All Leads</button>
          <button onClick={() => setActiveTab("booked")} className={`flex-1 rounded-lg px-4 py-3 text-sm font-semibold ${activeTab === "booked" ? "bg-maroon text-white" : "text-ink/60"}`}>Booked Leads ({booked.length})</button>
        </div>

        {activeTab === "leads" && <>
          <section className="mb-5 rounded-xl border border-ink/10 bg-white p-4">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
              <div className="relative lg:col-span-2"><Search size={17} className="absolute left-3 top-3.5 text-ink/35" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name or phone number" className="w-full rounded-lg border border-ink/10 bg-paper py-3 pl-10 pr-3 text-sm outline-none focus:border-maroon" /></div>
              <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-lg border border-ink/10 bg-paper px-3 text-sm"><option value="all">All lead types</option>{TYPES.slice(1).map((x) => <option key={x} value={x}>{typeLabel[x]}</option>)}</select>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-lg border border-ink/10 bg-paper px-3 text-sm"><option value="all">All statuses</option>{STATUSES.map((x) => <option key={x} value={x}>{statusLabel[x]}</option>)}</select>
              <div className="grid grid-cols-2 gap-2"><input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="rounded-lg border border-ink/10 bg-paper px-3 py-3 text-sm" /><input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="rounded-lg border border-ink/10 bg-paper px-3 py-3 text-sm" /></div>
            </div>
            {(from || to) && <div className="mt-3 flex items-center gap-2 text-xs text-ink/45"><CalendarDays size={14} /> Showing leads submitted {from || "from the beginning"} → {to || "today"}</div>}
          </section>

          {error && <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
          <LeadTable leads={leads} loading={loading} updating={updating} onStatus={updateStatus} />
        </>}

        {activeTab === "booked" && <section><div className="mb-4 rounded-xl border border-ink/10 bg-white p-5"><h2 className="text-xl font-semibold">Booked Leads</h2><p className="mt-1 text-sm text-ink/55">Leads your team has marked as booked. Use this as the quick handoff list.</p></div><LeadTable leads={booked} loading={loading} updating={updating} onStatus={updateStatus} /></section>}
      </div>
    </main>
  );
}

function LeadTable({ leads, loading, updating, onStatus }) {
  if (loading) return <div className="rounded-xl border border-ink/10 bg-white p-10 text-center text-sm text-ink/50">Loading leads…</div>;
  if (!leads.length) return <div className="rounded-xl border border-ink/10 bg-white p-12 text-center"><XCircle className="mx-auto text-ink/25" /><h3 className="mt-3 font-semibold">No leads found</h3><p className="mt-1 text-sm text-ink/50">Try changing your filters or date range.</p></div>;

  return <div className="overflow-hidden rounded-xl border border-ink/10 bg-white"><div className="overflow-x-auto"><table className="min-w-[1050px] w-full text-left text-sm"><thead className="bg-paper text-xs uppercase tracking-[1.2px] text-ink/45"><tr><th className="px-4 py-3">Lead</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Event</th><th className="px-4 py-3">Submitted</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Change status</th></tr></thead><tbody className="divide-y divide-ink/8">{leads.map((lead) => <tr key={`${lead.type}-${lead.id}`} className="align-top hover:bg-paper/60"><td className="px-4 py-4"><div className="font-semibold">{lead.name}</div><a className="mt-1 block text-maroon hover:underline" href={`tel:${lead.phone}`}>{lead.phone}</a>{lead.email && <div className="mt-1 text-xs text-ink/45">{lead.email}</div>}</td><td className="px-4 py-4"><span className="rounded-md bg-ink/5 px-2 py-1 text-xs font-medium">{typeLabel[lead.type]}</span><div className="mt-2 text-xs text-ink/45">{lead.source}</div></td><td className="px-4 py-4"><div>{lead.eventType || (lead.offer ? `Offer: ${lead.offer}` : "—")}</div>{lead.eventDate && <div className="mt-1 text-xs text-ink/45">Event: {lead.eventDate}</div>}{lead.time && <div className="text-xs text-ink/45">Time: {lead.time}</div>}</td><td className="whitespace-nowrap px-4 py-4 text-xs text-ink/55">{formatDate(lead.createdAt)}</td><td className="px-4 py-4"><StatusBadge status={lead.status} /></td><td className="px-4 py-4"><div className="relative inline-block"><select disabled={updating === lead.id} value={STATUSES.includes(lead.status) ? lead.status : "new"} onChange={(e) => onStatus(lead, e.target.value)} className="appearance-none rounded-lg border border-ink/10 bg-white py-2 pl-3 pr-8 text-xs font-semibold outline-none focus:border-maroon disabled:opacity-50">{STATUSES.map((x) => <option key={x} value={x}>{statusLabel[x]}</option>)}</select><ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-2.5 text-ink/40" /></div>{updating === lead.id && <span className="ml-2 text-xs text-ink/40">Saving…</span>}</td></tr>)}</tbody></table></div></div>;
}
