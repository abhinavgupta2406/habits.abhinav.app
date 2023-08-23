# Infra

## Prerequisite

1. Deployment of `layers` stack.

## Steps

1. [Create Google Client ID and Secret for Cognito](https://aws.amazon.com/premiumsupport/knowledge-center/cognito-google-social-identity-provider/)
1. Install dependencies: `npm install`
1. Setup API Gateway custom domain: `npx serverless create_domain`
1. Deploy stack: `npx serverless deploy`
1. To delete stack:
    1. Remove stack: `npx serverless remove`
    1. Remove API Gateway custom domain: `npx serverless delete_domain`
