// Step 1 is going to be importing the express module
// We installed the express module with the npm install express command before
const express = require('express');

// Step 2 is to create an Express application
const app = express();

// Step 3 is to get the middleware to parse JSON bodies in requests

app.use(express.json());

// Step 3.1 - here, we are going to add an in-memory users array.
let users = [];
let nextId = 1;



// Step 4 is to define a simple route request handler
// What I see here is that this is similar to the flask route decorator 
/*
@app.route('/')
def home():
    return "Hello, World!"
*/
app.get('/', (req, res) => {
    res.send("This is a simple express server!");
});

// From here, let's do the CRUD operations. 

// CREATE a new user 
app.post('/users', (req, res) => {
    const {name, email} = req.body;
    if (!name || !email) {
        return res.status(400).json({error: 'Name and email are required. '});
    }
    const newUser = {id: nextId++, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

// READ all users
app.get('/users', (req, res) => {
    res.json(users);
});

// READ a single user by ID
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }
    res.json(user);
});

// UPDATE a user by ID
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required.' });
    }
    user.name = name;
    user.email = email;
    res.json(user);
});

// DELETE a user by ID
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found.' });
    }
    const deletedUser = users.splice(userIndex, 1)[0];
    res.json(deletedUser);
});




// Step 5 is to start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server is running. I guess this is where we put logs, that we see in the console log. \n ')
    console.log('ok, no, this log that is there is the log that runs when we run the npm thing that is there. \n \n')
    console.log('this log is what shows up in the terminal, when the npm run works')
});
