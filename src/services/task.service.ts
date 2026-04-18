import axiosInstance from "@/lib/axios";
import { GetTasksParams, GetTasksResponse, Task, TaskPayload } from "@/types/task";

export const taskService = {
  getTasks: async (params?: GetTasksParams) => {
    const { data } = await axiosInstance.get<GetTasksResponse>("/tasks", { params });
    return data;
  },

  getTaskById: async (id: string) => {
    const { data } = await axiosInstance.get<Task>(`/tasks/${id}`);
    return data;
  },

  createTask: async (payload: TaskPayload) => {
    const { data } = await axiosInstance.post<Task>("/tasks", payload);
    return data;
  },

  updateTask: async (id: string, payload: TaskPayload) => {
    const { data } = await axiosInstance.put<Task>(`/tasks/${id}`, payload);
    return data;
  },

  deleteTask: async (id: string) => {
    const { data } = await axiosInstance.delete(`/tasks/${id}`);
    return data;
  },
};
