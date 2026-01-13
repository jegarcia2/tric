const Users = require('../models/users');

async function getAllUsers() {
  return await Users.findAll({
    where: { deleted: false }
  });
}

async function getUserById(id) {
  return await Users.findOne({
    where: { id, deleted: false }
  });
}


async function createUser(data) {
  return await Users.create(data);
}

async function deleteUser(id) {
  const user = await Users.findByPk(id);
  if (!user) return null;
  await user.update({ deleted: true });
  return user;
}

module.exports = { getAllUsers, getUserById, createUser, deleteUser };