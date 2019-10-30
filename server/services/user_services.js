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

module.exports.register = function (name, email, password, roleId) {
  const user = new User();
  user.name = name;
  user.email = email;

  return new Promise(async (resolve, reject) => {

    utils.hashPassword(password)
      .then((hash) => {
        if (!hash) {
          throw {
            message: errors.PASSWORD_01,
            code: 'PASSWORD_01'
          }
        }

        let roleQuery;
        if (roleId) {
          roleQuery = Role.findOne({ _id: roleId }, { _id: 1, code: 1 });
        } else {
          roleQuery = Role.findOne({ code: enums.ROLE.USER }, { _id: 1, code: 1 });
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
        user.roleId = role._id;
        user.passwordDigest = hash;
        return Promise.all([user.save(), role]);
      })
      .then(([user, role]) => {
        if (user == null) {
          throw {
            message: errors.COMMON.CREATE,
            code: 'CREATE'
          };
        }

        let result = {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: role
        };

        return Promise.all([result, Role.findOneAndUpdate(
          { _id: role._id },
          {
            $push: {
              userIds: user._id
            }
          },
          { new: true }
        )]);
      })
      .then(([result]) => {
        return resolve(result);
      })
      .catch(error => {
        logger.error(error);
        return reject(error);
      });
  })
};

module.exports.login = function (email, password) {
  return new Promise(async (resolve, reject) => {

    User.findOne({ email })
      .then(user => {
        if (!user) {
          throw {
            message: errors.USER_02,
            code: 'USER_02'
          }
        }

        return Promise.all([user, utils.comparePassword(password, user.passwordDigest)]);
      })
      .then(([user, result]) => {
        if (!result) {
          throw {
            message: errors.PASSWORD_02,
            code: 'PASSWORD_02'
          }
        }

        let roleUser = Role.findOne({ _id: user.roleId }, { _id: 1, code: 1 });

        let resultData = {
          _id: user._id,
          name: user.name,
          email: user.email
        };

        user.last_login = new Date();
        return Promise.all([roleUser, resultData, user.save()]);
      })
      .then(([roleUser, resultData]) => {
        resultData.role = roleUser;
        let token = auth_utils.generateToken(resultData);
        resultData.token = token;
        return resultData;
      })
      .then((resultData) => {
        return resolve(resultData);
      })
      .catch(error => {
        logger.error(error);
        return reject(error);
      })
  });
};

module.exports.getUsers = function () {
  return new Promise((resolve, reject) => {
    User.find({}, { _id: 1, name: 1, email: 1, roleId: 1, lastLogin: 1 })
      .then(result => {
        return resolve(result);
      })
      .catch(error => {
        logger.error(error);
        return reject(error);
      })
  });
}
