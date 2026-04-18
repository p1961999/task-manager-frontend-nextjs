"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/shared/button";
import { GetTasksParams } from "@/types/task";

interface TaskFiltersProps {
  filters: GetTasksParams;
  onChange: (filters: GetTasksParams) => void;
  onClear: () => void;
}

export function TaskFilters({
  filters,
  onChange,
  onClear,
}: TaskFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={filters.search || ""}
          onChange={(e) =>
            onChange({
              ...filters,
              page: 1,
              search: e.target.value || undefined,
            })
          }
          placeholder="Search tasks..."
          className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500"
        />
      </div>

      <select
        value={filters.status || ""}
        onChange={(e) =>
          onChange({
            ...filters,
            page: 1,
            status: e.target.value || undefined,
          })
        }
        className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-700"
      >
        <option value="">Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <select
        value={filters.priority || ""}
        onChange={(e) =>
          onChange({
            ...filters,
            page: 1,
            priority: e.target.value || undefined,
          })
        }
        className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-700"
      >
        <option value="">Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <select
        value={filters.sortBy || ""}
        onChange={(e) =>
          onChange({
            ...filters,
            page: 1,
            sortBy: e.target.value || undefined,
          })
        }
        className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-700"
      >
        <option value="">Sort By</option>
        <option value="dueDate">Due Date</option>
        <option value="createdAt">Creation Date</option>
      </select>

      <Button variant="primary" type="button" onClick={onClear}>
        Clear Filters
      </Button>
    </div>
  );
}