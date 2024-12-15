const Chat = require('./chat.model');
const CustomError = require('../../utils/errors/customError');

// services for the chat model
class ChatService {

    // add a chat
    static async addChat(participants) {
        try {
            const chat = await Chat.create({ participants });
            return chat;
        } catch (error) {
            throw new CustomError(error.message, 500);
        }
    }

    // get all chats
    static async getAllChats() {
        try {
            const chats = await Chat.find();
            return chats;
        } catch (error) {
            throw new CustomError(error.message, 500);
        }
    }

    // get chat by chat_id
    static async getChatById(chat_id) {
        try {
            const chat = await Chat.findOne({ chat_id });
            return chat;
        } catch (error) {
            throw new CustomError(error.message, 500);
        }
    }

    // get chat by participants
    static async getChatByParticipants(participants) {
        try {
            const chat = await Chat.findOne({ participants });
            if (!chat) {
                throw new CustomError('Chat not found', 404);
            }
            return chat;
        } catch (error) {
            throw new CustomError(error.message, 500);
        }
    }

    // update a chat
    static async updateChat(chat_id, participants) {
        try {
            const chat = await Chat.findByIdAndUpdate({ chat_id }, { participants }, { new: true });
            // check if chat exists
            if (!chat) {
                throw new CustomError('Chat not found', 404);
            }
            return chat;
        } catch (error) {
            throw new CustomError(error.message, 500);
        }
    }

    // delete a chat
    static async deleteChat(chat_id) {
        try {
            const chat = await Chat.findOneAndDelete({ chat_id });
            // check if chat exists
            if (!chat) {
                throw new CustomError('Chat not found', 404);
            }
        } catch (error) {
            throw new CustomError(error.message, 500);
        }
    }

    // add a participant to a chat
    static async addParticipant(chat_id, participant_id) {
        try {
            const chat = await Chat.findOne({ chat_id });
            // check if chat exists
            if (!chat) {
                throw new CustomError('Chat not found', 404);
            }

            // check if participant is already in chat
            if (chat.participants.includes(participant_id)) {
                throw new CustomError('Participant already in chat', 400);
            }

            // add the participant
            chat.participants.push(participant_id);
            await chat.save();
            return chat;
        } catch (error) {
            throw new CustomError(error.message, 500);
        }
    }

    // remove a participant from a chat
    static async deleteParticipant(chat_id, participant_id) {
        try {
            const chat = await Chat.findOne({ chat_id });
            // check if chat exists
            if (!chat) {
                throw new CustomError('Chat not found', 404);
            }
            // check if participant does not exist
            if (!chat.participants.includes(participant_id)) {
                throw new CustomError('Participant does not exist in chat', 400);
            }

            // filter and remove the participant
            chat.participants = chat.participants.filter(id => id !== participant_id);
            await chat.save();
            return chat;
        } catch (error) {
            throw new CustomError(error.message, 500);
        }
    }

    // add a message to a chat
    static async addMessage(chat_id, message) {
        try {
            const chat = await Chat.findOne({ chat_id });

            // check if chat exists
            if (!chat) {
                throw new CustomError('Chat not found', 404);
            }

            // check if sender exists
            if (!chat.participants.includes(message.sender_id)) {
                throw new CustomError('Sender not in chat', 400);
            }

            chat.messages.push(message);
            await chat.save();
            return chat;
        } catch (error) {
            throw new CustomError(error.message, 500);
        }
    }

    // delete a message from a chat
    static async deleteMessage(chat_id, message_id) {
        try {
            const chat = await Chat.findOne({ chat_id });

            // check if chat exists
            if (!chat) {
                throw new CustomError('Chat not found', 404);
            }

            // check if message exists
            if (!chat.messages.includes(message_id)) {
                throw new CustomError('Message not found', 404);
            }

            // filter and remove the message
            chat.messages = chat.messages.filter(message => message._id !== message_id);
            await chat.save();
            return chat;
        } catch (error) {
            throw new CustomError(error.message, 500);
        }
    }
}

module.exports = ChatService;