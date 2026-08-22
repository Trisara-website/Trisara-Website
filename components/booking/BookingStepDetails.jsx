export default function BookingStepDetails({ data, onChange }) {
  return (
    <div className="animate-fadein">
      <h3 className="font-display text-[1.6rem] text-ink">Let&apos;s start with you.</h3>
      <p className="mt-2 text-[.98rem] text-ink/60">Basic contact details so our team can reach you.</p>

      <div className="mt-8 flex flex-col gap-6">
        <div>
          <label className="mb-2 block text-[.72rem] uppercase tracking-[2px] text-ink/55">Full Name</label>
          <input
            type="text"
            required
            placeholder="Your full name"
            value={data.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className="w-full border-b border-ink/20 bg-transparent py-2.5 font-body text-[1.05rem] outline-none placeholder:text-ink/35 focus:border-maroon"
          />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-[.72rem] uppercase tracking-[2px] text-ink/55">Email Address</label>
            <input
              type="email"
              required
              placeholder="you@email.com"
              value={data.email}
              onChange={(e) => onChange({ email: e.target.value })}
              className="w-full border-b border-ink/20 bg-transparent py-2.5 font-body text-[1.05rem] outline-none placeholder:text-ink/35 focus:border-maroon"
            />
          </div>
          <div>
            <label className="mb-2 block text-[.72rem] uppercase tracking-[2px] text-ink/55">Phone Number</label>
            <input
              type="tel"
              required
              placeholder="+91 00000 00000"
              value={data.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              className="w-full border-b border-ink/20 bg-transparent py-2.5 font-body text-[1.05rem] outline-none placeholder:text-ink/35 focus:border-maroon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
