// BUILD YOUR SERVER HERE
const express = require('express');
const database = require('./users/model');
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.json({ message: `You've reached the right place`})
});

server.get('/users', (req, res) => {
    const users = database.getUsers();
    res.json(users)
})

module.exports = {server}; // EXPORT YOUR SERVER instead of {}
