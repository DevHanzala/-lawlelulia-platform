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

        // Make file public
        await drive.permissions.create({
            fileId: response.data.id,
            requestBody: {
                role: 'reader',
                type: 'anyone'
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

        throw new Error("File upload failed", 500);
    }
};