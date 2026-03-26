import express from "express";
import {
  signUpOtp,
  verifySignUpToken
} from "../controllers/authController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.post("/signup-sendotp", asyncHandler(signUpOtp));
router.post("/signup-verifytoken", asyncHandler(verifySignUpToken));

export default router;
