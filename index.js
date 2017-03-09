'use strict';

const crypto = require('crypto');

// User ARN: arn:aws:iam::561178107736:user/prx-upload
// Access Key ID: AKIAJZ5C7KQPL34SQ63Q
const key = process.env.ACCESS_KEY;

exports.handler = function (event, context, callback) {
    let base64encodedData, data, signature;
    
    base64encodedData = event.to_sign_encoded;
    data = new Buffer(base64encodedData, 'base64').toString('binary');
    
    signature = crypto.createHmac('sha1', key).update(data).digest('base64');
    
    // Lambda always wants to return JSON, so returning a plain string doesn't
    // work out very well. Wrapping the signature in an object allows it to be 
    // mapped in the API Gateway method's Integration Response to a properly
    // formatted (i.e. naked) string in the HTTP response.
    let output = { signature: signature };

    signature ? callback(null, output) : callback(new Error('Signing failed'));
};
