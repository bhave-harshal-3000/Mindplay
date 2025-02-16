
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname))); // Serve static files

// Initialize SQLite database
const db = new sqlite3.Database('./scores.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Create table if not exists
db.run(`
    CREATE TABLE IF NOT EXISTS scores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        problem_solving REAL NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

// Endpoint to save a new problem-solving score
app.post('/api/score', (req, res) => {
    const { problemSolving } = req.body;

    if (typeof problemSolving !== 'number') {
        return res.status(400).json({ error: "Invalid score format" });
    }

    db.run(`INSERT INTO scores (problem_solving) VALUES (?)`, [problemSolving], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Score saved", id: this.lastID });
    });
});

// Endpoint to get the latest problem-solving score
app.get('/api/scores', (req, res) => {
    db.get(`SELECT problem_solving FROM scores ORDER BY timestamp DESC LIMIT 1`, (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ problemSolving: row ? row.problem_solving : 0 });
    });
});

// Endpoint to get problem-solving chart data
app.get('/api/chart-data/problem-solving', (req, res) => {
    db.all(`SELECT problem_solving, timestamp FROM scores ORDER BY timestamp ASC`, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const labels = rows.map(row => new Date(row.timestamp).toLocaleDateString());
        const scores = rows.map(row => row.problem_solving);

        res.json({ labels, scores });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
