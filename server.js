const express = require('express');
const app = express();

// This allows the server to read the data sent from your HTML form
app.use(express.urlencoded({ extended: true }));

// 1. Our "Fake" Database
const users = [
    { username: "admin", password: "password123" }
];

// 2. The Route that handles the Login Form
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // 3. Logic: Check if the user exists
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // If match: Send them to a private dashboard
        res.send(`<h1>Welcome back, ${username}! You are logged in.</h1>`);
    } else {
        // If no match: Send an error
        res.send('<h1>Invalid username or password.</h1> <a href="/">Try again</a>');
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
