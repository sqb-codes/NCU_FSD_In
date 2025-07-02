const mongoose = require('mongoose');
const USERNAME = process.env.MONGO_USERNAME || 'admin';
const PASSWORD = process.env.MONGO_PASSWORD || 'admin';
const DB_NAME = process.env.DB_NAME || 'jira_ncu_db';

const MONGO_URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.zxvoo.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit the process with failure
    }
}

module.exports = connectDB;