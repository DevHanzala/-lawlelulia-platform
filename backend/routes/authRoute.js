import express from "express";
import {
  signup,
} from "../controllers/authController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.post("/signup", asyncHandler(signup));

export default router;
