import { useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { sampleTasks, TASKS_STORAGE_KEY } from "../data/constants";
import type { Task, TaskContextType, TaskFormData } from "../types";

const loadTasksFromStorage = (): Task[] => {
  try {
    const data = localStorage.getItem(TASKS_STORAGE_KEY);
    if (data) {
      return JSON.parse(data) as Task[];
    } else {
      return [...sampleTasks];
    }
  } catch (e) {
    return [...sampleTasks];
  }
};

export default function useTasks(): TaskContextType {
  const [tasks, setTasks] = useState<Task[]>(loadTasksFromStorage);

  useEffect(() => {
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error(e);
    }
  }, [tasks]);

  const addTask = useCallback(
    (task: Omit<Task, "id" | "completed" | "createdAt">) => {
      const newTask: Task = {
        ...task,
        id: uuid(),
        completed: false,
        createdAt: Date.now(),
      };
      setTasks((prev) => [newTask, ...prev]);
    },
    []
  );

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const editTask = useCallback((updatedTask: TaskFormData) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
  }, []);
  return { tasks, addTask, deleteTask, editTask };
}
