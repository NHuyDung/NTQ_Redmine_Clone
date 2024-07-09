// src/api/axiosInstance.js
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "https://defaultapi.com/";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Thêm token vào headers nếu có
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // Thực hiện các thao tác trước khi gửi yêu cầu
    return config;
  },
  function (error) {
    // Xử lý lỗi nếu có khi gửi yêu cầu
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  function (response) {
    // Xử lý response data
    return response;
  },
  function (error) {
    // Xử lý lỗi response
    if (error.response) {
      // Kiểm tra mã trạng thái HTTP
      switch (error.response.status) {
        case 401:
          // Chuyển hướng người dùng tới trang đăng nhập nếu token hết hạn
          alert("Unauthorized! Redirecting to login...");
          // window.location.href = "/login";
          break;
        case 403:
          // Hiển thị thông báo không có quyền truy cập
          alert("You do not have permission to perform this action.");
          break;
        case 500:
          // Hiển thị thông báo lỗi server
          alert("Server error. Please try again later.");
          break;
        default:
          // Xử lý các mã trạng thái khác nếu cần
          alert(`Error: ${error.response.status}`);
          break;
      }
    } else {
      // Xử lý lỗi không có response (ví dụ: network error)
      alert("Network error. Please check your connection.");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
