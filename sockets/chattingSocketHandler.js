const { logSocketInfo } = require("../utils/logger");
const chatService = require("../mongodb/chat/chat.service");
const CustomError = require("../utils/errors/customError");

const chattingSocketHandler = (socket, io, userSocketMap, userChatRoomMap) => {
    // Map the current socket ID to the user
    userSocketMap[socket.user.id] = socket.id;
    console.log("users:", JSON.stringify(userSocketMap));

    // Helper function to get the user's chat rooms
    const getChatRooms = async () => {
        try {
            logSocketInfo(socket, "info", "getChatRooms");
            const chatRooms = await chatService.getChatsByParticipant(socket.user.id);

            // Build the nested `userChatRoomMap` structure
            chatRooms.forEach((chat) => {
                chat.participants.forEach((participant) => {
                    if (participant !== socket.user.id) {
                        if (!userChatRoomMap[socket.user.id]) {
                            userChatRoomMap[socket.user.id] = {};
                        }
                        userChatRoomMap[socket.user.id][participant] = chat.chat_id;
                    }
                });
            });

            // Join the chat rooms for the user
            chatRooms.forEach((chat) => {
                socket.join(chat.chat_id);
            });

            console.log("userChatRoomMap:", JSON.stringify(userChatRoomMap));
        } catch (error) {
            logSocketInfo(socket, "error", error.message);
        }
    };

    // Call `getChatRooms` to initialize the user's data
    getChatRooms();

    // Helper function to get `chat_id` based on participants
    const getChatId = (senderId, recipientId) => {
        return userChatRoomMap[senderId]?.[recipientId] || null;
    };

    // Handle the "sendMessage" event
    socket.on("sendMessage", async (data) => {
        logSocketInfo(socket, "info", `sendMessage: ${JSON.stringify(data)}`);
        try {
            const { message, recipientId } = data;
            if (!message || !recipientId) {
                throw new Error("Message and Recipient ID are required");
            }

            // Get the chat ID dynamically
            const chat_id = getChatId(socket.user.id, recipientId);
            if (!chat_id) {
                throw new Error("Chat room not found between the participants");
            }

            const newData = { message, user: socket.user.id };
            console.log("newData:", JSON.stringify(newData));

            // Emit the message to the room
            socket.to(chat_id).emit("receiveMessage", newData);
        } catch (error) {
            logSocketInfo(socket, "error", error.message);
        }
    });

    // Handle the "join" event
    socket.on("join", (data) => {
        try {
            const { recipientId } = data;
            if (!recipientId) {
                throw new CustomError("Recipient ID is required");
            }

            // Get the chat ID dynamically
            const chat_id = getChatId(socket.user.id, recipientId);
            if (!chat_id) {
                throw new Error("Chat room not found between the participants");
            }

            logSocketInfo(socket, "info", `Join: ${JSON.stringify(data)}`);

            // Join the chat room
            socket.join(chat_id);
        } catch (error) {
            logSocketInfo(socket, "error", error.message);
        }
    });

    // Handle the "leave" event
    socket.on("leave", (data) => {
        try {
            const { recipientId } = data;
            if (!recipientId) {
                throw new CustomError("Recipient ID is required");
            }

            // Get the chat ID dynamically
            const chat_id = getChatId(socket.user.id, recipientId);
            if (!chat_id) {
                throw new Error("Chat room not found between the participants");
            }

            // Remove the user from the chat room
            chatService.deleteParticipant(chat_id, socket.user.id);

            logSocketInfo(socket, "info", `Leave: ${JSON.stringify(data)}`);

            // Leave the chat room
            socket.leave(chat_id);
        } catch (error) {
            logSocketInfo(socket, "error", error.message);
        }
    });

    // Handle the "disconnect" event
    socket.on("disconnect", () => {
        logSocketInfo(socket, "info", `Socket: ${socket.id} disconnected`);
        delete userSocketMap[socket.user.id];
        delete userChatRoomMap[socket.user.id]; // Clean up chat room map
    });

    // Handle the "isOnline" event
    socket.on("isOnline", (data) => {
        logSocketInfo(socket, "info", `IsOnline: ${data}`);
        const online = Boolean(userSocketMap[data]);
        socket.emit("isOnlineResponse", online); // Send response directly to the client
    });
};

module.exports = chattingSocketHandler;
