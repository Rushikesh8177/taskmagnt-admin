import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:7000",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Automatically attach token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // token stored after login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
