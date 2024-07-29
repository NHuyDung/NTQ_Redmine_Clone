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

export const getMembers = async (identifier: string) => {
  try {
    const response = await axiosInstance.get(`/projects/${identifier}/memberships.json`);
    return response.data.memberships;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const getTrackerQuantity = async (identifier: string) => {
  try {
    const response = await axiosInstance.get(`/issues.json?project_id=${identifier}`);
    return response.data.issues;
  } catch (error) {
    console.error("Error fetching tracker quantity:", error);
    throw error;
  }
};
