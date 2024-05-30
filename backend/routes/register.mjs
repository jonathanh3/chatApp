import { Router } from 'express';
import { User } from '../schemas/user.mjs';
import { hashPassword } from '../utils/helpers.mjs';
import { query, validationResult, checkSchema, matchedData, check } from 'express-validator';
import { createUserValidationSchema } from '../utils/validationSchemas.mjs';

const router = Router();

router.post('/api/register',
  checkSchema(createUserValidationSchema),
  async(req, res) => {
    const result = validationResult(req);
    const data = matchedData(req);
    console.log(req.body);

    if (!result.isEmpty()) return res.status(400).send({ msg: result.array().map(error => error.msg) });

    const checkUserExist = await User.findOne({ username: data.username });

    if (checkUserExist) return res.status(409).json({ success: false, msg: `Username ${data.username} already taken` });
    
    data.password = hashPassword(data.password);
    const newUser = new User(data);
    try{
      const savedUser = await newUser.save();  
      return res.status(201).json({ success: true, msg: `User ${data.username} successfully created`});
    } catch(err) {
        console.log(err);
        return res.sendStatus(400);
    }
})

export default router;
