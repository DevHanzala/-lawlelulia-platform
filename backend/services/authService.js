import User from "../models/User.js";
import Otp from "../models/Otp.js";
import bcrypt from "bcrypt";
import { sendEmail } from "./emailService.js";
import { HttpError } from "../exception/HttpError.js";
import generateToken from "../utils/generateToken.js";

// Get user by email 
export const getUserByEmail = async (email) => {
    return await User.findOne({ email });
};

// Ensure user is verified 
export const ensureVerified = (user) => {
    if (!user || !user.isVerified) {
        throw new HttpError("Complete signup first", 400);
    }
};

// Ensure user is NOT verified 
export const ensureNotVerified = (user) => {
    if (user && user.isVerified) {
        throw new HttpError("User already exists", 400);
    }
};

// Service: Sign up and send OTP
export const signUpOtp = async (fullName, email, password) => {

    // Validate input fields
    if (!fullName) throw new HttpError("Fullname is required", 400);
    if (!email) throw new HttpError("Email is required", 400);
    if (!password) throw new HttpError("Password is required", 400);

    // Check if user already exists
    let user = await getUserByEmail(email);

    if (user) {
        // Block already verified users
        ensureNotVerified(user);

        // Update existing unverified user details
        user.fullName = fullName;
        user.password = await bcrypt.hash(password, 10);
        await user.save();

    } else {
        // Create new user if not exists
        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            isVerified: false
        });
    }

    // Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Remove old OTPs (only latest should be valid)
    await Otp.deleteMany({ email });

    // Save new OTP with expiry
    await Otp.create({
        email,
        otp: otpCode,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 mins
    });

    // Send OTP email
    await sendEmail(email, fullName, otpCode, "VERIFY");

    // Return minimal response
    return {
        user: {
            email: user.email
        }
    };
};


// Service: Verify OTP and complete signup
export const verifySignUpToken = async (email, otp) => {

    // Validate input
    if (!email) throw new HttpError("Email is required", 400);
    if (!otp) throw new HttpError("Otp is missing", 400);

    // Get latest OTP for this email
    const userOtp = await Otp.findOne({ email }).sort({ createdAt: -1 });

    // Validate OTP existence
    if (!userOtp) throw new HttpError("Please generate OTP first", 400);

    // Check OTP match
    if (userOtp.otp !== otp) throw new HttpError("Otp is invalid", 400);

    // Check OTP expiry
    if (userOtp.expiresAt < new Date()) {
        throw new HttpError("Otp is expired", 400);
    }

    // Get user from DB
    const user = await getUserByEmail(email);
    if (!user) throw new HttpError("User not found", 404);

    // Prevent re-verification
    if (user.isVerified) {
        throw new HttpError("User already verified", 400);
    }

    // Mark user as verified
    user.isVerified = true;
    await user.save();

    // Delete used OTP
    await userOtp.deleteOne();

    return {
        user: {
            email: user.email,
            isVerified: user.isVerified
        }
    };
};


// Service: Login user
export const login = async (email, password) => {

    // Validate input
    if (!email) throw new HttpError("Email is required", 400);
    if (!password) throw new HttpError("Password is required", 400);

    // Fetch user
    const user = await getUserByEmail(email);

    // Prevent wrong credentials
    if (!user) {
        throw new HttpError("Invalid Credentials", 400);
    }

    // Ensure account is verified
    ensureVerified(user);

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new HttpError("Invalid Credentials", 400);
    }

    // Generate JWT token
    const token = generateToken(user);

    return {
        message: "Login successful",
        token,
        user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email
        }
    };
};


// Service: Send OTP for password reset
export const forgotPasswordOtp = async (email) => {

    // Validate input
    if (!email) throw new HttpError("Email is required", 400);

    // Fetch user
    const user = await getUserByEmail(email);
    if (!user) throw new HttpError("User not found", 404);

    // Ensure account is verified
    ensureVerified(user);

    // Generate OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Remove old OTPs
    await Otp.deleteMany({ email });

    // Save new OTP
    await Otp.create({
        email,
        otp: otpCode,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000)
    });

    // Send reset OTP email
    await sendEmail(email, user.fullName, otpCode, "RESET");

    return {
        message: "OTP sent successfully",
        user: {
            email: user.email
        }
    };
};