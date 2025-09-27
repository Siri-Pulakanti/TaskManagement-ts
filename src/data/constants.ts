import { v4 as uuid } from "uuid";
import type { Category, Task } from "../types";

const TASKS_STORAGE_KEY: string = "tasks";

const categories: Category[] = [
  { id: "work", name: "Work", color: "#7c3aed" },
  { id: "personal", name: "Personal", color: "#059669" },
  { id: "shopping", name: "Shopping", color: "#dc2626" },
  { id: "family", name: "Family", color: "#2563eb" },
];

const sampleTasks: Task[] = [
  {
    id: uuid(),
    title: "Finish interview challenge",
    description: "Implement core features and demo",
    priority: "high",
    dueDate: "2025-09-20",
    category: categories[0],
    completed: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
  },
  {
    id: uuid(),
    title: "Grocery: milk & eggs",
    description: "",
    priority: "low",
    dueDate: "2025-09-19",
    category: categories[2],
    completed: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: uuid(),
    title: "Call mom",
    description: "Weekly check in",
    priority: "medium",
    dueDate: "2025-09-21",
    category: categories[3],
    completed: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 6,
  },
  {
    id: uuid(),
    title: "Read design docs",
    description: "Read PRD for next sprint",
    priority: "medium",
    dueDate: "2025-09-25",
    category: categories[0],
    completed: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 48,
  },
];

export { categories, sampleTasks, TASKS_STORAGE_KEY };
