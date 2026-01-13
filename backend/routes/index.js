const express = require('express');
const router = express.Router();
const routesGenerator = require('../utils/routesGenerator');
const Users = require('../models/users');
const authController = require('../controllers/auth');

// CRUD endpoints
routesGenerator(router, Users, 'users');

router.post('/login', authController.login);

module.exports = router;