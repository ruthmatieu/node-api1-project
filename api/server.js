// BUILD YOUR SERVER HERE
const express = require('express');
const database = require('./users/model');
const server = express();
const users = database;
server.use(express.json());

server.get('/', (req, res) => {
    res.json({ message: `You've reached the right place`})
});

server.get('/api/users', (req, res) => {
    
    users.find()
        .then((users) => {
        res.status(200).json(users)

        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: 'Error'
            })
        })
})

server.get('/api/users/:id', (req, res) => {
    
    users.findById(req.params.id)
        .then((user) => {
            if(user){
                res.status(200).json(user);
            } else {
                res.status(404).json({
					message: "User not found",
				})
            }
            
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: 'That user does not exist.'
            })
        })
    
})

module.exports = {server}; // EXPORT YOUR SERVER instead of {}
