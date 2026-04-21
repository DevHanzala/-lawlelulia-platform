import express from "express";
import { submitInquiry, getInquiries } from "../controllers/inquiryController.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public — optionally attach user if logged in (use optional protect)
router.post("/", protect, asyncHandler(submitInquiry));

// Admin only — view all inquiries
router.get("/", protect, asyncHandler(getInquiries));

export default router;