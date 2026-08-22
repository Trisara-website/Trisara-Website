import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    offer: { type: String, default: "10% off" },
    status: {
      type: String,
      enum: ["new", "contacted", "converted", "dropped"],
      default: "new",
    },
    source: { type: String, default: "home_popup" },
  },
  { timestamps: true }
);

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
