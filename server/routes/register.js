const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../schemas/user.js');

router.get('/register', (req, res) => {
	if (req.session && req.session.user) {
		return res.redirect('/chat');
	}

	const loginPath = path.join(__dirname, '../..', 'frontend', 'register.html');
	res.sendFile(loginPath);
});

router.post('/register', async (req, res) => {
  const { 
    body: {
      username,
      password,
      confirmPassword
    },
  } = req;

  if (password ==! confirmPassword) return res.status(400).send('Passwords does not match');
  
  const newUser = new User(req.body);
  try{
    const savedUser = await newUser.save();  
    return res.status(201).redirect('/login');
  } catch(err) {
      console.log(err);
      return res.sendStatus(400);
  }
})

module.exports = router;
