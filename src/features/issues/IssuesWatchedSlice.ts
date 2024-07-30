import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "~/services/api";
import { Issue } from "~/types/Issue";

interface IssuesState {
  issues: Issue[];
  loading: boolean;
  error: string | null;
}

const initialState: IssuesState = {
  issues: [],
  loading: false,
  error: null,
};

export const fetchIssuesWatched = createAsyncThunk("issues/IssuesWatched", async (): Promise<Issue[]> => {
  try {
    const response = await axiosInstance.get<{ issues: Issue[] }>("/issues.json?watcher_id=me");
    return response.data.issues;
  } catch (error) {
    console.error("Error fetching issues:", error);
    throw error;
  }
});

const issuesWatchedSlice = createSlice({
  name: "issuesWatched",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssuesWatched.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIssuesWatched.fulfilled, (state, action) => {
        state.loading = false;
        state.issues = action.payload;
      })
      .addCase(fetchIssuesWatched.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch issues";
      });
  },
});

export default issuesWatchedSlice.reducer;