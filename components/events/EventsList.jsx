import EventRow from "./EventRow";
import { events } from "@/lib/data";

export default function EventsList() {
  return (
    <section className="py-[130px]">
      <div className="mx-auto max-w-[1160px] px-[6vw]">
        <div className="flex flex-col">
          {events.map((event, i) => (
            <EventRow key={event.num} event={event} reversed={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
