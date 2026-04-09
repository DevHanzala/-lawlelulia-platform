import { Readable } from "stream";
import { drive } from "../config/googleDrive.js";
import dotenv from "dotenv";
dotenv.config();

// Service: Upload file to Google Drive
// Works with multer memoryStorage — uses file.buffer instead of file.path
export const uploadToDrive = async (file) => {
    try {
        if (!file || !file.buffer) {
            console.error("[FileService] No buffer found on file object");
            return null;
        }

        // Convert Buffer to readable stream for Drive API
        const bufferStream = new Readable();
        bufferStream.push(file.buffer);
        bufferStream.push(null);

        const response = await drive.files.create({
            requestBody: {
                name: file.originalname,
                parents: [process.env.FOLDER_ID],
            },
            media: {
                mimeType: file.mimetype,
                body: bufferStream,
            },
        });


        return {
            fileId: response.data.id,
            url: `https://drive.google.com/file/d/${response.data.id}/view`,
        };

    } catch (error) {
        console.error("[FileService] Failed to upload to Google Drive:", error.message);
        return null;
    }
};