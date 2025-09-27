
import './App.css'
import TaskList from './components/TaskList/TaskList'
import { TaskProvider } from './context/TaskContext'
import type { Task } from './types'

function App() {

  return (
    <TaskProvider >
     <TaskList onEdit={function (task: Task): void {
        // throw new Error('Function not implemented.')
      } } searchQuery={''} />
    </TaskProvider>
  )
}

export default App
