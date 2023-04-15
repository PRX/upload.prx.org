/* eslint-disable no-undef */
require("./support/test-helper");
const sinon = require("sinon");
const index = require("../index");
const { handler } = require("../index");

sinon.stub(index, "currentDateStamp").returns("20190505");

describe("signature", () => {
  it("returns correct v2 signature", () => {
    const event = { queryStringParameters: { to_sign: "test" } };
    const context = null;
    const callback = (err, response) => {
      // @ts-ignore
      expect(response.body).to.equal("TyhhPs0RA37JFn+0oWNdm25HgBc=");
    };
    handler(event, context, callback);
  });

  it("returns correct v4 signature", () => {
    const event = {
      queryStringParameters: { to_sign: "AWS4-HMAC-SHA256test" },
    };
    const context = null;
    const callback = (err, response) => {
      // @ts-ignore
      expect(response.body).to.equal(
        "b4d7d82a0860eec70f549065e7052c7f19f58fa37dd0d4a74493497e4a678907"
      );
    };
    handler(event, context, callback);
  });
});
