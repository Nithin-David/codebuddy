import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api",
});

export default AxiosInstance;