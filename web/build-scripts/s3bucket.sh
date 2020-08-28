#!/usr/bin/env bash

: ${BUCKET_NAME?"BUCKET_NAME env variable is required"}

s3BuildBucket="s3://${BUCKET_NAME}"

if aws s3 ls "${s3BuildBucket}" 2>&1 | grep -q 'NoSuchBucket'
then
    echo "creating bucket ${s3BuildBucket}"
    aws s3 mb "${s3BuildBucket}"
fi

aws s3api put-public-access-block \
  --bucket ${BUCKET_NAME} \
  --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"

aws s3api put-bucket-policy --bucket ${BUCKET_NAME} --policy file://bucketpolicy.json
