export type ComponentName = "LogTime" | "Schedule" | "TableIssue" | "TotalTime";

export interface Item {
  id: string;
  content?: string;
  componentName?: string;
  component?: React.ReactNode;
}

export interface ItemsState {
  A: Item[];
  B: Item[];
  C: Item[];
}
