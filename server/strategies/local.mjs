import passport from 'passport';
import { Strategy } from 'passport-local';
import { User } from '../schemas/user.mjs';
import { comparePassword } from '../utils/helpers.mjs';

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await User.findById(id);
    if (!findUser) throw new Error('User not found');
    done(null, findUser);
  } catch {
    done(err, null);
  }
})

export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const findUser = await User.findOne({ username });
      if (!findUser) {
        // User not found
        return done(null, false);
      }
      if (!comparePassword(password, findUser.password)) {
        // Password does not match
        return done(null, false);
      }
      // Authentication successful
      return done(null, findUser);
    } catch (err) {
      // Error occurred
      return done(err, null);
    }
  })
);
