import axiosInstance from "./api";
import { Issue, IssueData, IssueReport } from "../types/Issue";
import { fetchAPIGet } from "~/utils/helperAPI";
import axiosPost from "./apiPost";
import uploadFile from "./apiUploadFIle";
export const getIssueSchedule = async () => {
  try {
    const data = await fetchAPIGet("/issues.json");
    return data.issues;
  } catch (error) {
    console.error("Error fetching issues:", error);
    throw error;
  }
};
export const getAllIssue = async () => {
  try {
    const data = await fetchAPIGet("/issues.json");
    return data.issues;
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
export const CreateIssue = async (body: IssueData) => {
  try {
    await axiosPost.post("/issues.json", { issue: body });
  } catch (err) {
    console.log("Error fetching issues:", err);
  }
};

export const UploadFile = async (file: File): Promise<string | undefined> => {
  try {
    const response = await uploadFile.post("/uploads.json", file);
    const token = response.data.upload.token;
    return token;
  } catch (err) {
    console.error("Error uploading file:", err);
    return undefined;
  }
};
