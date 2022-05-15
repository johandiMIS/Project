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
}




module.exports = {
    UserAPI
}; 