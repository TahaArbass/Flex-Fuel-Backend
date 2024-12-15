const { logSocketInfo } = require("../utils/logger");
const chatService = require("../mongodb/chat/chat.service");
const CustomError = require("../utils/errors/customError");
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
            const newData = { message, user: socket.user.id };
            console.log('newData:' + JSON.stringify(newData));
            socket.to(chat_id).emit("receiveMessage", newData);
        } catch (error) {
            logSocketInfo(socket, "error", error);
        }
    });

    // handle join event to join a room
    socket.on("join", (data) => {
        try {
            const { chat_id } = data;
            if (!chat_id) {
                throw new CustomError("Chat room id is required");
            }
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
                throw new CustomError("Chat room id is required");
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
