import express from "express";
import {
  signUpOtp,
  verifySignUpToken,
  login,
  forgotPasswordOtp,
  verifyForgotPasswordOtp,
  resetPassword,
  getMe,
  logout
} from "../controllers/authController.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Signup
router.post("/signup-sendotp", asyncHandler(signUpOtp));
router.post("/signup-verifytoken", asyncHandler(verifySignUpToken));

// Login / Logout
router.post("/login", asyncHandler(login));
router.post("/logout", asyncHandler(logout));

// Forgot Password (3 steps)
router.post("/forgotpassword-sendotp", asyncHandler(forgotPasswordOtp));
router.post("/forgotpassword-verifytoken", asyncHandler(verifyForgotPasswordOtp));
router.post("/forgotpassword-reset", asyncHandler(resetPassword));

// Protected
router.get("/me", protect, asyncHandler(getMe));

export default router;