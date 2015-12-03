# upload.prx.org

This service is built on Amazon's API Gateway and AWS Lambda. When deploying the Lambda function code, the secret key ID must be inserted for the service to work correctly. That key is kept in LastPass.

The important parts of the API Gateway configuration, in addition to CORS, are:

### Method Request

#### URL Query String Parameters

- `to_sign`

### Integration Request

#### Mapping Templates

(for `application/json`)

```
{
  "to_sign_encoded" : "$util.base64Encode($input.params('to_sign'))"
}
```

### Integration Response

#### Mapping Templates

(for `text/plain`)

```
#set($inputRoot = $input.path('$'))
${inputRoot.signature}
```
