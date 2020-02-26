'use strict';

const functions = require('./functions/index');
let { 
    hello, 
    todaysPrice,
    getBrokersFromDb,
    brokers,
    getTodaysPriceFromDb
  } = functions

const connectToDatabase = require('./db');
const brokerModel = require('./api/schemas/broker.js');


module.exports.hello =  hello;
module.exports.todaysPrice = todaysPrice;
module.exports.getBrokersFromDb = getBrokersFromDb;
module.exports.brokers = brokers;
module.exports.getTodaysPriceFromDb = getTodaysPriceFromDb


