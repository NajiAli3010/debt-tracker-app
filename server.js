const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// In-memory data store
let people = [];

// API: Get all people
app.get('/api/people', (req, res) => {
    res.json(people);
});

// API: Add a person
app.post('/api/people', (req, res) => {
    const { name, amount, status } = req.body;
    if (!name || !amount || !status) {
        return res.status(400).json({ message: 'Name, amount, and status are required' });
    }

    const newPerson = {
        id: Date.now(),
        name,
        amount,
        status
    };

    people.push(newPerson);
    res.status(201).json(newPerson);
});


app.get('/api/people', (req, res) => {
    res.json(people);
});

app.post('/api/people', (req, res) => {
    const { name, amount, status } = req.body;
    if (!name || !amount || !status) {
        return res.status(400).send('Missing fields');
    }
    people.push({ name, amount, status });
    res.status(201).send('Person added');
});

app.delete('/api/people/:name', (req, res) => {
    const name = req.params.name;
    people = people.filter(p => p.name !== name);
    res.status(200).send('Person deleted');
});

// NEW: Clear All People
app.delete('/api/people', (req, res) => {
    people = [];
    res.status(200).send('All people cleared');
});


// Serve the frontend HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

const port = 5000;
app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});
