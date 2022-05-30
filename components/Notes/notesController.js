const { pool } = require("../../tools/psql")

class Notes{
    static GetCategory = ()=>{
        return new Promise((resolve, reject)=>{
            pool.query("select category from category")
            .then((data)=>{
                resolve(data.rows)
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }
}

module.exports={
    Notes
}