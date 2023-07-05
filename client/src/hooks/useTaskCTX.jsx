import { useContext } from 'react'
import { TasksCTX } from '../contexts/taskContext'

export function useTasksCTX () {
  const context = useContext(TasksCTX)
  if (!context) {
    throw new Error('useTasksCTX must be used within TaskContextProvider')
  }

  return context
}
