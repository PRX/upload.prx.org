if (!process.env.ACCESS_KEY) {
    require('dotenv').config({path: `${__dirname}/../../config/test.env`});
}

global.expect = require('chai').expect;
