import { useEffect, useState, type FormEvent } from "react";
import { useTaskContext } from "../../context/TaskContext";
import { categories } from "../../data/constants";
import type { Priority, Task, TaskFormData } from "../../types";
import "./TaskForm.css";

interface TaskFormProps {
  editTaskData: Task | null;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
}

function TaskForm({ editTaskData, onSaveEdit, onCancelEdit }: TaskFormProps) {
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    priority: "medium",
    category: categories[0],
    dueDate: "",
    id: undefined,
  });
  const [error, setError] = useState<string>("");
  const { addTask, editTask } = useTaskContext();

  useEffect(() => {
    if (editTaskData) {
      setFormData(editTaskData);
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        category: categories[0],
        dueDate: "",
        id: undefined,
      });
    }
  }, [editTaskData]);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!formData.dueDate) {
      setError("Due date is required");
      return;
    }
    setError("");
    if (editTaskData) {
      editTask(formData);
      onSaveEdit();
    } else {
      addTask(formData);
    }
  };

  return (
    <div className="task-form">
      <h2> {editTaskData ? "Edit Task" : "Add New Task"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Task Title</label>
          <input
            type="text"
            placeholder="Task Title"
            value={formData.title}
            name="title"
            onChange={(e) =>
              setFormData((s) => ({ ...s, title: e.target.value }))
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Task Description</label>
          <textarea
            placeholder="Task Description"
            value={formData.description}
            rows={4}
            maxLength={500}
            name="description"
            onChange={(e) =>
              setFormData((s) => ({ ...s, description: e.target.value }))
            }
          />
          <p className="character-count">{formData.description.length}/500</p>
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={(e) =>
              setFormData((s) => ({
                ...s,
                priority: e.target.value as Priority,
              }))
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="category">Task Category</label>
          <select
            name="category"
            value={formData.category.id}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                category:
                  categories.find((cat) => cat.id === e.target.value) ||
                  prev.category,
              }))
            }
          >
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="due-date">Due Date</label>
          <input
            name="due-date"
            type="date"
            value={formData.dueDate}
            onChange={(e) =>
              setFormData((s) => ({ ...s, dueDate: e.target.value }))
            }
            required
          />
        </div>
        {error && <div className="error-msg">{error}</div>}
        <div>
          {editTaskData && (
            <button onClick={onCancelEdit} className="cancel-button">
              Cancel Edit
            </button>
          )}
          <button type="submit" className="submit-button">
            {editTaskData ? "Save Changes" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;

// Add new tasks with title, description, priority (High/Medium/Low), due date, and category
