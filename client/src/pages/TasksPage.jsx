import PropTypes from 'prop-types'
import TaskCard from '../components/TaskCard'
import { useTasksCTX } from '../hooks/useTaskCTX'

function TasksPage () {
  const { tasks } = useTasksCTX()
  return (
    <div><h1 className='text-5xl text-white font-bold text-center'>Task</h1>
      <div className='grid grid-cols-3 gap-3'>
        <TaskList tasks={tasks} />
      </div>
    </div>
  )
}

function TaskList ({ tasks }) {
  if (tasks.length === 0) return <h1>No task yet!</h1>
  return tasks?.map(task => (
    <TaskCard key={task.id} task={task} />
  ))
}
TaskList.propTypes = {
  tasks: PropTypes.array
}

export default TasksPage
