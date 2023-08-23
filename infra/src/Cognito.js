const cfnResponse = require('cfn-response-promise');
const AWS = require('aws-sdk');
const log = require('lambda-log');

const cognitoIdp = new AWS.CognitoIdentityServiceProvider();

/**
 * Get Userpool Domain Details.
 *
 * @param {*} userpoolDomain Userpool Domain Name
 */
async function describeUpDomain(userpoolDomain) {
  return new Promise((resolve, reject) => {
    cognitoIdp.describeUserPoolDomain({ Domain: userpoolDomain }, (err, data) => {
      if (err) {
        log.error('cognito_describe_userpool_domain_failed', { err });
        reject(err);
      } else {
        log.info('cognito_describe_userpool_domain_success', { data });
        resolve(data);
      }
    });
  });
}

/**
 * Return promise from cfnResponse.
 *
 * @param {*} event Cfn Event
 * @param {*} context Context
 * @param {*} responseStatus Cfn Response Status
 * @param {*} responseData Cfn Response Data
 */
async function cloudformationResponse(event, context, responseStatus, responseData) {
  return cfnResponse.send(event, context, responseStatus, responseData);
}

/**
 * Get Cloudfront Distribution for Userpool.
 *
 * @param {*} event Event
 */
async function userpoolCloudfrontDistribution(event, context) {
  log.info('cfn_event', { event });
  const { RequestType, ResourceProperties: { UserPoolDomain } } = event;

  // Initialize
  let responseData = {};
  let responseStatus = cfnResponse.FAILED;

  if (RequestType) {
    // Delete
    if (RequestType === 'Delete') {
      responseStatus = cfnResponse.SUCCESS;
      await cloudformationResponse(event, context, responseStatus, responseData);
      return;
    }
  } else {
    await cloudformationResponse(event, context, responseStatus, responseData);
    return;
  }

  try {
    const response = await describeUpDomain(UserPoolDomain);
    const { DomainDescription: { CloudFrontDistribution } } = response;
    responseData = {
      CloudFrontDistribution,
    };
    responseStatus = cfnResponse.SUCCESS;
    await cloudformationResponse(event, context, responseStatus, responseData);
  } catch (error) {
    await cloudformationResponse(event, context, responseStatus, responseData);
  }
}

module.exports = {
  userpoolCloudfrontDistribution,
};
