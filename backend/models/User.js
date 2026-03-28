import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        minlength: [3, "Full name must be at least 3 characters"],
        trim: true,
        validate: {
            validator: function (v) {
                return /^[A-Za-z\s]+$/.test(v); // only letters + spaces
            },
            message: "Full name must contain only letters"
        }
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^\S+@\S+\.\S+$/,
            "Please use a valid email address"
        ]
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"]
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }

}, { timestamps: true });

export default mongoose.model("User", userSchema);