import { asyncHandler } from "../utils/asyncHandler.js";
import * as authService from "../services/authService.js";
import { success } from "../utils/apiResponse.js";

export const signUpOtp = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;
  const data = await authService.signUpOtp(fullname, email, password);
  return success(res, "OTP sent", data);
});

export const verifySignUpToken = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  const data = await authService.verifySignUpToken(email, otp);
  return success(res, "OTP verified successfully", data);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const data = await authService.login(email, password);
  return success(res, "Login successful", data);
});

export const logout = asyncHandler(async (req, res) => {
  // Stateless JWT — client clears token; server just confirms
  return success(res, "Logged out successfully", {});
});

export const forgotPasswordOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const data = await authService.forgotPasswordOtp(email);
  return success(res, "OTP sent", data);
});

export const verifyForgotPasswordOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  const data = await authService.verifyForgotPasswordOtp(email, otp);
  return success(res, "OTP verified", data);
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;
  const data = await authService.resetPassword(email, newPassword);
  return success(res, "Password reset successful", data);
});

export const getMe = asyncHandler(async (req, res) => {
  const data = await authService.getMe(req.user._id);
  return success(res, "User fetched", data);
});