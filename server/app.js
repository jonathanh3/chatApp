const express = require('express');
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');

const sessionMiddleware = require('./middlewares/session');
const { initializeSocket } = require('./utils/socket-io');
const routes = require('./routes');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

// connect to db
mongoose.connect('mongodb://localhost:27017/chat-app')
  .then(() => console.log('Connected to Database'))
  .catch((err) => console.log(err));

// Initialize middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(sessionMiddleware);
app.use(express.static(path.join(__dirname, '../frontend')));
initializeSocket(server, sessionMiddleware);

// Configure routes
app.use('/', routes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
