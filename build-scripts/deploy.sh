#!/usr/bin/env bash
set -euxo pipefail

: ${AWS_ACCOUNT?"AWS_ACCOUNT env variable is required"}
: ${AWS_CERTIFICATE_ARN?"AWS_CERTIFICATE_ARN env variable is required"}
: ${AWS_ROUTE53_DOMAIN?"AWS_ROUTE53_DOMAIN env variable is required"}
: ${AWS_ROUTE53_SUBDOMAIN?"AWS_ROUTE53_SUBDOMAIN env variable is required"}
: ${ENVIRONMENT?"ENVIRONMENT env variable is required"}
: ${ENV_SUFFIX?"ENV_SUFFIX env variable is required"}
: ${REGION?"REGION env variable is required"}
: ${GIT_SHA?"GIT_SHA env variable is required"}
: ${SLUG?"VERSION env variable is required"}
: ${PROJECT?"PROJECT env variable is required"}


cd ../.aws/cdk

STACK_NAME="${PROJECT}-${SLUG}"

npm install
npm run build

# npm run cdk bootstrap aws://$AWS_ACCOUNT/$REGION

npm run cdk deploy $STACK_NAME -- \
    --strict \
    --verbose \
    --require-approval never \
    --context Account=$AWS_ACCOUNT \
    --context AWS_CERTIFICATE_ARN=$AWS_CERTIFICATE_ARN \
    --context AWS_ROUTE53_DOMAIN=$AWS_ROUTE53_DOMAIN \
    --context AWS_ROUTE53_SUBDOMAIN=$AWS_ROUTE53_SUBDOMAIN \
    --context Region=$REGION \
    --context StackName=$STACK_NAME \
    --context Environment=$ENVIRONMENT \
    --context EnvSuffix=$ENV_SUFFIX \
    --context Slug=$SLUG \
    --context Project=${PROJECT} \
    --context BuildBucket=${PROJECT} \
    --context BuildBucketKey="${SLUG}/${GIT_SHA}/deployment-package.zip" \
    --tags billing=memories \
    --tags Project=$PROJECT \
    --tags Version=$GIT_SHA \
