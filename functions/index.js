const hello = require('./hello');
const todaysPrice = require('./todaysPrice');
const getBrokersFromDb = require('./getBrokersFromDb');
const brokers = require('./brokers');
const getTodaysPriceFromDb = require('./getTodaysPriceFromDb');


module.exports = {
    hello,
    todaysPrice,
    getBrokersFromDb,
    brokers,
    getTodaysPriceFromDb
}