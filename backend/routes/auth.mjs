import { Router } from "express";
import passport from '../strategies/local.mjs';

const router = Router();

router.post('/auth/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      // Internal server error
      return res.status(500).json({ success: false, msg: 'Internal server error' });
    }
    if (!user) {
      // Authentication failed (user not found or bad credentials)
      return res.status(401).json({ success: false, msg: 'Invalid username or password' });
    }
    // Authentication successful
    req.login(user, (err) => {
      if (err) {
        // Login error
        return res.status(500).json({ success: false, msg: 'Login error' });
      }
      // Send success response
      return res.status(200).json({ success: true, msg: 'Successfully logged in' });
    });
  })(req, res, next);
});

router.get('/auth/status', (req, res) => {
  req.sessionStore.get(req.session.id, (err, sessionData) => {
    if (err) {
      console.log(err);
      throw err;
    }
  })
  return req.user ? 
    res.json({ success: true, user: { username: req.user.username } }) : 
    res.status(401).send({ msg: 'Not authenticated'});
})

router.post('/auth/logout', (req, res) => {
  if (!req.user) return res.sendStatus(401);

  req.logout((err) => {
    if (err) return res.sendStatus(400);
    res.send({ msg: 'Successful logout' });
  });
})

export default router;
