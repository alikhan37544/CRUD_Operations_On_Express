const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// MySQL connection pool setup
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // change if your MySQL user is different
  password: 'admin', // add your MySQL root password if set
  database: 'crud_demo',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// CREATE a new user
app.post('/users', (req, res) => {
  const { firstName, lastName, email, phoneNumber } = req.body;
  if (!firstName || !lastName || !email || !phoneNumber) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  const sql = 'INSERT INTO users (firstName, lastName, email, phoneNumber) VALUES (?, ?, ?, ?)';
  pool.query(sql, [firstName, lastName, email, phoneNumber], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: results.insertId, firstName, lastName, email, phoneNumber });
  });
});

// READ all users
app.get('/users', (req, res) => {
  pool.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// READ a single user by ID
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  pool.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'User not found.' });
    res.json(results[0]);
  });
});

// UPDATE a user by ID
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, email, phoneNumber } = req.body;
  if (!firstName || !lastName || !email || !phoneNumber) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  const sql = 'UPDATE users SET firstName = ?, lastName = ?, email = ?, phoneNumber = ? WHERE id = ?';
  pool.query(sql, [firstName, lastName, email, phoneNumber, userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ error: 'User not found.' });
    res.json({ id: userId, firstName, lastName, email, phoneNumber });
  });
});

// DELETE a user by ID
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  pool.query('DELETE FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ error: 'User not found.' });
    res.json({ message: 'User deleted successfully.' });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`MySQL CRUD server running at http://localhost:${PORT}`);
});
