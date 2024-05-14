let io;
let connectedUsers = {};

function initializeSocket(server) {
    
    io = require('socket.io')(server);
    io.on('connection', (socket) => {
        // Handle user login event
        handleUserLogin(socket);

        // Handle chat message event
        socket.on('chatMessage', (message) => {
            io.emit('chatMessage', message); // Broadcast message to all clients
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            handleDisconnect(socket);
        });
    });
}

function handleUserLogin(socket) {
    socket.on('userLogin', (user) => {
        const userId = socket.id;
        connectedUsers[userId] = user.username;
        console.log(connectedUsers);
        socket.user = user;
    });
}

function handleDisconnect(socket) {
    // console.info(`Client disconnected [id=${socket.id}]`);
    // Remove the disconnected user from the connectedUsers object
    const userId = socket.id;
    delete connectedUsers[userId];
}

function emitUpdateActiveUsers(activeUsers) {
    io.emit('updateActiveUsers', activeUsers);
}

function emitUserLogin(user) {
    io.emit('userLogin', user);
}

module.exports = { initializeSocket, emitUpdateActiveUsers, emitUserLogin };
