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

    static GetNotes= (category)=>{
        return new Promise((resolve, reject)=>{
            if(category === 'All'){
                pool.query("select Title, Notes, Finish from notes")
                .then((data)=>{
                    resolve(data.rows)
                })
                .catch((err)=>{
                    reject(err)
                })
            }
            else{
                pool.query(`select Title, Notes, Finish from notes where category = '${category}'`)
                .then((data)=>{
                    resolve(data.rows)
                })
                .catch((err)=>{
                    reject(err)
                })
            }
        })
        
    }
}

module.exports={
    Notes
}