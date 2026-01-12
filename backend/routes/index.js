const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// Users
router.get('/user', userController.getAllUsers);
router.get('/user/:id', userController.getUserById);

module.exports = router;