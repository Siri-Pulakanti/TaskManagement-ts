# Task Management TypeScript - Detailed Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture Overview](#architecture-overview)
3. [State Management](#state-management)
4. [Component Documentation](#component-documentation)
5. [Type Definitions](#type-definitions)
6. [Actions & Event Handlers](#actions--event-handlers)
7. [Application Flow](#application-flow)
8. [Data Flow Diagram](#data-flow-diagram)
9. [Component Hierarchy](#component-hierarchy)
10. [CSS Classes & Styling States](#css-classes--styling-states)

---

## Project Overview

The Task Management application is a React-TypeScript project built with Vite that allows users to create, edit, delete, and search tasks. It uses React Context API for state management and localStorage for data persistence.

### Tech Stack
- **Frontend**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.7
- **Styling**: CSS3
- **State Management**: React Context API + Custom Hooks
- **Data Persistence**: localStorage
- **UUID Generation**: uuid library
- **Linting**: ESLint with TypeScript support

---

## Architecture Overview

```
TaskManagement-ts/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── TaskCard/       # Individual task display
│   │   ├── TaskForm/       # Task creation/editing form
│   │   ├── TaskList/       # List of tasks with search
│   │   └── ConfirmDialog/  # Modal confirmation dialog
│   ├── context/            # React Context for state management
│   │   └── TaskContext.tsx # Task state provider and hook
│   ├── hooks/              # Custom React hooks
│   │   └── useTasks.ts     # Task operations and state logic
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts        # All interfaces and types
│   ├── data/               # Static data and constants
│   │   └── constants.ts    # Categories, sample data
│   ├── utils/              # Utility functions
│   │   └── date.ts         # Date formatting and calculations
│   └── App.tsx             # Main application component
```

---

## State Management

### Global State Structure

The application uses a centralized state management pattern with React Context API.

#### Main State Container
```typescript
// Located in: src/hooks/useTasks.ts
interface TaskContextType {
  tasks: Task[];              // Array of all tasks
  addTask: Function;          // Add new task action
  deleteTask: Function;       // Delete task action  
  editTask: Function;         // Edit existing task action
}
```

#### Local Component States

**App Component State:**
```typescript
const [searchQuery, setSearchQuery] = useState<string>("");     // Global search filter
const [editTaskData, setEditTaskData] = useState<Task | null>(null); // Currently editing task
```

**TaskForm Component State:**
```typescript
const [formData, setFormData] = useState<TaskFormData>({
  title: "",                 // Task title input
  description: "",           // Task description input
  priority: "medium",        // Priority selection
  category: categories[0],   // Category selection
  dueDate: "",              // Due date picker
  id: undefined,            // Task ID (for editing)
});
const [error, setError] = useState<string>("");              // Form validation errors
```

**TaskCard Component State:**
```typescript
const [showPopup, setShowPopup] = useState(false);          // Delete confirmation modal visibility
```

#### State Persistence
- **Storage Key**: `"tasks"`
- **Method**: localStorage
- **Auto-save**: Every state change triggers localStorage update
- **Initialization**: Loads from localStorage or falls back to sample data

---

## Component Documentation

### 1. App Component
**Location**: `src/App.tsx`

**Purpose**: Root application component that orchestrates the entire task management interface.

**Props**: None (root component)

**State**:
- `searchQuery: string` - Controls global search functionality
- `editTaskData: Task | null` - Tracks which task is currently being edited

**Key Functions**:
- `handleEditRequest(task: Task)` - Initiates task editing mode
- `handleSaveEdit()` - Completes task editing and exits edit mode
- `handleCancelEdit()` - Cancels task editing without saving

**Rendered Elements**:
- Header with app title and search bar
- TaskForm component (handles creation/editing)
- TaskList component (displays filtered tasks)

---

### 2. TaskForm Component
**Location**: `src/components/TaskForm/TaskForm.tsx`

**Purpose**: Handles both task creation and editing through a unified form interface.

**Props**:
```typescript
interface TaskFormProps {
  editTaskData: Task | null;   // Task being edited (null for new task)
  onSaveEdit: () => void;      // Callback when edit is saved
  onCancelEdit: () => void;    // Callback when edit is cancelled
}
```

**State**:
- `formData: TaskFormData` - Form input values
- `error: string` - Validation error messages

**Form Fields**:
- **Title**: Text input (required)
- **Description**: Textarea with 500 character limit
- **Priority**: Dropdown (low, medium, high)
- **Category**: Dropdown (work, personal, shopping, family)
- **Due Date**: Date picker (required)

**Validation Rules**:
- Title cannot be empty
- Due date must be selected
- Description limited to 500 characters

**Form Behavior**:
- Switches between "Add" and "Edit" modes based on `editTaskData`
- Auto-populates fields when editing existing task
- Resets form after successful submission
- Displays character count for description field

---

### 3. TaskList Component
**Location**: `src/components/TaskList/TaskList.tsx`

**Purpose**: Displays filtered list of tasks and handles search functionality.

**Props**:
```typescript
interface TaskListProps {
  onEdit: (task: Task) => void;  // Callback to initiate task editing
  searchQuery: string;           // Search filter string
}
```

**Search Functionality**:
- Filters tasks by title, description, category, priority, or due date
- Case-insensitive matching
- Real-time filtering as user types
- Shows empty state when no matches found

**Rendering Logic**:
- Maps through filtered tasks
- Renders TaskCard for each task
- Passes search query for text highlighting
- Displays "No Matching Tasks" message for empty results

---

### 4. TaskCard Component
**Location**: `src/components/TaskCard/TaskCard.tsx`

**Purpose**: Individual task display with actions and visual indicators.

**Props**:
```typescript
interface TaskCardProps {
  task: Task;                           // Task data to display
  onDelete: (id: string) => void;       // Delete task callback
  onEdit: (task: Task) => void;         // Edit task callback
  searchQuery: string;                  // For text highlighting
}
```

**State**:
- `showPopup: boolean` - Controls delete confirmation dialog visibility

**Visual Elements**:
- Task title with search highlighting
- Priority badge with color coding
- Category label with search highlighting
- Due date with status indicator (overdue/due-soon/on-track)
- Description text (if provided)
- Edit button (✏️)
- Delete button (🗑️)

**Interactive Features**:
- Click edit button → triggers edit mode in parent
- Click delete button → shows confirmation dialog
- Confirmation dialog prevents accidental deletion
- Search term highlighting throughout content

**CSS Classes Applied**:
- `.task-card` - Base card styling
- `.priority-{priority}` - Priority-specific styling
- `.task-due-date.{status}` - Due date status styling

---

### 5. ConfirmDialog Component
**Location**: `src/components/ConfirmDialog/ConfirmDialog.tsx`

**Purpose**: Modal dialog for confirming destructive actions (task deletion).

**Props**:
```typescript
interface ConfirmDialogProps {
  title: string;              // Dialog title
  description: string;        // Confirmation message
  onConfirm: () => void;     // Confirm action callback
  onCancel: () => void;      // Cancel action callback
}
```

**Implementation**:
- Rendered using React Portal to document.body
- Modal backdrop blocks interaction with main UI
- Two-button interface: "Delete" (confirm) and "Cancel"
- Prevents accidental deletion through explicit confirmation

---

## Type Definitions

### Core Types

**Task Interface**:
```typescript
interface Task {
  id: string | undefined;     // Unique identifier (UUID)
  title: string;              // Task title (required)
  description: string;        // Task description (optional)
  priority: Priority;         // Task priority level
  category: Category;         // Task category object
  dueDate: string;           // Due date in YYYY-MM-DD format
  completed: boolean;         // Completion status
  createdAt: number;         // Creation timestamp
}
```

**Priority Type**:
```typescript
type Priority = "low" | "medium" | "high";
```

**Category Interface**:
```typescript
interface Category {
  id: string;        // Unique category identifier
  name: string;      // Display name
  color: string;     // Hex color code for UI
}
```

**Due Date Status**:
```typescript
type DueDateStatus = "overdue" | "due-soon" | "on-track";
```

**Task Form Data**:
```typescript
interface TaskFormData {
  title: string;
  description: string;
  priority: Priority;
  category: Category;
  dueDate: string;
  id: string | undefined;   // Present during editing
}
```

**Context Type**:
```typescript
interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "completed" | "createdAt">) => void;
  deleteTask: (id: string) => void;
  editTask: (updatedTask: Omit<Task, "completed" | "createdAt">) => void;
}
```

---

## Actions & Event Handlers

### Global Actions (Context Level)

#### 1. addTask
```typescript
const addTask = useCallback((task: Omit<Task, "id" | "completed" | "createdAt">) => {
  const newTask: Task = {
    ...task,
    id: uuid(),              // Generate unique ID
    completed: false,        // Default to incomplete
    createdAt: Date.now(),   // Current timestamp
  };
  setTasks((prev) => [newTask, ...prev]); // Prepend to list
}, []);
```
**Trigger**: Form submission in TaskForm
**Effect**: Adds new task to beginning of tasks array
**Side Effects**: Saves to localStorage, resets form

#### 2. deleteTask
```typescript
const deleteTask = useCallback((id: string) => {
  setTasks((prev) => prev.filter((task) => task.id !== id));
}, []);
```
**Trigger**: Confirmed deletion in TaskCard
**Effect**: Removes task with matching ID
**Side Effects**: Saves to localStorage

#### 3. editTask
```typescript
const editTask = useCallback((updatedTask: TaskFormData) => {
  setTasks((prev) =>
    prev.map((task) =>
      task.id === updatedTask.id ? { ...task, ...updatedTask } : task
    )
  );
}, []);
```
**Trigger**: Form submission in edit mode
**Effect**: Updates existing task properties
**Side Effects**: Saves to localStorage, exits edit mode

### Component-Level Actions

#### App Component
- `handleEditRequest(task)` - Sets editTaskData state
- `handleSaveEdit()` - Clears editTaskData state  
- `handleCancelEdit()` - Clears editTaskData state
- `setSearchQuery(value)` - Updates search filter

#### TaskForm Component
- `handleSubmit(e)` - Validates and submits form
- `setFormData()` - Updates individual form fields
- `setError()` - Sets/clears validation errors

#### TaskCard Component
- `setShowPopup(true/false)` - Shows/hides confirmation dialog
- `handleConfirm()` - Executes deletion and closes dialog
- `handleCancel()` - Closes dialog without action

#### Search & Filter Logic
```typescript
const filteredTasks = query
  ? tasks.filter((task) => {
      return (
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.category.name.toLowerCase().includes(query) ||
        task.priority.toLowerCase().includes(query) ||
        task.dueDate.toLowerCase().includes(query)
      );
    })
  : tasks;
```

---

## Application Flow

### 1. Application Initialization
```
1. App component mounts
2. TaskProvider wraps child components
3. useTasks hook initializes:
   - Attempts to load tasks from localStorage
   - Falls back to sampleTasks if localStorage empty/error
   - Sets up state and action functions
4. Components render with initial data
```

### 2. Task Creation Flow
```
User Action: Fill out TaskForm and submit
    ↓
1. handleSubmit validates form data
   - Check title not empty
   - Check due date selected
    ↓
2. If valid: call addTask(formData)
    ↓
3. addTask generates new Task object:
   - Adds UUID
   - Sets completed: false
   - Sets createdAt: Date.now()
    ↓
4. Updates tasks state (prepends to array)
    ↓
5. useEffect triggers localStorage save
    ↓
6. TaskList re-renders with new task
    ↓
7. Form resets to empty state
```

### 3. Task Editing Flow
```
User Action: Click edit button on TaskCard
    ↓
1. TaskCard calls onEdit(task)
    ↓
2. App.handleEditRequest sets editTaskData
    ↓
3. TaskForm receives editTaskData prop
    ↓
4. useEffect populates form with task data
    ↓
5. Form switches to "Edit" mode UI
    ↓
User Action: Modify form and submit
    ↓
6. handleSubmit calls editTask(formData)
    ↓
7. editTask updates matching task in array
    ↓
8. onSaveEdit clears editTaskData
    ↓
9. Form returns to "Add" mode
    ↓
10. TaskList re-renders with updated task
```

### 4. Task Deletion Flow
```
User Action: Click delete button on TaskCard
    ↓
1. setShowPopup(true) displays ConfirmDialog
    ↓
User Action: Click "Delete" in dialog
    ↓
2. handleConfirm calls onDelete(task.id)
    ↓
3. deleteTask removes task from array
    ↓
4. setShowPopup(false) hides dialog
    ↓
5. TaskList re-renders without deleted task
```

### 5. Search/Filter Flow
```
User Action: Type in search bar
    ↓
1. onChange updates searchQuery state
    ↓
2. TaskList receives new searchQuery prop
    ↓
3. filteredTasks recalculates based on query
    ↓
4. TaskList re-renders with filtered results
    ↓
5. TaskCard highlights matching text
```

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        App Component                             │
│  State: searchQuery, editTaskData                               │
│  ┌─────────────────┐              ┌─────────────────────────┐   │
│  │   Search Bar    │              │     Task Container      │   │
│  │                 │              │                         │   │
│  └─────────────────┘              └─────────────────────────┘   │
│           │                                    │                 │
│           ▼                                    ▼                 │
│  ┌─────────────────┐              ┌─────────────────────────┐   │
│  │ setSearchQuery  │              │                         │   │
│  └─────────────────┘              │                         │   │
└─────────────────────────────────────────────────────────────────┘
           │                                    │
           ▼                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                    TaskProvider (Context)                       │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   useTasks Hook                         │   │
│  │  State: tasks[]                                         │   │
│  │  Actions: addTask, deleteTask, editTask                 │   │
│  │  Persistence: localStorage sync                         │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
           │                                    │
           ▼                                    ▼
┌─────────────────┐                  ┌─────────────────────────┐
│   TaskForm      │                  │       TaskList          │
│                 │                  │                         │
│ Props:          │                  │ Props:                  │
│ - editTaskData  │                  │ - onEdit                │
│ - onSaveEdit    │                  │ - searchQuery           │
│ - onCancelEdit  │                  │                         │
│                 │                  │ Logic:                  │
│ State:          │                  │ - Filter tasks by query │
│ - formData      │                  │ - Render TaskCard list  │
│ - error         │                  │                         │
│                 │                  │                         │
│ Actions:        │                  └─────────────────────────┘
│ - handleSubmit  │                             │
│ - validate      │                             ▼
│ - reset form    │                  ┌─────────────────────────┐
└─────────────────┘                  │       TaskCard          │
           │                         │                         │
           ▼                         │ Props:                  │
┌─────────────────┐                  │ - task                  │
│ Context Actions │                  │ - onDelete              │
│ - addTask()     │◄─────────────────│ - onEdit                │
│ - editTask()    │                  │ - searchQuery           │
└─────────────────┘                  │                         │
                                     │ State:                  │
                                     │ - showPopup             │
                                     │                         │
                                     │ Features:               │
                                     │ - Text highlighting     │
                                     │ - Due date status       │
                                     │ - Priority styling      │
                                     └─────────────────────────┘
                                                │
                                                ▼
                                     ┌─────────────────────────┐
                                     │    ConfirmDialog        │
                                     │                         │
                                     │ Props:                  │
                                     │ - title                 │
                                     │ - description           │
                                     │ - onConfirm             │
                                     │ - onCancel              │
                                     │                         │
                                     │ Rendered via Portal     │
                                     └─────────────────────────┘
```

---

## Component Hierarchy

```
App
├── TaskProvider (Context Wrapper)
    └── div.App
        ├── div.app-header-row
        │   ├── h1 (Title)
        │   └── input.search-bar
        └── div.task-container
            ├── TaskForm
            │   └── form
            │       ├── div.form-group (title)
            │       ├── div.form-group (description)  
            │       ├── div.form-group (priority)
            │       ├── div.form-group (category)
            │       ├── div.form-group (due-date)
            │       ├── div.error-msg (conditional)
            │       └── div (buttons)
            └── TaskList
                └── div.task-list
                    └── TaskCard[] (mapped)
                        ├── div.task-card-header
                        │   ├── h4.task-title
                        │   ├── span.task-priority
                        │   ├── button.task-edit-button
                        │   └── button.task-delete-button
                        ├── p.task-description (conditional)
                        ├── div.task-meta
                        │   ├── span.task-category
                        │   └── span.task-due-date
                        └── ConfirmDialog (conditional)
                            └── Portal to document.body
                                └── div.confirm-dialog-backdrop
                                    └── div.confirm-dialog
                                        ├── h4 (title)
                                        ├── p (description)
                                        └── div.confirm-dialog-actions
                                            ├── button.confirm-btn
                                            └── button.cancel-btn
```

---

## CSS Classes & Styling States

### Priority-Based Styling
```css
/* TaskCard priority classes */
.task-card.priority-low { border-left: 4px solid #10b981; }
.task-card.priority-medium { border-left: 4px solid #f59e0b; }
.task-card.priority-high { border-left: 4px solid #ef4444; }

.task-priority.priority-low { background: #10b981; }
.task-priority.priority-medium { background: #f59e0b; }
.task-priority.priority-high { background: #ef4444; }
```

### Due Date Status Styling
```css
.task-due-date.overdue { color: #ef4444; font-weight: 600; }
.task-due-date.due-soon { color: #f59e0b; font-weight: 600; }
.task-due-date.on-track { color: #10b981; }
```

### Interactive States
```css
/* Hover effects */
.task-card:hover { transform: translateY(-2px); box-shadow: enhanced; }
.task-edit-button:hover { background: #f3f4f6; }
.task-delete-button:hover { background: #fee2e2; }

/* Focus states */
.search-bar:focus { border-color: #3b82f6; background: #fff; }
input:focus, select:focus, textarea:focus { outline: 2px solid #3b82f6; }

/* Button states */
.submit-button:hover { background: #2563eb; }
.cancel-button:hover { background: #6b7280; }
```

### Form Validation States
```css
.error-msg { color: #ef4444; font-size: 0.875rem; margin-top: 0.5rem; }
```

### Search Highlighting
```css
.highlight { background: #fef08a; padding: 0 2px; border-radius: 2px; }
```

### Modal/Dialog States
```css
.confirm-dialog-backdrop { 
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5); z-index: 1000;
}
.confirm-dialog { 
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
}
```

### Responsive Design
```css
@media (max-width: 768px) {
  .task-container { grid-template-columns: 1fr; }
  .app-header-row { flex-direction: column; gap: 1rem; }
}
```

---

## Key Features Summary

### ✅ Implemented Features
1. **Task CRUD Operations**: Create, Read, Update, Delete tasks
2. **Real-time Search**: Filter tasks by any field with highlighting
3. **Priority Management**: Visual priority indicators and sorting
4. **Category System**: Predefined categories with color coding
5. **Due Date Tracking**: Visual status indicators (overdue/due-soon/on-track)
6. **Form Validation**: Required fields and input constraints
7. **Confirmation Dialogs**: Prevent accidental deletions
8. **Data Persistence**: Automatic localStorage synchronization
9. **Responsive Design**: Mobile-friendly layout
10. **TypeScript Integration**: Full type safety throughout

### 🔧 Technical Highlights
- **Context API**: Centralized state management
- **Custom Hooks**: Reusable logic separation
- **Portal Rendering**: Modal dialogs
- **Local Storage**: Automatic persistence
- **Search Algorithm**: Multi-field text matching
- **Date Utilities**: Status calculation and formatting
- **UUID Generation**: Unique task identification
- **Form Handling**: Controlled components with validation

---

*This documentation provides a complete technical overview of the Task Management TypeScript application, covering all states, props, actions, and architectural decisions.*