FROM node:20-alpine

LABEL maintainer="PRX <sysadmin@prx.org>"
LABEL org.prx.spire.publish.s3="LAMBDA_ZIP"

ARG AWS_REGION
ARG ACCESS_KEY

WORKDIR /app

RUN apk add zip

RUN mkdir --parents /.prxci

ADD ./package.json .
RUN yarn install

RUN mkdir --parents /test
ADD test/ test/

# Tests expect to find index.js in src/
ADD src/index.js src/index.js

RUN npm test

# This zip file is what will be deployed to the Lambda function.
# Add any necessary files to it.
RUN zip --quiet --junk-paths /.prxci/build.zip src/index.js package.json
