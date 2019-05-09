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
      expect(response.body).to.equal('ea72177ce838f1faf1e9629624c6b0b7e0e07294a8aa7cb37195a0ea782af572');
    };
    handler(event, context, callback);
  });
});
