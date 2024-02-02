const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 3000;

// MySQL database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Dmosha',
  password: 'Denigondu@1',
  database: 'lab_reservation_system'
});

// Test the database connection
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('LAB_RESERVATION_SYSTEM');
});

// Endpoint for user registration
app.post('/register', (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  const sql = 'INSERT INTO users (username) VALUES (?)';
  connection.query(sql, [username], (err, results) => {
    if (err) {
      console.error('Error registering user:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(200).json({ message: 'User registered successfully' });
  });
});

// Endpoint for lab booking
app.post('/book-lab', (req, res) => {
  const { username, lab, equipment } = req.body;

  if (!username || !lab || !equipment) {
    return res.status(400).json({ error: 'Username, lab, and equipment are required' });
  }

  const sql = 'INSERT INTO lab_bookings (username, lab, equipment) VALUES (?, ?, ?)';
  connection.query(sql, [username, lab, JSON.stringify(equipment)], (err, results) => {
    if (err) {
      console.error('Error booking lab:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(200).json({ message: 'Lab booked successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
