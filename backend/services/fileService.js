import fs from 'fs';
import { drive } from '../config/googleDrive.js';
import dotenv from "dotenv";

dotenv.config();

// Service: Upload file to Google Drive
export const uploadToDrive = async (file) => {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: file.originalname,
                parents: [process.env.FOLDER_ID],
            },
            media: {
                mimeType: file.mimetype,
                body: fs.createReadStream(file.path),
            },
        });

        // Delete local file
        fs.unlinkSync(file.path);

        return {
            fileId: response.data.id,
            url: `https://drive.google.com/file/d/${response.data.id}/view`
        };

    } catch (error) {

        console.log("Error uploading to Google Drive:", error);

        //  delete file even if upload fails
        if (file?.path && fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }

        // Log the error and return null to indicate upload failure
        console.log("Failed to upload file to Google Drive: ", error);
        return null;
    }
};