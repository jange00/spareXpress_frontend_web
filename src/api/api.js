import axios from "axios"; 

const API_URL = import.meta.env.VITE_API_BASE_URL || "localhost:3000/api" // fallback

const instance = axios.create(
    {
        baseURL: "http://localhost:3000/api",
        headers: {
            'Content_Type' : 'application/json'
        }
    }
)

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if(token) {
        config.headers.Authorization = "Bearer " + token
    }
    return config
})

export default instance;

