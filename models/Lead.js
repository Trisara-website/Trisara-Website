import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, default: "", trim: true, lowercase: true },
    offer: { type: String, default: "10% off" },
    status: {
      type: String,
      enum: ["new", "qualified", "unqualified", "spam", "booked", "contacted", "confirmed", "cancelled", "converted", "dropped"],
      default: "new",
    },
    fbp: { type: String, default: "" },
    fbc: { type: String, default: "" },
    source: { type: String, default: "home_popup" },
    metaEventId: { type: String, default: "" },
    metaQualifiedEventSentAt: { type: Date, default: null },
    metaBookedEventSentAt: { type: Date, default: null },
    eventSourceUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
