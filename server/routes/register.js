const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
	if (req.session && req.session.user) {
		return res.redirect('/chat');
	}

	const loginPath = path.join(__dirname, '../..', 'frontend', 'register.html');
	res.sendFile(loginPath);
});

module.exports = router;
