import DatePicker from "./DatePicker";
import { Icon } from "@/lib/icon-map";
import { eventTypeOptions, timeOptions } from "@/lib/data";

export default function BookingStepEvent({ data, onChange }) {
  return (
    <div className="animate-fadein">
      <h3 className="font-display text-[1.6rem] text-ink">What are we celebrating?</h3>
      <p className="mt-2 text-[.98rem] text-ink/60">Pick the event, then the date &amp; time that suit you.</p>

      <div className="mt-8 flex flex-col gap-8">
        <div>
          <label className="mb-3 block text-[.72rem] uppercase tracking-[2px] text-ink/55">Event Type</label>
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3">
            {eventTypeOptions.map((opt) => {
              const active = data.eventType === opt.value;
              return (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => onChange({ eventType: opt.value })}
                  className={`flex flex-col items-center gap-2 rounded-lg border px-2 py-4 text-center text-[.82rem] transition-colors ${
                    active ? "border-maroon bg-maroon/5 text-maroon" : "border-ink/15 bg-white text-ink hover:border-maroon/50"
                  }`}
                >
                  <Icon name={opt.icon} className="h-[22px] w-[22px]" />
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <DatePicker
            label="Event Date"
            value={data.date}
            onChange={(iso) => onChange({ date: iso })}
          />
          <div>
            <label className="mb-2 block text-[.72rem] uppercase tracking-[2px] text-ink/55">Estimated Guests</label>
            <input
              type="number"
              min={10}
              placeholder="e.g. 400"
              value={data.guests}
              onChange={(e) => onChange({ guests: e.target.value })}
              className="w-full border-b border-ink/20 bg-transparent py-2.5 font-body text-[1.05rem] outline-none placeholder:text-ink/35 focus:border-maroon"
            />
          </div>
        </div>

        <div>
          <label className="mb-3 block text-[.72rem] uppercase tracking-[2px] text-ink/55">Preferred Time</label>
          <div className="grid gap-3.5 sm:grid-cols-3">
            {timeOptions.map((opt) => {
              const active = data.time === opt.value;
              return (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => onChange({ time: opt.value })}
                  className={`rounded-lg border px-3 py-3.5 text-center text-[.9rem] transition-colors ${
                    active ? "border-maroon bg-maroon/5 text-maroon" : "border-ink/15 bg-white text-ink hover:border-maroon/50"
                  }`}
                >
                  {opt.label}
                  <br />
                  <small className="text-[.75rem] opacity-70">{opt.sub}</small>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
