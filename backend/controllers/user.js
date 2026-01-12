const Users = require('../models/users');

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);
    if (user) res.json(user);
    else res.status(404).json({ error: 'User not found' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
};

module.exports = { getAllUsers, getUserById };