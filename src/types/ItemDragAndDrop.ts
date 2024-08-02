import { IssueType } from "./Issue";
import LogTime from "~/pages/MyPage/components/TotalTime/LogTime";
import Schedule from "~/pages/MyPage/components/Schedule/Schedule";
import TableIssue from "~/pages/MyPage/components/TableIssue/TableIssue";
import TotalTime from "~/pages/MyPage/components/TotalTime/TotalTime";
import SpentTime from "~/pages/MyPage/components/SpentTime/SpentTime";

export type ComponentName = "LogTime" | "Schedule" | "TableIssue" | "TotalTime" | "SpentTime";
export const componentMap: ComponentMap = {
  LogTime,
  Schedule,
  TableIssue,
  TotalTime,
  SpentTime,
};
export interface Item {
  id: string;
  content?: string;
  componentName: keyof ComponentMap;
  component?: React.ReactNode;
  data?: IssueType;
  label?: string;
}

export interface ItemsState {
  A: Item[];
  B: Item[];
  C: Item[];
}
export interface Option {
  label: string;
  value: string;
  componentName?: string;
  isAdded?: boolean;
}
export type ComponentMap = {
  LogTime: () => JSX.Element;
  Schedule: React.FC<{ id: string }>;
  TableIssue: React.FC<{ id: string }>;
  TotalTime: React.FC;
  SpentTime: () => JSX.Element;
};
