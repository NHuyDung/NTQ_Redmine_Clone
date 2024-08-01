// src/slices/filterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~/app/store";

export interface FilterState {
  showIssues: boolean;
  showChangesets: boolean;
  showDocuments: boolean;
  showFiles: boolean;
  showWikiEdits: boolean;
  showTimeEntries: boolean;
}

const initialState: FilterState = {
  showIssues: true,
  showChangesets: true,
  showDocuments: true,
  showFiles: true,
  showWikiEdits: false,
  showTimeEntries: false,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setFilters } = filterSlice.actions;

export const selectFilters = (state: RootState) => state.filter;

export default filterSlice.reducer;
