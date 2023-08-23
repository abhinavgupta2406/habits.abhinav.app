class Response {
  /**
   * 200 response
   *
   * @param {*} responseBody Response Body
   */
  static ok(responseBody) {
    return {
      statusCode: 200,
      body: JSON.stringify(responseBody),
    };
  }

  /**
   * 201 response
   *
   * @param {*} responseBody Response Body
   */
  static created(responseBody) {
    return {
      statusCode: 201,
      body: JSON.stringify(responseBody),
    };
  }

  /**
   * 400 response
   *
   * @param {*} error Error
   */
  static badRequest(error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: error.name,
        message: error.message,
      }),
    };
  }

  /**
   * 403 response
   *
   * @param {*} error Error
   */
  static forbidden(error) {
    return {
      statusCode: 403,
      body: JSON.stringify({
        error: error.name,
        message: error.message,
      }),
    };
  }

  /**
   * 500 response
   *
   * @param {*} error Error
   */
  static internalServerError(error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.name,
        message: error.message,
      }),
    };
  }

  /**
   * Common error response
   *
   * @param {*} error Error
   */
  static commonError(error) {
    return {
      statusCode: error.statusCode,
      body: JSON.stringify({
        error: error.name,
        message: error.message,
      }),
    };
  }
}

module.exports = {
  Response,
};
