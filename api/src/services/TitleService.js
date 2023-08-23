const { LambdaLog } = require('lambda-log');
const { Common } = require('../utils/Common');
const { DbOperations } = require('../utils/DbOperations');
const { PREFIXES, EXCEPTION_NAMES } = require('../utils/Constants');
const { DatabaseError } = require('../exceptions/DatabaseError');

class TitleService {
  constructor(userEmail) {
    this.userEmail = userEmail;
    this.log = new LambdaLog({ tags: ['createService'] });
  }

  /**
   * Create Title
   *
   * @param {*} requestBody Request Body from API Gateway
   */
  async create(requestBody) {
    const dbOps = new DbOperations();

    try {
      // Add title entry in table
      const titleUuid = Common.uuid();
      await dbOps.createUpdate(this.userEmail, `${PREFIXES.TITLE}${titleUuid}`, requestBody);

      return {
        id: titleUuid,
        ...requestBody,
      };
    } catch (error) {
      this.log.error('global_exception', { error }, ['create']);
      throw new DatabaseError(EXCEPTION_NAMES.DEVELOPER_ERROR, `Database returned ${error.name}`);
    }
  }
}

module.exports = {
  TitleService,
};
