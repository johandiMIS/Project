const pool = require('./../../tools/psql').pool

class User {
    constructor(){
        this.id;
        this.username;
        this.password;
        this.userLevel;
    }
    static getUsers(){
        return pool.query(`select * from users`)
    }
}

module.exports = User