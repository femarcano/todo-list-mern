import { useEffect, useState } from 'react'
import { createTaskRequest, deleteTaskRequest, getTaskRequest, getTasksRequest, updateTaskRequest, toggleTaskDoneRequest } from '../api/task.api'

export function useTasks () {
  const [tasks, setTasks] = useState([])

  async function loadTasks () {
    try {
      const response = await getTasksRequest()
      setTasks(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  async function deleteTask (id) {
    try {
      await deleteTaskRequest(id)
      const newTasks = tasks.filter(task => id !== task.id)
      setTasks(newTasks)
    } catch (error) {
      console.error(error)
    }
  }

  async function createTask (values) {
    try {
      await createTaskRequest(values)
      loadTasks()
    } catch (error) {
      console.error(error)
    }
  }

  async function getTask (id) {
    try {
      const response = await getTaskRequest(id)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async function updateTask (id, newFields) {
    try {
      setTasks((prevState) => {
        return prevState.map(task => {
          if (task.id === Number(id)) {
            task.title = newFields.title
            task.description = newFields.description
          }
          return task
        })
      })
      await updateTaskRequest(id, newFields)
    } catch (error) {
      console.error(error)
    }
  }

  async function toggleTaskDone (id, doneState) {
    try {
      setTasks((prevState) => {
        return prevState.map(task => {
          if (task.id === Number(id)) {
            task.done = doneState
          }
          return task
        })
      })
      await toggleTaskDoneRequest(id, doneState)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])
  return { tasks, setTasks, loadTasks, deleteTask, createTask, getTask, updateTask, toggleTaskDone }
}
