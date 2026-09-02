import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    eventType: { type: String, required: true },
    date: { type: String, required: true },
    guests: { type: String, default: "" },
    time: { type: String, required: true },
    message: { type: String, default: "" },
    status: {
      type: String,
      enum: ["new", "qualified", "unqualified", "spam", "booked", "contacted", "confirmed", "cancelled", "converted", "dropped"],
      default: "new",
    },
    fbp: { type: String, default: "" },
    fbc: { type: String, default: "" },
    source: { type: String, default: "website" },
    metaEventId: { type: String, default: "" },
    metaQualifiedEventSentAt: { type: Date, default: null },
    metaBookedEventSentAt: { type: Date, default: null },
    eventSourceUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
