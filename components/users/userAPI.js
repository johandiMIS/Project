const {Router} = require('express');
const res = require('express/lib/response');
const UserAPI = require('./userController').UserAPI
const UserApiRouter = new Router();


UserApiRouter.get('/', (req, res)=>{
    UserAPI.GetUser()
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    });
});

UserApiRouter.get('/id/:id', (req, res)=>{
    const id = req.params.id;
    UserAPI.GetUserById(id)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    });
});

UserApiRouter.get('/name/:name', (req, res)=>{
    const name = req.params.name;
    UserAPI.GetUserByName(name)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    });
});

UserApiRouter.get('/level/:level', (req, res)=>{
    const level = req.params.level;
    UserAPI.GetUserByLevel(level)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    });
});

UserApiRouter.post('/', (req,res)=>{
    const jsonBody = req.body;
    UserAPI.CreateUser(jsonBody)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
       res.json(err)
    })
})

UserApiRouter.put('/id/:id', (req, res)=>{
    const id = req.params.id;
    const jsonBody = req.body;
    UserAPI.UpdateUserById(id, jsonBody)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    })
})

UserApiRouter.delete('/id/:id', (req, res)=>{
    const id = req.params.id;
    UserAPI.DeleteUserById(id)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    })
})

UserApiRouter.delete('/name/:name', (req, res)=>{
    const name = req.params.name;
    UserAPI.DeleteUserByName(name)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    })
})

module.exports = {
    UserApiRouter
}