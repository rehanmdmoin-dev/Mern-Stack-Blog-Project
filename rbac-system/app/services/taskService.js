const Task = require('../models/Task');
const User = require('../models/User');
const AssignmentHistory = require('../models/AssignmentHistory');
const ApiError = require('../utils/ApiError');
const getPagination = require('../utils/pagination');

class TaskService {
    async createTask(data, creator) {
        const assignee = await User.findOne({ _id: data.assignedTo, isDeleted: false });
        if (!assignee) {
            throw new ApiError(400, 'Assigned user not found');
        }

        const task = await Task.create({
            title: data.title,
            description: data.description,
            assignedBy: creator._id,
            assignedTo: data.assignedTo,
            priority: data.priority,
            dueDate: data.dueDate,
        });

        await AssignmentHistory.create({
            task: task._id,
            changedBy: creator._id,
            action: 'created',
            newAssignee: task.assignedTo,
            newStatus: task.status,
            note: `Task created and assigned to ${assignee.name}`,
        });

        return task;
    }


    buildFilter(query, requester) {
        const filter = { isDeleted: false };

        if (requester.role === 'employee') {
            // Spec: Employee can only ever see tasks assigned to them.
            filter.assignedTo = requester._id;
        } else if (requester.role === 'manager') {

            filter.assignedBy = requester._id;
            if (query.assignedTo) filter.assignedTo = query.assignedTo;
        } else {
            if (query.assignedTo) filter.assignedTo = query.assignedTo;
            if (query.assignedBy) filter.assignedBy = query.assignedBy;
        }

        if (query.status) filter.status = query.status;
        if (query.priority) filter.priority = query.priority;

        if (query.dueDate) {
            const day = new Date(query.dueDate);
            const nextDay = new Date(day);
            nextDay.setDate(day.getDate() + 1);
            filter.dueDate = { $gte: day, $lt: nextDay };
        }

        if (query.search) {
            filter.$text = { $search: query.search };
        }

        return filter;
    }

    async listTasks(query, requester) {
        const filter = this.buildFilter(query, requester);
        const { skip, limit, buildMeta } = getPagination(query);

        const [tasks, total] = await Promise.all([
            Task.find(filter)
                .populate('assignedBy', 'name email role')
                .populate('assignedTo', 'name email role')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Task.countDocuments(filter),
        ]);

        return { ...buildMeta(total), tasks };
    }

    async getTaskById(id, requester) {
        const task = await Task.findOne({ _id: id, isDeleted: false })
            .populate('assignedBy', 'name email role')
            .populate('assignedTo', 'name email role')
            .populate('comments.author', 'name email role');

        if (!task) {
            throw new ApiError(404, 'Task not found');
        }

        if (requester.role === 'employee' && String(task.assignedTo._id) !== String(requester._id)) {
            throw new ApiError(403, 'You can only view tasks assigned to you');
        }

        if (requester.role === 'manager' && String(task.assignedBy._id) !== String(requester._id)) {
            throw new ApiError(403, 'You can only view tasks you assigned to your team');
        }

        return task;
    }

    async updateTask(id, data, requester) {
        const task = await this.getTaskById(id, requester);

        if (requester.role !== 'admin') {
            throw new ApiError(403, 'Only admins can edit task details. Managers can update task status.');
        }

        Object.assign(task, data);
        await task.save();
        return task;
    }

    async reassignTask(id, newAssigneeId, requester) {
        const task = await Task.findOne({ _id: id, isDeleted: false });
        if (!task) throw new ApiError(404, 'Task not found');

        if (requester.role === 'manager' && String(task.assignedBy) !== String(requester._id)) {
            throw new ApiError(403, 'You can only reassign tasks you assigned to your team');
        }

        const newAssignee = await User.findOne({ _id: newAssigneeId, isDeleted: false });
        if (!newAssignee) throw new ApiError(400, 'New assignee not found');

        const previousAssignee = task.assignedTo;
        task.assignedTo = newAssigneeId;
        await task.save();

        await AssignmentHistory.create({
            task: task._id,
            changedBy: requester._id,
            action: 'reassigned',
            previousAssignee,
            newAssignee: newAssigneeId,
            note: `Reassigned to ${newAssignee.name}`,
        });

        return task;
    }

    async changeStatus(id, newStatus, requester) {
        const task = await this.getTaskById(id, requester);

        if (requester.role === 'employee' && String(task.assignedTo._id) !== String(requester._id)) {
            throw new ApiError(403, 'You can only update tasks assigned to you');
        }

        const previousStatus = task.status;
        task.status = newStatus;
        await task.save();

        await AssignmentHistory.create({
            task: task._id,
            changedBy: requester._id,
            action: 'status_changed',
            previousStatus,
            newStatus,
        });

        return task;
    }

    async addComment(id, text, requester) {
        const task = await this.getTaskById(id, requester);
        task.comments.push({ author: requester._id, text });
        await task.save();
        return task;
    }

    async addAttachment(id, fileUrl, requester) {
        const task = await this.getTaskById(id, requester);
        task.attachments.push(fileUrl);
        await task.save();
        return task;
    }

    async deleteTask(id, requester) {
        const task = await Task.findOne({ _id: id, isDeleted: false });
        if (!task) throw new ApiError(404, 'Task not found');

        task.isDeleted = true;
        await task.save();

        await AssignmentHistory.create({
            task: task._id,
            changedBy: requester._id,
            action: 'deleted',
        });

        return { message: 'Task deleted successfully' };
    }

    async getHistory(taskId) {
        return AssignmentHistory.find({ task: taskId })
            .populate('changedBy', 'name email role')
            .populate('previousAssignee', 'name email')
            .populate('newAssignee', 'name email')
            .sort({ createdAt: -1 });
    }


    async getDashboard(requester) {
        if (requester.role === 'employee') {
            const [statusBreakdown] = await Task.aggregate([
                { $match: { assignedTo: requester._id, isDeleted: false } },
                {
                    $group: {
                        _id: null,
                        total: { $sum: 1 },
                        completed: { $sum: { $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0] } },
                        pending: { $sum: { $cond: [{ $eq: ['$status', 'Pending'] }, 1, 0] } },
                        inProgress: { $sum: { $cond: [{ $eq: ['$status', 'In Progress'] }, 1, 0] } },
                        overdue: {
                            $sum: {
                                $cond: [
                                    { $and: [{ $lt: ['$dueDate', new Date()] }, { $ne: ['$status', 'Completed'] }] },
                                    1,
                                    0,
                                ],
                            },
                        },
                    },
                },
            ]);
            return statusBreakdown || { total: 0, completed: 0, pending: 0, inProgress: 0, overdue: 0 };
        }

        if (requester.role === 'manager') {
            const teamProductivity = await Task.aggregate([
                { $match: { assignedBy: requester._id, isDeleted: false } },
                {
                    $group: {
                        _id: '$assignedTo',
                        totalAssigned: { $sum: 1 },
                        completed: { $sum: { $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0] } },
                        overdue: {
                            $sum: {
                                $cond: [
                                    { $and: [{ $lt: ['$dueDate', new Date()] }, { $ne: ['$status', 'Completed'] }] },
                                    1,
                                    0,
                                ],
                            },
                        },
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'employee',
                    },
                },
                { $unwind: '$employee' },
                {
                    $project: {
                        _id: 0,
                        employeeId: '$employee._id',
                        employeeName: '$employee.name',
                        totalAssigned: 1,
                        completed: 1,
                        overdue: 1,
                    },
                },
            ]);
            return { teamProductivity };
        }


        const [userCounts, taskCounts, managerPerformance] = await Promise.all([
            User.countDocuments({ isDeleted: false }),
            Task.aggregate([
                { $match: { isDeleted: false } },
                {
                    $group: {
                        _id: '$status',
                        count: { $sum: 1 },
                    },
                },
            ]),
            Task.aggregate([
                { $match: { isDeleted: false } },
                {
                    $group: {
                        _id: '$assignedBy',
                        tasksCreated: { $sum: 1 },
                        completed: { $sum: { $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0] } },
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'manager',
                    },
                },
                { $unwind: '$manager' },
                {
                    $project: {
                        _id: 0,
                        managerId: '$manager._id',
                        managerName: '$manager.name',
                        tasksCreated: 1,
                        completed: 1,
                    },
                },
            ]),
        ]);

        const statusMap = taskCounts.reduce((acc, cur) => {
            acc[cur._id] = cur.count;
            return acc;
        }, {});

        return {
            totalUsers: userCounts,
            totalTasks: Object.values(statusMap).reduce((a, b) => a + b, 0),
            completedTasks: statusMap['Completed'] || 0,
            pendingTasks: statusMap['Pending'] || 0,
            inProgressTasks: statusMap['In Progress'] || 0,
            rejectedTasks: statusMap['Rejected'] || 0,
            managerPerformance,
        };
    }
}

module.exports = new TaskService();
