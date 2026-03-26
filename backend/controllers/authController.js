import { asyncHandler } from "../utils/asyncHandler.js";
import * as authService from "../services/authService.js"
import { success } from "../utils/apiResponse.js";

// Route: Signup sends otp
export const signUpOtp = asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body;
    const data = await authService.signUpOtp(fullname, email, password);
    return success(res, "OTP sent", data);
})

//Route: verify signup otp token
export const verifySignUpToken = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;
    const data = await authService.verifySignUpToken(email, otp);
    return success(res, "OTP verified successfully", data);
})
