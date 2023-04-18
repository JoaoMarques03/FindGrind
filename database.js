const {Client} = require('pg')
const app = require('express')();
const PORT = 8080;

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

app.listen(8080, () => {
    console.log('Server listening on port 8080');
  });
  