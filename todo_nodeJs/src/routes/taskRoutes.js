const express = require('express');
const { createTask, updateTask, deleteTask, getTasks } = require('../controller/taskController');
const taskRouter = express.Router();
taskRouter.post("/createTask.ss", createTask);
taskRouter.post("/updateTask.ss", updateTask);
taskRouter.post("/deleteTask.ss", deleteTask);
taskRouter.get("/getTasks.ss", getTasks);

module.exports = taskRouter;