import axiosInstance from "./api";
import { Issue, IssueReport } from "../types/Issue";

export const getIssueSchedule = async () => {
  try {
    const response = await axiosInstance.get("/issues.json");
    return response.data.issues;
  } catch (error) {
    console.error("Error fetching issues:", error);
    throw error;
  }
};
export const getIssueReport = async (): Promise<IssueReport[]> => {
  try {
    const response = await axiosInstance.get<{ issues: Issue[] }>("/issues.json?author_id=me");

    return response.data.issues;
  } catch (error) {
    console.error("Error fetching issues:", error);
    throw error;
  }
};
export const getIssueWatched = async (): Promise<IssueReport[]> => {
  try {
    const response = await axiosInstance.get<{ issues: Issue[] }>("/issues.json?watcher_id=me");

    return response.data.issues;
  } catch (error) {
    console.error("Error fetching issues:", error);
    throw error;
  }
};
export const getIssueAssigned = async (): Promise<IssueReport[]> => {
  try {
    const response = await axiosInstance.get<{ issues: Issue[] }>("/issues.json?assigned_to_id=me");

    return response.data.issues;
  } catch (error) {
    console.error("Error fetching issues:", error);
    throw error;
  }
};
