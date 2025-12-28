import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

const getToken = () => {
  const stored = localStorage.getItem("todo-user");
  return stored ? JSON.parse(stored)?.token : null;
};


apiClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error) // ✅ wrap in a function
);

export default apiClient