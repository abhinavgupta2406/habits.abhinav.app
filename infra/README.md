# Infra

## Steps

1. Install dependencies: `npm install`
1. Setup API Gateway custom domain: `npx serverless create_domain`
1. Deploy stack: `npx serverless deploy`
1. To delete stack:
    1. Remove stack: `npx serverless remove`
    1. Remove API Gateway custom domain: `npx serverless delete_domain`
