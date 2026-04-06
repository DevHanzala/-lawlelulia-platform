import { asyncHandler } from "../utils/asyncHandler.js";
import * as caseService from "../services/caseService.js";
import { success } from "../utils/apiResponse.js";

// Controller: Get all cases for the authenticated user
export const getCasesByUserId = asyncHandler(async (req, res) => {
    const user = req.user;
    const cases = await caseService.getCasesByUserId(user);
    return success(res, "Cases fetched successfully", cases);
})

// Controller: Create a new case for the authenticated user
export const createNewCase = asyncHandler(async (req, res) => {
    const { caseTitle, caseDescription } = req.body;
    const user = req.user;
    const newCase = await caseService.createNewCase(caseTitle, caseDescription, user);
    return success(res, "Case created successfully", newCase);
})

// Controller: Get Case along with its appointment details
export const getCasesWithAppointments = asyncHandler(async (req, res) => {
    const user = req.user;
    const casesWithAppointments = await caseService.getCasesWithAppointments(user);
    return success(res, "Cases with appointments fetched successfully", casesWithAppointments);
});
