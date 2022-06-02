const { json } = require("express/lib/response")
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

    static PostNotes= (jsonBody)=>{
        const category = jsonBody.category;
        const title = jsonBody.title;
        const notes = jsonBody.notes;
        const finish = jsonBody.finish
        return new Promise((resolve, reject)=>{
            pool.query( 
                `insert into notes(category, title, notes, finish)
                values('${category}', '${title}','${notes}',${finish})`
            )
            .then(()=>{
                resolve({message:"Success"})
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }

    static DeleteNotes= (title, notes)=>{
        return new Promise((resolve, reject)=>{
            pool.query( 
                `delete from notes where title = '${title}' and notes = '${notes}'`
            )
            .then(()=>{
                resolve({message:"Success"})
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