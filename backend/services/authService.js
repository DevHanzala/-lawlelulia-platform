import User from "../models/User.js";
import Otp from "../models/Otp.js";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "./emailService.js";

// Service: Sign up and send OTP
export const signUpOtp = async (fullName, email, password) => {

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
        fullName,
        email,
        password: hashedPassword,
        isVerified: false
    });

    // Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP in separate collection
    const otpEntry = await Otp.create({
        userId: user._id,
        otp: otpCode,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes expiry
    });

    // Send OTP email
    await sendVerificationEmail(email, fullName, otpCode);

    // Return email
    return {
        user: {
            email: user.email
        }
    };
};