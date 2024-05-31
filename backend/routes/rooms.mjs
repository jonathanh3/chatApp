import { Router } from 'express';
import { validationResult, checkSchema, matchedData } from 'express-validator';
import { createRoomValidationSchema } from '../utils/validationSchemas.mjs';
import { Room } from '../schemas/room.mjs'

const router = Router();

const checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ success: false, message: 'Unauthorized' });
};

router.get('/api/rooms',
  checkAuthentication,
  async (req, res) => {
    try {
      const rooms = await Room.find();
      res.json(rooms.map(room => room.name));
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server Error' });
    }
});

router.post('/api/rooms',
  checkAuthentication,
  checkSchema(createRoomValidationSchema),
  async (req, res) => {
    const result = validationResult(req);
    const data = matchedData(req);

    if (!result.isEmpty()) {
      return res.status(400).send({ msg: result.array().map(error => error.msg) });
    }

    const { name } = data;

    try {
      const existingRoom = await Room.findOne({ name });
      if (existingRoom) {
        return res.status(400).json({ success: false, message: 'Chat room already exists' });
      }
      
      const newRoom = new Room({
        name,
        creator: req.user._id, // Assuming the user ID is stored in _id
      });

      await newRoom.save();
      res.status(201).json({ success: true, message: 'Chat room created', room: newRoom });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
});

export default router;
