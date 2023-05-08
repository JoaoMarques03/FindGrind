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

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await client.query('SELECT * FROM users WHERE username=$1 AND password=$2', [username, password]);
    if (result.rows.length > 0) {
      res.status(200).send('ok');
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching user');
  }
});


app.get('/users', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM users');
    res.send(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching users');
  }
});

app.get('/workout_spot', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM workout_spot');
    res.send(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching workout spots');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
