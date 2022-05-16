const express = require('express');
const { send } = require('express/lib/response');
// const UserApiRouter = require('./components/users/userAPI.js').UserApiRouter
// const UserRouter = require('./components/users/userRoute.js').UserRouter

const {UserRouter, UserApiRouter} = require('./components/users')

const app = express();
app.use(express.json())
const PORT = process.env.PORT || 3000;


app.use('/api/user/', UserApiRouter);
app.use('/api/menu/', UserRouter);

app.get('/api/help', (req, res)=>{
    res.redirect('https://web.postman.co/workspace/0b344906-83e2-42c3-85da-811b112bb868/documentation/15162357-90b8cc1b-9ac1-4912-8183-64588e1ece63')
})

app.get('/*', (req, res) => {
    res.send(`Welcome to API. Visit https://safe-taiga-38670.herokuapp.com/api/help for API documentation.`)
})
app.post('/*', (req, res) => {
    res.send(`Welcome to API. Visit https://safe-taiga-38670.herokuapp.com/api/help for API documentation.`)
})
app.put('/*', (req, res) => {
    res.send(`Welcome to API. Visit https://safe-taiga-38670.herokuapp.com/api/help for API documentation.`)
})
app.delete('/*', (req, res) => {
    res.send(`Welcome to API. Visit https://safe-taiga-38670.herokuapp.com/api/help for API documentation.`)
})

app.listen(PORT, ()=>{
    console.log(`Server Start on Port ${PORT}`);
});