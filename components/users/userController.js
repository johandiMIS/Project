const bcrypt = require("bcrypt")
const passwordValidator = require("password-validator")
const  pool = require('./../../tools/psql').pool

class staticFunction{
    static GetHash = function(password){
        return new Promise((resolve, reject)=>{
            bcrypt.genSalt(10, function(err, salt) {
                if(err){
                    reject({
                        result : "Error",
                        message : `Failed Generate Salt`,
                        description : ""
                    })
                }
                else{
                    bcrypt.hash(password, salt, function(err, hash) {
                        if(err){
                            reject({
                                result : "Error",
                                message : `Failed Encrypt Password`,
                                description : ""
                            })
                        }
                        else{
                            resolve({
                                result : "Success",
                                message : `Password encrypted`,
                                description : hash
                            })
                        }
                    });
                }
            });
        })
    } 

    static PasswordValidate = (password)=>{
        var schema = new passwordValidator()
        .is().min(8)
        .is().max(30)
        .has().uppercase()
        .has().lowercase()
        .has().digits()
        .has().symbols()
        .has().not().spaces();
    
        return new Promise((resolve, reject)=>{
            if(schema.validate(password) === true){
                resolve({
                    result: "Success",
                    message: "Password Valid",
                    description : ""
                })
            }
            else{
                reject({
                    result: "Error",
                    message: "Password Format Invalid",
                    description: schema.validate(password, {details:true}) 
                })
            }
        })
    }

    static UsernameAvailable = (username)=>{
        return new Promise((resolve, reject)=>{
            pool.query(`select count(*) from users where username = '${username}'`)
            .then((res)=>{
                if(JSON.parse(res.rows[0].count) <= 0) resolve({
                    result: "Success",
                    message: "Username Valid",
                    description : {
                        name: username
                    }
                })
                else{
                    reject({
                        result : "Error",
                        message : `Username ${username} Already Used`,
                        description : ""
                    })
                }
            })
            .catch((err)=>{
                reject({
                    result : "Error",
                    message : `Throw Error, ${err}`,
                    description : ""
                })
            })
        })
    }

    static PasswordEncrypt = function(password){
        return new Promise((resolve, reject)=>{
            bcrypt.genSalt(10, function(err, salt) {
                if(err){
                    reject({
                        result : "Error",
                        message : `Failed Generate Salt`,
                        description : ""
                    })
                }
                else{
                    bcrypt.hash(password, salt, function(err, hash) {
                        if(err){
                            reject({
                                result : "Error",
                                message : `Failed Encrypt Password`,
                                description : ""
                            })
                        }
                        else{
                            resolve({
                                result : "Success",
                                message : `Password encrypted`,
                                description : hash
                            })
                        }
                    });
                }
            });
        })
    }
}

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

class User{
    constructor(){
        this.id;
        this.username;
        this.userLevel;
        this.encryptedPassword;
    }

    static SignUp = (username, password, userlevel)=>{
        return new Promise((resolve, reject)=>{
            Promise.all([
                staticFunction.PasswordValidate(password),
                staticFunction.UsernameAvailable(username),
                staticFunction.PasswordEncrypt(password)
            ])
            .then((data)=>{
                return UserAPI.CreateUser({
                    username: username,
                    userLevel:userlevel,
                    encryptedPassword:data[2].description
                })
            })
            .then((data)=>{
                resolve(data)
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }
}

module.exports = {
    UserAPI,
    User
}; 