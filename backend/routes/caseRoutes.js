import express from "express";
import {
  getCasesByUserId,
  createNewCase,
  getCasesWithAppointments
} from "../controllers/caseController.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createCase", protect, asyncHandler(createNewCase));
router.get("/getCases", protect, asyncHandler(getCasesByUserId));
router.get("/getCasesWithAppointments", protect, asyncHandler(getCasesWithAppointments));


export default router;