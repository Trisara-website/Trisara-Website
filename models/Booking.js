import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    eventType: { type: String, required: true },
    date: { type: String, required: true }, // stored as ISO date string (YYYY-MM-DD)
    guests: { type: String, default: "" },
    time: { type: String, required: true },
    message: { type: String, default: "" },
    status: {
      type: String,
      enum: ["new", "contacted", "confirmed", "cancelled"],
      default: "new",
    },
    source: { type: String, default: "website" },
  },
  { timestamps: true }
);

// Prevent model overwrite errors from Next.js hot-reloading in dev.
export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
