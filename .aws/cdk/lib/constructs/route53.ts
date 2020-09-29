import * as cdk from '@aws-cdk/core';
import * as route53 from '@aws-cdk/aws-route53';

interface RecordSetProps {
  fullDomainName: string;
  domainName: string;
}

export const createRecordSet = (
  scope: cdk.Construct,
  { fullDomainName, domainName }: RecordSetProps
): route53.CfnRecordSet => {
  const domainZone = route53.HostedZone.fromLookup(scope, 'Zone', {
    domainName,
  });

  // TODO
  const recordSet = new route53.CfnRecordSet(scope, 'RecordSet', {
    type: 'A',
    name: `${fullDomainName}.`,
    // aliasTarget: {
    //   dnsName: loadBalancer.loadBalancerDnsName,
    //   hostedZoneId: loadBalancer.loadBalancerCanonicalHostedZoneId,
    // },
    hostedZoneId: domainZone.hostedZoneId,
  });

  return recordSet;
};
