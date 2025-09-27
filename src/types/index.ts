export interface Task {
  id: string | undefined;
  title: string;
  description: string;
  priority: Priority;
  category: Category;
  dueDate: string;
  completed: boolean;
  createdAt: number;
}

export type Priority = "low" | "medium" | "high";

export interface Category {
  id: string;
  name: string;
  color: string;
}

export type DueDateStatus = "overdue" | "due-soon" | "on-track";

export interface TaskFormData {
  title: string;
  description: string;
  priority: Priority;
  category: Category;
  dueDate: string;
  id: string | undefined;
}

export interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "completed" | "createdAt">) => void;
  deleteTask: (id: string) => void;
  editTask: (updatedTask: Omit<Task, "completed" | "createdAt">) => void;
}
