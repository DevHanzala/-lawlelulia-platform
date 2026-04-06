import { HttpError } from "../exception/HttpError.js";
import Appointment from "../models/Appointment.js";
import Case from "../models/Case.js";

// Service: get  All cases by user id
export const getCasesByUserId = async (user) => {
    const cases = await Case.find({ userId: user._id });
    return cases;
}

// Service: get case by id
export const getCaseById = async (caseId, user) => {
    const caseData = await Case.findById(caseId);
    if (!caseData) throw new HttpError("Case not found", 404);
    if (caseData.userId.toString() !== user._id.toString()) throw new HttpError("Unauthorized access to case", 403);
    return caseData;
}

// Service: Create a new case
export const createNewCase = async (caseTitle, caseDescription, user) => {

    if (user.role === "admin") throw new HttpError("Admins cannot create cases", 403);

    // Input validation
    if (!caseTitle || caseTitle.length < 3 || caseTitle.length > 50) {
        throw new HttpError("Case title must be 3-50 characters long", 400);
    }
    if (!caseDescription || caseDescription.length < 50 || caseDescription.length > 1500) {
        throw new HttpError("Case description must be 50-1500 characters long", 400);
    }

    const newCase = new Case({
        caseTitle,
        caseDescription,
        userId: user._id
    });

    return await newCase.save();
}

// Service: get cases along with appointments and user data (Admin only)
export const getCasesWithAppointments = async (user) => {
    if (user.role !== "admin") {
        throw new HttpError("Unauthorized access to cases with appointments", 403);
    }

    // Step 1: Find all cases and populate the user
    const cases = await Case
        .find()
        .populate("userId", "fullName email") // populate user details
        .lean();

    // Step 2: For each case, fetch its appointments
    const casesWithAppointments = await Promise.all(
        cases.map(async (c) => {
            const appointments = await Appointment.find({ case: c._id }).lean();
            // Return object with renamed user and without userId
            const { userId, ...rest } = c; // destructure to remove userId
            return {
                ...rest,
                user: userId, // populated user
                appointments,
            };
        })
    );

    return casesWithAppointments;
};