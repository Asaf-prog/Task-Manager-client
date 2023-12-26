export interface Task {
  id: number;
  type: TaskType;
  name: string;
  description: string;
  taskStartDate: Date;
  taskEndDate: Date;
  isRepeated: boolean;
  isArchive: boolean;
}

export enum TaskStatus {
  All = "All",
  Active = "Active",
  Archived = "Archived",
}

export interface TaskType {
  id: number;
  type: string;
}

export interface TaskDto {
  Name: string;
  Description: string;
  TaskType: number;
  IsRepeated: boolean;
  startTime: string;
}
