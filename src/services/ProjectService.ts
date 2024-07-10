// src/api/projectService.js
import axiosInstance from "./api";

export const getProjects = async () => {
  try {
    const response = await axiosInstance.get("/projects.json");
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};
