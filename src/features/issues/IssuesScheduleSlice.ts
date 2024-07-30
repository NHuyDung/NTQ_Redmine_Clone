import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import moment from "moment";
import axiosInstance from "~/services/api";
import { GroupedIssues, Issue } from "~/types/Issue";

interface IssuesState {
  issuesSchedule: GroupedIssues[];
  loading: boolean;
  error: string | null;
}

const initialState: IssuesState = {
  issuesSchedule: [],
  loading: false,
  error: null,
};

export const fetchIssuesSchedule = createAsyncThunk("issues/IssuesSchedule", async (): Promise<GroupedIssues[]> => {
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
});

const issuesScheduleSlice = createSlice({
  name: "issuesSchedule",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssuesSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIssuesSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.issuesSchedule = action.payload;
      })
      .addCase(fetchIssuesSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch issues";
      });
  },
});

export default issuesScheduleSlice.reducer;
