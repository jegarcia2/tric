// services/clientService.js
const connection = require('../../config/db');

// Function to get all clients
const getAllClients = (callback) => {
  connection.query('SELECT * FROM clients', (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, results);
  });
};

// Function to add a new client
const addClient = (client, callback) => {
  const { name, email, phone } = client;
  connection.query(
    'INSERT INTO clients (name, email, phone) VALUES (?, ?, ?)',
    [name, email, phone],
    (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    }
  );
};

module.exports = {
  getAllClients,
  addClient
};
