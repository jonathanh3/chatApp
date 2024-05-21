// routes/chat.js
const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    // Construct the path to index.html
    const chatPath = path.join(__dirname, '../..', 'client', 'chat.html');
    
    // Send the index.html file as the response
    res.sendFile(chatPath);
});

module.exports = router;
