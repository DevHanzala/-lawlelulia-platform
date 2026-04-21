import { create } from "zustand";
import { updateProfileApi } from "../api/profile.api";
import useAuthStore from "./authStore";

const useProfileStore = create((set) => ({
  loading: false,
  error: null,
  success: false,

  updateProfile: async ({ fullName, phone, professionalTitle, bio }) => {
    set({ loading: true, error: null, success: false });
    try {
      const res = await updateProfileApi({ fullName, phone, professionalTitle, bio });
      const updatedUser = res.data.data.user;

      // Sync the updated user back into authStore so Navbar/Sidebar
      // immediately reflect the new name without a page reload
      useAuthStore.setState((state) => ({
        user: { ...state.user, ...updatedUser },
      }));

      set({ loading: false, success: true });
      return { success: true, user: updatedUser };
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update profile";
      set({ loading: false, error: msg });
      return { success: false, error: msg };
    }
  },

  clearStatus: () => set({ error: null, success: false }),
}));

export default useProfileStore;