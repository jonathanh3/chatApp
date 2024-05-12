// routes/login.js
const express = require('express');
const router = express.Router();
const { users } = require('../data/users');

router.get('/', (req, res) => {
    if (req.session && req.session.user) {
      return res.redirect('/chat');
    }
    
    res.send(`
      <h1>Login Page</h1>
      <form method="post">
        <input type="text" name="username" placeholder="Username" required/><br/>
        <input type="password" name="password" placeholder="Password" required/><br/>
        <button type="submit">Login</button>
      </form>
    `);
});
  
router.post('/', (req, res) => {
    console.log(req.body)
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      // Store user data in session upon successful login
      req.session.user = user;
      res.redirect('/chat');
    } else {
      res.send('Invalid username or password');
    }
});

module.exports = router;
