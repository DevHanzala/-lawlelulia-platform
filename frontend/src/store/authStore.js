import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  loginApi,
  logoutApi,
  getMeApi,
  signupSendOtp,
  signupVerifyOtp,
  forgotPasswordSendOtp,
  forgotPasswordVerifyOtp,
  resetPasswordApi,
} from "../api/auth.api";

const SESSION_DURATION_MS = 48 * 60 * 60 * 1000; // 48 hours

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      expiresAt: null,
      loading: false,
      error: null,

      // Check if session is still valid
      isAuthenticated: () => {
        const { token, expiresAt } = get();
        if (!token || !expiresAt) return false;
        return Date.now() < expiresAt;
      },

      // Login
      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const res = await loginApi({ email, password });
          const { token, user } = res.data.data;
          const expiresAt = Date.now() + SESSION_DURATION_MS;

          localStorage.setItem("cocolaw_token", token);

          set({ user, token, expiresAt, loading: false, error: null });
          return { success: true };
        } catch (err) {
          const msg = err.response?.data?.message || "Login failed";
          set({ loading: false, error: msg });
          return { success: false, error: msg };
        }
      },

      // Logout
      logout: async () => {
        try { await logoutApi(); } catch (_) {}
        localStorage.removeItem("cocolaw_token");
        set({ user: null, token: null, expiresAt: null, error: null });
      },

      // Signup — Step 1: Send OTP
      signupSendOtp: async (fullname, email, password) => {
        set({ loading: true, error: null });
        try {
          await signupSendOtp({ fullname, email, password });
          set({ loading: false });
          return { success: true };
        } catch (err) {
          const msg = err.response?.data?.message || "Failed to send OTP";
          set({ loading: false, error: msg });
          return { success: false, error: msg };
        }
      },

      // Signup — Step 2: Verify OTP
      signupVerifyOtp: async (email, otp) => {
        set({ loading: true, error: null });
        try {
          await signupVerifyOtp({ email, otp });
          set({ loading: false });
          return { success: true };
        } catch (err) {
          const msg = err.response?.data?.message || "OTP verification failed";
          set({ loading: false, error: msg });
          return { success: false, error: msg };
        }
      },

setGoogleAuth: (token, user) => {
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  localStorage.setItem("cocolaw_token", token);
  set({ user, token, expiresAt, error: null });
},

      // Forgot Password — Step 1: Send OTP
      forgotSendOtp: async (email) => {
        set({ loading: true, error: null });
        try {
          await forgotPasswordSendOtp(email);
          set({ loading: false });
          return { success: true };
        } catch (err) {
          const msg = err.response?.data?.message || "Failed to send OTP";
          set({ loading: false, error: msg });
          return { success: false, error: msg };
        }
      },

      // Forgot Password — Step 2: Verify OTP
      forgotVerifyOtp: async (email, otp) => {
        set({ loading: true, error: null });
        try {
          await forgotPasswordVerifyOtp({ email, otp });
          set({ loading: false });
          return { success: true };
        } catch (err) {
          const msg = err.response?.data?.message || "Invalid OTP";
          set({ loading: false, error: msg });
          return { success: false, error: msg };
        }
      },

      // Forgot Password — Step 3: Reset
      resetPassword: async (email, newPassword) => {
        set({ loading: true, error: null });
        try {
          await resetPasswordApi({ email, newPassword });
          set({ loading: false });
          return { success: true };
        } catch (err) {
          const msg = err.response?.data?.message || "Reset failed";
          set({ loading: false, error: msg });
          return { success: false, error: msg };
        }
      },

      // Refresh user from server
      refreshUser: async () => {
        const { isAuthenticated } = get();
        if (!isAuthenticated()) return;
        try {
          const res = await getMeApi();
          set({ user: res.data.data.user });
        } catch (_) {
          get().logout();
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "cocolaw_auth",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        expiresAt: state.expiresAt,
      }),
    }
  )
);

export default useAuthStore;