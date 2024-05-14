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

// Define routes for login and chat
const loginRouter = require('./login');
const chatRouter = require('./chat');

router.use('/login', loginRouter);
router.use('/chat', chatRouter);

module.exports = router;
