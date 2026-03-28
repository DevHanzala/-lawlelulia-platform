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
    status: {
        type: String,
        enum: {
            values: ["pending", "confirmed", "cancelled"],
            message: "Status must be either 'pending', 'confirmed' or 'cancelled'"
        },
        default: "pending"
    },
    specialRequest: {
        type: String,
        trim: true,
    },
    cancellationReason: {
        type: String,
        trim: true
    }
}, { timestamps: true });

// prevent double booking of same slot
appointmentSchema.index({ slot: 1, status: 1 }, { unique: true });

export default mongoose.model("Appointment", appointmentSchema);