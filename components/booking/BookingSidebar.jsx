const STEPS = [
  { n: "01", title: "Your Details", sub: "Name, email, phone" },
  { n: "02", title: "Event Details", sub: "Category, date & time" },
  { n: "03", title: "Your Message", sub: "Vision & must-haves" },
  { n: "04", title: "Review", sub: "Confirm & send" },
];

export default function BookingSidebar({ current }) {
  return (
    <div className="flex shrink-0 flex-col gap-9 bg-paper px-8 py-10 md:w-[300px] md:border-r md:border-ink/10">
      {STEPS.map((step, i) => {
        const n = i + 1;
        const state = n === current ? "current" : n < current ? "done" : "upcoming";
        return (
          <div key={step.n} className="flex gap-4">
            <span
              className={`font-display text-[1.05rem] ${
                state === "upcoming" ? "text-goldDeep/35" : "text-goldDeep"
              }`}
            >
              {step.n}
            </span>
            <div>
              <div
                className={`text-[1.02rem] ${
                  state === "current" ? "font-semibold text-ink" : state === "done" ? "text-ink/80" : "text-ink/35"
                }`}
              >
                {step.title}
              </div>
              <div className={`mt-0.5 text-[.85rem] ${state === "upcoming" ? "text-ink/25" : "text-ink/50"}`}>
                {step.sub}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
