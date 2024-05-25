const express = require('express');
const http = require('http');
const path = require('path');

const sessionMiddleware = require('./config/session');
const initializeMiddleware = require('./middleware');
const routes = require('./routes');
const { initializeSocket } = require('./utils/socket-io');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

// Initialize middleware
initializeMiddleware(app);
app.use(sessionMiddleware);

// Configure routes
app.use('/', routes);

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend')));

// Initialize WebSocket
initializeSocket(server, sessionMiddleware);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
