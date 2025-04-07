const express = require('express');
const path = require('path');
const app = express();

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/debt-tracker.html'));
});

// Set the port to listen on
const port = 5000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
