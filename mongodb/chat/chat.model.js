const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    // sender_id is the user ID of the sender
    sender_id: {
        type: String,
        required: true,
    },

    // content is the message sent by the user
    content: {
        type: String,
        required: true,
    },

    // timestamp is the time the message was sent
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const ChatSchema = new mongoose.Schema({
    chat_id: {
        type: String,
        required: true,
        unique: true,
        default: new mongoose.Types.UUID,
    },
    // chat name is optional, will be helpful for group chats later
    chat_name: {
        type: String,
        default: '',
    },

    // participants is an array of user IDs who are part of the chat
    participants: {
        type: [String], // Array of user IDs
        required: true,
    },

    // messages is an array of messages sent in the chat
    messages: {
        type: [MessageSchema],
        default: [],
    },
});

const Chat = mongoose.model('chat', ChatSchema);

module.exports = Chat;
