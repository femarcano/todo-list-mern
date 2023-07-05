import PropTypes from 'prop-types'
import { createContext } from 'react'
import { useTasks } from '../hooks/useTasks'

export const TasksCTX = createContext(null)

export function TaskContextProvider ({ children }) {
  const value = useTasks()
  return <TasksCTX.Provider value={value}>{children}</TasksCTX.Provider>
}

TaskContextProvider.propTypes = {
  children: PropTypes.array
}
