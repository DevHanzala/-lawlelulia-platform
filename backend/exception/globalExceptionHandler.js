import { HttpError } from "./HttpError.js";
import { error as sendError } from "../utils/apiResponse.js";

const globalExceptionHandler = (err, req, res, next) => {

    if (err instanceof HttpError) {
        // Use statusCode and message from your HttpError
        return sendError(res, err.message, err.statusCode);
    }
    console.log("Error: ", err);   //log server errors
    // fallback for unknown errors
    return sendError(res, "Internal Server Error", 500);
};

export default globalExceptionHandler;