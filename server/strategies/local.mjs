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
  } catch (err) {
    done(err, null);
  }
});

passport.use(new Strategy(async (username, password, done) => {
  try {
    const findUser = await User.findOne({ username });
    if (!findUser || !comparePassword(password, findUser.password)) {
      return done(null, false); // User not found or password does not match
    }
    // Authentication successful
    return done(null, findUser);
  } catch (err) {
    return done(err, null); // Error occurred
  }
}));

export default passport;
