'use strict';

const express = require('express');
const router = express.Router();
const utils = require('../lib/utils');
const categoryServices = require('../services/category_services');

/**
 * @api {get} /categories Get Categories
 * @apiVersion 1.0.0
 * @apiGroup Categories
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
 *      "product_ids": 
 *      [{
 *        "_id": "5d3a8091eb2c1f71b8f5c3fv"
 *        "name": "Monday",
 *        "code": "SP001",
 *        "_id": ""
 *      }]
 *    }]
 *  }
 * @apiUse FailedResponse
 */
router.get('/', function(req, res) {
  categoryServices.getCategories()
    .then(data => {
      res.json(utils.successResponse(data));
    })
    .catch(error => {
      res.json(utils.failedResponse(error));
    });
});

/**
 * @api {get} /categories/:_id Get Category
 * @apiVersion 1.0.0
 * @apiGroup Categories
 *
 * @apiUse AccessHeader
 *
 * @apiParam {String} _id Category Id
 *
 * @apiSuccessExample {json} Success Response
 * HTTP/1.1 200 OK
 *  {
 *    "success": true,
 *    "data": {
 *      "_id": "5d3a8091eb2c1f71b8f5c3fc",
 *      "name": "T-shirt",
 *      "product_ids": [{
 *        "_id": "5d3a8091eb2c1f71b8f5c3fv"
 *        "name": "Monday",
 *        "code": "SP001",
 *        "_id": ""
 *      }]
 *    }
 *  }
 * @apiUse FailedResponse
 */
router.get('/:_id', function (req, res) {
  let _id = req.params._id;
  categoryServices.getCategory(_id)
    .then(data => {
      res.json(utils.successResponse(data));
    })
    .catch(error => {
      res.json(utils.failedResponse(error));
    });
});

/**
 * @api {post} /categories Create Category
 * @apiVersion 1.0.0
 * @apiGroup Categories
 *
 * @apiUse AccessHeader
 *
 * @apiParam (body) {String} name Category Name
 *
 * @apiSuccessExample {json} Success Response
 * HTTP/1.1 200 OK
 *  {
 *    "success": true
 *  }
 * @apiUse FailedResponse
 */
router.post('/', function (req, res) {
  let body = req.body;
  categoryServices.createCategory(body)
    .then(data => {
      res.json(utils.successResponse(data));
    })
    .catch(error => {
      res.json(utils.failedResponse(error));
    });
});

/**
 * @api {put} /categories/:_id Update Category
 * @apiVersion 1.0.0
 * @apiGroup Categories
 *
 * @apiUse AccessHeader
 *
 * @apiParam {String} _id Category Id
 * @apiParam (body) {String} name Category Name
 *
 * @apiSuccessExample {json} Success Response
 * HTTP/1.1 200 OK
 *  {
 *    "success": true
 *  }
 * @apiUse FailedResponse
 */
router.put('/:_id', function (req, res) {
  let _id = req.params._id;
  let body = req.body;
  categoryServices.updateCategory(_id, body)
    .then(data => {
      res.json(utils.successResponse(data));
    })
    .catch(error => {
      res.json(utils.failedResponse(error));
    });
});

/**
 * @api {delete} /categories/:_id Delete Category
 * @apiVersion 1.0.0
 * @apiGroup Categories
 *
 * @apiUse AccessHeader
 *
 * @apiParam {String} _id Category Id
 *
 * @apiSuccessExample {json} Success Response
 * HTTP/1.1 200 OK
 *  {
 *    "success": true
 *  }
 * @apiUse FailedResponse
 */
router.delete('/:_id', function (req, res) {
  let _id = req.params._id;
  categoryServices.deleteCategory(_id)
    .then(data => {
      res.json(utils.successResponse(data));
    })
    .catch(error => {
      res.json(utils.failedResponse(error));
    });
});

module.exports = router;
