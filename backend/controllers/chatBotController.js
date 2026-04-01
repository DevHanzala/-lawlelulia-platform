import { asyncHandler } from "../utils/asyncHandler.js";
import * as chatBotService from "../services/chatBotService.js";
import { success } from "../utils/apiResponse.js";

// Controller for handling chatbot interactions
export const chatBotController = asyncHandler(async (req, res) => {
    const { message } = req.body;
    const data = await chatBotService.getChatBotResponse(message);
    return success(res, "ChatBot response retrieved successfully", data);
})

