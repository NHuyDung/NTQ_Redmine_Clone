// src/api/projectService.js
import { fetchAPIGet } from "~/utils/helperAPI";
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
    const data = await fetchAPIGet(`/projects/${identifier}/memberships.json`);
    return data.memberships;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const getTrackerQuantity = async (identifier: string) => {
  try {
    const data = await fetchAPIGet("/issues.json", `identifier=${identifier}`);
    return data.issues;
  } catch (error) {
    console.error("Error fetching tracker quantity:", error);
    throw error;
  }
};

// activity

export const timeEntries = async (identifier: string) => {
  try {
    const data = await fetchAPIGet("/time_entries.json", `identifier=${identifier}`);
    return data.time_entries;
  } catch (error) {
    console.error("Error fetching time entries:", error);
    throw error;
  }
};

export const getWiki = async (identifier: string) => {
  try {
    const data = await fetchAPIGet(`projects/${identifier}/wiki/Wiki.json`);
    return data.wiki_page;
  } catch (error) {
    console.error("Error fetching wiki page:", error);
    throw error;
  }
};
