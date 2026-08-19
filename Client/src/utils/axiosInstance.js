import axios from "axios";
const API = import.meta.env.VITE_BACKEND_BASE_URL;
export const axiosInstance = axios.create({
  baseURL: API,
  withCredentials: true,
});
