import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const fullName = profile.displayName;

        // Check if user exists
        let user = await User.findOne({ email });

        if (user) {
          // If user exists but signed up with password, still allow Google login
          if (!user.isVerified) {
            user.isVerified = true;
            await user.save();
          }
          return done(null, user);
        }

        // Create new user from Google profile (no password needed)
        user = await User.create({
          fullName,
          email,
          password: "GOOGLE_AUTH_" + Math.random().toString(36), // placeholder
          isVerified: true, // Google already verified the email
          googleId: profile.id,
        });

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;