const { logSocketInfo } = require("../utils/logger");
const chatService = require("../mongodb/chat/chat.service");

const chattingSocketHandler = (socket, io, userSocketMap) => {
    // put the socket id in the userSocketMap
    userSocketMap[socket.user.id] = socket.id;
    console.log('users:' + JSON.stringify(userSocketMap));

    // handle sendMessage event
    socket.on("sendMessage", async (data) => {
        logSocketInfo(socket, "info", `sendMessage: ${JSON.stringify(data)}`);
        try {
            const { message, chat_id } = data;
            if (!message || !chat_id) {
                throw new Error("Message and Chat room id are required");
            }
            const chat = await chatService.addMessage(chat_id, message);
            console.log('chat:' + JSON.stringify(chat));
            io.to(chat_id).emit("message", chat);
        } catch (error) {
            logSocketInfo(socket, "error", error);
        }
    });

    // handle create chat room event
    socket.on("createChatRoom", async (data) => {
        logSocketInfo(socket, "info", `createChat: ${JSON.stringify(data)}`);
        try {
            const { participants } = data;
            if (!participants || participants.length < 2) {
                throw new Error("Participants are required and must be at least 2");
            }
            const chat = await chatService.addChat(participants);
            console.log('chat:' + JSON.stringify(chat));
            io.to(chat.chat_id).emit("chatCreated", chat);
        } catch (error) {
            logSocketInfo(socket, "error", error);
        }
    });

    // handle delete chat room event
    socket.on("deleteChatRoom", async (data) => {
        logSocketInfo(socket, "info", `deleteChat: ${JSON.stringify(data)}`);
        try {
            const { chat_id } = data;
            if (!chat_id) {
                throw new Error("Chat room id is required");
            }
            await chatService.deleteChat(chat_id);
            io.to(chat_id).emit("chatDeleted",);
        } catch (error) {
            logSocketInfo(socket, "error", error);
        }
    });


    // handle join event to join a room
    socket.on("join", (data) => {
        try {
            const { chat_id } = data;
            if (!chat_id) {
                throw new Error("Chat room id is required");
            }

            // add the user to the chat room
            const chat = chatService.addParticipant(chat_id, socket.user.id);

            logSocketInfo(socket, "info", `Join: ${JSON.stringify(data)}`);

            // join the chat room
            socket.join(data.chat_id);
        } catch (error) {
            logSocketInfo(socket, "error", error);
        }
    });

    // handle leave event to leave a room
    socket.on("leave", (data) => {
        try {
            const { chat_id } = data;
            if (!chat_id) {
                throw new Error("Chat room id is required");
            }

            // remove the user from the chat room
            const chat = chatService.deleteParticipant(chat_id, socket.user.id);

            logSocketInfo(socket, "info", `Leave: ${JSON.stringify(data)}`);

            // leave the chat room
            socket.leave(data.chat_id);
        } catch (error) {
            logSocketInfo(socket, "error", error);
        }
    });

    // handle disconnect event
    socket.on("disconnect", () => {
        logSocketInfo(socket, "info", `Socket: ${socket.id} disconnected`);
        delete userSocketMap[socket.user.id];
    });

    // handle isOnline event
    socket.on("isOnline", (data) => {
        logSocketInfo(socket, "info", `IsOnline: ${data}`);
        const online = userSocketMap[data] ? true : false;
        socket.to(socket.id).emit("isOnlineResponse", online);
    });
};

module.exports = chattingSocketHandler;
