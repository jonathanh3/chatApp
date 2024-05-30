import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import session from 'express-session';

// Connect to DB
mongoose.connect(process.env.MONGODB_ENDPOINT || 'mongodb://localhost:27017/chat-app')
  .then(() => console.log('Connected to Database'))
  .catch((err) => console.log(err));

const sessionMiddleware = session({
  secret: 'your_session_secret_here',
  credentials: true,
  saveUninitialized: false,
  resave: false,
  cookie: {
    // secure: true, // Send session cookies only over HTTPS. maybe: process.env.ENVIRONMENT === "production" ? "true" : "auto" 
    httpOnly: true,
    maxAge: 60000 * 60 // milliseconds, 1 hour
  },
  store: MongoStore.create({
    client: mongoose.connection.getClient(),
  })
});

const wrap = expressMiddleware => (socket, next) =>
  expressMiddleware(socket.request, {}, next);

const corsConfig = {
  origin: process.env.CORS_FRONTEND || 'http://localhost:3000', // Replace with your frontend domain
  credentials: true
};

export { sessionMiddleware, wrap, corsConfig }; 
