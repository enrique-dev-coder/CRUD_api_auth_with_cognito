import { Router } from "express";
import { getTask, createTask, updateTask, deleteTask } from "../controllers/TaskController.js";

const router = Router();

router.get('/get', getTask)
router.post('/create', createTask)
router.put('/update/:id', updateTask)
router.delete('/delete/:id', deleteTask)

export default router

// app.get('/task', (req, res) => {

// });