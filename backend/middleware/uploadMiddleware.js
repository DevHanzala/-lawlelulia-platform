import multer from "multer";
import path from "path";

// Storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // make sure this folder exists
    },
    filename: (req, file, cb) => {
        const uniqueName = file.originalname + "-" + Date.now();
        cb(null, uniqueName);
    }
});

// File filter 
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF, PNG, JPG allowed"), false);
    }
};

// Multer instance
export const fileUpload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});