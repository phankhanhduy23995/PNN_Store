const mongoose = require('mongoose');
const Promise = require('bluebird');
const log4js = require('log4js');
const logger = log4js.getLogger('user_services');
const User = mongoose.model('user');
const Role = mongoose.model('role');
const utils = require('../lib/utils');
const auth_utils = require('../lib/auth_utils');
const errors = require('../lib/errors');
const enums = require('../lib/enums');

module.exports.register = function (name, email, password, role_id) {
  const user = new User();
  user.name = name;
  user.email = email;

  return new Promise(async (resolve, reject) => {
    const session = await User.startSession();
    session.startTransaction();

    utils.hashPassword(password)
      .then((hash) => {
        if (!hash) {
          throw {
            message: errors.PASSWORD_01,
            code: 'PASSWORD_01'
          }
        }

        let roleQuery;

        if (role_id) {
          roleQuery = Role.findOne({ _id: role_id });
        } else {
          roleQuery = Role.findOne({ code: enums.ROLE.EMPLOYEE });
        }
        return Promise.all([hash, roleQuery]);
      })
      .then(([hash, role]) => {
        if (!role) {
          throw {
            message: errors.ROLE_01,
            code: 'ROLE_01'
          };
        }
        console.log(role);
        user.role_id = role._id;
        user.password_digest = hash;
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
          email: user.email,
          role_id: user.role_id
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
            message: errors.PASSWORD_02,
            code: 'PASSWORD_02'
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
