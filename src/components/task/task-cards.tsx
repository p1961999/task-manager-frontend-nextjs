import { CalendarDays, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/shared/badge";
import { Card } from "@/components/shared/card";
import { Task } from "@/types/task";

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const statusLabel =
    task.status === "in-progress"
      ? "In Progress"
      : task.status === "done"
        ? "Done"
        : "Pending";

  const priorityLabel =
    task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

  return (
    <Card className="p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-slate-900">{task.title}</h3>
          <p className="mt-1 text-sm text-slate-500">{task.description}</p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge label={statusLabel} variant={task.status} />
            <Badge label={priorityLabel} variant={task.priority} />
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
            <CalendarDays className="h-4 w-4" />
            Due{" "}
            {new Date(task.dueDate).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <Pencil className="h-4 w-4" />
          </button>

          <button
            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 cursor-pointer"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}
