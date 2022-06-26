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

SensorRouter.get('/credential/:credential', (req, res)=>{
    const credential = req.params.credential;
    Sensor.GetSensorByCredential(credential)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    })
});


module.exports={
    SensorRouter
}