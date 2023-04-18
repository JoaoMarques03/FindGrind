const {Client} = require('pg')

const client = new Client({
    host: "postgres://hwvtdpzt:0LSA9Y98xJSf282WKKAjqglmLLQABFjw@kandula.db.elephantsql.com/hwvtdpzt",
    user: "hwvtdpzt",
    port: 5432,
    password: "0LSA9Y98xJSf282WKKAjqglmLLQABFjw",
    database: "FindGrind"
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