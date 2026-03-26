import User from "../models/User.js";
import Otp from "../models/Otp.js";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "./emailService.js";
import { HttpError } from "../exception/HttpError.js";

// Service: Sign up and send OTP
export const signUpOtp = async (fullName, email, password) => {

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
        // prevent existing verified user
        if (user.isVerified) {
            throw new HttpError("User already exists", 400);
        }

        // update details of non verified users
        user.fullName = fullName;
        user.password = await bcrypt.hash(password, 10);
        await user.save();

    } else {
        // Create new user
        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            isVerified: false
        });
    }

    // Generate OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Delete old OTPs for this email (important)
    await Otp.deleteMany({ email });

    // Save new OTP
    await Otp.create({
        email,
        otp: otpCode,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000)
    });

    // Send OTP
    await sendVerificationEmail(email, fullName, otpCode);

    return {
        user: {
            email: user.email
        }
    };
};