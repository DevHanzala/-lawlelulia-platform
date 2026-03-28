import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: [true, "Date is required"]
    },

    startTime: {
        type: String,
        required: [true, "Start time is required"],
    },

    endTime: {
        type: String,
        required: [true, "End time is required"],
    },

    isBooked: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

// prevent duplicate slots for the same date and time
slotSchema.index({ date: 1, startTime: 1, endTime: 1 }, { unique: true });

export default mongoose.model("Slot", slotSchema);