const mongoose = require('mongoose');
const Promise = require('bluebird');
const log4js = require('log4js');
const logger = log4js.getLogger('user_services');
const Category = mongoose.model('category');
const errors = require('../lib/errors');

module.exports.getCategories = function () {
  return new Promise((resolve, reject) => {
    Category.aggregate([
      { $match: {} }, { $skip: 100 },
      {
        $lookup:
        {
          from: 'product', // <collection to join>,
          localField: 'product_ids', // <field from the input documents>,
          foreignField: '_id', // <field from the documents of the "from" collection>,
          as: 'products' // </field><output array field>
        }
      }
    ])
      // Category.find({}, { _id: 1, name: 1 })
      .then(result => {
        return resolve(result);
      })
      .catch(error => {
        logger.error(error);
        return reject(error);
      });
  });
};

module.exports.getCategory = function (_id) {
  return new Promise((resolve, reject) => {
    Category.findOne({ _id })
      .then(result => {
        if (result == null) {
          throw {
            message: errors.CATEGORY_01,
            code: 'CATEGORY_01'
          }
        }
        return resolve(result);
      })
      .catch(error => {
        logger.error(error);
        return reject(error);
      });
  });
};

module.exports.createCategory = function (body) {
  const newCategory = new Category(body);
  return new Promise((resolve, reject) => {
    newCategory.save()
      .then(result => {
        if (result == null) {
          throw {
            message: errors.CREATE,
            code: 'CREATE'
          };
        }
        return resolve(null);
      })
      .catch(error => {
        logger.error(error);
        return reject(error);
      });
  });
};

module.exports.updateCategory = function (_id, body) {
  return new Promise((resolve, reject) => {
    Category.updateOne({ _id }, body)
      .then(result => {
        if (result == null) {
          throw {
            message: errors.UPDATE,
            code: 'UPDATE'
          };
        }
        return resolve(null);
      })
      .catch(error => {
        logger.error(error);
        return reject(error);
      });
  });
};

module.exports.deleteCategory = function (_id) {
  return new Promise((resolve, reject) => {
    Category.findOneAndDelete({ _id })
      .then(result => {
        if (result == null) {
          throw {
            message: errors.DELETE,
            code: 'DELETE'
          };
        }
        return resolve(null);
      })
      .catch(error => {
        logger.error(error);
        return reject(error);
      });
  });
};
