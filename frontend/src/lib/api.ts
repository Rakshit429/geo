import axios from "axios";

// Helper function to get the current Clerk JWT token
const getToken = async () => {
    // We can inject this dynamically or rely on the Clerk context where requested
    return window.Clerk?.session?.getToken();
};

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/tools/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const getProfile = () => api.get("/user/profile").then(res => res.data);
export const updateProfile = (data: any) => api.put("/user/profile", data).then(res => res.data);
export const getTools = () => api.get("/tools").then(res => res.data);
export const runCsmipCalculation = (data: any) => api.post("/tools/csmip/calculate", data).then(res => res.data);

export default api;
