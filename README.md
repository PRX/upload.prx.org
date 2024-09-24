# S3 Signing Service

This service is built on Amazon's API Gateway and AWS Lambda. It can generate signatures for both v2 and v4 AWS API requests (though v2 is deprecated by AWS and should not be used). It only creates signatures valid with the S3 API. Signatures are created based on the secret access key defined in `ACCESS_KEY`. Signed requests will have permissions allowed by the user or role associated with that secret access key.

For PRX's standard deployment of this service, the `ACCESS_KEY` is managed in the [CloudFormation template](https://github.com/PRX/Infrastructure/blob/main/spire/templates/apps/s3-signing.yml#L108), along with the [policy](https://github.com/PRX/Infrastructure/blob/main/spire/templates/apps/s3-signing.yml#L112) that grants it permissions. For that particular deployment, if requests need to be signed for additional S3 destinations, they should be added to that policy.

The signature is generated for the data passed into the service using the HTTP GET `to_sign` parameter.
