"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

function toISO(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function sameDay(a, b) {
  return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function buildMonthGrid(viewDate) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

/**
 * A serif, maroon/gold styled date picker — built in-house rather than the
 * generic browser date input or a MakeMyTrip/BookMyShow-style blue calendar,
 * so it matches the rest of the Trisara design language.
 */
export default function DatePicker({ value, onChange, label = "Event Date", minDate }) {
  const [open, setOpen] = useState(false);
  const selected = value ? new Date(value + "T00:00:00") : null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const floor = minDate ?? today;

  const [viewDate, setViewDate] = useState(selected ?? floor);
  const wrapRef = useRef(null);

  useEffect(() => {
    function onClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const cells = buildMonthGrid(viewDate);
  const monthLabel = viewDate.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
  const isPrevDisabled =
    viewDate.getFullYear() === floor.getFullYear() && viewDate.getMonth() === floor.getMonth();

  function selectDay(day) {
    if (!day) return;
    onChange(toISO(day));
    setOpen(false);
  }

  return (
    <div className="relative" ref={wrapRef}>
      <label className="mb-2 block text-[.72rem] uppercase tracking-[2px] text-ink/55">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center justify-between border-b py-2.5 text-left font-body text-[1.05rem] outline-none transition-colors ${
          open ? "border-maroon" : "border-ink/20"
        } ${selected ? "text-ink" : "text-ink/40"}`}
      >
        <span>
          {selected
            ? selected.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
            : "Select a date"}
        </span>
        <CalendarDays size={18} className="text-goldDeep" />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-3 w-[300px] rounded-lg border border-ink/10 bg-white p-5 shadow-[0_30px_60px_-20px_rgba(36,21,18,0.35)]">
          <div className="flex items-center justify-between">
            <button
              type="button"
              disabled={isPrevDisabled}
              onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
              className="rounded-full p-1.5 text-maroon transition-colors hover:bg-paper disabled:cursor-not-allowed disabled:text-ink/20 disabled:hover:bg-transparent"
              aria-label="Previous month"
            >
              <ChevronLeft size={17} />
            </button>
            <div className="font-display text-[1.05rem] text-ink">{monthLabel}</div>
            <button
              type="button"
              onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
              className="rounded-full p-1.5 text-maroon transition-colors hover:bg-paper"
              aria-label="Next month"
            >
              <ChevronRight size={17} />
            </button>
          </div>

          <div className="mx-auto mt-3 h-px w-10 bg-gold" />

          <div className="mt-4 grid grid-cols-7 gap-y-1.5 text-center">
            {WEEKDAYS.map((w, i) => (
              <div key={i} className="text-[.65rem] uppercase tracking-wide text-goldDeep/70">
                {w}
              </div>
            ))}
            {cells.map((day, i) => {
              if (!day) return <div key={i} />;
              const disabled = day < floor;
              const isSelected = sameDay(day, selected);
              const isToday = sameDay(day, today);
              return (
                <button
                  key={i}
                  type="button"
                  disabled={disabled}
                  onClick={() => selectDay(day)}
                  className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full font-body text-[.88rem] transition-colors ${
                    isSelected
                      ? "bg-maroon font-semibold text-white"
                      : disabled
                      ? "cursor-not-allowed text-ink/20"
                      : isToday
                      ? "border border-gold text-maroon"
                      : "text-ink hover:bg-paper"
                  }`}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
