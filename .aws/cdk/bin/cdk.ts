#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkStack } from '../lib/cdk-stack';
import context from '../lib/helpers/context';

const app = new cdk.App();

const env = {
  account: context.getAwsAccount(app),
  region: context.getRegion(app)
};

const stackName = context.getStackName(app);

new CdkStack(app, stackName, {
  env,
  stackName
});
