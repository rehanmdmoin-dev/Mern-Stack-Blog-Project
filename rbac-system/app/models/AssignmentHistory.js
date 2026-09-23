const mongoose = require('mongoose');

const assignmentHistorySchema = new mongoose.Schema(
    {
        task: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task',
            required: true,
        },
        changedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        action: {
            type: String,
            enum: ['created', 'reassigned', 'status_changed', 'priority_changed', 'deleted'],
            required: true,
        },
        previousAssignee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
        newAssignee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
        previousStatus: {
            type: String,
            default: null,
        },
        newStatus: {
            type: String,
            default: null,
        },
        note: {
            type: String,
            default: '',
        },
    },
    { timestamps: true } 
);

assignmentHistorySchema.index({ task: 1, createdAt: -1 });

module.exports = mongoose.model('AssignmentHistory', assignmentHistorySchema);
