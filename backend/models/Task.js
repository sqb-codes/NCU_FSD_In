const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String, required: true, trim: true
    },
    description: {
        type: String, required: true, unique: true, trim: true
    },
    status: {
        type: String,
        enum: ['open', 'ready', 'in-progress', 'completed', 'closed'],
        default: 'open'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Task', taskSchema);