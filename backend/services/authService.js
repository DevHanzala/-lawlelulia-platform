import User from "../models/User.js";
import Otp from "../models/Otp.js";
import bcrypt from "bcrypt";
import { sendEmail } from "./emailService.js";
import { HttpError } from "../exception/HttpError.js";
import generateToken from "../utils/generateToken.js";


// Service: Sign up and send OTP
export const signUpOtp = async (fullName, email, password) => {

    //validate parameters
    if (!fullName) throw new HttpError("Fullname is required", 400);
    if (!email) throw new HttpError("email is required", 400);
    if (!password) throw new HttpError("password is required", 400);


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
    await sendEmail(email, fullName, otpCode, "VERIFY");

    return {
        user: {
            email: user.email
        }
    };
};


//Service: verify user otp
export const verifySignUpToken = async (email, otp) => {

    //  Validate params
    if (!email) throw new HttpError("Email is required", 400);
    if (!otp) throw new HttpError("Otp is missing", 400);

    // Get latest OTP for this email
    const userOtp = await Otp.findOne({ email })
        .sort({ createdAt: -1 });

    //check otp existence
    if (!userOtp) throw new HttpError("Please generate OTP first", 400);
    // Compare OTP
    if (userOtp.otp !== otp) throw new HttpError("Otp is invalid", 400);
    // Check expiry
    if (userOtp.expiresAt < new Date()) throw new HttpError("Otp is expired", 400);


    //  Find user
    const user = await User.findOne({ email });
    if (!user) throw new HttpError("User not found", 404);

    // Update verification status
    user.isVerified = true;
    await user.save();

    // delete used OTP
    await userOtp.deleteOne();

    return {
        user: {
            email: user.email,
            isVerified: user.isVerified
        }
    };
};


// Service: login
export const login = async (email, password) => {

    // Validate parameters
    if (!email) throw new HttpError("Email is required", 400);
    if (!password) throw new HttpError("Password is required", 400);

    // Find user
    const user = await User.findOne({ email });

    // Check email existence
    if (!user) throw new HttpError("Email is not registered", 404);
    // Check verification
    if (!user.isVerified) throw new HttpError("Complete signup first", 400);
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new HttpError("Invalid credentials", 400);

    // Generate JWT
    const token = generateToken(user);

    // Return response
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

// Service: forgot password otp generation
export const forgotPasswordOtp = async (email) => {

    // validate parameters
    if (!email) throw new HttpError("Email is required", 400);

    // Find user
    const user = await User.findOne({ email });

    // Check email existence
    if (!user) throw new HttpError("Email doesn't exist", 404);

    //check verified
    if (!user.isVerified) throw new HttpError("Complete signup first", 400);

    // Generate OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Delete old OTPs
    await Otp.deleteMany({ email });

    // Save new OTP
    await Otp.create({
        email,
        otp: otpCode,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000)
    });

    // Send email
    await sendEmail(email, user.fullName, otpCode, "RESET");

    return {
        message: "OTP sent successfully",
        user: {
            email: user.email
        }
    };
};