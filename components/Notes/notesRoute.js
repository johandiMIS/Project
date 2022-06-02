const {Router} = require('express');
const { param } = require('express/lib/request');
const Notes = require('./notesController').Notes
const NoteRouter = new Router();

NoteRouter.put('/finish/title/:title/notes/:notes', (req, res)=>{
    const title = req.params.title;
    const notes = req.params.notes;
    Notes.UpdateFinish(title, notes)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    })
})

NoteRouter.delete('/title/:title/notes/:notes', (req, res)=>{
    const title = req.params.title;
    const notes = req.params.notes;
    Notes.DeleteNotes(title, notes)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    })
})
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
NoteRouter.post('/',(req, res)=>{
    const jsonBody = req.body
    Notes.PostNotes(jsonBody)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    })
} )
module.exports={
    NoteRouter
}