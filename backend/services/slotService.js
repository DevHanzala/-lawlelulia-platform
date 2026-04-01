import { HttpError } from "../exception/HttpError.js";
import Slot from "../models/Slot.js";
import Appointment from "../models/Appointment.js";

// Service: Create a new slot
export const createSlot = async (startTime, endTime, user) => {
    if (user.role !== "admin") {
        throw new HttpError("Unauthorized: Admins only", 403);
    }

    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new HttpError("Invalid date format", 400);
    }

    if (endDate <= startDate) {
        throw new HttpError("Start time must be before end time", 400);
    }

    const overlappingSlot = await Slot.findOne({
        startTime: { $lt: endDate },
        endTime: { $gt: startDate }
    });

    if (overlappingSlot) {
        throw new HttpError("Slot overlaps with an existing slot", 400);
    }

    const newSlot = await Slot.create({
        startTime: startDate,
        endTime: endDate
    });

    return { newSlot };
};


export const getSlotsByDate = async (date, user) => {
    const targetDate = new Date(date);

    const startOfDay = new Date(Date.UTC(
        targetDate.getUTCFullYear(),
        targetDate.getUTCMonth(),
        targetDate.getUTCDate(),
        0, 0, 0, 0
    ));

    const endOfDay = new Date(Date.UTC(
        targetDate.getUTCFullYear(),
        targetDate.getUTCMonth(),
        targetDate.getUTCDate(),
        23, 59, 59, 999
    ));

    const slots = await Slot.find({
        startTime: { $gte: startOfDay, $lte: endOfDay }
    }).sort({ startTime: 1 });

    // Attach appointment info to every slot
    const slotsWithAppointments = await Promise.all(
        slots.map(async (slot) => {
            const slotObj = slot.toObject();
            // Find appointment for this slot regardless of isBooked
            const appointment = await Appointment.findOne({ slot: slot._id })
                .select("_id status user")
                .populate("user", "fullName email");
            slotObj.appointment = appointment || null;
            return slotObj;
        })
    );

    // Users only see available slots (no appointment or cancelled appointment)
    if (user.role !== "admin") {
        return slotsWithAppointments.filter(s => !s.isBooked);
    }

    return slotsWithAppointments;
};

// Service: Find slot by ID and update isBooked status if it matches current value
export const findSlotByIdAndUpdateBookedStatus = async (slotId, currentIsBooked, newIsBooked) => {
    // Atomic check-and-update
    return await Slot.findOneAndUpdate(
        { _id: slotId, isBooked: currentIsBooked },
        { $set: { isBooked: newIsBooked } },
        { new: true }
    );
};

// Service: Delete a slot by ID
export const deleteSlotById = async (slotId, user) => {

    // Admin check
    if (user.role !== "admin") throw new HttpError("Unauthorized: Admins only", 403);

    // Find slot first
    const slot = await Slot.findById(slotId);

    if (!slot) throw new HttpError("Slot not found", 404);

    if (slot.isBooked) throw new HttpError("Cannot delete a booked slot", 400);

    // Delete
    await Slot.findByIdAndDelete(slotId);

    return null;
};