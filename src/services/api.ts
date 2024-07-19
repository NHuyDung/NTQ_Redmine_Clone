import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
  // timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error("Unauthorized: Access is denied.");
          break;
        case 403:
          console.error("Forbidden: Access is denied.");
          break;
        default:
          console.error(`Error ${error.response.status}: ${error.response.data}`);
          break;
      }
    } else {
      console.error("Network error: No response from server.");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
