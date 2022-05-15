const express = require('express');
const { send } = require('express/lib/response');
const UserApiRouter = require('./components/users/userAPI.js').UserApiRouter

const app = express();
app.use(express.json())
const PORT = process.env.PORT || 3000;


app.use('/api/user/', UserApiRouter);

app.get('/*', (req, res) => {
    res.send('DOCUMENTATION PAGE')
})
app.post('/*', (req, res) => {
    res.send('DOCUMENTATION PAGE')
})
app.put('/*', (req, res) => {
    res.send('DOCUMENTATION PAGE')
})
app.delete('/*', (req, res) => {
    res.send('DOCUMENTATION PAGE')
})

app.listen(PORT, ()=>{
    console.log(`Server Start on Port ${PORT}`);
});