import { Task } from "@/types/task";
import { TaskCard } from "@/components/task/task-cards";

interface TaskListProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export function TaskList({ tasks, onEditTask, onDeleteTask }: TaskListProps) {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={() => onEditTask(task)}
          onDelete={() => onDeleteTask(task._id)}
        />
      ))}
    </div>
  );
}
