const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const USERS_FILE = 'users.json';

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.post('/register', (req, res) => {
    const { email, password } = req.body;
    const newUser = { email, password };

    fs.readFile(USERS_FILE, 'utf8', (err, data) => {
        let users = [];

        if (!err && data) {
            try {
                users = JSON.parse(data); 
            } catch (parseErr) {
                console.error('Error parsing JSON:', parseErr);
            }
        }

        users.push(newUser);

        fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error('Error saving user:', err);
                return res.status(500).send('Server error');
            }

            console.log('User registered:', email);
            res.send(`<h2>Thank you for registering, ${email}!</h2><a href="home.html">Back to Home</a>`);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
