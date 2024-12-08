const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3003;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname))); // Serve static files from the root folder

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Default for XAMPP
  password: '', // Default for XAMPP
  database: 'venuevista',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Endpoint to fetch venues
app.get('/venues', (req, res) => {
  const query = 'SELECT * FROM venues';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch venues' });
    } else {
      res.json(results);
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
