const res = require("express/lib/response")
const { pool } = require("../../tools/psql")
const io = require('./../../tools/Socketio').get()

class Sensor{
    static SensorParse = (SensorJson)=>{
        return new Promise((resolve, reject)=>{
            const arrData = []
            const credential = SensorJson.credential
            const dataJson = SensorJson.data

            try{
                var result = "";
                result += `credential = ${credential}\n`
                for (var key in dataJson)
                {
                    var value = dataJson[`${key}`] 
                    arrData.push(new DataPoint(`${key}`,`${value}`))
                }
                resolve(arrData)
            }
            catch(err){
                reject(err)
            }
        })
    }

    static SensorUpdate = (SensorJson)=>{
        return new Promise((resolve, reject)=>{
            this.SensorParse(SensorJson)
            .then((data)=>{
                var query = `insert into sensors(sensorName, sensorValue, createdDate, Credential) values `;
                var i = 0;
                data.forEach(sensorData => {
                    query += `('${sensorData.dataKey}', ${sensorData.dataValue}, now(), '${SensorJson.credential}' )`
                    if(i < data.length-1) query += `,`
                    i++
                });
                return query
            })
            .then((data)=>{
                return pool.query(`delete from sensors where credential = '${SensorJson.credential}'`)
                .then(()=>{
                    return data
                })
                .catch((err)=>{
                    reject(err)
                })
            })
            .then((data)=>{
                pool.query(data)
            })
            .then(()=>{
                io.emit('data');
            })
            .then(()=>{
                resolve({messagge:`Success`})
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }

    static GetSensorByCredential = (credential)=>{
        const arrData=[];
        return new Promise((resolve, reject)=>{
            pool.query(`select * from sensors where credential = '${credential}'`)
            .then((data)=>{
                if(data.rowCount <= 0) throw new Error({messagge:`Data not found`})
                return data.rows
            }) 
            .then((datas)=>{

                datas.forEach((data)=>{ 
                    arrData.push({sensorName:data.sensorname, sensorValue : data.sensorvalue});
                })

                return {
                    credential : credential,
                    data : arrData
                }
            })
            .then((data)=>{
                resolve(data)
            })
            .catch((err)=>{
                reject(err)
            });
        });
    }
}

module.exports={
    Sensor
}