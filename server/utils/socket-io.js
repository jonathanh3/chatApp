// utils/socket-io.js

let io;
const connectedUsers = {};

function initializeSocket(server) {
    io = require('socket.io')(server);
    io.on('connection', (socket) => {
        console.info(`Client connected [id=${socket.id}]`);
        
        socket.on('chat message', (message) => {
            if (user) {
                const username = user.username;
                const msgObj = addMessage(user, message);
                io.emit('chat message', { 
                    username: msgObj.user.username, 
                    message: msgObj.message,
                    timestamp: msgObj.timestamp
                }); // Broadcast message to all clients
            }
        });

        socket.on('disconnect', () => {
            console.info(`Client disconnected [id=${socket.id}]`);
        });
    });
}

function emitUpdateActiveUsers(activeUsers) {
    io.emit('updateActiveUsers', activeUsers);
}

module.exports = { initializeSocket, emitUpdateActiveUsers };
