const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path'); // Import the 'path' module

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const PORT = process.env.PORT || 3000;

// Serve static files from the 'client' directory
app.use(express.static('client'));

const users = {};

// Function to check if a username is already taken
function isUsernameTaken(username) {
    return Object.values(users).includes(username);
}

io.on('connection', (socket) => {

    const userId= socket.id;

    const userIP = socket.handshake.address;
    const ipv4Regex = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/;
    const matches = userIP.match(ipv4Regex);
    const ipv4Address = matches ? matches[1] : userIP;

    console.log(`User connected: ${userId}`);
    console.log(`User connected from IPv4: ${ipv4Address}`);
    console.log(users)

    // Event handler for username selection
    socket.on('username', (username) => {
        if (!isUsernameTaken(username)) {
            users[userId] = username; // Store username associated with socket ID
            console.log(`User ${userId} chose username: ${username}`);
            socket.emit('usernameAccepted', username); // Send acknowledgment to client
        } else {
            socket.emit('usernameError', 'Username is already taken');
        }
    });

    // Event handler for chat messages
    socket.on('chat message', (message) => {
        const username = users[userId]; // Retrieve username associated with socket ID
        if (username) {
            io.emit('chat message', { username, message }); // Broadcast message to all clients
            console.log('chat message', { username, message }); // Broadcast message to all clients
        }
    });

    // Event handler for disconnections
    socket.on('disconnect', () => {
        const username = users[userId];
        if (username) {
            console.log(`User ${userId} (${username}) disconnected`);
            delete users[userId]; // Remove user from the users object
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});