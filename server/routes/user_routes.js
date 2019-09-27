'use strict';

const express = require('express');
const router = express.Router();
const utils = require('../lib/utils');
const errors = require('../lib/errors');
const userServices = require('../services/user_services');

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
 * @apiParam (Body) {ObjectId} roleId User role id
 *
 * @apiSuccessExample {json} Success Response
 * HTTP/1.1 200 OK
 *  {
 *    "success": true,
 *    "data": {
 *      "_id": "5d3a8091eb2c1f71b8f5c3fc",
 *      "name": "Duy",
 *      "email": "duy@gmail.com"
 *      "roleId": "5d3026531225d4c75879d2da"
 *    }
 *  }
 * @apiUse FailedResponse
 */
router.post('/register', function (req, res) {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let roleId = req.body.roleId;
  if (!utils.validateEmail(email)) {
    res.json(utils.failedResponse({
      message: errors.USER_04,
      code: 'USER_04'
    }));
  }
  if (!name || !email || !password) {
    res.json(utils.failedResponse({
      message: errors.USER_03,
      code: 'USER_03'
    }));
  } else {
    userServices.register(name, email, password, roleId)
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

  if (!utils.validateEmail(email)) {
    res.json(utils.failedResponse({
      message: errors.USER_04,
      code: 'USER_04'
    }));
  }
  if (!email || !password) {
    res.json(utils.failedResponse({
      message: errors.USER_03,
      code: 'USER_03'
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
