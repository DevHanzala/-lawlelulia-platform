import { create } from "zustand";
import {
    createSlotApi,
    getSlotsByDateApi,
    deleteSlotApi,
} from "../api/slot.api";

const useSlotStore = create((set) => ({
    slots: [],
    loading: false,
    error: "",

    fetchSlotsByDate: async (date) => {
        set({ loading: true, error: "" });
        try {
            const d = date instanceof Date ? date : new Date(date);

            // FIXED: Use UTC date parts from the actual UTC date, not local date
            // This ensures April 9 local = April 9 UTC query
            const safeISO = new Date(
                Date.UTC(
                    d.getUTCFullYear(),  // ← UTC year, not local
                    d.getUTCMonth(),     // ← UTC month, not local
                    d.getUTCDate(),      // ← UTC date, not local
                    12, 0, 0
                )
            ).toISOString();

            const res = await getSlotsByDateApi(safeISO);
            set({ slots: res.data.data || [], loading: false });
        } catch (err) {
            console.error(`[SlotStore] Error:`, err.response?.data?.message);
            set({
                error: err.response?.data?.message || "Failed to load slots",
                loading: false,
                slots: [],
            });
        }
    },

    createSlot: async (startTime, endTime) => {
        set({ error: "" });
        try {
            await createSlotApi(startTime, endTime);
            return { success: true };
        } catch (err) {
            const msg = err.response?.data?.message || "Failed to create slot";
            set({ error: msg });
            return { success: false, error: msg };
        }
    },

    deleteSlot: async (slotId) => {
        try {
            await deleteSlotApi(slotId);
            set((state) => ({
                slots: state.slots.filter((s) => s._id !== slotId),
            }));
            return { success: true };
        } catch (err) {
            const msg = err.response?.data?.message || "Failed to delete slot";
            return { success: false, error: msg };
        }
    },

    clearError: () => set({ error: "" }),
}));

export default useSlotStore;