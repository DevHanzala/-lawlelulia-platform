import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import passport from "./config/passport.js";
import googleAuthRoute from "./routes/googleAuthRoute.js";
import authRoutes from "./routes/authRoute.js";
import globalExceptionHandler from "./exception/globalExceptionHandler.js";
import slotRoute from "./routes/slotRoute.js";
import appointmentRoute from "./routes/appointmentRoute.js";
import chatBotRoute from "./routes/chatBotRoutes.js";
import caseRoutes from "./routes/caseRoutes.js";

dotenv.config();

// CONNECT DB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/auth", googleAuthRoute);
app.use("/api/slot", slotRoute);
app.use("/api/appointment", appointmentRoute);
app.use("/api/chatbot", chatBotRoute);
app.use("/api/case", caseRoutes);

app.get("/", (req, res) => {
  res.send("API running...");
});

app.use(globalExceptionHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});