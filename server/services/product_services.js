const mongoose = require('mongoose');
const Promise = require('bluebird');
const log4js = require('log4js');
const logger = log4js.getLogger('user_services');
const Product = mongoose.model('product');
const Category = mongoose.model('category');
const errors = require('../lib/errors');

module.exports.getProducts = function () {
  return new Promise((resolve, reject) => {
    Product.find({}, { createdAt: 0, updatedAt: 0 })
      .then(result => {
        return resolve(result);
      })
      .catch(error => {
        logger.error(error);
        return reject(error);
      });
  });
};

module.exports.getProduct = function (_id) {
  return new Promise((resolve, reject) => {
    Product.findOne({ _id }, { createdAt: 0, updatedAt: 0 })
      .then(product => {
        if (product == null) {
          throw {
            message: errors.PRODUCT_01,
            code: 'PRODUCT_01'
          }
        }

        return Promise.all([product, Category.findOne({ _id: product.categoryId }, { _id: 1, name: 1 })]);
      })
      .then(([product, category]) => {
        product.category = category;
        return resolve(product);
      })
      .catch(error => {
        logger.error(error);
        return reject(error);
      });
  });
};

module.exports.createProduct = function (body) {
  const newProduct = new Product(body);
  return new Promise(async (resolve, reject) => {
    Product.collection.insertOne(newProduct)
      .then(result => {
        if (result == null) {
          throw {
            message: errors.COMMON.CREATE,
            code: 'CREATE'
          };
        }

        let product = result.ops[0];
        return Promise.all([product, Category.findOneAndUpdate(
          { _id: body.categoryId },
          {
            $push: {
              productIds: product._id
            }
          },
          { new: true }
        )]);
      })
      .then(([product]) => {
        return resolve(product);
      })
      .catch(error => {
        logger.error(error);
        return reject(error);
      });
  });
};

module.exports.updateProduct = function (_id, body) {
  return new Promise((resolve, reject) => {
    Product.updateOne({ _id }, body)
      .then(result => {
        if (result == null) {
          throw {
            message: errors.COMMON.UPDATE,
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

module.exports.deleteProduct = function (_id) {
  return new Promise((resolve, reject) => {
    Product.findOneAndDelete({ _id })
      .then(result => {
        if (result == null) {
          throw {
            message: errors.COMMON.DELETE,
            code: 'DELETE'
          };
        }
        return resolve(result);
      })
      .catch(error => {
        logger.error(error);
        return reject(error);
      });
  });
};
