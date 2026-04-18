"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/shared/button";
import { DashboardStats } from "@/components/task/dashboard-stats";
import { TaskFilters } from "@/components/task/task-filters";
import { TaskList } from "@/components/task/list";
import { TaskFormModal } from "@/components/task/task-form-modal";
import { GetTasksParams, Task, TaskPagination as TaskPaginationType } from "@/types/task";
import { TaskPagination } from "@/components/task/task-pagination";
import { taskService } from "@/services/task.service";

interface TaskSummary {
  total: number;
  completed: number;
  inProgress: number;
  overdue: number;
}

export default function DashboardPage() {
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [summary, setSummary] = useState<TaskSummary>({
    total: 0,
    completed: 0,
    inProgress: 0,
    overdue: 0,
  });

  const [pagination, setPagination] = useState<TaskPaginationType>({
    page: 1,
    limit: 3,
    total: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [filters, setFilters] = useState<GetTasksParams>({
    page: 1,
    limit: 3,
    search: "",
    status: undefined,
    priority: undefined,
    sortBy: undefined,
    sortOrder: "desc",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const fetchTasks = async (params: GetTasksParams) => {
    try {
      setApiError("");
      setIsLoading(true);

      const response = await taskService.getTasks(params);

      setTasks(Array.isArray(response.tasks) ? response.tasks : []);
      setSummary(
        response.summary ?? {
          total: 0,
          completed: 0,
          inProgress: 0,
          overdue: 0,
        }
      );
      setPagination(
        response.pagination ?? {
          page: 1,
          limit: 3,
          total: 0,
          totalPages: 1,
          hasNextPage: false,
          hasPrevPage: false,
        }
      );
    } catch (error: any) {
      setApiError(
        error?.response?.data?.message || "Failed to fetch tasks."
      );
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(filters);
  }, [filters]);

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleAddTask = () => {
    setSelectedTask(null);
    setOpen(true);
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await taskService.deleteTask(taskId);
      await fetchTasks(filters);
    } catch (error: any) {
      setApiError(
        error?.response?.data?.message || "Failed to delete task."
      );
    }
  };

  const handleTaskSaved = async () => {
    setOpen(false);
    setSelectedTask(null);
    await fetchTasks(filters);
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      page: 1,
      limit: 3,
      search: "",
      status: undefined,
      priority: undefined,
      sortBy: undefined,
      sortOrder: "desc",
    });
  };

  return (
    <div className="space-y-6">
      <DashboardStats stats={summary} />

      <TaskFilters
        filters={filters}
        onChange={setFilters}
        onClear={handleClearFilters}
      />

      <div className="flex justify-end">
        <Button onClick={handleAddTask}>+ Add Task</Button>
      </div>

      {apiError && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
          {apiError}
        </p>
      )}

      {isLoading ? (
        <p className="text-sm text-slate-500">Loading tasks...</p>
      ) : (
        <>
          <TaskList
            tasks={tasks}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />

          <TaskPagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            totalItems={pagination.total}
            itemsPerPage={pagination.limit}
            onPageChange={handlePageChange}
          />
        </>
      )}

      <TaskFormModal
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedTask(null);
        }}
        initialData={selectedTask}
        onSuccess={handleTaskSaved}
      />
    </div>
  );
}