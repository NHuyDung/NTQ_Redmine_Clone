export interface Project {
  id: number;
  name: string;
  description?: string;
  created_on?: string;
  identifier: string;
}
export interface ProjectState {
  project: Project[];
  loading?: boolean;
  error?: string | null;
}
