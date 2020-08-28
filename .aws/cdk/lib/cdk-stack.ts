import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3Deploy from '@aws-cdk/aws-s3-deployment';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as iam from '@aws-cdk/aws-iam';
import { Effect } from '@aws-cdk/aws-iam';
import { Bucket } from '@aws-cdk/aws-s3';

import context from './helpers/context';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const project = context.getProject(this);
    // S3
    const bucket = new s3.Bucket(this, 'WidgetAppBucket', {
      bucketName: `${project}-app`,
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html'
    });

    bucket.addToResourcePolicy(
      new iam.PolicyStatement({
        sid: 'PublicReadGetObject',
        effect: Effect.ALLOW,
        principals: [new iam.Anyone()],
        actions: ['s3:GetObject'],
        resources: [`${bucket.bucketArn}/*`]
      })
    );

    // Cloud front distribution

    const cfDistribution = new cloudfront.CloudFrontWebDistribution(
      this,
      'CDKWidgetAppStaticDistribution',
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: bucket
            },
            behaviors: [{ isDefaultBehavior: true }]
          }
        ]
      }
    );

    // Deployment

    const slug = context.getSlug(this);
    const buildBucketName = context.getBuildBucket(this);
    const buildBucketKey = context.getBuildBucketKey(this);
    const buildBucket = Bucket.fromBucketName(
      this,
      'BuildBucketName',
      buildBucketName
    );

    const src = new s3Deploy.BucketDeployment(this, 'DeployWidgetApp', {
      sources: [s3Deploy.Source.bucket(buildBucket, buildBucketKey)],
      destinationBucket: bucket,
      retainOnDelete: false,
      distribution: cfDistribution,
      distributionPaths: ['/*']
    });

    // Output

    new cdk.CfnOutput(this, `widget-cf-distribution`, {
      description: 'Cloud front distribution for widget',
      value: cfDistribution.distributionDomainName,
      exportName: `${project}${slug}::cfDistDomainName`
    });
  }
}
