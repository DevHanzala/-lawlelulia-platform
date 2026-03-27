import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

// Generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

export default generateToken;