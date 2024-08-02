import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "~/services/api";
import { TimeEntriesType } from "~/types/spentTime";
import { SpentTimeState } from "~/types/spentTime";
const initialState: SpentTimeState = {
  SpentTime: [],
  loading: false,
  error: null,
};

export const fetchSpentTime = createAsyncThunk("SpentTime", async (): Promise<TimeEntriesType[]> => {
  try {
    const response = await axiosInstance.get<{ time_entries: TimeEntriesType[] }>("/time_entries.json?user_id=me");
    return response.data.time_entries;
  } catch (error) {
    console.error("Error fetching spent time:", error);
    throw error;
  }
});

const SpentTimeSlice = createSlice({
  name: "SpentTime",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpentTime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpentTime.fulfilled, (state, action) => {
        state.loading = false;
        state.SpentTime = action.payload;
      })
      .addCase(fetchSpentTime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch spent time";
      });
  },
});

export default SpentTimeSlice.reducer;
