import express from "express";
import {
  signUpOtp,
  verifySignUpToken,
  login,
  forgotPasswordOtp
} from "../controllers/authController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.post("/signup-sendotp", asyncHandler(signUpOtp));
router.post("/signup-verifytoken", asyncHandler(verifySignUpToken));
router.post("/login", asyncHandler(login));
router.post("/forgotpassword-sendotp", asyncHandler(forgotPasswordOtp));

export default router;
