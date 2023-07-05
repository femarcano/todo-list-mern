import { Form, Formik } from 'formik'
import { useParams, useNavigate } from 'react-router-dom'
import { useTasksCTX } from '../hooks/useTaskCTX'
import { useEffect, useState } from 'react'

function TaskForm () {
  const { createTask, getTask, updateTask } = useTasksCTX()
  const [task, setTask] = useState({
    title: '',
    description: ''
  })

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        console.info('loading data')
        const getTaskData = await getTask(params.id)
        setTask({
          title: getTaskData.title,
          description: getTaskData.description
        })
      }
    }
    loadTask()
  }, [params.id])
  return (
    <div className=''>
      <Formik
        initialValues={task}
        enableReinitialize
        onSubmit={async (values, actions) => {
          if (params.id) {
            console.info('update')
            await updateTask(params.id, values)
          } else {
            await createTask(values)
            actions.resetForm()
          }
          navigate('/')
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form className='bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-10' onSubmit={handleSubmit}>
            <h1 className='text-xl font-bold uppercase text-center'>{params.id ? 'Edit Task' : 'New Task'}</h1>
            <label className='block'>title</label>
            <input className='px-2 py-1 rounded-sm w-full' type='text' name='title' placeholder='Write a title' onChange={handleChange} value={values.title} />
            <label className='block'>description</label>
            <textarea
              className='px-2 py-1 rounded-sm w-full'
              name='description'
              rows='3'
              placeholder='Write a description'
              onChange={handleChange}
              value={values.description}
            />
            <button className='block bg-indigo-500 px-2 py-1 text-white w-full rounded-md' type='submit' disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save'}</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default TaskForm
