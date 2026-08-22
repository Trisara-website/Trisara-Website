function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BookingStepReview({ data }) {
  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Event Type", data.eventType],
    ["Date", formatDate(data.date)],
    ["Guests", data.guests],
    ["Time", data.time],
    ["Message", data.message],
  ];

  return (
    <div className="animate-fadein">
      <h3 className="font-display text-[1.6rem] text-ink">Review &amp; confirm.</h3>
      <p className="mt-2 text-[.98rem] text-ink/60">Make sure everything looks right before we reach out.</p>

      <div className="mt-7 flex flex-col gap-4">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-5 border-b border-ink/10 pb-3.5 text-[.98rem]">
            <span className="text-[.72rem] uppercase tracking-wide text-ink/55">{k}</span>
            <span className="text-right font-display">{v || "—"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
