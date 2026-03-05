import axios from "axios";

// Helper to get Clerk Token
const getToken = async () => {
    // Cast window to any to avoid TS error
    return (window as any).Clerk?.session?.getToken();
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

// CSMIP Tool Endpoints
export interface CsmipFasPayload {
    Magnitude: number;
    Distance: number;
    Region: string;
    FAS: any[];
}

export interface CsmipAnalyzePayload {
    Target_Depth: number;
    Reference_Site_Soil_Profile: any[];
    Target_Site_Soil_Profile: any[];
    FAS: any[];
    Transfer_Functions: any[];
    Max_Strain_Profile: any[];
    Ref_Halfspace_Vs: number;
    Ref_Halfspace_Damping: number;
    Ref_Water_Table_Depth: number;
    Tar_Halfspace_Vs: number;
    Tar_Halfspace_Damping: number;
    Tar_Water_Table_Depth: number;
    Analysis_Type: string;
    Tol: number;
    MaxIter: number;
    EffStrain: number;
    StrainLimit: number;
    Magnitude: number;
    Distance: number;
    Region: string;
}

export interface CsmipMotionPayload {
    Transfer_Functions: any[];
    Motion: any[];
    Response_Spectrum: any[];
    FA_Spectrum: any[];
}

export const runCsmipGenerateFAS = (data: CsmipFasPayload) => api.post("/tools/csmip/generate_fas", data).then(res => res.data);
export const runCsmipAnalyze = (data: CsmipAnalyzePayload) => api.post("/tools/csmip/analyze", data).then(res => res.data);
export const runCsmipGenerateMotion = (data: CsmipMotionPayload) => api.post("/tools/csmip/generate_motion", data).then(res => res.data);


export default api;
