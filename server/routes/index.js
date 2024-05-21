const express = require('express');
const router = express.Router();
const requireLogin = require('../middleware/requireLogin');

router.get('/', (req, res) => {
  if (req.session && req.session.user) {
    res.redirect('/chat');
  } else {
    res.redirect('/login');
  }
});

// Define routes
const loginRouter = require('./login');
const registerRouter = require('./register');
const logoutRouter = require('./logout');
const whoamiRouter = require('./whoami');
const chatRouter = require('./chat');

// The login route doesn't require authentication
router.use('/login', loginRouter);
router.use('/register', registerRouter);
// Apply requireLogin middleware to routes that require authentication
router.use('/logout', requireLogin, logoutRouter);
router.use('/whoami', requireLogin, whoamiRouter);
router.use('/chat', requireLogin, chatRouter);

module.exports = router;
