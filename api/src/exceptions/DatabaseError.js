/**
 * Error class for Database exceptions
 */
class DatabaseError extends Error {
  constructor(name, message, statusCode = 400, highlight = false) {
    super(message);
    this.name = name;
    this.message = message;
    this.statusCode = statusCode;
    this.highlight = highlight;
  }
}

module.exports = {
  DatabaseError,
};
