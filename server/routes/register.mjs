import { Router } from 'express';
import { User } from '../schemas/user.mjs';
import { hashPassword } from '../utils/helpers.mjs';

const router = Router();

router.post('/register', async(req, res) => {
  const { 
    body: {
      username,
      password,
      confirmPassword
    },
  } = req;

  const checkUserExist = await User.findOne({ username });

  if (checkUserExist) return res.status(409).json({ success: false, msg: `Username ${username} already taken` });
  if (password !== confirmPassword) return res.status(400).json({ success: false, error: 'Passwords does not match' });
  
  const newUser = new User({
    username: username,
    password: hashPassword(password)
  });
  try{
    const savedUser = await newUser.save();  
    return res.status(201).json({ success: true, msg: `User ${username} successfully created`});
  } catch(err) {
      console.log(err);
      return res.sendStatus(400);
  }
})

export default router;
