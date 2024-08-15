const express = require('express');
const { createClassroom, getClassrooms, assignStudents } = require('../controllers/classroomController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Principal only: Create Classroom
router.post('/', protect, createClassroom);

// Principal: Get All Classrooms
router.get('/', protect, getClassrooms);

// Principal/Teacher: Assign Students to Classroom
router.put('/assign', protect, assignStudents);

module.exports = router;
