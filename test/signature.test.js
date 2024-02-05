import "dotenv/config";
import { jest } from "@jest/globals";
import { handler } from "../src/index";

it("returns correct v2 signature", () => {
  const event = { queryStringParameters: { to_sign: "test" } };
  return handler(event).then((data) =>
    expect(data.body).toBe("TyhhPs0RA37JFn+0oWNdm25HgBc="),
  );
});

it("returns correct v4 signature", () => {
  jest.useFakeTimers().setSystemTime(Date.parse("2019-05-05"));
  const event = { queryStringParameters: { to_sign: "AWS4-HMAC-SHA256test" } };
  return handler(event).then((data) =>
    expect(data.body).toBe(
      "b4d7d82a0860eec70f549065e7052c7f19f58fa37dd0d4a74493497e4a678907",
    ),
  );
});
