import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const AxiosInstance = axios.create({ baseURL });

AxiosInstance.interceptors.request.use((config) => {
  const token = cookies.get("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 && typeof window !== "undefined") {
      cookies.remove("token", { path: "/" });
      cookies.remove("role", { path: "/" });
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
