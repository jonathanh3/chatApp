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
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        // loggUserLogin(req, user);
        req.session.user = user;    
        // Send the user object as JSON in the response
        res.status(200).json(user);
    } else {
        res.status(401).send('Invalid username or password');
    }
});

module.exports = router;
