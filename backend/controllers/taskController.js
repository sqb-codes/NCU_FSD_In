const Task = require('../models/Task');

// Admin: Create Task
exports.createTask = async (req, res) => {
    try{
        const {title, description, assignedTo} = req.body;
        const task = new Task({
            title,
            description,
            assignedTo,
            createdBy: req.user._id // Assuming req.user is set by authentication middleware
        });
        await task.save();
        return res.status(201).json({message: 'Task created successfully', task});

    } catch (error) {
        console.error('Error creating task:', error);
        return res.status(500).json({message: 'Internal server error'});
    }
}

// Admin & Employee: View Tasks
exports.getTasks = async (req, res) => {
    try {
        const filter = req.user.role === "admin"
        ? {}
        : { assignedTo: req.user._id };
        const tasks = await Task.find(filter).populate('assignedTo', 'name email');
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}