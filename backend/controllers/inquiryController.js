import { asyncHandler } from "../utils/asyncHandler.js";
import * as inquiryService from "../services/inquiryService.js";
import { success } from "../utils/apiResponse.js";

// POST /api/inquiry  — public (optionally authenticated)
export const submitInquiry = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  const userId = req.user?._id || null; // attach user if logged in
  const data = await inquiryService.createInquiry({ name, email, phone, subject, message, userId });
  return success(res, "Inquiry submitted successfully", data);
});

// GET /api/inquiry  — admin only
export const getInquiries = asyncHandler(async (req, res) => {
  const data = await inquiryService.getAllInquiries();
  return success(res, "Inquiries fetched", data);
});