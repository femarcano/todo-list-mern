import { promisePool } from '../db.js'

export const getTasks = async (req, res) => {
  try {
    const [result] = await promisePool.query(
      'SELECT * FROM tasks ORDER BY createAt ASC LIMIT 100;'
    )
    res.json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getTask = async (req, res) => {
  try {
    const { id } = req.params
    const [result] = await promisePool.query(
      'SELECT * FROM tasks WHERE id = ?;',
      [id]
    )
    if (result.length === 0) {
      return res.status(404).json({ message: 'Task not Found' })
    }
    res.json(result[0])
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body
    const [result] = await promisePool.query(
      'INSERT INTO tasks(title, description) VALUES (?, ?)',
      [title, description]
    )
    res.json({
      id: result.insertId,
      title,
      description
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateTask = async (req, res) => {
  try {
    const [result] = await promisePool.query(
      'UPDATE tasks SET ? WHERE id = ?',
      [req.body, req.params.id]
    )
    res.json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params
    const [result] = await promisePool.query(
      'DELETE FROM tasks WHERE id = ?;',
      [id]
    )
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not Found' })
    }
    return res.sendStatus(204)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
