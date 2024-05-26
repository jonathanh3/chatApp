const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  // id: Schema.Types.ObjectId,
  username: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: Schema.Types.String,
    required: true
  },
  displayName: {
    type: Schema.Types.String,
    required: false
  }
});

const User = model('User', UserSchema);

module.exports = User;
