const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const cors = require('cors');
const client = require('./database');
const app = express();
const path = require('path');
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  origin: '*'
}));

app.use(cookieSession({
  name: 'session',
  secret: process.env.COOKIE_SECRET,
  maxAge: 6 * 60 * 60 * 1000, // 6 hours
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await client.query('SELECT * FROM users WHERE username=$1 AND password=$2', [username, password]);
    if (result.rows.length > 0) {
      req.session.loggedIn = true;
      req.session.username = username;
      res.status(200).send('ok');
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching user');
  }
});

app.post('/logout', (req, res) => {
  req.session = null; 
  res.status(200).send('Logout successful');
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
    res.status(500).json({ error: err.message }); 
  }
});

app.get('/api/polygons', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM polygons');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message }); 
  }
});

app.get('/perfil', async (req, res) => {
  try {
    const userData = await client.query('SELECT username, gender, weight, height, age FROM users WHERE username = $1', [req.session.username]);
    res.json(userData.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching user data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
