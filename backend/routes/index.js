const express = require('express');
const router = express.Router();
const routesGenerator = require('../utils/routesGenerator');
const Users = require('../models/users');

// CRUD endpoints
routesGenerator(router, Users, 'users');

module.exports = router;