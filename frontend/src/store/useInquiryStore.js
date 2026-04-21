import { create } from "zustand";
import { submitInquiryApi } from "../api/inquiry.api";

const useInquiryStore = create((set) => ({
  loading: false,
  error: null,

  submitInquiry: async (payload) => {
    set({ loading: true, error: null });
    try {
      await submitInquiryApi(payload);
      set({ loading: false });
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to submit inquiry";
      set({ loading: false, error: msg });
      return { success: false, error: msg };
    }
  },

  clearError: () => set({ error: null }),
}));

export default useInquiryStore;