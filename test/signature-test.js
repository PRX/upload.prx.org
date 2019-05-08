const helper = require('./support/test-helper');
const handler = require('../index').handler;

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
      expect(response.body).to.equal('0b2ae1ead8f4df51204256b12c44c24af249a62d0eb8dfdd3eceeea73aa528f2');
    };
    handler(event, context, callback);
  });
});
