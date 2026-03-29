import { HttpError } from "../exception/HttpError.js";
import Appointment from "../models/Appointment.js";
import { findSlotByIdAndUpdateBookedStatus } from "./slotService.js";

// Service: schedule a new appointment
export const createAppointment = async (slotId, user) => {

    // check admin trying to book appointment
    if (user.role === "admin") throw new HttpError("Admin cannot book his own appointments", 403);

    // Atomic slot booking to prevent race condition
    const slot = await findSlotByIdAndUpdateBookedStatus(slotId, false, true);

    if (!slot) throw new HttpError("Slot not found or already booked", 400);

    // Create appointment
    const newAppointment = await Appointment.create({
        slot: slot._id,
        user: user._id
    });

    return newAppointment
};

// Service: update appointment status (admin only)
export const updateAppointmentStatus = async (appointmentId, status, user) => {
    // Admin check
    if (user.role !== "admin") throw new HttpError("Unauthorized: Admins only", 403);

    // Find appointment
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) throw new HttpError("Appointment not found", 404);

    // Validate status
    const validStatuses = ["confirmed", "cancelled"];
    if (!validStatuses.includes(status)) {
        throw new HttpError(`Invalid status value`, 400);
    }

    // Update status
    appointment.status = status;

    // Free slot if cancelled
    if (status === "cancelled") {
        await findSlotByIdAndUpdateBookedStatus(appointment.slot, true, false);
    }

    return await appointment.save();
};

// Service: Get appointments history of a user (descending order)
export const getUserAppointmentHistory = async (user) => {
    const now = new Date();

    return await Appointment.aggregate([
        {
            $match: { user: user._id }
        },
        {
            $lookup: {
                from: "slots",
                localField: "slot",
                foreignField: "_id",
                as: "slot"
            }
        },
        { $unwind: "$slot" },
        {
            $match: {
                "slot.startTime": { $lt: now }
            }
        },
        {
            $sort: { "slot.startTime": -1 }
        }
    ]);
};

// Service: Get all future appointments of a user (ascending order)
export const getUserFutureAppointments = async (user) => {
    const now = new Date();

    return await Appointment.aggregate([
        {
            $match: { user: user._id }
        },
        {
            $lookup: {
                from: "slots",
                localField: "slot",
                foreignField: "_id",
                as: "slot"
            }
        },
        { $unwind: "$slot" },
        {
            $match: {
                "slot.startTime": { $gt: now }
            }
        },
        {
            $sort: { "slot.startTime": 1 }
        }
    ]);
}