import type { IconButtonProps } from "@mui/material";

export interface Task {
  userId: number;
  id: number;
  title: string;
  describtion: string;
  completed: boolean;
  datestart: string;
  dateend: string;
  progress: number;
  expanded: boolean;
}

export interface Selectdata {
  Task: Task[];
  prevTask: Task[];
  uinotfound: boolean;
  loading: boolean;
  saving: boolean;
  sorted: boolean;
}
export interface filtertype {
  data: number;
  label: string;
}
export interface filterobjecttype {
  selectfilter: number;
  page: number;
}
export interface Taskmange {
  selectedCard: number;
  openmodal: boolean;
  Taskdata: Task;
  opensnackbar: boolean;
}

export interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
