import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "~/services/api";
import { getSpentTime } from "~/services/PageService";
import { TimeEntriesType } from "~/types/spentTime";

interface SpentTimeState {
  timeSpent: TimeEntriesType[]; // Rename this field
  loading: boolean;
  error: string | null;
}

const initialState: SpentTimeState = {
  timeSpent: [], // Rename this field
  loading: false,
  error: null,
};

export const fetchTimeSpent = createAsyncThunk("timeSpent", async (): Promise<TimeEntriesType[]> => {
  // Rename the action
  try {
    const response = await getSpentTime(); // Gọi hàm getSpentTime
    return response; // Giả sử hàm getSpentTime trả về dữ liệu theo kiểu TimeEntriesType[]
  } catch (error) {
    console.error("Error fetching spent time:", error);
    throw error;
  }
});

const timeSpentSlice = createSlice({
  // Rename slice
  name: "timeSpent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimeSpent.pending, (state) => {
        // Rename action
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTimeSpent.fulfilled, (state, action) => {
        // Rename action
        state.loading = false;
        state.timeSpent = action.payload; // Rename this field
      })
      .addCase(fetchTimeSpent.rejected, (state, action) => {
        // Rename action
        state.loading = false;
        state.error = action.error.message || "Failed to fetch time spent"; // Update error message
      });
  },
});

export default timeSpentSlice.reducer;
