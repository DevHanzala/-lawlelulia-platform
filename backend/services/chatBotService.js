import axios from "axios";
import { HttpError } from "../exception/HttpError.js";
import dotenv from "dotenv";
import { getWebsiteContext } from "../utils/getWebsiteContext.js";

dotenv.config();

// Service: Get chatbot response
export const getChatBotResponse = async (message) => {
    try {
        if (!message) throw new HttpError("Invalid message",400);
        const API_KEY = process.env.GEMINI_API_KEY;
        const context = getWebsiteContext();
        const fullPrompt = `${context}\nUser: ${message}\nAssistant:`;

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent`,
            {
                contents: [
                    {
                        parts: [{ text: fullPrompt }],
                    },
                ],
            },
            {
                params: { key: API_KEY }, // cleaner than putting in URL
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const reply =
            response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Sorry, I couldn't understand.";

        return reply;

    } catch (error) {
        console.error("Chatbot Error:", error?.response?.data || error.message);

        throw new HttpError("Failed to get chatbot response", 500);
    }
};