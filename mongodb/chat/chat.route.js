const ChatController = require('./chat.controller');

const router = require('express').Router();

// add a chat
router.post('/', ChatController.addChat);

// get all chats
router.get('/', ChatController.getAllChats);

// get chat by chat_id
router.get('/:chat_id', ChatController.getChatById);

// get chat by participants
router.post('/participants', ChatController.getChatByParticipants);

// delete a chat
router.delete('/:chat_id', ChatController.deleteChat);

// add a participant to a chat
router.put('/addParticipant', ChatController.addParticipant);

// delete a participant from a chat
router.put('/deleteParticipant', ChatController.deleteParticipant);

// add a message to a chat
router.put('/addMessage', ChatController.addMessage);

// delete a message from a chat
router.put('/deleteMessage', ChatController.deleteMessage);

module.exports = router;
