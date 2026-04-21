import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    name:    { type: String, required: true, trim: true },
    email:   { type: String, required: true, lowercase: true, trim: true },
    phone:   { type: String, default: "" },
    subject: { type: String, default: "" },
    message: { type: String, required: true },
    userId:  { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    status:  { type: String, enum: ["new", "read", "replied"], default: "new" },
  },
  { timestamps: true }
);

export default mongoose.model("Inquiry", inquirySchema);