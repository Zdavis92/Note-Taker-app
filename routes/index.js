const path = require('path');
const fs = require('fs');
const { notes } = require('../db/db.json');
const router = require('express').Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

router.get('/api/notes', (req, res) => {
    res.json(notes);
});

router.post('/api/notes', (req, res) => {
    let newNote = req.body
    newNote.id = notes[notes.length - 1].id + 1
    notes.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ "notes": notes }, null, 2)
    )
    res.json(newNote);
});

router.delete(`/api/notes/:id`, (req, res) => {
    let target = JSON.parse(req.params.id);
    let newNotes = notes.filter((note) => {
        if (note.id != target) {
            return true;
        }
    });
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ "notes": newNotes }, null, 2)
    )
    console.log('deleted note');
    res.json(newNotes);
})
module.exports = router;