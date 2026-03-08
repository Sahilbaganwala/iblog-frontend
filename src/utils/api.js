// Automatically checks if Vite is building for production
const isProduction = import.meta.env.PROD;

export const API = isProduction 
  ? "https://iblog-backend-m7e6.onrender.com" 
  : "http://localhost:4000";

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user"); // if you store user data
};