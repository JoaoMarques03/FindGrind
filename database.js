require('dotenv').config();
const {Client} = require('pg')
const app = require('express')();
const PORT = 3003;

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

client.connect();

client.query('SELECT * FROM users', (err, res)=>{
    if(!err){
        console.log(res.rows);
    } else {
        console.log(err.message);
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
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