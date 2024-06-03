const taskModel = require("../models/taskModel");
const userModel = require("../models/userModel");

const SECRET_KEY = "coderains@srt";

const createTask = async (req, res) => {
    const response = {
        success: false,
        task: {},
    }
    try {
        const user = await userModel.findOne({
            _id: req.userId
        });

        if (user) {
            const { description, status, task_name } = req.body;
            const task = await taskModel.create({
                user: req.userId,
                description: description,
                status: status,
                task_name: task_name
            })
            user.tasks.push(task._id);
            await user.save();
            response.success = true;
            response.task = task;
            res.send(response);
        } else {
            return res.status(401).send({
                status: false,
                message: "User Not Exists"
            })
        }
    } catch (error) {
        if (error.code === 11000) {
            response.message = "Dublicate Task Name"
            res.send(response);
        }
    }
}

const deleteTask = async (req, res) => {
    const response = {
        success: false,
    };

    try {
        const deletedTask = await taskModel.findByIdAndDelete(req.body._id);

        if (deletedTask) {
            response.success = true;
            response.message = 'Task deleted successfully!';
            await userModel.findByIdAndUpdate(req.userId, {
                $pull: { tasks: req.body._id } // Removes the task ID from the user's tasks array
            });
            res.status(200).json(response);
        } else {
            response.message = 'Task not found.';
            res.status(404).json(response);
        }
    } catch (error) {
        console.error(error);
        response.message = 'Error deleting task.';
        res.status(500).json(response);
    }
}


const updateTask = async (req, res) => {
    const response = {
        success: false,
    };
    try {
        const { _id, task_name, status, description } = req.body;
        const updateTask = await taskModel.findOneAndUpdate({ _id: _id }, { task_name: task_name, status: status, description: description });
        if (updateTask) {
            response.success = true
            response.task = req.body;
            res.status(200).json(response);
        }
    } catch (error) {
        console.error(error);
        response.message = 'Error updating task.';
        res.status(500).json(response);
    }
}
const getTasks = async (req, res) => {
    const response = {
        success: false,
        tasks: [],
    }
    try {
        const user = await userModel.findOne({
            _id: req.userId
        }).populate("tasks");
        response.success = true;
        response.tasks = user.tasks;
        res.send(response);
    } catch (error) {

    }

}
module.exports = { createTask, deleteTask, updateTask, getTasks }