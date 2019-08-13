const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const utils = require('../lib/utils');

const userSchema = new Schema({
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role_id: {
    type: Schema.Types.ObjectId,
    ref: 'role'
  },
  password_digest: String,
  last_login: Date
});

userSchema.methods.validPassword = function (password) {
  const hash = utils.hashPassword(password);
  return this.hash === hash;
};

mongoose.model('user', userSchema);
