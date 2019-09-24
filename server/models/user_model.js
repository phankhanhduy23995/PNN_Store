const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const utils = require('../lib/utils');

const userSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
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
  roleId: {
    type: Schema.Types.ObjectId,
    ref: 'role'
  },
  passwordDigest: String,
  lastLogin: Date
});

userSchema.methods.validPassword = function (password) {
  const hash = utils.hashPassword(password);
  return this.hash === hash;
};

mongoose.model('user', userSchema);
