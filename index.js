const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const {User} = require('./components/users')

app.get('/', (req, res) => {
    User.getUsers()
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


