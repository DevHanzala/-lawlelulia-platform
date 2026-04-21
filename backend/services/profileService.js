import User from "../models/User.js";
import { HttpError } from "../exception/HttpError.js";

// Update profile — only safe user-editable fields
export const updateProfile = async (userId, { fullName, phone, professionalTitle, bio }) => {
    if (!fullName || fullName.trim().length < 2) {
        throw new HttpError("Full name must be at least 2 characters", 400);
    }
    if (!/^[A-Za-z\s]+$/.test(fullName.trim())) {
        throw new HttpError("Full name must contain only letters", 400);
    }

    const user = await User.findById(userId);
    if (!user) throw new HttpError("User not found", 404);

    user.fullName = fullName.trim();
    user.phone = phone || user.phone || "";
    user.professionalTitle = professionalTitle || user.professionalTitle || "";
    user.bio = bio || user.bio || "";

    await user.save();

    return {
        user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            phone: user.phone,
            professionalTitle: user.professionalTitle,
            bio: user.bio,
        },
    };
};