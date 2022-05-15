const express = require('express');
const { send } = require('express/lib/response');
const userRouter = require('./components/users/userRoute.js').userRouter

const app = express();

const PORT = process.env.PORT || 3000;

app.use('/api/user/', userRouter);

app.get('/*', (req, res) => {
    res.send('DOCUMENTATION PAGE')
})


app.listen(PORT, ()=>{
    console.log(`Server Start on Port ${PORT}`);
});


