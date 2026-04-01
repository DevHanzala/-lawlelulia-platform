import api from "../lib/axios";

// chat with bot
export const sendMessage = (message) =>
  api.post("/chatbot/chat", { message });