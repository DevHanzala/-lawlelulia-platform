import { GoogleGenAI } from "@google/genai";
import { HttpError } from "../exception/HttpError.js";
import dotenv from "dotenv";
import { getWebsiteContext } from "../utils/getWebsiteContext.js";

dotenv.config();

// Initialize Google GenAI client
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

// helper delay function
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Service: Get chatbot response
export const getChatBotResponse = async (message) => {
    if (!message) throw new HttpError("Invalid message", 400);

    const context = getWebsiteContext();

    const fullPrompt = `
${context}

User: ${message}
Assistant:
`;

    // Max retry attempts for API call
    let attempts = 3;
    // Variable to hold the chatbot reply
    let reply;

    while (attempts > 0) {
        try {
            console.log(`Attempts: ${attempts} |\n \ n \ n`); 
            const response = await ai.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: fullPrompt,
            });

             reply = response.text || "Sorry, I couldn't understand.";
            return reply;

        } catch (error) {
            attempts--;
            console.error(`Chatbot attempt failed. Remaining: ${attempts}`, error.message);

            // If no attempts left → throw error
            if (attempts === 0) {
                  reply = "Chatbot is busy right now. Please try again."
                 return reply;   
            }

            // wait before retry (1 sec → 2 sec → 3 sec)
            await sleep((4 - attempts) * 1000);
        }
    }
};