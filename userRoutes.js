const express = require('express');
const { registerUser, authUser } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Register new users (Principal only)
router.post('/register', protect, registerUser);

// Login users
router.post('/login', authUser);

module.exports = router;
