import { useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import { TaskProvider } from "./context/TaskContext";
import type { Task } from "./types";

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [editTaskData, setEditTaskData] = useState<Task | null>(null);

  const handleEditRequest = (task: Task): void => {
    setEditTaskData(task);
  };
  const handleSaveEdit = (): void => {
    setEditTaskData(null);
  };
  const handleCancelEdit = (): void => {
    setEditTaskData(null);
  };
  return (
    <TaskProvider>
      <div className="App">
        <div className="app-header-row">
          <h1>Task Management</h1>
          <input
            className="search-bar"
            value={searchQuery}
            placeholder="Search Tasks"
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="task-container">
          <TaskForm
            editTaskData={editTaskData}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
          />
          <TaskList onEdit={handleEditRequest} searchQuery={searchQuery} />
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;
