const { LambdaLog } = require('lambda-log');
const { Common } = require('./utils/Common');
const { TitleService } = require('./services/TitleService');
const { Response } = require('./utils/Response');

/**
 * Create the title.
 *
 * @param {*} event API Gateway Event
 */
async function create(event) {
  const log = new LambdaLog({
    tags: [
      'title',
      'create',
    ],
  });

  log.info('apig_event', { event });

  const email = Common.getEmail(event);

  try {
    const requestBody = JSON.parse(event.body);

    // Process the request
    const response = await new TitleService(email).create(requestBody);
    log.debug('response', { event });

    return Response.created(response);
  } catch (error) {
    log.error(error);
    return Response.commonError(error);
  }
}

module.exports = {
  create,
};
