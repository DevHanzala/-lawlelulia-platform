import api from "../lib/axios";

export const createSlotApi = (startTime, endTime) =>
    api.post("/slot/createSlot", { startTime, endTime });

export const getSlotsByDateApi = (date) =>
    api.get(`/slot/getSlots?date=${date}`);

export const deleteSlotApi = (slotId) =>
    api.delete(`/slot/deleteSlot/${slotId}`);