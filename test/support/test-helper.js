const dotenv = require("dotenv");

if (!process.env.ACCESS_KEY) {
  dotenv.config({ path: `${__dirname}/../../.env` });
}

global.expect = require("chai").expect;
