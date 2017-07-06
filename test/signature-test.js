'use strict';

const helper = require('./support/test-helper');
const handler = require('../index').handler;

describe('signature', () => {
  it('returns correct signature', () => {
    let event = {queryStringParameters: {to_sign: 'test'}};
    let context = null;
    let callback = (err, response) => {
      expect(response.body).to.equal('TyhhPs0RA37JFn+0oWNdm25HgBc=');
    };
    handler(event, context, callback);
  });
});
