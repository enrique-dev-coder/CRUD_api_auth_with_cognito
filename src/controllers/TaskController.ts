import { TaskModel } from "../models/TaskModel.js";

export const getTask = async (req, res) => {

  const tasks = await TaskModel.find()
  res.send(tasks)
  
}

export const createTask = (req, res) => {

  const {task} = req.body

  TaskModel.create({ task })
  .then(data => {
    
    console.log('Saved successfully...')
    res.status(201).send(data)
    
  })
  .catch(err => {
  
    console.log('Something went wrong')
    res.send(err)
  
  })
  
}

export const updateTask = (req, res) => {
  
  const {id} = req.params
  const {task} = req.body

  TaskModel.findByIdAndUpdate(id, {task})
  .then(() => res.send('Updated successfully'))
  .catch(err => {
  
    console.log('Something went wrong')
    res.send(err)
  
  })
  
}

export const deleteTask = (req, res) => {
  
  const {id} = req.params

  TaskModel.findByIdAndDelete(id)
  .then(() => res.send('Deleted successfully'))
  .catch(err => {
  
    console.log('Something went wrong')
    res.send(err)
  
  })
  
}