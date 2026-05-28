import Cookies from "js-cookie";
import axios, { type InternalAxiosRequestConfig } from "axios";

const api = import.meta.env.VITE_API_URL;
if (!api) {
  throw new Error("VITE_API_URL is not set");
}

export const client = axios.create({ baseURL: api });

client.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get("token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
