const {Router} = require('express');
const res = require('express/lib/response');
const {GetUser} = require('./userAPI');
const UserAPI = require('./userAPI').UserAPI
const userRouter = new Router();

userRouter.get('/', (req, res)=>{
    UserAPI.GetUser()
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    })
}) 


module.exports = {
    userRouter
}