#!/bin/bash

# 01 Retrieve stackname
stage=$1
stackname=aws-serverless-web-app-api-$stage

# 02 Retrieve endpoint URL
apiEndpoint=$(aws cloudformation describe-stacks \
  --stack-name aws-serverless-web-app-api-local \
  --query "Stacks[0].Outputs[?OutputKey=='ServiceEndpoint'].OutputValue" \
  --output text)

# 03 Replace file
cp src/api/serverUrl.example src/api/serverUrl.js
sed -i -e "s@{API_ENDPOINT_REPLACE_ME}@$apiEndpoint@g" ./src/api/serverUrl.js

# 04 build
npm install
npm run build
