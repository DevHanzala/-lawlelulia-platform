import express from "express";
import {
    chatBotController
} from "../controllers/chatBotController.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ChatBot
router.post("/chat", protect, asyncHandler(chatBotController));

export default router;