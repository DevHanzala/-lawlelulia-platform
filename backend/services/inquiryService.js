import Inquiry from "../models/Inquiry.js";
import { HttpError } from "../exception/HttpError.js";

// Create a new contact inquiry
export const createInquiry = async ({ name, email, phone, subject, message, userId }) => {
  if (!name)    throw new HttpError("Name is required", 400);
  if (!email)   throw new HttpError("Email is required", 400);
  if (!message) throw new HttpError("Message is required", 400);

  const inquiry = await Inquiry.create({
    name,
    email,
    phone:   phone   || "",
    subject: subject || "",
    message,
    userId:  userId  || null,
  });

  return { inquiry: { _id: inquiry._id, email: inquiry.email } };
};

// Get all inquiries (admin)
export const getAllInquiries = async () => {
  return await Inquiry.find().sort({ createdAt: -1 });
};