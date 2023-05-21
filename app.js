const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const client = require('./database');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  origin: '*'
}));

app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true
}));

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

app.get('/api/locations', async (req, res) => {
  try {
    const result = await client.query('SELECT latitude, longitude, location_name, info FROM workout_spot');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message }); // Send the actual error message
  }
});

app.get('/api/polygons', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM polygons');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message }); // Send the actual error message
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
