import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    eventDate: { type: String, required: true }, // stored as YYYY-MM-DD
    eventType: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "qualified", "unqualified", "spam", "booked", "contacted", "confirmed", "cancelled", "converted", "dropped"],
      default: "new",
    },
    fbp: { type: String, default: "" },
    fbc: { type: String, default: "" },
    source: { type: String, default: "events_page" },
  },
  { timestamps: true }
);

export default mongoose.models.Enquiry || mongoose.model("Enquiry", EnquirySchema);
