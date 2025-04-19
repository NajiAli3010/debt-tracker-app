// const express = require('express');
// const cors = require('cors');
// const path = require('path');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Serve static files from the public folder
// app.use(express.static(path.join(__dirname, 'public')));

// // In-memory data store
// let people = [];

// // API: Get all people
// app.get('/api/people', (req, res) => {
//     res.json(people);
// });

// // API: Add a person
// app.post('/api/people', (req, res) => {
//     const { name, amount, status } = req.body;
//     if (!name || !amount || !status) {
//         return res.status(400).json({ message: 'Name, amount, and status are required' });
//     }

//     const newPerson = {
//         id: Date.now(),
//         name,
//         amount,
//         status
//     };

//     people.push(newPerson);
//     res.status(201).json(newPerson);
// });


// app.get('/api/people', (req, res) => {
//     res.json(people);
// });

// app.post('/api/people', (req, res) => {
//     const { name, amount, status } = req.body;
//     if (!name || !amount || !status) {
//         return res.status(400).send('Missing fields');
//     }
//     people.push({ name, amount, status });
//     res.status(201).send('Person added');
// });

// app.delete('/api/people/:name', (req, res) => {
//     const name = req.params.name;
//     people = people.filter(p => p.name !== name);
//     res.status(200).send('Person deleted');
// });

// // NEW: Clear All People
// app.delete('/api/people', (req, res) => {
//     people = [];
//     res.status(200).send('All people cleared');
// });


// // Serve the frontend HTML
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/index.html'));
// });

// const port = 5000;
// app.listen(port, () => {
//     console.log(`✅ Server running at http://localhost:${port}`);
// });

const express = require("express")
const cors = require("cors")
const path = require("path")

const app = express()

// Configure CORS to allow requests from any origin
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "DELETE"], // Allow these methods
    allowedHeaders: ["Content-Type"], // Allow these headers
  }),
)

app.use(express.json())

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")))

// In-memory data store
let people = []

// API: Get all people
app.get("/api/people", (req, res) => {
  res.json(people)
})

// API: Add a person
app.post("/api/people", (req, res) => {
  const { name, amount, status } = req.body
  if (!name || !amount || !status) {
    return res.status(400).json({ message: "Name, amount, and status are required" })
  }

  const newPerson = {
    id: Date.now(),
    name,
    amount,
    status,
  }

  people.push(newPerson)
  res.status(201).json(newPerson)
})

// API: Delete a person by name
app.delete("/api/people/:name", (req, res) => {
  const name = req.params.name
  const initialLength = people.length
  people = people.filter((p) => p.name !== name)

  if (people.length === initialLength) {
    return res.status(404).json({ message: "Person not found" })
  }

  res.status(200).json({ message: "Person deleted successfully" })
})

// API: Clear All People
app.delete("/api/people", (req, res) => {
  people = []
  res.status(200).json({ message: "All people cleared successfully" })
})

// Serve the frontend HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"))
})

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" })
})

// Handle server errors
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: "Something went wrong!" })
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`)
})
