// BUILD YOUR SERVER HERE
const express = require('express');
const server = express();

const database = require('./users/model');
const db = database;

server.use(express.json());

server.get('/', (req, res) => {
    res.json({ 
        message: `You've reached the right place`
    })
});

server.get('/api/users', (req, res) => {
    
    db.find()
        .then((users) => {
            console.log('This is in the then:', users);
            res.status(200).json(users);

        })
        .catch((err) => {
            console.log(console.log('This is our error:', err));
            res.status(500).json({
                message: 'Error'
            })
        })
});


server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = db.findById(id);
    user
        .then((item) => {
            
            if(item){
                res.status(200).json(item);
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
    
});

server.post('/api/users', (req, res) => {
    const newUser = db.insert({

        name: req.body.name,
        bio: req.body.bio
    });
    res.status(201).json(newUser);
});

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = db.findById(id);

    user
        .then((item) => {
        
            if(item) {
                const updatedUser = db.update(id, {
                    name: req.body.name,
                    bio: req.body.bio
                    
                })
                res.json(updatedUser)
            } else {
                res.status(204).json({
                    message: 'User not found.'
                })
            }
        })
});

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = db.findById(id);

    user
        .then((item) => {
        
            if(item) {
                db.remove(id);
                res.status(200);
            } else {
                res.status(404).json({
                    message: 'User not found.'
                })
            }
        })
});


module.exports = { server }; // EXPORT YOUR SERVER instead of {}
