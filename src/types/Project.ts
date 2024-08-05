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
