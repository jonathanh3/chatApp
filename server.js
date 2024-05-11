const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const PORT = process.env.PORT || 3000;

// Serve static files from the 'client' directory
app.use(express.static('client'));

const users = {};
const messages = [];

// Function to check if a username is already taken
function isUsernameTaken(username) {
    return Object.values(users).some(user => user.username === username);
}

// Function to add user messages
function addMessage(user, message) {
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'UTC', hour12: false })
    const msgObj = { user, message, timestamp };
    messages.push(msgObj);
    return msgObj;
}

function usernameEventHandler(socket, userId, ipv4Address) {
    // Event handler for username selection
    socket.on('username', (username) => {
        if (!isUsernameTaken(username)) {
            users[userId] = { // Store username and IP associated with socket ID
                username: username,
                ipv4Address: ipv4Address
            };
            socket.emit('usernameAccepted', username); // Send acknowledgment to client
            socket.emit('load messages', messages.map(msgObj => ({
                username: msgObj.user.username,
                message: msgObj.message,
                timestamp: msgObj.timestamp
            })));
            io.emit('update user list', Object.values(users).map(user => user.username)); // Send update to all connected clients
        } else {
            socket.emit('usernameError', 'Username is already taken');
        }
    });
}

function messagesEventHandler(socket, userId){
    // Event handler for chat messages
    socket.on('chat message', (message) => {
        const user = users[userId]; // Retrieve user associated with socket ID
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
}

function disconnectEventHandler(socket, userId) {
    // Event handler for disconnections
    socket.on('disconnect', () => {
        const user = users[userId];
        if (user) {
            const username = user.username;
            console.log(`User ${userId} (${username}) disconnected`);
            delete users[userId]; // Remove user from the users object
            io.emit('update user list', Object.values(users).map(user => user.username)); // Send update to all connected clients
        }
    });
}

io.on('connection', (socket) => {

    const userId= socket.id;
    const userIP = socket.handshake.address;
    const ipv4Regex = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/;
    const matches = userIP.match(ipv4Regex);
    const ipv4Address = matches ? matches[1] : userIP;

    console.log(`User connected: ${userId}`);
    console.log(`User connected from IPv4: ${ipv4Address}`);

    usernameEventHandler(socket, userId, ipv4Address);
    messagesEventHandler(socket, userId);
    disconnectEventHandler(socket, userId)

});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
