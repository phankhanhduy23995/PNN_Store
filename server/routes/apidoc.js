/**
 * @apiDefine HR HR account access only
 * Active users that belong to Human Resource Role
 */

/**
 * @apiDefine Admin Admin accounts access only
 * Active users that belong to Admin Role
 */

/**
 * @apiDefine AdminHR Admin & HR accounts access only
 * Active users that belong to Admin Role
 */

/**
 * @apiDefine Any Any account that authenticated
 * Active users
 */

/**
 * @apiDefine FailedResponse
 * @apiSuccessExample {json} Failed Response
 *  HTTP/1.1 200 OK
 *  {
 *    "success": false,
 *    "message": "Something wrong",
 *    "code": "ERROR_CODE"
 *  }
 */

/**
 * @apiDefine TokenHeader
 * @apiHeader {String} x-api-key API key to access the server
 * @apiHeader {String} x-access-token User token string to authorize
 */

/**
 * @apiDefine AccessHeader
 * @apiHeader {String} x-api-key API key to access the server
 */

/**
 * @apiDefine PagingParam
 * @apiParam {Number} [current_page = 1] Current page value
 * @apiParam {Number} [page_size = 10] Number of items per page value
 */