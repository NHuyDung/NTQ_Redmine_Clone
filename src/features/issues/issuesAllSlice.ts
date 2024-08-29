import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Issue, IssuesState } from "~/types/Issue";
import { fetchAPIGet } from "~/utils/helperAPI";
const initialState: IssuesState = {
  issuesAll: [],
  loading: false,
  error: null,
};

export const fetchIssuesAll = createAsyncThunk("issues/IssuesAll", async (): Promise<Issue[]> => {
  const data = await fetchAPIGet("/issues.json", "limit=100");
  const issues = data.issues.map((issue: Issue) => {
    return {
      label: issue.subject,
      value: issue.id,
    };
  });
  return issues;
});

const issuesAllSlice = createSlice({
  name: "issuesAll",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssuesAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIssuesAll.fulfilled, (state, action) => {
        state.loading = false;
        state.issuesAll = action.payload;
      })
      .addCase(fetchIssuesAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch issues";
      });
  },
});

export default issuesAllSlice.reducer;
