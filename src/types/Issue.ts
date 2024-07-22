export interface Issue {
  id: number;
  project: { id: number; name: string };
  subject: string;
  start_date: string;
  status: { id: number; name: string };
  author: { id: number; name: string };
  description: string;
  created_on: string;
  custom_fields: { id: number; name: string; value: string }[];
  done_ratio: number;
  priority: { id: number; name: string };
  tracker: { id: number; name: string };
  updated_on: string;
  due_date: string;
  assigned_to: { id: number; name: string };
  deadline: boolean;
}
export interface GroupedIssues {
  day: string;
  tasks: Issue[];
}
