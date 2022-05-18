const {Router} = require('express');
const Sensor = require('./sensorController').Sensor
const SensorRouter = new Router();


SensorRouter.post('/insert', (req, res)=>{
    Sensor.SensorUpdate(req.body)
    .then(()=>{
        res.json({messagge:`Success`})
    })
    .catch((err)=>{
        res.json(err)
    })
})




module.exports={
    SensorRouter
}