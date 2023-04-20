require('dotenv').config();
const {Client} = require('pg')
const app = require('express')();
const PORT = 3001;

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

client.connect();

client.query('Select * from users', (err, res)=>{
    if(!err){
        console.log(res.rows);
    } else {
        console.log(err.message);
    }
    client.end();
})

app.listen(3001, () => {
    console.log('Server listening on port 3001');
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