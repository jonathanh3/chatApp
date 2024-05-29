import session from 'express-session';

const sessionMiddleware = session({
  secret: 'your_session_secret_here', // Use a strong session secret
  credentials: true,
  saveUninitialized: false, // Do not save uninitialized sessions
  resave: false,
  cookie: {
    // secure: true, // Send session cookies only over HTTPS. maybe: process.env.ENVIRONMENT === "production" ? "true" : "auto" 
    httpOnly: true,
    maxAge: 60000 * 60 // milliseconds, 1 hour
  }
});

const wrap = expressMiddleware => (socket, next) =>
  expressMiddleware(socket.request, {}, next);

const corsConfig = {
  origin: 'http://192.168.37.100:8000', // Replace with your frontend domain
  credentials: true
};

export { sessionMiddleware, wrap, corsConfig }; 
