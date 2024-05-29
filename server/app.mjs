import express from 'express';
import passport from 'passport';
import mongoose from 'mongoose';
import cors from 'cors';
import { createServer } from 'http';

import { sessionMiddleware, corsConfig } from './middlewares/session.mjs';
import initializeChatSocket from './middlewares/chat.mjs';
import routes from './routes/index.mjs';

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3000;

// Connect to DB
mongoose.connect('mongodb://localhost:27017/chat-app')
  .then(() => console.log('Connected to Database'))
  .catch((err) => console.log(err));


// Initialize middlewares
app.use(cors(corsConfig));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(sessionMiddleware);
initializeChatSocket(server, sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// Configure routes
app.use(routes);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
