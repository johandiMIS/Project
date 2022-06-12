const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
app.use(express.json());
app.use(cors({
    origin:"http://localhost:3001"
}));
const server = http.createServer(app);
const io = require('./tools/Socketio').init(server)

const {UserRouter, UserApiRouter} = require('./components/users');
const {SensorRouter} = require('./components/sensor');
const {NoteRouter} = require('./components/Notes');

const PORT = process.env.PORT || 3001;

io.on('connection', (socket)=>{
    socket.on('data', ()=>{
        io.emit('broadcast')
        console.log('broadcasted')
    })
    console.log(socket.id)
})

app.use('/api/user/', UserApiRouter);
app.use('/api/menu/', UserRouter);
app.use('/api/sensor/', SensorRouter);
app.use('/api/notes/', NoteRouter);

app.get('/api/help', (req, res)=>{
    res.redirect('https://web.postman.co/workspace/0b344906-83e2-42c3-85da-811b112bb868/documentation/15162357-90b8cc1b-9ac1-4912-8183-64588e1ece63')
})

app.get('/*', (req, res) => {
    res.send(`Welcome to API. Visit https://safe-taiga-38670.herokuapp.com/api/help for API documentation.`)
})
app.post('/*', (req, res) => {
    res.send(`Welcome to API. Visit https://safe-taiga-38670.herokuapp.com/api/help for API documentation.`)
})
app.put('/*', (req, res) => {
    res.send(`Welcome to API. Visit https://safe-taiga-38670.herokuapp.com/api/help for API documentation.`)
})
app.delete('/*', (req, res) => {
    res.send(`Welcome to API. Visit https://safe-taiga-38670.herokuapp.com/api/help for API documentation.`)
})

server.listen(PORT, ()=>{
    console.log(`Server Start on Port ${PORT}`);
});