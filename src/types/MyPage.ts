export interface TotalType {
  id: number;
  project: {
    id: number;
    name: string;
  };
  user: {
    id: number;
    name: string;
  };
  activity: {
    id: number;
    name: string;
  };
  hours: number;
  comments: string;
  spent_on: string;
  created_on: string;
  updated_on: string;
  custom_fields: {
    id: number;
    name: string;
    value: string;
  }[];
  issue?: {
    id: number;
  };
}

export interface SpentTimeType {
  id: number;
  project: {
    id: number;
    name: string;
  };
  spent_on: string;
  user: {
    id: number;
    name: string;
  };
  activity: {
    id: number;
    name: string;
  };
  issue: {
    id: number;
  };
  comments: string;
  hours: number;
}
