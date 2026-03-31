import { HttpError } from "../exception/HttpError.js";

export const adminOnly = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        throw new HttpError("Access denied. Admins only.", 403);
    }
    next();
};