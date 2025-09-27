import { useTaskContext } from "../../context/TaskContext";
import type { Task } from "../../types";
// import TaskCard from "./TaskCard";

import "./TaskList.css";

interface TaskListProps{
    onEdit: (task: Task) => void;
    searchQuery: string;
}

function TaskList({ onEdit, searchQuery }:TaskListProps) {
  const { tasks, deleteTask } = useTaskContext();
  const query:string = (searchQuery || "").toLowerCase();
  const filteredTasks:Task[] = query
    ? tasks.filter((task) => {
        return (
          (task.title && task.title.toLowerCase().includes(query)) ||
          (task.description &&
            task.description.toLowerCase().includes(query)) ||
          (task.category && task.category.name.toLowerCase().includes(query)) ||
          (task.priority && task.priority.toLowerCase().includes(query)) ||
          (task.dueDate && task.dueDate.toLowerCase().includes(query))
        );
      })
    : tasks;
  if (filteredTasks?.length === 0) {
    return (
      <div className="empty-state">
        <h3>No Matching Tasks</h3>
        <p>Try a different search term</p>
      </div>
    );
  }
  return (
    <div className="task-list">
      {filteredTasks?.map((task) => {
        return (
        //   <TaskCard
        //     key={task.id}
        //     task={task}
        //     onDelete={deleteTask}
        //     onEdit={onEdit}
        //     searchQuery={searchQuery}
            //   />
            <p key={ task.id}> {task.title}</p>
        );
      })}
    </div>
  );
}

export default TaskList;
