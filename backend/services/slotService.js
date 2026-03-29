import { HttpError } from "../exception/HttpError.js";
import Slot from "../models/Slot.js";

// Service: Create a new slot
export const createSlot = async (startTime, endTime, user) => {

    // Admin check
    if (user.role !== "admin") {
        throw new HttpError("Unauthorized: Admins only", 403);
    }

    // Convert to Date objects (ensure proper type)
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    // Validate time
    if (endDate <= startDate) {
        throw new HttpError("Start time must be before end time", 400);
    }

    // Overlap check using the correct fields
    const overlappingSlot = await Slot.findOne({
        startTime: { $lt: endDate },
        endTime: { $gt: startDate }
    });

    if (overlappingSlot) {
        throw new HttpError("Slot overlaps with an existing slot", 400);
    }

    // Create the new slot
    const newSlot = await Slot.create({
        startTime: startDate,
        endTime: endDate
    });

    return { newSlot };
};


// Service:  get all slots for a specific date
export const getSlotsByDate = async (date, user) => {

    // Admin check
    if (user.role !== "admin") throw new HttpError("Unauthorized: Admins only", 403);

    // Convert input to Date
    const targetDate = new Date(date);

    // Normalize to start of the day
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);

    // Normalize to end of the day
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Query slots within that day
    const slots = await Slot.find({
        startTime: { $gte: startOfDay, $lte: endOfDay }
    }).sort({ startTime: 1 }); // optional: sort by startTime

    return slots;
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