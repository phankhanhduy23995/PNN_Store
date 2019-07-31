const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const utils = require('../lib/utils');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  token: String,
  password_digest: String,
  last_login: Date
});

userSchema.methods.validPassword = function (password) {
  const hash = utils.hashPassword(password);
  return this.hash === hash;
};

mongoose.model('user', userSchema);
