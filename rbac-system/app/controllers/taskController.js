const taskService = require('../services/taskService');
const cloudinary = require('../config/cloudinary');
const ApiError = require('../utils/ApiError');
const fs = require('fs');

class TaskController {
    async createTask(req, res){
        const task = await taskService.createTask(req.body, req.user);
        res.status(201).json({ status: true, message: 'Task created successfully', data: task });
    }

    async getTasks(req, res){
        const result = await taskService.listTasks(req.query, req.user);
        res.status(200).json({ status: true, ...result });
    };

    async getTaskById(req, res){
        const task = await taskService.getTaskById(req.params.id, req.user);
        res.status(200).json({ status: true, data: task });
    };

    async updateTask(req, res) {
        const task = await taskService.updateTask(req.params.id, req.body, req.user);
        res.status(200).json({ status: true, message: 'Task updated successfully', data: task });
    };

    async reassignTask(req, res) {
        const task = await taskService.reassignTask(req.params.id, req.body.assignedTo, req.user);
        res.status(200).json({ status: true, message: 'Task reassigned successfully', data: task });
    };

    async changeStatus(req, res) {
        const task = await taskService.changeStatus(req.params.id, req.body.status, req.user);
        res.status(200).json({ status: true, message: 'Task status updated successfully', data: task });
    };

    async addComment(req, res) {
        const task = await taskService.addComment(req.params.id, req.body.text, req.user);
        res.status(200).json({ status: true, message: 'Comment added successfully', data: task });
    };

    async uploadAttachment(req, res) {
        if (!req.file) {
            throw new ApiError(400, 'No file uploaded');
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'task-attachments',
            resource_type: 'auto',
        });

        try {
            fs.unlinkSync(req.file.path);
        } catch (e) {
   
        }

        const task = await taskService.addAttachment(req.params.id, result.secure_url, req.user);
        res.status(200).json({ status: true, message: 'Attachment uploaded successfully', data: task });
    };

    async deleteTask(req, res) {
        const result = await taskService.deleteTask(req.params.id, req.user);
        res.status(200).json({ status: true, ...result });
    };

    async getHistory(req, res) {
        const history = await taskService.getHistory(req.params.id);
        res.status(200).json({ status: true, count: history.length, data: history });
    };

    async getDashboard(req, res) {
        const data = await taskService.getDashboard(req.user);
        res.status(200).json({ status: true, data });
    };
}

module.exports = new TaskController();
