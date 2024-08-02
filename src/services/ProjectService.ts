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
    const response = await axiosInstance.get(`/issues.json?identifier=${identifier}`);
    return response.data.issues;
  } catch (error) {
    console.error("Error fetching tracker quantity:", error);
    throw error;
  }
};

// activity

export const timeEntries = async (identifier: string) => {
  try {
    const response = await axiosInstance.get(`/time_entries.json?identifier=${identifier}`);
    return response.data.time_entries;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const getWiki = async (identifier: string) => {
  try {
    const response = await axiosInstance.get(`projects/${identifier}/wiki/Wiki.json`);
    return response.data.wiki_page;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};
