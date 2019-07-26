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

  return new Promise(async (resolve, reject) => {
    const session = await User.startSession();
    session.startTransaction();

    utils.hashPassword(password)
      .then((result) => {
        if (!result) {
          throw {
            message: 'Cannot hash password!',
            code: ''
          }
        }
        user.password_digest = result;
        return user.save(session);
      })
      .then((user) => {
        const token = auth_utils.generateToken({ user });
        user.token = token;
        return user.save(session);
      })
      .then(user => {
        session.commitTransaction();
        session.endSession();
        return resolve(user);
      })
      .catch(error => {
        session.abortTransaction();
        session.endSession();
        logger.error(error);
        return reject(error);
      });
  })
};
