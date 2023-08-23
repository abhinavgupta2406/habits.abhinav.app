const uuid = require('uuid');

class Common {
  /**
   * Get Email From API Gateway Event
   *
   * @param {*} event API Gateway Event
   */
  static getEmail(event) {
    const {
      requestContext: {
        authorizer: {
          claims: { email },
        },
      },
    } = event;

    return email;
  }

  /**
   * Create UUID
   *
   * @returns UUID v4
   */
  static uuid() {
    return uuid.v4();
  }
}

module.exports = {
  Common,
};
