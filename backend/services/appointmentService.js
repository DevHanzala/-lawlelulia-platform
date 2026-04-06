import { HttpError } from "../exception/HttpError.js";
import Appointment from "../models/Appointment.js";
import { getCaseById } from "./caseService.js";
import { findSlotByIdAndUpdateBookedStatus } from "./slotService.js";
import { uploadToDrive } from "./fileService.js";

// Service: schedule a new appointment
export const createAppointment = async (slotId, caseId, file, user) => {

    // check admin trying to book appointment
    if (user.role === "admin") {
        throw new HttpError("Admin cannot book his own appointments", 403);
    }

    // Atomic slot booking to prevent race condition
    const slot = await findSlotByIdAndUpdateBookedStatus(slotId, false, true);
    if (!slot) throw new HttpError("Slot not found or already booked", 400);

    // Check case ownership
    await getCaseById(caseId, user);

    let fileData = {};

    // Handle file upload if exists
    if (file) {
        const uploaded = await uploadToDrive(file);

        fileData = {
            fileId: uploaded?.fileId ,
            fileUrl: uploaded?.url 
        };
    }

    // Create appointment
    const newAppointment = await Appointment.create({
        slot: slot._id,
        case: caseId,
        user: user._id,
        ...fileData
    });

    return newAppointment;
};

// Service: Update appointment status (admin only)
export const updateAppointmentStatus = async (appointmentId, status, user) => {
    if (user.role !== "admin") throw new HttpError("Unauthorized: Admins only", 403);

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) throw new HttpError("Appointment not found", 404);

    const validStatuses = ["confirmed", "cancelled", "pending"];
    if (!validStatuses.includes(status)) {
        throw new HttpError("Invalid status value", 400);
    }

    const previousStatus = appointment.status;
    appointment.status = status;

    // If cancelling — free the slot so others can book
    if (status === "cancelled" && previousStatus !== "cancelled") {
        await findSlotByIdAndUpdateBookedStatus(appointment.slot, true, false);
    }

    // If un-cancelling (going back to confirmed/pending) — rebook the slot
    if (previousStatus === "cancelled" && status !== "cancelled") {
        await findSlotByIdAndUpdateBookedStatus(appointment.slot, false, true);
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