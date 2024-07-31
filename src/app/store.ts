import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import IssuesAssignedSlice from "~/features/issues/IssuesAssignedSlice";
import IssuesReportSlice from "~/features/issues/IssuesReportSlice";
import IssuesScheduleSlice from "~/features/issues/IssuesScheduleSlice";
import IssuesWatchedSlice from "~/features/issues/IssuesWatchedSlice";
import SpentTimeSlice from "~/features/issues/SpentTimeSlice";

const store = configureStore({
  reducer: {
    issuesReport: IssuesReportSlice,
    issuesWatched: IssuesWatchedSlice,
    issuesAssigned: IssuesAssignedSlice,
    issuesSchedule: IssuesScheduleSlice,
    SpentTime: SpentTimeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
