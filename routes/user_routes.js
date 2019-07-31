'use strict';

const express = require('express');
const router = express.Router();
const utils = require('../lib/utils');
const userServices = require('../services/user_services');

const sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

/**
 * @api {post} /users/register Register
 * @apiVersion 1.0.0
 * @apiGroup Users
 *
 * @apiUse AccessHeader
 *
 * @apiParam (Body) {String} name User name
 * @apiParam (Body) {String} email User email
 * @apiParam (Body) {String} password User password
 *
 * @apiSuccessExample {json} Success Response
 * HTTP/1.1 200 OK
 *  {
 *    "success": true,
 *    "data": {
 *      "_id": "5d3a8091eb2c1f71b8f5c3fc",
 *      "name": "Duy",
 *      "email": "duy@gmail.com"
 *    }
 *  }
 * @apiUse FailedResponse
 */
router.post('/register', function (req, res) {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  if (!name || !email || !password) {
    res.json(utils.failedResponse({
      message: 'All fields required',
      code: null
    }));
  } else {
    userServices.register(name, email, password)
      .then(data => {
        res.json(utils.successResponse(data));
      })
      .catch(error => {
        res.json(utils.failedResponse(error));
      });
  }
});

/**
 * @api {post} /users/login Login
 * @apiVersion 1.0.0
 * @apiGroup Users
 *
 * @apiUse AccessHeader
 *
 * @apiParam (Body) {String} email User email
 * @apiParam (Body) {String} password User password
 *
 * @apiSuccessExample {json} Success Response
 * HTTP/1.1 200 OK
 *  {
 *    "success": true,
 *    "data": {
 *      "_id": "5d3b08e7b1b45984a469e2ab",
 *      "name": "Duy",
 *      "email": "duy@gmail.com",
 *      "token": "abcdxfvz1234567--*324"
 *    }
 *  }
 * @apiUse FailedResponse
 */
router.post('/login', function (req, res) {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    res.json(utils.failedResponse({
      message: 'All fields required',
      code: null
    }));
  } else {
    userServices.login(email, password)
      .then(data => {
        res.json(utils.successResponse(data));
      })
      .catch(error => {
        res.json(utils.failedResponse(error));
      });
  }
});

module.exports = router;
