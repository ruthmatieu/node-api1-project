const { server } = require('./api/server');

const port = 8000;

server.listen(port, () => {
    console.log('Server started at http://localhost:8000/')
})

// START YOUR SERVER HERE
