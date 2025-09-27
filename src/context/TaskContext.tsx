import { createContext, useContext, type ReactNode } from "react";
import useTasks from "../hooks/useTasks";
import type { TaskContextType } from "../types";

const TaskContext = createContext<TaskContextType | undefined>(undefined);
interface TaskProviderProps {
  children: ReactNode;
}
export function TaskProvider({ children }: TaskProviderProps) {
  const taskData = useTasks();
  return (
    <TaskContext.Provider value={taskData}>{children}</TaskContext.Provider>
  );
}

export function useTaskContext(): TaskContextType {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
}
