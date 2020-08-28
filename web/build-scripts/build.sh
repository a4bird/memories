#!/usr/bin/env bash
set -euxo pipefail

: ${GIT_SHA?"GIT_SHA env variable is required"}
: ${VERSION?"VERSION env variable is required"}
: ${BRANCH?"VERSION env variable is required"}
: ${SLUG?"VERSION env variable is required"}
: ${PROJECT?"PROJECT env variable is required"}


s3BuildBucket="s3://${PROJECT}/${SLUG}/${GIT_SHA}/"

cd ../

mkdir -p ./output

cd ./build

# zip everything to output folder (recursively and quietly)
zip -r -q "../output/deployment-package.zip" ./*

cd ../

echo "output files : $(ls ./output)"

aws s3 cp ./output/deployment-package.zip "${s3BuildBucket}"

echo "Bucket location: $s3BuildBucket"