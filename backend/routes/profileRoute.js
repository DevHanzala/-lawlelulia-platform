import express from "express";
import { updateProfile } from "../controllers/profileController.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// PATCH /api/profile  — protected
router.patch("/", protect, asyncHandler(updateProfile));

export default router;