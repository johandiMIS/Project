const {Router} = require('express');
const res = require('express/lib/response');
const {UserAPI, User} = require('./userController')
const UserApiRouter = new Router();


UserApiRouter.get('/', User.AdminAuth, (req, res)=>{
    UserAPI.GetUser()
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    });
});

UserApiRouter.get('/id/:id', User.UserAuth, (req, res)=>{
    const id = req.params.id;
    UserAPI.GetUserById(id)
    .then((data)=>{
        if(req.mwId != id && req.mwUserlevel != 1){
            res.json({
                result: "Error",
                message: "No Permission"
            })
        }
        return data
    })
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    });
});

UserApiRouter.get('/name/:name', User.UserAuth, (req, res)=>{
    const name = req.params.name;
    UserAPI.GetUserByName(name)
    .then((data)=>{
        if(req.mwUsername != name && req.mwUserlevel != 1){
            res.json({
                result: "Error",
                message: "No Permission"
            })
        }
        return data
    })
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    });
});

UserApiRouter.get('/level/:level', User.AdminAuth, (req, res)=>{
    const level = req.params.level;
    UserAPI.GetUserByLevel(level)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    });
});

UserApiRouter.post('/', User.AdminAuth, (req,res)=>{
    const jsonBody = req.body;
    UserAPI.CreateUser(jsonBody)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
       res.json(err)
    })
})

UserApiRouter.put('/id/:id', User.UserAuth, (req, res)=>{
    const id = req.params.id;
    const jsonBody = req.body;
    UserAPI.UpdateUserById(id, jsonBody)
    .then((data)=>{
        if(req.mwId != id && req.mwUserlevel != 1){
            res.json({
                result: "Error",
                message: "No Permission"
            })
        }
        return data
    })
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    })
})

UserApiRouter.put('/name/:name', User.UserAuth, (req, res)=>{
    const name = req.params.name;
    const jsonBody = req.body;
    UserAPI.UpdateUserByName(name, jsonBody)
    .then((data)=>{
        if(req.mwUsername != name && req.mwUserlevel != 1){
            res.json({
                result: "Error",
                message: "No Permission"
            })
        }
        return data
    })
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    })
})

UserApiRouter.delete('/id/:id', User.AdminAuth, (req, res)=>{
    const id = req.params.id;
    UserAPI.DeleteUserById(id)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    })
})

UserApiRouter.delete('/name/:name', User.AdminAuth, (req, res)=>{
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