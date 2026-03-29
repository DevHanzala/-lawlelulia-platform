import express from "express";
import {
    createSlot,
    getSlotsByDate,
    deleteSlot
} from "../controllers/slotController.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// create slot (admin only)
router.post("/createSlot", protect, asyncHandler(createSlot));
router.get("/getSlots", protect, asyncHandler(getSlotsByDate));
router.delete("/deleteSlot/:slotId", protect, asyncHandler(deleteSlot));

export default router;