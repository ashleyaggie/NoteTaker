// Setting up needed modules
const fs = require('fs');
const express = require('express');
const path = require('path');

// Setting db.json to a variable for easier access and editing
const database = require('./db/db.json');

// Setting up port and express access
const app = express();
const PORT = process.env.PORT || 3000;

// Setting up app to translate across software and parse information as json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Telling app to use public folder
app.use(express.static('public'));

// Setting up necessary routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));
app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/../db/db.json')));

// Saving a note
app.post('/api/notes', (req, res) => {

    // Setting a highest ID to 0 to have something to check against initially
    let highestId = 0;

    // Find highest ID in db.json
    for (let i = 0; i < database.length; i++) {
        let currentNote = database[i];

        if (currentNote.id > highestId) {
            highestId = currentNote.id;
        }

    }

    // Set new note object - make ID 1 higher than the highest ID in db.json
    const newNote = req.body;
    newNote.id = parseInt(highestId) + 1;

    // Add new note to db.json array
    database.push(newNote);

    // Write new db.json array to db.json file
    fs.writeFile('./db/db.json', JSON.stringify(database), (err) =>
    err ? console.log(err) : console.log('Note saved.'))

    // Return new note for index.js to load
    res.json(newNote);
});

// Delete clicked note
app.delete('/api/notes/:id', (req, res) => {
    let currentId = parseInt(req.params.id);

    for (let i = 0; i < database.length; i++) {

        let dbId = database[i].id;

        // If clicked note's ID matches an ID in the array, get that note and delete it from the array
        if (dbId === currentId) {
            database.splice(i,1);
        }
    }

    // Write new db.json array to db.json file
    fs.writeFile('./db/db.json', JSON.stringify(database), (err) =>
    err ? console.log(err) : console.log('Note deleted.'));

    // Return new note for index.js to remove
    res.json(database);
});

// Server start
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));