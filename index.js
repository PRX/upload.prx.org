'use strict';

const crypto = require('crypto');

// User ARN: arn:aws:iam::561178107736:user/prx-upload
// Access Key ID: AKIAJZ5C7KQPL34SQ63Q
const key = process.env.ACCESS_KEY;

exports.handler = (event, context, callback) => {
    try {
        const toSign = event.queryStringParameters.to_sign;
        if (!toSign) {
            callback(null, {statusCode: 500, headers: {}, body: 'No signature!'});
        } else {
            const signature = crypto.createHmac('sha1', key).update(toSign).digest('base64');
            callback(null, {statusCode: 200, headers: {}, body: signature});
        }
    } catch (e) {
        callback(e);
    }
};
