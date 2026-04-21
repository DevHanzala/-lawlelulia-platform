import api from "../lib/axios";

// PATCH /api/profile — update logged-in user's profile
export const updateProfileApi = (payload) =>
  api.patch("/profile", payload);