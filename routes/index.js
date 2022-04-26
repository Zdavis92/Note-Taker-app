// requires for routes to function properly
const path = require('path');
const fs = require('fs');
const { notes } = require('../db/db.json');
const router = require('express').Router();

// route for landing page, returns index.html
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// route to notes page, returns notes.html
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// get route that returns all saved notes
router.get('/api/notes', (req, res) => {
    res.json(notes);
});

// post route for adding new notes, adds id to new note and saves it to db.json
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

// route for deleting notes form db.json
// deletes notes but I was unable to get the page to update after. Requires server restart to see changes
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
    res.json(newNotes);
});
module.exports = router;