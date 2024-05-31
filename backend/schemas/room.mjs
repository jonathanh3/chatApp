// RoomSchema.js
import { Schema, model } from 'mongoose';

const RoomSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const Room = model('Room', RoomSchema);
