import axios from "axios";

const API_SECRET_KEY = process.env.API_SECRET_KEY || "mysecretkey";
const BASE_URL = process.env.API_BASE_URL || "https://api.example.com/v1"; // Replace with your actual base URL

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 40000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json; charset=utf-8",
    "X-api-key": `${API_SECRET_KEY}`,
    owner: "infolinematrix@gmail.com",
  },
  // other configurations
});

// Request interceptor for adding the bearer token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // console.log(response);
    if (process.env.NODE_ENV === "development") console.log(response);
    // Edit response config
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export const fetcher = async (url: any) => {
  const res = await api.get(url);
  if (!res.data) {
    throw Error(res.data.message);
  }
  return res.data;
};

// Export the api instance
export default api;
