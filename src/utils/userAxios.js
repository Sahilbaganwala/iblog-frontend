import axios from "axios";

const userAxios = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true
});

userAxios.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default userAxios;
