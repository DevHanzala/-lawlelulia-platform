import { HttpError } from "../exception/HttpError.js";
import Appointment from "../models/Appointment.js";
import { getCaseById } from "./caseService.js";
import { findSlotByIdAndUpdateBookedStatus } from "./slotService.js";
import { uploadToDrive } from "./fileService.js";
import { createCalendarEvent } from "./calendarService.js";
import { generateJitsiLink } from "./jitsiService.js";
import {
    sendBookingConfirmationEmail,
    sendCancellationEmail,
    scheduleReminderEmail
} from "./emailService.js";
import User from "../models/User.js";


// Service: schedule a new appointment
// Service: schedule a new appointment
export const createAppointment = async (slotId, caseId, file, user) => {
    if (user.role === "admin") {
        throw new HttpError("Admin cannot book his own appointments", 403);
    }

    const slot = await findSlotByIdAndUpdateBookedStatus(slotId, false, true);
    if (!slot) throw new HttpError("Slot not found or already booked", 400);

    await getCaseById(caseId, user);

    let fileData = {};
    if (file && file.path) {
        try {
            const uploaded = await uploadToDrive(file);
            fileData = {
                fileId: uploaded?.fileId,
                fileUrl: uploaded?.url,
                fileName: file.originalname,
            };
        } catch (uploadErr) {
            console.error("[AppointmentService] File upload failed (non-fatal):", uploadErr.message);
        }
    }

    const { link: jitsiLink } = generateJitsiLink();
    const newAppointment = await Appointment.create({
        slot: slot._id,
        case: caseId,
        user: user._id,
        jitsiLink,
        ...fileData,
    });

    const fullUser = await User.findById(user._id).select("fullName email");

    // Google Calendar event (non-blocking)
    createCalendarEvent({
        clientName: fullUser.fullName,
        clientEmail: fullUser.email,
        appointmentTime: slot.startTime,
        jitsiLink,
    }).catch(err =>
        console.error("[AppointmentService] Calendar error (non-fatal):", err.message)
    );

    return newAppointment;
};

// Service: Update appointment status (admin only)
export const updateAppointmentStatus = async (appointmentId, status, user) => {
    if (user.role !== "admin") throw new HttpError("Unauthorized: Admins only", 403);

    const appointment = await Appointment.findById(appointmentId)
        .populate("user", "fullName email")
        .populate("slot", "startTime endTime");

    if (!appointment) throw new HttpError("Appointment not found", 404);

    const validStatuses = ["confirmed", "cancelled", "pending"];
    if (!validStatuses.includes(status)) throw new HttpError("Invalid status value", 400);

    const previousStatus = appointment.status;
    appointment.status = status;

    if (status === "cancelled" && previousStatus !== "cancelled") {
        await findSlotByIdAndUpdateBookedStatus(appointment.slot._id, true, false);
    }

    if (previousStatus === "cancelled" && status !== "cancelled") {
        await findSlotByIdAndUpdateBookedStatus(appointment.slot._id, false, true);
    }

    await appointment.save();

    // Send confirmation email ONLY when admin confirms for first time
    if (status === "confirmed" && previousStatus !== "confirmed") {
        const clientEmail = appointment.user.email;
        const clientName = appointment.user.fullName;
        const appointmentTime = appointment.slot.startTime;
        const jitsiLink = appointment.jitsiLink;

        // Send immediate confirmation
        sendBookingConfirmationEmail({
            to: clientEmail,
            clientName,
            appointmentTime,
            jitsiLink,
        }).catch(err =>
            console.error("[AppointmentService] Confirmation email error:", err.message)
        );

        // Schedule reminder 15 mins before
        scheduleReminderEmail({
            to: clientEmail,
            clientName,
            appointmentTime,
            jitsiLink,
        });

    }

    // Send cancellation email
    if (status === "cancelled" && previousStatus !== "cancelled") {
        sendCancellationEmail({
            to: appointment.user.email,
            clientName: appointment.user.fullName,
            appointmentTime: appointment.slot.startTime,
        }).catch(err =>
            console.error("[AppointmentService] Cancellation email error:", err.message)
        );
    }

    return appointment;
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