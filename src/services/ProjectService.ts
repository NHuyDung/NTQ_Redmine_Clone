// src/api/projectService.js
import axiosInstance from "./api";

export const getProjects = async () => {
  try {
    const response = await axiosInstance.get("/projects.json");
    return response.data.projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const getMembers = async () => {
  const projectId = localStorage.getItem("project-id");
  try {
    const response = await axiosInstance.get(`/projects/${projectId}/memberships.json`);
    return response.data.memberships;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};
