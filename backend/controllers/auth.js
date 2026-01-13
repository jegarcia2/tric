const authService = require('../services/authService');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { token, user } = await authService.login(username, password);
    res.json({ token, user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = { login };