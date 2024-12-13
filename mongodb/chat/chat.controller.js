const ChatService = require('./chat.service');
const { logInfo } = require('../../utils/logger');

// controller for the chat model
class ChatController {

    // add a chat
    static async addChat(req, res, next) {
        logInfo(req, 'info');
        try {
            const { participants } = req.body;
            const chat = await ChatService.addChat(participants);
            res.status(201).json(chat);
        } catch (error) {
            next(error);
        }
    }

    // get all chats
    static async getAllChats(req, res, next) {
        logInfo(req, 'info');
        try {
            const chats = await ChatService.getAllChats();
            res.status(200).json(chats);
        } catch (error) {
            next(error);
        }
    }

    // get chat by chat_id
    static async getChatById(req, res, next) {
        logInfo(req, 'info');
        try {
            const { chat_id } = req.params;
            const chat = await ChatService.getChatById(chat_id);
            res.status(200).json(chat);
        } catch (error) {
            next(error);
        }
    }

    // get chat by participants
    static async getChatByParticipants(req, res, next) {
        logInfo(req, 'info');
        try {
            const { participants } = req.body;
            // check if participants is an array
            if (!Array.isArray(participants)) {
                throw new customError('Participants must be an array', 400);
            }
            const chat = await ChatService.getChatByParticipants(participants);
            res.status(200).json(chat);
        } catch (error) {
            next(error);
        }
    }

    // delete a chat
    static async deleteChat(req, res, next) {
        logInfo(req, 'info');
        try {
            const { chat_id } = req.params;
            await ChatService.deleteChat(chat_id);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }

    // add a participant to a chat 
    static async addParticipant(req, res, next) {
        logInfo(req, 'info');
        try {
            const { chat_id, participant_id } = req.body;
            const chat = await ChatService.addParticipant(chat_id, participant_id);
            res.status(200).json(chat);
        } catch (error) {
            next(error);
        }
    }

    // delete a participant from a chat
    static async deleteParticipant(req, res, next) {
        logInfo(req, 'info');
        try {
            const { chat_id, participant_id } = req.body;
            const chat = await ChatService.deleteParticipant(chat_id, participant_id);
            res.status(200).json(chat);
        } catch (error) {
            next(error);
        }
    }

    // add a message to a chat
    static async addMessage(req, res, next) {
        logInfo(req, 'info');
        try {
            const { chat_id, message } = req.body;
            const chat = await ChatService.addMessage(chat_id, message);
            res.status(200).json(chat);
        } catch (error) {
            next(error);
        }
    }

    // delete a message from a chat
    static async deleteMessage(req, res, next) {
        logInfo(req, 'info');
        try {
            const { chat_id, message_id } = req.body;
            const chat = await ChatService.deleteMessage(chat_id, message_id);
            res.status(200).json(chat);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = ChatController;