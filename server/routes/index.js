// routes/index.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.session && req.session.user) {
    res.redirect('/chat');
  } else {
    res.redirect('/login');
  }
});

// Define routes
const loginRouter = require('./login');
const logoutRouter = require('./logout');
const whoamiRouter = require('./whoami');
const chatRouter = require('./chat');

router.use('/login', loginRouter);
router.use('/logout', logoutRouter);
router.use('/whoami', whoamiRouter);
router.use('/chat', chatRouter);

module.exports = router;
