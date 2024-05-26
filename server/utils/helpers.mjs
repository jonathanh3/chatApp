import bcrypt from 'bcrypt';
import { User } from '../schemas/user.mjs';

const saltRounds = 10;

export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
}

export const comparePassword = (plainTextPassword, hashPassword) => {
  return bcrypt.compareSync(plainTextPassword, hashPassword);
}

export const getAllUsernames = async() => {
  const users = await User.find({}, { username: 1, _id: 0 });  
  console.log(users);
  const usernames = users.map(user => user.username);
  console.log(usernames);
  return usernames
}
