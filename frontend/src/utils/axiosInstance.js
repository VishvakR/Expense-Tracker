import axios from 'axios';
import { BASE_URL } from './apiPath';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout : 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle responses globally
axiosInstance.interceptors.response.use(
    (response) => { 
        return response;
    },
    (error) => {
        if (error.response) {  
            if (error.response.status === 401) {
                // Handle unauthorized access, e.g., redirect to login
                console.error("Unauthorized! Redirecting to login...");
                window.location.href = "/login";
                // return Promise.reject(error);
            } else if (error.response.status === 500) {
                console.error("Server error! Please try again later.");
            }
        } else if (error.code === 'ECONNABORTED') {
            console.error("Request timeout! Please try again.");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;