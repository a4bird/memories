import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import { Bucket } from '@aws-cdk/aws-s3';

interface BucketProps {
  bucketName: string;
}

export const createS3Bucket = (
  scope: cdk.Construct,
  { bucketName }: BucketProps
): s3.Bucket => {
  // S3
  const bucket = new s3.Bucket(scope, 'WidgetAppBucket', {
    bucketName,
    removalPolicy: cdk.RemovalPolicy.DESTROY,
    websiteIndexDocument: 'index.html',
    websiteErrorDocument: 'index.html',
  });

  return bucket;
};
