import express from "express";
import {
    getSlotsByDate,
} from "../controllers/slotController.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// create slot (admin only)
router.get("/getSlots", protect, asyncHandler(getSlotsByDate));

export default router;