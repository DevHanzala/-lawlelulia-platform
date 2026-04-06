import { create } from "zustand";
import {
    createCaseApi,
    getCasesApi,
    getCasesWithAppointmentsApi
} from "../api/case.api";

const useCaseStore = create((set) => ({
    cases: [],
    loading: false,
    error: "",

    // Create new case
    createCase: async (title, description) => {
        set({ loading: true, error: "" });
        try {
            const newCaseRes = await createCaseApi({ caseTitle: title, caseDescription: description });
            set((state) => ({ cases: [...state.cases, newCaseRes.data.data], loading: false }));
            return { success: true };
        } catch (error) {
            set({ error: error?.response?.data?.message, loading: false });
            return { success: false, message: error.message };
        }
    },

    // get Cases ( user ID )
    getCases: async () => {
        set({ loading: true, error: "" });
        try {
            const res = await getCasesApi();
            set({ cases: res.data.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // get Cases ( user ID )
    getCasesWithAppointments: async () => {
        set({ loading: true, error: "" });
        try {
            const res = await getCasesWithAppointmentsApi();
            set({ cases: res.data.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    }

}));

export default useCaseStore;