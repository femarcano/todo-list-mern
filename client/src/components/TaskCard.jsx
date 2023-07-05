import PropTypes from 'prop-types'
import { useTasksCTX } from '../hooks/useTaskCTX'
import { useNavigate } from 'react-router-dom'

TaskCard.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    description: PropTypes.string,
    done: PropTypes.number,
    createAt: PropTypes.string
  })
}

function TaskCard ({ task }) {
  const { deleteTask, toggleTaskDone } = useTasksCTX()
  const navigate = useNavigate()

  const handleDone = (taskDone) => {
    const doneState = taskDone === 1 ? 0 : 1
    toggleTaskDone(task.id, doneState)
  }

  return (
    <div className='bg-slate-200 rounded-md p-4' key={task.id}>
      <header className='flex justify-between'>
        <h2 className='text-sm font-bold'>{task.title}</h2>
        <span>{task.done === 1 ? 'task done ' : 'task to be done '}</span>
      </header>
      <p className='text-xs'>{task.description}</p>
      <span>{task.createAt}</span>
      <div className='flex gap-2 star'>
        <button className='bg-red-500 px-2 py-1 text-white rounded-sm' onClick={() => deleteTask(task.id)}>delete</button>
        <button className='bg-blue-500 px-2 py-1 text-white rounded-sm' onClick={() => navigate(`/edit/${task.id}`)}>edit</button>
        <button className='bg-green-500 px-2 py-1 text-white rounded-sm' onClick={() => handleDone(task.done)}>Toggle Task</button>
      </div>
    </div>
  )
}

export default TaskCard
