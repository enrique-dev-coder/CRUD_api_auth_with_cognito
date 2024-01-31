import { Router } from 'express';
import {
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTasksByUserId,
  getUsers,
} from '../controllers/TaskController.js';
import { verifyAuthMiddleware } from '../middlewares/verifyAuth.js';

const router = Router();

router.get('/users', getUsers);
router.get('/get', verifyAuthMiddleware, getTask);
router.get('/get/:id', verifyAuthMiddleware, getTasksByUserId);
router.post('/create', verifyAuthMiddleware, createTask);
router.put('/update/:id', verifyAuthMiddleware, updateTask);
router.delete('/delete/:id', verifyAuthMiddleware, deleteTask);

export default router;

// app.get('/task', (req, res) => {

// });
