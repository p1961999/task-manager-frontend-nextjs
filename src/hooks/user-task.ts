"use client";

import { GetTasksParams, TaskPayload } from "@/types/task";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { taskService } from "@/services/task.service";

export function useTasks(params: GetTasksParams) {
  return useQuery({
    queryKey: ["tasks", params],
    queryFn: () => taskService.getTasks(params),
    placeholderData: (previousData) => previousData,
  });
}

export function useCreateTask(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: TaskPayload) => taskService.createTask(payload),
        onSuccess: ()=>{
            queryClient?.invalidateQueries({queryKey:["tasks"]});
        }
    });
}

export function useUpdateTask(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id,payload}: {id:string;payload: TaskPayload})=>taskService.updateTask(id,payload),
        onSuccess: ()=> {
            queryClient?.invalidateQueries({queryKey: ['tasks']});
        },
    });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => taskService.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}