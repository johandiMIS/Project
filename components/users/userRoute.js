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
    });
});

userRouter.get('/id/:id', (req, res)=>{
    const id = req.params.id;
    UserAPI.GetUserById(id)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    });
});

userRouter.get('/name/:name', (req, res)=>{
    const name = req.params.name;
    UserAPI.GetUserByName(name)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    });
});

userRouter.get('/level/:level', (req, res)=>{
    const level = req.params.level;
    UserAPI.GetUserByLevel(level)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    });
});


module.exports = {
    userRouter
}