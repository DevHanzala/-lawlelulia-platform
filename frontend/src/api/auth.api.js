import api from "../lib/axios";

// Signup
export const signupSendOtp = (payload) =>
  api.post("/auth/signup-sendotp", payload);

export const signupVerifyOtp = (payload) =>
  api.post("/auth/signup-verifytoken", payload);

// Login / Logout
export const loginApi = (payload) =>
  api.post("/auth/login", payload);

export const logoutApi = () =>
  api.post("/auth/logout");

// Forgot Password
export const forgotPasswordSendOtp = (email) =>
  api.post("/auth/forgotpassword-sendotp", { email });

export const forgotPasswordVerifyOtp = (payload) =>
  api.post("/auth/forgotpassword-verifytoken", payload);

export const resetPasswordApi = (payload) =>
  api.post("/auth/forgotpassword-reset", payload);

// Session
export const getMeApi = () =>
  api.get("/auth/me");