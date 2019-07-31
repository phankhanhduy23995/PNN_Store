const mongoose = require('mongoose');
const Promise = require('bluebird');
const log4js = require('log4js');
const logger = log4js.getLogger('user_services');
const User = mongoose.model('user');
const utils = require('../lib/utils');
const auth_utils = require('../lib/auth_utils');
const errors = require('../lib/errors');

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
        if (user == null) {
          throw {
            message: errors.CREATE,
            code: 'CREATE'
          };
        }

        let resultData = {
          _id: user._id,
          name: user.name,
          email: user.email
        };

        session.commitTransaction();
        session.endSession();
        return resolve(resultData);
      })
      .catch(error => {
        session.abortTransaction();
        session.endSession();
        logger.error(error);
        return reject(error);
      });
  })
};

module.exports.login = function (email, password) {
  return new Promise(async (resolve, reject) => {
    const session = await User.startSession();
    session.startTransaction();

    User.findOne({ email })
      .then(user => {
        if (!user) {
          throw {
            message: errors.USER_02,
            code: 'USER_02'
          }
        }

        return Promise.all([user, utils.comparePassword(password, user.password_digest)]);
      })
      .then(([user, result]) => {
        if (!result) {
          throw {
            message: 'Password invalid!',
            code: ''
          }
        }

        let resultData = {
          _id: user._id,
          name: user.name,
          email: user.email,
          password: user.password
        };

        user.last_login = new Date();
        return Promise.all([resultData, auth_utils.generateToken(resultData), user.save(session)]);
      })
      .then(([resultData, token]) => {
        session.commitTransaction();
        session.endSession();
        resultData.token = token;
        return resolve(resultData);
      })
      .catch(error => {
        session.abortTransaction();
        session.endSession();
        logger.error(error);
        return reject(error);
      })
  });
};
