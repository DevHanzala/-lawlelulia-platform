import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({

    startTime: {
        type: Date,
        required: [true, "Start time is required"],
        unique: true,   
        index: true,
    },

    endTime: {
        type: Date,
        required: [true, "End time is required"],
    },

    isBooked: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });


export default mongoose.model("Slot", slotSchema);