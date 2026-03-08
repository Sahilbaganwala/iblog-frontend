import axios from "axios";

// Automatically checks if Vite is building for production
const isProduction = import.meta.env.PROD;

const dynamicBaseURL = isProduction 
  ? "https://iblog-backend-m7e6.onrender.com" 
  : "http://localhost:4000";

const userAxios = axios.create({
  baseURL: dynamicBaseURL,
});

userAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default userAxios;