import express from 'express';
import session from 'express-session';
import passport from 'passport';
import mongoose from 'mongoose';
import cors from 'cors';

import routes from './routes/index.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

// connect to db
mongoose.connect('mongodb://localhost:27017/chat-app')
  .then(() => console.log('Connected to Database'))
  .catch((err) => console.log(err));

// Initialize middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'your_session_secret_here', // Use a strong session secret
  saveUninitialized: false, // Do not save uninitialized sessions
  resave: false,
  cookie: {
    // secure: true, // Send session cookies only over HTTPS
    // httpOnly: true, // Prevent client-side JavaScript from accessing cookies
    maxAge: 60000 * 60// miliseconds, 1hour
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin: 'http://192.168.37.100:8000', // Replace with your frontend domain
  credentials: true
}));
// initializeSocket(server, sessionMiddleware);

// Configure routes
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
