import { TaskModel } from "../models/TaskModel.js";
import { Request, Response } from "express";

export const getTask = async (req: Request, res: Response) => {

  const tasks = await TaskModel.find()
  res.send(tasks)
  
}

export const createTask = (req: Request, res: Response) => {

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

export const updateTask = (req: Request, res: Response) => {
  
  const {id} = req.params
  const {task} = req.body

  TaskModel.findByIdAndUpdate(id, {task})
  .then(() => res.send('Updated successfully'))
  .catch(err => {
  
    console.log('Something went wrong')
    res.send(err)
  
  })
  
}

export const deleteTask = (req: Request, res: Response) => {
  
  const {id} = req.params

  TaskModel.findByIdAndDelete(id)
  .then(() => res.send('Deleted successfully'))
  .catch(err => {
  
    console.log('Something went wrong')
    res.send(err)
  
  })
  
}