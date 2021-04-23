const fs = require('fs');
const express = require('express');
const path = require('path');
const database = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));
app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/../db/db.json')));

app.post('/api/notes', (req, res) => {

    let highestId = 0;
    for (let i = 0; i < database.length; i++) {
        let currentNote = database[i];

        if (currentNote.id > highestId) {
            highestId = currentNote.id;
        }

        console.log(highestId);
    }

    const newNote = req.body;
    newNote.id = parseInt(highestId) + 1;

    console.log("--newNote--");
    console.log(newNote);

    database.push(newNote);

    fs.writeFile('./db/db.json', JSON.stringify(database), (err) =>
    err ? console.log(err) : console.log('Note saved.'))

    res.json(newNote);
})
.delete('/api/notes', (req, res) => {
    let currentId = req.id;

    for (let i = 0; i < database.length; i++) {
        let dbId = database[i].id;

        console.log(dbId);

        if (currentId === dbId) {
            // Delete current object
        }
    }
});

app.listen(PORT, () => console.log(`App listening on PORT http://localhost:${PORT}`));