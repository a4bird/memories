#!/usr/bin/env bash
set -euxo pipefail

: ${AWS_ACCOUNT?"AWS_ACCOUNT env variable is required"}
: ${ENVIRONMENT?"ENVIRONMENT env variable is required"}
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
    --context Region=$REGION \
    --context StackName=$STACK_NAME \
    --context Environment=$ENVIRONMENT \
    --context Slug=$SLUG \
    --context Project=${PROJECT} \
    --context BuildBucket=${PROJECT} \
    --context BuildBucketKey="${SLUG}/${GIT_SHA}/deployment-package.zip" \
    --tags billing=memories \
    --tags Project=$PROJECT \
    --tags Version=$GIT_SHA \
