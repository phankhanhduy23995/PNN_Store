const passport = require('passport');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const log4js = require('log4js');
const logger = log4js.getLogger('user_services');
const User = mongoose.model('user');
const utils = require('../lib/utils');
const auth_utils = require('../lib/auth_utils');

module.exports.register = function (name, email, password) {
  const user = new User();
  user.name = name;
  user.email = email;
  // user.password_digest = utils.hashPassword(password);
  return new Promise((resolve, reject) => {
    utils.hashPassword(password)
      .then((result) => {
        if (!result) {
          throw {
            message: 'Cannot hash password!',
            code: ''
          }
        }
        user.password_digest = result;
        return user.save();
      })
      .then((user) => {
        const token = auth_utils.generateToken({ _id: user._id, name: user.name, email: user.email });
        return token;
      })
      .then(token => {
        if (!token) {
          throw {
            message: 'Cannot create token!',
            code: ''
          }
        }
        user.token = token;
        return Promise.all([token, user.save()]);
      })
      .then(([token]) => {
        return resolve(token);
      })
      .catch(error => {
        console.log(error);
        logger.error(error);
        return reject(error);
      });
  })
};
