export default function BookingStepMessage({ data, onChange }) {
  return (
    <div className="animate-fadein">
      <h3 className="font-display text-[1.6rem] text-ink">Tell us your vision.</h3>
      <p className="mt-2 text-[.98rem] text-ink/60">Theme ideas, must-haves, or anything else we should know.</p>

      <div className="mt-8">
        <label className="mb-2 block text-[.72rem] uppercase tracking-[2px] text-ink/55">Your Message</label>
        <textarea
          rows={6}
          placeholder="Tell us about your celebration — any specific requirements, theme ideas, or questions."
          value={data.message}
          onChange={(e) => onChange({ message: e.target.value })}
          className="w-full resize-y border-b border-ink/20 bg-transparent py-2.5 font-body text-[1.05rem] outline-none placeholder:text-ink/35 focus:border-maroon"
        />
      </div>
    </div>
  );
}
