/**
 * Exception names to return to user
 */
const EXCEPTION_NAMES = Object.freeze({
  REQUEST_VALIDATION: 'RequestValidationFailed',
  DEVELOPER_ERROR: 'DeveloperError',
  FORBIDDEN: 'Forbidden',
  PATH_PARAM_MISSING: 'PathParamMissing',
  USER_NOT_FOUND: 'UserNotFound',
});

/**
 * Prefixes for RangeKey in DynamoDB
 */
const PREFIXES = Object.freeze({
  TITLE: 't-',
});

module.exports = {
  EXCEPTION_NAMES,
  PREFIXES,
};
