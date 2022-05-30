const {Router} = require('express');
const { param } = require('express/lib/request');
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
NoteRouter.get('/notes/:category', (req, res)=>{
    const category = req.params.category
    Notes.GetNotes(category)
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