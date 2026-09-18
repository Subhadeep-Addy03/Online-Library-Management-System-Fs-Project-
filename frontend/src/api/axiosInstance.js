import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "https://online-library-management-system-fs.onrender.com",
});

// Attach auth token to every request automatically
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
