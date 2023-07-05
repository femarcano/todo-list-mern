import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import { TaskContextProvider } from './contexts/taskContext'
import NotFound from './pages/NotFoundPage'
import TaskForm from './pages/TaskForm'
import TasksPage from './pages/TasksPage'

function App () {
  return (
    <div className='bg-zinc-800 h-screen'>
      <div className='container mx-auto py-4 p-4'>
        <Navbar />
        <TaskContextProvider>
          <Routes>
            <Route path='/' element={<TasksPage />} />
            <Route path='/new' element={<TaskForm />} />
            <Route path='/edit/:id' element={<TaskForm />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </TaskContextProvider>
      </div>
    </div>
  )
}

export default App
