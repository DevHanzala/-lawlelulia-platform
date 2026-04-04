import api from "../lib/axios";

// Create Case
export const createCaseApi = (payload) =>
  api.post("/case/createCase", payload);

// Get Cases ( user ID 
export const getCasesApi = () =>
  api.get("/case/getCases");