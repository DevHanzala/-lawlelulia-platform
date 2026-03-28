import jwt from "jsonwebtoken";
import { HttpError } from "../exception/HttpError.js";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new HttpError("Not authorized, no token", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    if (!req.user) throw new HttpError("User not found", 404);
    next();
  } catch (err) {
    throw new HttpError("Token invalid or expired", 401);
  }
};