const express = require('express');
require('dotenv').config();
const cors = require('cors');
const http = require('http'); // Import http
const socketIo = require('socket.io'); // Import socket.io
const { instrument } = require('@socket.io/admin-ui');
const chattingSocketHandler = require('./sockets/chattingSocketHandler'); // Import the chattingSocketHandler

// app setup 
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', require('./routes/user.route'));
app.use('/api/muscle-groups', require('./routes/muscleGroup.route'));
app.use('/api/muscles', require('./routes/muscle.route'));
app.use('/api/exercises', require('./routes/exercise.route'));
app.use('/api/categories', require('./routes/category.route'));
app.use('/api/exercise-categories', require('./routes/exerciseCategory.route'));

// Error handler
const errorHandler = require('./utils/errors/errorHandler');
app.use(errorHandler);

// create the socket.io server and allow cors
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
});

// namespace for the chatting
const chatNamespace = io.of('/chat');

// Handle the connection event for the chatting
chatNamespace.on('connection', (socket) => {
    console.log('Chatting Socket Connected: ', socket.id);
    chattingSocketHandler(socket, chatNamespace);
});

// instrument for admin ui of socket.io
instrument(io, {
    auth: false
});

// Start the server
const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
