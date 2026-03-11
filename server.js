const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

// Allow Express to read form data
app.use(express.urlencoded({ extended: true }));

// Setup SQLite Database
const db = new sqlite3.Database('./users.db');
db.serialize(() => {
    // Creates the table if it doesn't exist. UNIQUE prevents duplicate usernames.
    db.run("CREATE TABLE IF NOT EXISTS users (username TEXT UNIQUE, password TEXT)");
});

// Serve the HTML file when someone visits the main page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Route to Register a new user
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, password], (err) => {
        if (err) {
            return res.send("Error: That username is already taken. <a href='/'>Go back</a>");
        }
        res.send("Registration successful! <a href='/'>Go back to login</a>");
    });
});

// Route to Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, row) => {
        if (row) {
            res.send(`<h1>Welcome back, ${row.username}! You are logged in.</h1>`);
        } else {
            res.send("Invalid username or password. <a href='/'>Try again</a>");
        }
    });
});

app.listen(3000, () => console.log('Server is running on http://localhost:3000'));
