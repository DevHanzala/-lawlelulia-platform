import { create } from "zustand";
import { getSlotsByDateApi } from "../api/slot.api";

const useSlotStore = create((set) => ({
    slots: [],
    loading: false,
    error: "",

    fetchSlotsByDate: async (date) => {
        set({ loading: true, error: "" });
        try {
            const d = date instanceof Date ? date : new Date(date);

            const safeISO = new Date(
                Date.UTC(
                    d.getUTCFullYear(),
                    d.getUTCMonth(),
                    d.getUTCDate(),
                    12, 0, 0
                )
            ).toISOString();

            const res = await getSlotsByDateApi(safeISO);
            set({ slots: res.data.data || [], loading: false });
        } catch (err) {
            console.error(`[SlotStore] Error:`, err.response?.data?.message);
            set({
                error:   err.response?.data?.message || "Failed to load slots",
                loading: false,
                slots:   [],
            });
        }
    },

    clearError: () => set({ error: "" }),
}));

export default useSlotStore;