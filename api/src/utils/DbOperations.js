const { LambdaLog } = require('lambda-log');
const AWS = require('aws-sdk');

/**
 * Database Operations
 */
class DbOperations {
  constructor() {
    this.log = new LambdaLog({ tags: ['dbOperations'] });

    AWS.config.update({ region: process.env.AWS_REGION });
    this.documentClient = new AWS.DynamoDB.DocumentClient();
    this.tableName = process.env.TABLE_NAME;
  }

  /**
   * Create or update item in DynamoDB
   *
   * @param {*} hashKey Hash Key
   * @param {*} rangeKey Range Key
   * @param {*} request Extra Data
   */
  async createUpdate(hashKey, rangeKey, request = {}) {
    const params = {
      TableName: this.tableName,
      Item: {
        HashKey: hashKey,
        RangeKey: rangeKey,
        ...request,
      },
    };
    this.log.info('dbParams', { params }, ['createUpdate']);

    return new Promise((resolve, reject) => {
      this.documentClient.put(params, (err, data) => {
        if (err) {
          this.log.error('dynamodb_create_update_failed', { err }, ['createUpdate']);
          reject(err);
        } else {
          this.log.info('dynamodb_create_update_success', { data }, ['createUpdate']);
          resolve(data);
        }
      });
    });
  }

  /**
   * Query DynamoDB based on RangeKey prefix
   *
   * @param {*} hashKeyValue Hash Key Value
   * @param {*} rangeKeyPrefix Range Key Prefix
   */
  async rangeKeyPrefixQuery(hashKeyValue, rangeKeyPrefix) {
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: '#hashKey = :hashKeyValue AND begins_with(#rangeKey, :rangeKeyPrefix)',
      ExpressionAttributeNames: {
        '#hashKey': 'HashKey',
        '#rangeKey': 'RangeKey',
      },
      ExpressionAttributeValues: {
        ':hashKeyValue': hashKeyValue,
        ':rangeKeyPrefix': rangeKeyPrefix,
      },
    };

    this.log.info('dbParams', { params }, ['rangeKeyPrefixQuery']);

    return new Promise((resolve, reject) => {
      this.documentClient.query(params, (err, data) => {
        if (err) {
          this.log.error('dbFailed', { err }, ['rangeKeyPrefixQuery']);
          reject(err);
        } else {
          this.log.info('dbSuccess', { data }, ['rangeKeyPrefixQuery']);
          resolve(data);
        }
      });
    });
  }

  /**
   * Get data from DynamoDB
   *
   * @param {*} hashKey Hash Key
   * @param {*} rangeKey Range Key
   * @returns Item from DynamoDB
   */
  async get(hashKey, rangeKey) {
    const params = {
      TableName: this.tableName,
      Key: {
        HashKey: hashKey,
        RangeKey: rangeKey,
      },
    };

    this.log.info('dbParams', { params }, ['get']);

    return new Promise((resolve, reject) => {
      this.documentClient.get(params, (err, data) => {
        if (err) {
          this.log.error('dbFailed', { err }, ['get']);
          reject(err);
        } else {
          this.log.info('dbSuccess', { data }, ['get']);
          resolve(data);
        }
      });
    });
  }
}

module.exports = {
  DbOperations,
};
