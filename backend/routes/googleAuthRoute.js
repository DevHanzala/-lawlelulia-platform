import express from "express";
import passport from "../config/passport.js";
import generateToken from "../utils/generateToken.js";

const router = express.Router();

// Step 1 — Redirect to Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

// Step 2 — Google redirects back here
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: `${process.env.FRONTEND_URL}/login?error=google_failed` }),
  (req, res) => {
    const token = generateToken(req.user);
    const user = {
      _id: req.user._id,
      fullName: req.user.fullName,
      email: req.user.email,
      role: req.user.role
    };

    // Redirect to frontend with token in URL — frontend will grab and store it
    const params = new URLSearchParams({
      token,
      user: JSON.stringify(user),
    });

    res.redirect(`${process.env.FRONTEND_URL}/auth/google/callback?${params}`);
  }
);

export default router;