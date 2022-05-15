const res = require('express/lib/response')

const  pool = require('./../../tools/psql').pool

class UserAPI{
    // HTTP GET request.
    static GetUser = ()=>{
        return new Promise((resolve, reject)=>{
            pool.query(`select * from users`)
            .then((data)=>{
                resolve(data.rows)
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }

    static GetUserById = (id)=>{
        return new Promise((resolve, reject)=>{
            pool.query(`select * from users where id = ${id}`)
            .then((data)=>{
                resolve(data.rows)
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }
    
    static GetUserByName = (name)=>{
        return new Promise((resolve, reject)=>{
            pool.query(`select * from users where username = '${name}'`)
            .then((data)=>{
                resolve(data.rows)
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }
    
    static GetUserByLevel = (level)=>{
        return new Promise((resolve, reject)=>{
            pool.query(`select * from users where userlevel = '${level}'`)
            .then((data)=>{
                resolve(data.rows)
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }    

    // HTTP POST request.
    static CreateUser = (jsonBody)=>{
        const _username = jsonBody.username;
        const _userLevel = jsonBody.userLevel;
        const _encryptedPassword = jsonBody.encryptedPassword;

        return new Promise((resolve, reject)=>{
            pool.query(`insert into users(username, userLevel, encryptedPassword)  values ('${_username}', ${_userLevel}, '${_encryptedPassword}' )`)
            .then(()=>{
                resolve({message:"Success"})
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }

    // HTTP PUT request.
    static  UpdateUserById = ( id, jsonBody)=>{
        const _username = jsonBody.username;
        const _userLevel = jsonBody.userLevel;
        const _encryptedPassword = jsonBody.encryptedPassword;

        return new Promise((resolve, reject)=>{
            pool.query(`update users set username = '${_username}', userlevel = ${_userLevel}, encryptedPassword = '${_encryptedPassword}' where id = ${id}`)
            .then(()=>{
                resolve({message:"Success"})
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }

    static  UpdateUserByName = ( name, jsonBody)=>{
        const _username = jsonBody.username;
        const _userLevel = jsonBody.userLevel;
        const _encryptedPassword = jsonBody.encryptedPassword;

        return new Promise((resolve, reject)=>{
            pool.query(`update users set username = '${_username}', userlevel = ${_userLevel}, encryptedPassword = '${_encryptedPassword}' where username = ${name}`)
            .then(()=>{
                resolve({message:"Success"})
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }

    static DeleteUserById = (id)=>{
        return new Promise((resolve, reject)=>{
            pool.query(`delete from users where Id = ${id}`)
            .then(()=>{
                resolve({message:"Success"})
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }

    static DeleteUserByName = (name)=>{
        return new Promise((resolve, reject)=>{
            pool.query(`delete from users where username = '${name}'`)
            .then(()=>{
                resolve({message:"Success"})
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }
}

module.exports = {
    UserAPI
}; 