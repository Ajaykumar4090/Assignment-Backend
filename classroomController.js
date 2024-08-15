const Classroom = require('../models/Classroom');
const User = require('../models/User');

// Create Classroom
const createClassroom = async (req, res) => {
    const { name, startTime, endTime, days, teacherId } = req.body;

    const teacher = await User.findById(teacherId);
    if (!teacher || teacher.role !== 'Teacher') {
        return res.status(400).json({ message: 'Invalid teacher' });
    }

    const classroom = await Classroom.create({
        name,
        startTime,
        endTime,
        days,
        teacher: teacherId,
    });

    res.status(201).json(classroom);
};

// Get All Classrooms
const getClassrooms = async (req, res) => {
    const classrooms = await Classroom.find().populate('teacher').populate('students');
    res.json(classrooms);
};

// Assign Students to Classroom
const assignStudents = async (req, res) => {
    const { classroomId, studentIds } = req.body;

    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
        return res.status(404).json({ message: 'Classroom not found' });
    }

    classroom.students.push(...studentIds);
    await classroom.save();

    res.json(classroom);
};

module.exports = { createClassroom, getClassrooms, assignStudents };
