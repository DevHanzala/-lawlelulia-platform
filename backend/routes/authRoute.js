import express from "express";
import {
  signUpOtp,
} from "../controllers/authController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.post("/signup-sendotp", asyncHandler(signUpOtp));

export default router;
