import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required for appointment"]
    },
    slot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Slot",
        required: [true, "Slot is required for appointment"]
    },
    case: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Case",
        required: [true, "Case is required for appointment"]
    },
    status: {
        type: String,
        enum: {
            values: ["pending", "confirmed", "cancelled"],
            message: "Status must be either 'pending', 'confirmed' or 'cancelled'"
        },
        default: "pending"
    },
}, { timestamps: true });

// FIXED: Only one appointment per slot total (not per status)
appointmentSchema.index({ slot: 1 }, { unique: true });

export default mongoose.model("Appointment", appointmentSchema);