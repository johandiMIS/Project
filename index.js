const express = require('express');
const Pool = require("pg").Pool;
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
});




app.get('/', (req, res) => {
    pool.query(`select * from users`)
    .then((data)=>{
        res.json(data.rows)
    })
    .catch((err)=>{
        res.send(`Failed, ${err}`)
    })
  })
  
app.listen(PORT, ()=>{
    console.log(`Server Start on Port ${PORT}`);
});


