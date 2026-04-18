export type TaskStatus = "pending" | "in-progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskPayload {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}

export interface TaskPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface GetTasksResponse {
  tasks: Task[];
  summary: {
    total: number;
    completed: number;
    inProgress: number;
    overdue: number;
  };
  pagination: TaskPagination;
}

export interface GetTasksParams {
  page?: number;
  limit?: number;
  status?: string;
  priority?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}