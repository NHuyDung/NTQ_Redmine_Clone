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
export interface VersionSelect {
  id: number;
  name: string;
  status: string;
}
export interface WatcherSelect {
  value: number;
  label: string;
}
export interface MemberSelect {
  value: number;
  label: string;
}
export interface GroupMemberSelect {
  Membership: MemberSelect[];
  Watcher: WatcherSelect[];
}
export interface Member {
  id: number;
  project: Project;
  user: { id: number; name: string };
  roles: { id: number; name: string }[];
  label: string;
  value: number;
}

export interface Versions {
  id: number;
  project: Project;
  user: { id: number; name: string };
  roles: { id: number; name: string }[];
  label: string;
  value: number;
}
export interface MemberShip {
  memberships: Member[];
  total_count: number;
  offset: number;
  limit: number;
}
