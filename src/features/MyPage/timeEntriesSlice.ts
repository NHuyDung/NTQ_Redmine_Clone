// src/slices/timeEntriesSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "~/services/api";
import { groupIssuesByDate } from "~/utils/GroupByDate";

// Định nghĩa thunk để fetch thời gian
export const fetchSpentTime = createAsyncThunk("timeEntries/fetchSpentTime", async () => {
  try {
    const response = await axiosInstance.get("/time_entries.json");
    return response.data.time_entries;
  } catch (error) {
    console.error("Error fetching time entries:", error);
    throw error;
  }
});

const timeEntriesSlice = createSlice({
  name: "timeEntries",
  initialState: {
    data: [],
    totalHours: 0,
    status: "idle",
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpentTime.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSpentTime.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        const groupedIssues = groupIssuesByDate(action.payload);
        state.totalHours = Object.values(groupedIssues).reduce((sum, { totalHours }) => sum + totalHours, 0);
        console.log("Total Hours:", state.totalHours); // Debug log
      })
      .addCase(fetchSpentTime.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export default timeEntriesSlice.reducer;
