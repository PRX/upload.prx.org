if (!process.env.ACCESS_KEY) {
    require('dotenv').config({path: `${__dirname}/../../config/test.env`});
}

console.log(`>>>>>> ${process.env.ACCESS_KEY}`)

global.expect = require('chai').expect;
