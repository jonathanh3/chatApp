import { Server as socketIo } from 'socket.io';
import { wrap, corsConfig } from '../middlewares/session.mjs';
import { getUsername } from '../utils/helpers.mjs';

let io;
let connectedUsers = {};
let messages = [];

function emitActiveUsersList() {
    const uniqueUsernames = [...new Set(Object.values(connectedUsers))];
    io.emit('updateActiveUsers', uniqueUsernames);
}

function emitPreviousMessages(socket) {
    socket.emit('previousMessages', messages);
}

function emitChatMessage(socket) {
    socket.on('chatMessage', (message) => {
        const timestamp = new Date().toISOString(); // Use ISO string for timestamp
        const username = connectedUsers[socket.id];
        const msgObj = { timestamp, username, message };
        console.log(`Chat message - User ${username}: ${message}`);
        messages.push(msgObj);
        io.emit('chatMessage', msgObj); // Broadcast message to all clients
    });
}

function handleDisconnect(socket) {
    socket.on('disconnect', () => {
        const username = connectedUsers[socket.id];
        delete connectedUsers[socket.id];
        emitActiveUsersList();
        console.log(`${username} (${socket.id}) disconnected`);
    });
}

export default function initializeChatSocket(server, sessionMiddleware) {
  io = new socketIo(server, {
    cors: {
      origin: corsConfig.origin, // Corrected the origin
      credentials: corsConfig.credentials,
      methods: ['GET', 'POST']
    }
  });

  io.use(wrap(sessionMiddleware));

  io.on('connection', async (socket) => {
    const sessionId = socket.request.session?.passport?.user; 
    if (sessionId) {
      const sessionUsername = await getUsername(sessionId);
      const userSocketId = socket.id;
      connectedUsers[userSocketId] = sessionUsername;

      console.log(`${sessionUsername} (${userSocketId}) connected`);

      emitActiveUsersList();
      emitPreviousMessages(socket);
      emitChatMessage(socket);
      handleDisconnect(socket);
    }
  });
}
