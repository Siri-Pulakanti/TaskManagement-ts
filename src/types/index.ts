export interface Task {
  id: string;
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
}
