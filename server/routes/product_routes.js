'use strict';

const express = require('express');
const router = express.Router();
const utils = require('../lib/utils');
const authUtils = require('../lib/auth_utils');
const productServices = require('../services/product_services');

/**
 * @api {get} /products Get Products
 * @apiVersion 1.0.0
 * @apiGroup Products
 * @apiPermission Admin
 *
 * @apiUse AccessHeader
 *
 * @apiSuccessExample {json} Success Response
 * HTTP/1.1 200 OK
 *  {
 *    "success": true,
 *    "data": [{
 *      "_id": "5d3a8091eb2c1f71b8f5c3fc",
 *      "name": "T-shirt",
 *      
 * 
 *    }]
 *  }
 * @apiUse FailedResponse
 */
router.get('/', authUtils.authorizeAdmin, function (req, res) {
  productServices.getProducts()
    .then(data => {
      res.json(utils.successResponse(data));
    })
    .catch(error => {
      res.json(utils.failedResponse(error));
    });
});

/**
 * @api {get} /products/:_id Get Product
 * @apiVersion 1.0.0
 * @apiGroup Products
 * @apiPermission Admin
 *
 * @apiUse AccessHeader
 *
 * @apiParam {String} _id Product Id
 *
 * @apiSuccessExample {json} Success Response
 * HTTP/1.1 200 OK
 *  {
 *    "success": true,
 *    "data": {
 *      "_id": "5d3a8091eb2c1f71b8f5c3fc",
 *      "name": "T-shirt",
 *      
 * 
 *    }
 *  }
 * @apiUse FailedResponse
 */
router.get('/:_id', authUtils.authorizeAdmin, function (req, res) {
  let _id = req.params._id;
  productServices.getProduct(_id)
    .then(data => {
      res.json(utils.successResponse(data));
    })
    .catch(error => {
      res.json(utils.failedResponse(error));
    });
});

/**
 * @api {post} /products Create Product
 * @apiVersion 1.0.0
 * @apiGroup Products
 * @apiPermission Admin
 *
 * @apiUse AccessHeader
 *
 * @apiParam (body) {String} name Product Name
 *
 * @apiSuccessExample {json} Success Response
 * HTTP/1.1 200 OK
 *  {
 *    "success": true
 *  }
 * @apiUse FailedResponse
 */
router.post('/', authUtils.authorizeAdmin, function (req, res) {
  let body = req.body;
  productServices.createProduct(body)
    .then(data => {
      res.json(utils.successResponse(data));
    })
    .catch(error => {
      res.json(utils.failedResponse(error));
    });
});

/**
 * @api {put} /products/:_id Update Product
 * @apiVersion 1.0.0
 * @apiGroup Products
 * @apiPermission Admin
 *
 * @apiUse AccessHeader
 *
 * @apiParam {String} _id Product Id
 * @apiParam (body) {String} name Product Name
 *
 * @apiSuccessExample {json} Success Response
 * HTTP/1.1 200 OK
 *  {
 *    "success": true
 *  }
 * @apiUse FailedResponse
 */
router.put('/:_id', authUtils.authorizeAdmin, function (req, res) {
  let _id = req.params._id;
  let body = req.body;
  productServices.updateProduct(_id, body)
    .then(data => {
      res.json(utils.successResponse(data));
    })
    .catch(error => {
      res.json(utils.failedResponse(error));
    });
});

/**
 * @api {delete} /products/:_id Delete Product
 * @apiVersion 1.0.0
 * @apiGroup Products
 * @apiPermission Admin
 *
 * @apiUse AccessHeader
 *
 * @apiParam {String} _id Product Id
 *
 * @apiSuccessExample {json} Success Response
 * HTTP/1.1 200 OK
 *  {
 *    "success": true
 *  }
 * @apiUse FailedResponse
 */
router.delete('/:_id', authUtils.authorizeAdmin, function (req, res) {
  console.log('token');
  let _id = req.params._id;
  productServices.deleteProduct(_id)
    .then(data => {
      res.json(utils.successResponse(data));
    })
    .catch(error => {
      res.json(utils.failedResponse(error));
    });
});

module.exports = router;
