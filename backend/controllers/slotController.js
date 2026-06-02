import { asyncHandler } from "../utils/asyncHandler.js";
import * as slotService from "../services/slotService.js";
import { success } from "../utils/apiResponse.js";


// Controller: Get all slots for a specific date
export const getSlotsByDate = asyncHandler(async (req, res) => {
    const { date } = req.query;
    const { user } = req;
    const slots = await slotService.getSlotsByDate(date, user);
    return success(res, "Slots retrieved successfully", slots);
});

