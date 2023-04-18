const {Client} = require('pg')
const app = require('express')();
const PORT = 3000;

const client = new Client({
    host: "kandula.db.elephantsql.com",
    user: "hwvtdpzt",
    port: 5432,
    password: "0LSA9Y98xJSf282WKKAjqglmLLQABFjw",
    database: "hwvtdpzt"
})

client.connect();

client.query('Select * from users', (err, res)=>{
    if(!err){
        console.log(res.rows);
    } else {
        console.log(err.message);
    }
    client.end;
})

app.listen(3000, () => {
    console.log('Server listening on port 3000');
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