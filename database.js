require('dotenv').config();
const { Client } = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const PORT = 3000;

// Use body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use express-session middleware to create sessions
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true
}));

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

// Handle POST request for user login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  client.query('SELECT * FROM users WHERE username=$1 AND password=$2', [username, password], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching user');
    } else {
      const user = result.rows[0];
      if (user) {
        // User found, create session
        const sessionObj = { username: user.username };
        req.session.user = sessionObj;
        res.redirect('/index.html'); // redirect to the dashboard page
      } else {
        // User not found or password incorrect
        res.status(401).send('Login failed. Invalid username or password');
      }
    }
  });
});

// Serve the dashboard page
app.get('/index.html', (req, res) => {
  // Check if user is logged in
  if (req.session && req.session.user && req.session.user.username) {
    res.send('Welcome to the dashboard!'); // send the dashboard HTML
  } else {
    // User is not logged in, redirect to login page
    res.redirect('/login');
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
