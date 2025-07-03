const express = require('express');
const { createTask, getTasks } = require('../controllers/taskController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();


router.use(protect); // Protect all routes in this router
router.route('/')
    .post(createTask) // Admin: Create Task
    .get(getTasks); // Admin & Employee: View Tasks


module.exports = router;
