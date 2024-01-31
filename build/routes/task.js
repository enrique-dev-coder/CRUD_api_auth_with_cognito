"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TaskController_js_1 = require("../controllers/TaskController.js");
const verifyAuth_js_1 = require("../middlewares/verifyAuth.js");
const router = (0, express_1.Router)();
router.get('/users', TaskController_js_1.getUsers);
router.get('/get', verifyAuth_js_1.verifyAuthMiddleware, TaskController_js_1.getTask);
router.get('/get/:id', verifyAuth_js_1.verifyAuthMiddleware, TaskController_js_1.getTasksByUserId);
router.post('/create', verifyAuth_js_1.verifyAuthMiddleware, TaskController_js_1.createTask);
router.put('/update/:id', verifyAuth_js_1.verifyAuthMiddleware, TaskController_js_1.updateTask);
router.delete('/delete/:id', verifyAuth_js_1.verifyAuthMiddleware, TaskController_js_1.deleteTask);
exports.default = router;
// app.get('/task', (req, res) => {
// });
