/** @import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from "aws-lambda" */

import { createHmac } from "node:crypto";

// User ARN: arn:aws:iam::561178107736:user/prx-upload
// Access Key ID: AKIAJZ5C7KQPL34SQ63Q
const accessKey = process.env.ACCESS_KEY;

const currentDateStamp = () => {
  const now = new Date();
  console.log(now);
  return now.toISOString().replace(/-/g, "").substring(0, 8);
};

/**
 * @param {Buffer | string} key
 * @param {Buffer | string} string
//  * @returns {Buffer}
 */
function hmac(key, string) {
  return createHmac("sha256", key).update(string, "utf8").digest();
}

/**
 * @param {string} toSign
 * @returns {string}
 */
function v4signature(toSign) {
  const dateStamp = currentDateStamp();
  const region = process.env.AWS_REGION;
  const service = "s3";

  if (!region) {
    throw new Error("Region is required");
  }

  const dateKey = hmac(`AWS4${accessKey}`, dateStamp);
  const dateRegionKey = hmac(dateKey, region);
  const dateRegionServiceKey = hmac(dateRegionKey, service);

  const signingKey = hmac(dateRegionServiceKey, "aws4_request");

  const signature = hmac(signingKey, toSign).toString("hex");

  return signature;
}

/**
 * @param {APIGatewayProxyEventV2} event
 * @returns {Promise<APIGatewayProxyStructuredResultV2>}
 */
export const handler = async (event) => {
  try {
    if (!event.queryStringParameters?.to_sign) {
      return { statusCode: 400, headers: {}, body: undefined };
    }
    const toSign = event.queryStringParameters.to_sign;

    let signature;

    if (/AWS4-HMAC-SHA256/.test(toSign)) {
      // Use v4 signing
      // https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html
      signature = v4signature(toSign);
    } else {
      if (!accessKey) {
        throw new Error("Access key is required");
      }

      // Use v2 signing
      // https://docs.aws.amazon.com/general/latest/gr/signature-version-2.html
      signature = createHmac("sha1", accessKey).update(toSign).digest("base64");
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Headers":
          "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Methods": "GET,OPTIONS",
        "Access-Control-Allow-Origin": "*",
      },
      body: signature,
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
};
