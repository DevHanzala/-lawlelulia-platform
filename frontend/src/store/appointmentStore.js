import { create } from "zustand";
import {
    createAppointmentApi,
    updateAppointmentStatusApi,
    getAppointmentHistoryApi,
    getFutureAppointmentsApi,
} from "../api/appointment.api";

const useAppointmentStore = create((set) => ({
    history: [],
    future: [],
    loading: false,
    error: "",
    updatingId: null,

    // Fetch appointment history (user)
    fetchHistory: async () => {
        set({ loading: true, error: "" });
        try {
            const res = await getAppointmentHistoryApi();
            set({ history: res.data.data || [], loading: false });
        } catch (err) {
            set({
                error: err.response?.data?.message || "Failed to load history",
                loading: false,
            });
        }
    },

    // Fetch future appointments (user)
    fetchFuture: async () => {
        set({ loading: true, error: "" });
        try {
            const res = await getFutureAppointmentsApi();
            set({ future: res.data.data || [], loading: false });
        } catch (err) {
            set({
                error: err.response?.data?.message || "Failed to load upcoming",
                loading: false,
            });
        }
    },

    // Fetch both history + future together
    fetchAllUserAppointments: async () => {
        set({ loading: true, error: "" });
        try {
            const [histRes, futRes] = await Promise.all([
                getAppointmentHistoryApi(),
                getFutureAppointmentsApi(),
            ]);
            set({
                history: histRes.data.data || [],
                future: futRes.data.data || [],
                loading: false,
            });
        } catch (err) {
            set({
                error: err.response?.data?.message || "Failed to load appointments",
                loading: false,
            });
        }
    },

    // Book an appointment (user)
    bookAppointment: async (slotId , caseId) => {
        set({ error: "" });
        try {
            await createAppointmentApi({slotId, caseId});
            return { success: true };
        } catch (err) {
            const msg = err.response?.data?.message || "Failed to book appointment";
            set({ error: msg });
            return { success: false, error: msg };
        }
    },

    // Update appointment status (admin)
    updateStatus: async (appointmentId, status) => {
        set({ updatingId: appointmentId, error: "" });
        try {
            await updateAppointmentStatusApi(appointmentId, status);
            set({ updatingId: null });
            return { success: true };
        } catch (err) {
            const msg = err.response?.data?.message || "Failed to update status";
            set({ updatingId: null, error: msg });
            return { success: false, error: msg };
        }
    },

    clearError: () => set({ error: "" }),
}));

export default useAppointmentStore;