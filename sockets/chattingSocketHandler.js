const chattingSocketHandler = (socket, io) => {

    // Handle the join event
    socket.on('join', (data) => {
        console.log('Join Event: ', data);
        socket.join(data.room);
        socket.to(data.room).emit('message', {
            user: 'admin',
            text: `${data.user} has joined the room`
        });
    });

    // Handle the sendMessage event
    socket.on('sendMessage', (data) => {
        console.log('SendMessage Event: ', data);
        io.to(data.room).emit('message', {
            user: data.user,
            text: data.text
        });
    });

    // Handle the disconnect event
    socket.on('disconnect', (data) => {
        console.log(`${data.user} has left the room`);
    });
}

module.exports = chattingSocketHandler;