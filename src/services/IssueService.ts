import axiosInstance from "./api";
import { Issue, GroupedIssues } from "../types/Issue";
export const getIssue = async (): Promise<GroupedIssues[]> => {
  try {
    const response = await axiosInstance.get("/issues.json");
    const issues: Issue[] = response.data.issues;
    const groupedIssues = issues.reduce((acc: Record<string, Issue[]>, issue: Issue) => {
      const date = issue.start_date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(issue);
      return acc;
    }, {});
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
