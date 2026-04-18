"use client";

import { useEffect, useState } from "react";
import { Task, TaskPayload } from "@/types/task";
import { Modal } from "@/components/shared/modal";
import { Input } from "@/components/shared/input";
import { Textarea } from "@/components/shared/textarea";
import { Select } from "@/components/shared/select";
import { Button } from "@/components/shared/button";
import { taskService } from "@/services/task.service";

interface TaskFormModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: Task | null;
  onSuccess: () => void;
}

const initialFormData: TaskPayload = {
  title: "",
  description: "",
  status: "pending",
  priority: "medium",
  dueDate: "",
};

export function TaskFormModal({
  open,
  onClose,
  initialData,
  onSuccess,
}: TaskFormModalProps) {
  const [formData, setFormData] = useState<TaskPayload>(initialFormData);
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (initialData) {
      const data: TaskPayload = {
        title: initialData.title,
        description: initialData.description ?? "",
        status: initialData.status,
        priority: initialData.priority,
        dueDate: initialData.dueDate ? initialData.dueDate.split("T")[0] : "",
      };

      setFormData(data);
    } else {
      setFormData(initialFormData);
    }

    setApiError("");
  }, [open, initialData]);

  const handleChange = (field: keyof TaskPayload, value: string) => {
    setApiError("");
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setApiError("");
      setIsLoading(true);

      if (initialData?._id) {
        await taskService.updateTask(initialData._id, formData);
      } else {
        await taskService.createTask(formData);
      }

      setFormData(initialFormData);
      onSuccess();
    } catch (error: any) {
      setApiError(error?.response?.data?.message || "Failed to save task.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initialData ? "Edit Task" : "Add Task"}
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Input
          label="Title"
          placeholder="Enter task title"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />

        <Textarea
          label="Description"
          placeholder="Enter task description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />

        <Select
          label="Status"
          value={formData.status}
          onChange={(e) => handleChange("status", e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </Select>

        <Select
          label="Priority"
          value={formData.priority}
          onChange={(e) => handleChange("priority", e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Select>

        <Input
          label="Due Date"
          type="date"
          value={formData.dueDate}
          onChange={(e) => handleChange("dueDate", e.target.value)}
        />

        {apiError && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
            {apiError}
          </p>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : initialData ? "Save Changes" : "Create Task"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}