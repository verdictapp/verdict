import Axios from "axios";
import { getToken } from "./tokenLocalStorage";

const api = Axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "content-type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    let token = "Bearer " + String(getToken());
    config.headers["Authorization"] = token;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default api;
