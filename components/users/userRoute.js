const {Router} = require('express');
const User = require('./userController').User
const UserRouter = new Router();

UserRouter.post('/signup', (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const userLevel = req.body.userLevel;

    User.SignUp(username, password, userLevel)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    })
})

module.exports = {
    UserRouter
}