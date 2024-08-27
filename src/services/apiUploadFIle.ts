import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

// Tạo uploadFile instance với timeout 10 giây
const uploadFile = axios.create({
  baseURL: baseURL,
  timeout: 5000, // Timeout 10 giây
  headers: {
    "Content-Type": "application/octet-stream",
  },
});

uploadFile.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

uploadFile.interceptors.response.use(
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
        case 404:
          console.error("Not Found: The requested resource was not found.");
          break;
        default:
          console.error(`Error ${error.response.status}: ${error.response.data}`);
          break;
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timed out.");
    } else {
      console.error("Network error: No response from server.");
    }
    return Promise.reject(error);
  },
);

export default uploadFile;