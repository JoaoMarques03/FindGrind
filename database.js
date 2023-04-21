require('dotenv').config();
const { Client } = require('pg');
const express = require('express');
const app = express();
const PORT = 3000;

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

client.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to database');
  }
});

  app.get('/users', (req, res) => {
    client.query('SELECT * FROM users', (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error fetching users');
      } else {
        res.send(result.rows);
      }
    });
  });

  app.get('/workout_spot', (req, res) => {
    client.query('SELECT * FROM workout_spot', (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error fetching workout spots');
      } else {
        res.send(result.rows);
      }
    });
  });
  
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });