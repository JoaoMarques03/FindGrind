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
const cors = require('cors');
app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  origin: '*'
}));

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
      console.log('teste')
      if (result.rows.length > 0) {
        res.status(200).send('ok');
      } else {
        res.status(401).send('Invalid username or password');
      }
    }
  });
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
