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
 *      "token": "abcdxfvz1234567--*324"
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

module.exports = router;
