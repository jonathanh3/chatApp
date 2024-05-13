// routes/chat.js
const express = require('express');
const router = express.Router();
const path = require('path');
const { requireLogin } = require('../middleware');

router.get('/', requireLogin, (req, res) => {

    // Construct the path to index.html
    const indexPath = path.join(__dirname, '../..', 'client', 'index.html');
    
    // Send the index.html file as the response
    res.sendFile(indexPath);
});

module.exports = router;
