'use strict';

const functions = require('./functions/index');
let { 
    hello, 
    todaysPrice,
    getBrokersFromDb,
    brokers,
    getTodaysPriceFromDb,
    todaysPriceHistory,
    companies,
    updateExistingData,
    getHistoryBySymbol,
    deleteUnwantedData,
    getCompanyFromDb,
    hiUsers,
    signUp
  } = functions

module.exports.hello =  hello;
module.exports.todaysPrice = todaysPrice;
module.exports.getBrokersFromDb = getBrokersFromDb;
module.exports.brokers = brokers;
module.exports.getTodaysPriceFromDb = getTodaysPriceFromDb
module.exports.todaysPriceHistory = todaysPriceHistory;
module.exports.companies = companies;
module.exports.updateExistingData = updateExistingData;
module.exports.getHistoryBySymbol = getHistoryBySymbol;
module.exports.deleteUnwantedData = deleteUnwantedData;
module.exports.getCompanyFromDb = getCompanyFromDb;
module.exports.hiUsers = hiUsers;
module.exports.signUp = signUp;


