import { asyncHandler } from "../utils/asyncHandler.js";
import * as authService from "../services/authService.js"
import { success } from "../utils/apiResponse.js";

// Route: Signup
export const signUpOtp = asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body;
    const data = authService.signUpOtp(fullname, email, password);
    return success(res, "OTP sent", data);
})