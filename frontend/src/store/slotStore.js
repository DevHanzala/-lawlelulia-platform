import { create } from "zustand";
import {
    createSlotApi,
    getSlotsByDateApi,
    deleteSlotApi,
} from "../api/slot.api";

const useSlotStore = create((set, get) => ({
    slots: [],
    loading: false,
    error: "",

    fetchSlotsByDate: async (date) => {
        set({ loading: true, error: "" });
        try {
            // Send just the date portion as ISO — backend normalizes to start/end of day
            const d = date instanceof Date ? date : new Date(date);
            // Use noon UTC to avoid timezone day-shift issues
            const safeISO = new Date(
                Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0)
            ).toISOString();

            const res = await getSlotsByDateApi(safeISO);
            set({ slots: res.data.data || [], loading: false });
        } catch (err) {
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