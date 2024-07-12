// src/api/axiosInstance.js
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Add tokens to headers if available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // Handle action before send request
    return config;
  },
  function (error) {
    // Handle errors if any when sending requests
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  function (response) {
    // handle response data
    return response;
  },
  function (error) {
    // handle error response
    if (error.response) {
      // Check HTTP
      switch (error.response.status) {
        case 401:
          // route user to login page if token expired
          alert("Unauthorized! Redirecting to login...");
          // window.location.href = "/login";
          break;
        case 403:
          // Display notify access denied
          alert("You do not have permission to perform this action.");
          break;
        case 500:
          // Display server error
          alert("Server error. Please try again later.");
          break;
        default:
          // Process other status codes as needed
          alert(`Error: ${error.response.status}`);
          break;
      }
    } else {
      // Handle no response errors (eg: network error)
      alert("Network error. Please check your connection.");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
