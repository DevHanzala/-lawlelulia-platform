import express from "express";
import {
  createAppointment,
  updateAppointmentStatus,
    getUserAppointmentHistory,
    getUserFutureAppointments
} from "../controllers/appointmentController.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Appointments
router.post("/create", protect, asyncHandler(createAppointment));
router.put("/:appointmentId", protect, asyncHandler(updateAppointmentStatus));
router.get("/history", protect, asyncHandler(getUserAppointmentHistory));
router.get("/future", protect, asyncHandler(getUserFutureAppointments));

export default router;