const helper = require('./support/test-helper');
const index = require('../index');
const handler = require('../index').handler;
const sinon = require('sinon');

sinon.stub(index, 'currentDateStamp').returns('20190505');

describe('signature', () => {
  it('returns correct v2 signature', () => {
    let event = {queryStringParameters: {to_sign: 'test'}};
    let context = null;
    let callback = (err, response) => {
      expect(response.body).to.equal('TyhhPs0RA37JFn+0oWNdm25HgBc=');
    };
    handler(event, context, callback);
  });

  it('returns correct v4 signature', () => {
    let event = {queryStringParameters: {to_sign: 'AWS4-HMAC-SHA256test'}};
    let context = null;
    let callback = (err, response) => {
      expect(response.body).to.equal('b4d7d82a0860eec70f549065e7052c7f19f58fa37dd0d4a74493497e4a678907');
    };
    handler(event, context, callback);
  });
});
