import axiosInstance from "./api";
import { Issue, GroupedIssues, IssueReport } from "../types/Issue";
import moment from "moment";

export const getIssueSchedule = async (): Promise<GroupedIssues[]> => {
  try {
    const response = await axiosInstance.get<{ issues: Issue[] }>("/issues.json");
    const issues: Issue[] = response.data.issues;
    const startOfWeek = moment().startOf("week").add(1, "day");
    const endOfWeek = moment().endOf("week");
    const filteredIssues = issues.filter((issue) => {
      const issueStartDate = moment(issue.start_date);
      const issueDueDate = issue.due_date ? moment(issue.due_date) : null;
      return (
        issueStartDate.isBetween(startOfWeek, endOfWeek, "day", "[]") || (issueDueDate && issueDueDate.isBetween(startOfWeek, endOfWeek, "day", "[]"))
      );
    });

    const groupedIssues: Record<string, Issue[]> = {};
    for (let i = 0; i < 7; i++) {
      const day = startOfWeek.clone().add(i, "day").format("YYYY-MM-DD");
      groupedIssues[day] = [];
    }
    filteredIssues.forEach((issue) => {
      const startDate = moment(issue.start_date).format("YYYY-MM-DD");
      const dueDate = issue.due_date ? moment(issue.due_date).format("YYYY-MM-DD") : null;

      if (groupedIssues[startDate]) {
        groupedIssues[startDate].push({ ...issue, deadline: issue.due_date === issue.start_date });
      }

      if (dueDate && groupedIssues[dueDate]) {
        groupedIssues[dueDate].push({ ...issue, deadline: issue.due_date === issue.due_date });
      }
    });

    const groupedIssuesArray: GroupedIssues[] = Object.keys(groupedIssues).map((date) => ({
      day: date,
      tasks: groupedIssues[date],
    }));
    return groupedIssuesArray;
  } catch (error) {
    console.error("Error fetching issues:", error);
    throw error;
  }
};
export const getIssueReport = async (): Promise<IssueReport[]> => {
  try {
    const response = await axiosInstance.get<{ issues: Issue[] }>("/issues.json?author_id=me");
    console.log("getIssueReport", response.data.issues);

    return response.data.issues;
  } catch (error) {
    console.error("Error fetching issues:", error);
    throw error;
  }
};
export const getIssueWatched = async (): Promise<IssueReport[]> => {
  try {
    const response = await axiosInstance.get<{ issues: Issue[] }>("/issues.json?watcher_id=me");
    console.log("getIssueWatched", response.data.issues);

    return response.data.issues;
  } catch (error) {
    console.error("Error fetching issues:", error);
    throw error;
  }
};
export const getIssueAssigned = async (): Promise<IssueReport[]> => {
  try {
    const response = await axiosInstance.get<{ issues: Issue[] }>("/issues.json?assigned_to_id=me");
    console.log("getIssueAssigned", response.data.issues);

    return response.data.issues;
  } catch (error) {
    console.error("Error fetching issues:", error);
    throw error;
  }
};
