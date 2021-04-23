const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const notes = [];

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../../index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '../../notes.html')));
app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, '../../../db/db.json')));
app.get('/assets/css/styles.css', (req, res) => res.sendFile(path.join(__dirname, '../../assets/css/styles.css')));
app.get('/assets/js/index.js', (req, res) => res.sendFile(path.join(__dirname, '../../assets/js/index.js')));

app.post('/api/notes', (req, res) => {
    const newNote = req.body;

    console.log(newNote);
  
    notes.push(newNote);
    res.json(newNote);
});

app.listen(PORT, () => console.log(`App listening on PORT http://localhost:${PORT}`));