import api from "../lib/axios";

// POST /api/inquiry — submit contact form (works logged-in or guest)
export const submitInquiryApi = (payload) =>
  api.post("/inquiry", payload);