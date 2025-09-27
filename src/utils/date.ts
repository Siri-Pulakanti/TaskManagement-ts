import type { DueDateStatus } from "../types";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getDueDateStatus = (dueDate: string): DueDateStatus => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays < 0) {
    return "overdue";
  }
  if (diffDays <= 3) {
    return "due-soon";
  }
  return "on-track";
};

export { formatDate, getDueDateStatus };
