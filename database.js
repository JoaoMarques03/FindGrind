const {Client} = require('pg')

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