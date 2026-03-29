import { asyncHandler } from "../utils/asyncHandler.js";
import * as slotService from "../services/slotService.js";
import { success } from "../utils/apiResponse.js";

// Controller: Create a new slot
export const createSlot = asyncHandler(async (req, res) => {
    const { startTime, endTime } = req.body;
    const { user } = req;
    const newSlot = await slotService.createSlot(startTime, endTime, user);
    return success(res, "Slot created successfully", newSlot);
});

// Controller: Get all slots for a specific date
export const getSlotsByDate = asyncHandler(async (req, res) => {
    const { date } = req.query;
    const { user } = req;
    const slots = await slotService.getSlotsByDate(date, user);
    return success(res, "Slots retrieved successfully", slots);
});

// Controller: Delete a slot
export const deleteSlot = asyncHandler(async (req, res) => {
    const { slotId } = req.params;
    const { user } = req;
     await slotService.deleteSlotById(slotId, user);
    return success(res, "Slot deleted successfully", null);
});