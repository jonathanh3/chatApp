// routes/login.js
const express = require('express');
const router = express.Router();
const path = require('path');
const { users, addActiveUser, getActivesUsernames } = require('../data/users');

function loggUserLogin(req, user) {
	const userIP = req.ip;
	const ipv4Regex = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/;
	const matches = userIP.match(ipv4Regex);
	const ipv4Address = matches ? matches[1] : userIP; 
	console.log(`User ${user.username} logged in from IP ${ipv4Address}`);
}

router.get('/', (req, res) => {
	if (req.session && req.session.user) {
		return res.redirect('/chat');
	}

	const loginPath = path.join(__dirname, '../..', 'client', 'login.html');
	res.sendFile(loginPath);
});
  
router.post('/', (req, res) => {
    const { username, password } = req.body;
    // Perform authentication logic
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        // Successful authentication
        req.session.user = user;
        res.redirect('/chat'); // Redirect to chat page after successful login
    } else {
        // Failed authentication
        res.status(401).send('Invalid username or password');
    }
});

module.exports = router;
