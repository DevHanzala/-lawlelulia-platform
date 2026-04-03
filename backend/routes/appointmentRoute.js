import express from "express";
import {
  createAppointment,
  updateAppointmentStatus,
  getUserAppointmentHistory,
  getUserFutureAppointments
} from "../controllers/appointmentController.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { protect } from "../middleware/authMiddleware.js";
import { fileUpload } from "../middleware/fileUploadMiddleware.js";

const router = express.Router();

// Appointments

//Expects a file upload with the key "file" in the request body for creating an appointment
router.post("/create", protect, fileUpload.single("file"), asyncHandler(createAppointment));
router.put("/:appointmentId", protect, asyncHandler(updateAppointmentStatus));
router.get("/history", protect, asyncHandler(getUserAppointmentHistory));
router.get("/future", protect, asyncHandler(getUserFutureAppointments));

export default router;