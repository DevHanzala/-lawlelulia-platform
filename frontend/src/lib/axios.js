import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // http://localhost:5000/api
  withCredentials: false,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT token from localStorage on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("cocolaw_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally — clear session and redirect
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("cocolaw_token");
      localStorage.removeItem("cocolaw_user");
      localStorage.removeItem("cocolaw_expiry");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;