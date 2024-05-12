// routes/chat.js
const express = require('express');
const router = express.Router();
const { requireLogin } = require('../middleware');

router.get('/', requireLogin, (req, res) => {
    res.send('<h1>Chat App</h1>');
});

module.exports = router;
