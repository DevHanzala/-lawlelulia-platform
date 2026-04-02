import api from "../lib/axios";

export const createAppointmentApi = (slotId) =>
    api.post("/appointment/create", { slotId });

export const updateAppointmentStatusApi = (appointmentId, status) =>
    api.put(`/appointment/${appointmentId}`, { status });

export const getAppointmentHistoryApi = () =>
    api.get("/appointment/history");

export const getFutureAppointmentsApi = () =>
    api.get("/appointment/future");