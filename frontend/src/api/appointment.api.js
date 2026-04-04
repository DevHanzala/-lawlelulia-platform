import api from "../lib/axios";

export const createAppointmentApi = (payload) =>
    api.post("/appointment/create", payload);

export const updateAppointmentStatusApi = (appointmentId, status) =>
    api.put(`/appointment/${appointmentId}`, { status });

export const getAppointmentHistoryApi = () =>
    api.get("/appointment/history");

export const getFutureAppointmentsApi = () =>
    api.get("/appointment/future");