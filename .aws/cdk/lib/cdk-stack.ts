import * as cdk from '@aws-cdk/core';
import * as acm from '@aws-cdk/aws-certificatemanager';
import * as s3Deploy from '@aws-cdk/aws-s3-deployment';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as route53 from '@aws-cdk/aws-route53';
import * as targets from '@aws-cdk/aws-route53-targets';
import { Bucket, CfnBucket, IBucket } from '@aws-cdk/aws-s3';

import { createS3Bucket } from './constructs/s3Bucket';
import context from './helpers/context';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const project = context.getProject(this);
    const slug = context.getSlug(this);
    const envSuffix = context.getEnvSuffix(this);
    const certificateArn = context.getAWSCertificateArn(this);
    const domain = context.getAWSRoute53Domain(this);
    const subdomain = context.getAWSRoute53SubDomain(this);

    const fullDomainName = `${subdomain}.${domain}`;
    // S3

    const bucket = createS3Bucket(this, {
      bucketName: `${project}-${envSuffix}-${slug}-app`
    });

    this.enableCorsOnBucket(bucket);

    // Route 53 - Custom Domain

    const hostedZone = route53.HostedZone.fromLookup(
      this,
      'Route53HostedZone',
      {
        domainName: domain
      }
    );

    const certificate = acm.Certificate.fromCertificateArn(
      this,
      'Certificate',
      certificateArn
    );

    // Cloud front distribution
    const cloudFrontOAI = new cloudfront.OriginAccessIdentity(this, 'OAI');
    const cfDistribution = new cloudfront.CloudFrontWebDistribution(
      this,
      'CDKWidgetAppStaticDistribution',
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: bucket,
              originAccessIdentity: cloudFrontOAI
            },
            behaviors: [{ isDefaultBehavior: true }]
          }
        ],
        viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(
          certificate,
          {
            aliases: [`${fullDomainName}`],
            securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1, // default
            sslMethod: cloudfront.SSLMethod.SNI // default
          }
        )
      }
    );

    new route53.ARecord(this, 'Alias', {
      zone: hostedZone,
      recordName: `${fullDomainName}`,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(cfDistribution)
      )
    });

    bucket.grantRead(cloudFrontOAI.grantPrincipal);

    // Deployment

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

    new cdk.CfnOutput(this, `memories-web-url`, {
      description: 'Web Url for memories',
      value: `https://${fullDomainName}`,
      exportName: `${project}${slug}::url`
    });
  }

  enableCorsOnBucket = (bucket: IBucket) => {
    const cfnBucket = bucket.node.findChild('Resource') as CfnBucket;
    cfnBucket.addPropertyOverride('CorsConfiguration', {
      CorsRules: [
        {
          AllowedOrigins: ['*'],
          AllowedMethods: ['HEAD', 'GET', 'PUT', 'POST', 'DELETE'],
          ExposedHeaders: [
            'x-amz-server-side-encryption',
            'x-amz-request-id',
            'x-amz-id-2'
          ],
          AllowedHeaders: ['*']
        }
      ]
    });
  };
}
