'use strict';

const crypto = require('crypto');

// User ARN: arn:aws:iam::561178107736:user/prx-upload
// Access Key ID: AKIAJZ5C7KQPL34SQ63Q
const key = process.env.ACCESS_KEY;

exports.handler = (event, context, callback) => {
  try {
    if (!event.queryStringParameters || !event.queryStringParameters.to_sign) {
      callback(null, { statusCode: 400, headers: {}, body: null });
    } else {
      const toSign = event.queryStringParameters.to_sign;
      const signature = crypto.createHmac('sha1', key).update(toSign).digest('base64');
      callback(null, {
        statusCode: 200,
        headers: {
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'Access-Control-Allow-Methods': 'GET,OPTIONS',
          'Access-Control-Allow-Origin': '*'
        },
        body: signature
      });
    }
  } catch (e) {
    callback(e);
  }
};
