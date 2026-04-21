import { asyncHandler } from "../utils/asyncHandler.js";
import * as profileService from "../services/profileService.js";
import { success } from "../utils/apiResponse.js";

// PATCH /api/profile
export const updateProfile = asyncHandler(async (req, res) => {
  const { fullName, phone, professionalTitle, bio } = req.body;
  const data = await profileService.updateProfile(req.user._id, {
    fullName,
    phone,
    professionalTitle,
    bio,
  });
  return success(res, "Profile updated successfully", data);
});