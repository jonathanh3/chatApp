let io;
let connectedUsers = {};

function updateActiveUsersList(socket, usernames) {
    io.emit('updateActiveUsers', usernames);
}

function handleChatMessage(socket, userId) {
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'UTC', hour12: false });

    socket.on('chatMessage', (message) => {
        let msgObj = { timestamp: timestamp, username: connectedUsers[userId], message: message };
        io.emit('chatMessage', msgObj); // Broadcast message to all clients
    });
}

function handleDisconnect(socket, userId) {
    socket.on('disconnect', () => {
        let username = connectedUsers[userId]
        delete connectedUsers[userId];
        console.log(`${username}(${userId}) disconnected`)
    });
}

function initializeSocket(server, sessionMiddleware) { 
    io = require('socket.io')(server);


    io.use((socket, next) => {
        // Create a minimal res object with a setHeader method
        const res = {
            setHeader: () => {}, // A dummy method to satisfy Socket.IO
        };

        // Call the session middleware with both the req and res objects
        sessionMiddleware(socket.request, res, next);
    });

    io.on('connection', (socket) => {
        if (socket.request.session.user) {
            const userId = socket.id;
            const username = socket.request.session.user.username;
            
            console.log(`${username}(${userId}) connected`)
            connectedUsers[userId] = username;

            updateActiveUsersList(socket, Object.values(connectedUsers));

            // Handle chat message event
            handleChatMessage(socket, userId);

            // Handle disconnection
            handleDisconnect(socket, userId);
        }
    });
}

module.exports = { initializeSocket };
