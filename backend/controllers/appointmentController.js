import { asyncHandler } from "../utils/asyncHandler.js";
import * as appointmentService from "../services/appointmentService.js";
import { success } from "../utils/apiResponse.js";

// Controller: schedule a new appointment
export const createAppointment = asyncHandler(async (req, res) => {
    const { slotId, caseId } = req.body;
    const { user } = req;
    const newAppointment = await appointmentService.createAppointment(slotId, caseId, user);
    return success(res, "Appointment scheduled successfully", newAppointment);
});

// Controller: update appointment status (admin only)
export const updateAppointmentStatus = asyncHandler(async (req, res) => {
    const { appointmentId } = req.params;
    const { status } = req.body;
    const { user } = req;
    const updatedAppointment = await appointmentService.updateAppointmentStatus(appointmentId, status, user);
    return success(res, "Appointment status updated successfully", updatedAppointment);
})

// Controller: Get appointments history of a user (descending order)
export const getUserAppointmentHistory = asyncHandler(async (req, res) => {
    const { user } = req;
    const appointmentHistory = await appointmentService.getUserAppointmentHistory(user);
    return success(res, "Appointment history retrieved successfully", appointmentHistory);
});

// Controller: Get all future appointments of a user (ascending order)
export const getUserFutureAppointments = asyncHandler(async (req, res) => {
    const { user } = req;
    const futureAppointments = await appointmentService.getUserFutureAppointments(user);
    return success(res, "Future appointments retrieved successfully", futureAppointments);
});