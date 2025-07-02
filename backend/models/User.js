const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String, required: true, trim: true
    },
    email: {
        type: String, required: true, unique: true, trim: true, lowercase: true
    },
    password: {
        type: String, required: true
    },
    role: {
        type: String,
        enum: ['admin', 'developer', 'scrum-master', 'tester', 
            'project-manager', 'product-owner', 'employee'],
        default: 'employee'
    }
});

module.exports = mongoose.model('User', userSchema);