import { Router } from "express";
// const requireLogin = require('../middlewares/requireLogin');

// router.get('/', (req, res) => {
//   if (req.session && req.session.user) {
//     res.redirect('/chat');
//   } else {
//     res.redirect('/login');
//   }
// });

const router = Router();

// Define routes
// const loginRouter = require('./login');
import registerRoute from './register.mjs';
// const logoutRouter = require('./logout');
// const whoamiRouter = require('./whoami');
// const chatRouter = require('./chat');
import authRoute from './auth.mjs';

// The login route doesn't require authentication
// router.use('/login', loginRouter);
router.use(registerRoute);
router.use(authRoute);
// Apply requireLogin middleware to routes that require authentication
// router.use('/logout', requireLogin, logoutRouter);
// router.use('/whoami', requireLogin, whoamiRouter);
// router.use('/chat', requireLogin, chatRouter);

export default router;
