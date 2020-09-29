import { IConstruct } from '@aws-cdk/core';

const getStringValue = (construct: IConstruct, key: string) => {
  return construct.node.tryGetContext(key) as string;
};

export default {
  getAwsAccount: (construct: IConstruct) => {
    return getStringValue(construct, 'Account');
  },
  getRegion: (construct: IConstruct) => {
    return getStringValue(construct, 'Region');
  },
  getAWSCertificateArn: (construct: IConstruct) => {
    return getStringValue(construct, 'AWS_CERTIFICATE_ARN');
  },
  getAWSRoute53Domain: (construct: IConstruct) => {
    return getStringValue(construct, 'AWS_ROUTE53_DOMAIN');
  },
  getAWSRoute53SubDomain: (construct: IConstruct) => {
    return getStringValue(construct, 'AWS_ROUTE53_SUBDOMAIN');
  },
  getStackName: (construct: IConstruct) => {
    return getStringValue(construct, 'StackName');
  },
  getEnvironment: (construct: IConstruct) => {
    return getStringValue(construct, 'Environment');
  },
  getEnvSuffix: (construct: IConstruct) => {
    return getStringValue(construct, 'EnvSuffix');
  },
  getSlug: (construct: IConstruct) => {
    return getStringValue(construct, 'Slug');
  },
  getProject: (construct: IConstruct) => {
    return getStringValue(construct, 'Project');
  },
  getBuildBucket: (construct: IConstruct) => {
    return getStringValue(construct, 'BuildBucket');
  },
  getBuildBucketKey: (construct: IConstruct) => {
    return getStringValue(construct, 'BuildBucketKey');
  }
};
