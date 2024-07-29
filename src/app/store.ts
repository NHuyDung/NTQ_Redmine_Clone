import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import IssuesAssignedSlice from "~/features/issues/IssuesAssignedSlice";
import IssuesReportSlice from "~/features/issues/IssuesReportSlice";
import IssuesWatchedSlice from "~/features/issues/IssuesWatchedSlice";

const store = configureStore({
  reducer: {
    issuesReport: IssuesReportSlice,
    issuesWatched: IssuesWatchedSlice,
    issuesAssigned: IssuesAssignedSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
