import axios, { AxiosError, AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: '/api', // Set the base URL for your API
});

// Interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error('API Error:', error);
    throw error;
  }
);

export default api;
