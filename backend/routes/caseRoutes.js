import express from "express";
import {
  getCasesByUserId,
  createNewCase
} from "../controllers/caseController.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createCase", protect, asyncHandler(createNewCase));
router.get("/getCases", protect, asyncHandler(getCasesByUserId));


export default router;