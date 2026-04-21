import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      minlength: [2, "Full name must be at least 2 characters"],
      trim: true,
      validate: {
        validator: (v) => /^[A-Za-z\s]+$/.test(v),
        message: "Full name must contain only letters",
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: false,
      minlength: [8, "Password must be at least 8 characters"],
    },
    googleId: { type: String, default: null },

    // Extended profile fields
    phone:             { type: String, default: "" },
    professionalTitle: { type: String, default: "" },
    bio:               { type: String, default: "" },

    isVerified: { type: Boolean, default: false },
    role:       { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);