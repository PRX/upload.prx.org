/** @import { APIGatewayProxyEventV2 } from "aws-lambda" */

import "dotenv/config";
import { jest } from "@jest/globals";
import { handler } from "../src/index";

/**
 *
 * @param {string} toSign
 * @returns {APIGatewayProxyEventV2}
 */
function createEvent(toSign) {
  return {
    queryStringParameters: { to_sign: toSign },
    version: "",
    routeKey: "",
    rawPath: "",
    rawQueryString: "",
    headers: {},
    isBase64Encoded: false,
    requestContext: {
      accountId: "",
      apiId: "",
      domainName: "",
      domainPrefix: "",
      http: {
        method: "",
        path: "",
        protocol: "",
        sourceIp: "",
        userAgent: "",
      },
      requestId: "",
      routeKey: "",
      stage: "",
      time: "",
      timeEpoch: 1,
    },
  };
}

it("returns correct v2 signature", () => {
  const event = createEvent("test");
  return handler(event).then((data) =>
    expect(data.body).toBe("TyhhPs0RA37JFn+0oWNdm25HgBc="),
  );
});

it("returns correct v4 signature", () => {
  jest.useFakeTimers().setSystemTime(Date.parse("2019-05-05"));
  const event = createEvent("AWS4-HMAC-SHA256test");
  return handler(event).then((data) =>
    expect(data.body).toBe(
      "b4d7d82a0860eec70f549065e7052c7f19f58fa37dd0d4a74493497e4a678907",
    ),
  );
});
