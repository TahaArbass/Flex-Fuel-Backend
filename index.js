const express = require('express');
require('dotenv').config();
const cors = require('cors');
const http = require('http'); // Import http
const socketIo = require('socket.io'); // Import socket.io
const { instrument } = require('@socket.io/admin-ui');
const chattingSocketHandler = require('./sockets/chattingSocketHandler'); // Import the chattingSocketHandler
const audioVideoCallSocketHandler = require('./sockets/audioVideoCallSocketHandler'); // Import the audioVideoCallSocketHandler
const mongoose = require('mongoose');
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
app.use('/api/chats', require('./mongodb/chat/chat.route'));

// Error handler
const errorHandler = require('./utils/errors/errorHandler');
const socketAuthMiddleware = require('./middlewares/socketAuthMiddleware');
const { logSocketInfo } = require('./utils/logger');
app.use(errorHandler);

// create the socket.io server and allow cors
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: ['http://localhost:5173', 'https://admin.socket.io'],
        methods: ['GET', 'POST'],
        credentials: true, // Allow credentials (cookies)
    }
});

// namespace for the chatting
const chatNamespace = io.of('/chat');
const callNamespace = io.of('/call');
const userSocketMap = {}; // Map to store the user_id and socket_id
// Handle the connection event for the chatting
chatNamespace.use(socketAuthMiddleware); // Use the socketAuthMiddleware
chatNamespace.on('connection', (socket) => {
    logSocketInfo(socket, 'info', `Chat Socket Connected: ${socket.id}`);
    chattingSocketHandler(socket, chatNamespace, userSocketMap);
});

// callNamespace.use(socketAuthMiddleware); // Use the socketAuthMiddleware
// Handle the connection event for the call (video and audio)
callNamespace.on('connection', (socket) => {
    logSocketInfo(socket, 'info', `Call Socket Connected: ${socket.id}`);
    audioVideoCallSocketHandler(socket, callNamespace);
});


// instrument for admin ui of socket.io
instrument(io, {
    auth: false,
});

// connecting to mongodb
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err);
    });

// Start the server
const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
