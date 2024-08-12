export interface Project {
  id: number;
  name: string;
  description?: string;
  created_on?: string | undefined;
  identifier: string;
}
export interface ProjectState {
  project: Project[];
  loading?: boolean;
  error?: string | null;
}

// Activity

export interface Time {
  activity: { id: number; name: string };
  id: string;
  spent_on: string;
  comments: string;
  created_on: string;
  user: { id: number; name: string };
  hours: number;
  issue?: { id: number };
}

export interface Wikis {
  title: string;
  text: string;
  version: number;
  author: { id: number; name: string };
  created_on: string;
}

export interface OverviewProps {
  identifier: string;
}
