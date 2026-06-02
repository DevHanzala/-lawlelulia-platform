import api from "../lib/axios";


export const getSlotsByDateApi = (date) =>
    api.get(`/slot/getSlots?date=${date}`);

