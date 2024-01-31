"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasksByUserId = exports.getUsers = exports.getTask = void 0;
const TaskModel_js_1 = require("../models/TaskModel.js");
const UserModel_js_1 = require("../models/UserModel.js");
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield TaskModel_js_1.TaskModel.find();
    res.send(tasks);
});
exports.getTask = getTask;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserModel_js_1.User.find();
    res.send(users);
});
exports.getUsers = getUsers;
const getTasksByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const tasks = yield TaskModel_js_1.TaskModel.find({ user: id });
    res.send(tasks);
});
exports.getTasksByUserId = getTasksByUserId;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { task, email } = req.body;
    // Verificar si el usuario existe
    const user = yield UserModel_js_1.User.findOne({ email });
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }
    TaskModel_js_1.TaskModel.create({ task, user: user._id })
        .then((data) => {
        console.log('Saved successfully...');
        res.status(201).send(data);
    })
        .catch((err) => {
        console.log('Something went wrong');
        res.send(err);
    });
});
exports.createTask = createTask;
const updateTask = (req, res) => {
    const { id } = req.params;
    const { task, done } = req.body;
    console.log(task);
    TaskModel_js_1.TaskModel.findByIdAndUpdate(id, { task, done })
        .then(() => res.status(200).send('Updated successfully'))
        .catch((err) => {
        console.log('Something went wrong');
        res.send(err);
    });
};
exports.updateTask = updateTask;
const deleteTask = (req, res) => {
    const { id } = req.params;
    TaskModel_js_1.TaskModel.findByIdAndDelete(id)
        .then(() => res.send('Deleted successfully'))
        .catch((err) => {
        console.log('Something went wrong');
        res.send(err);
    });
};
exports.deleteTask = deleteTask;
