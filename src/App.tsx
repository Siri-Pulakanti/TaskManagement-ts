import "./App.css";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import { TaskProvider } from "./context/TaskContext";
import type { Task } from "./types";

function App() {
  return (
    <TaskProvider>
      <TaskForm
        editTaskData={null}
        onSaveEdit={function (): void {
          // throw new Error("Function not implemented.");
        }}
        onCancelEdit={function (): void {
          // throw new Error("Function not implemented.");
        }}
      />
      <TaskList
        onEdit={function (task: Task): void {
          // throw new Error('Function not implemented.')
        }}
        searchQuery={""}
      />
    </TaskProvider>
  );
}

export default App;
