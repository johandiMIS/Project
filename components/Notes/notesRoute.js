const {Router} = require('express');
const Notes = require('./notesController').Notes
const NoteRouter = new Router();

NoteRouter.get('/category', (req, res)=>{
    Notes.GetCategory()
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    })
})

module.exports={
    NoteRouter
}