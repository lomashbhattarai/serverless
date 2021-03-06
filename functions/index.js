const hello = require('./hello');
const todaysPrice = require('./todaysPrice');
const todaysPriceHistory = require('./todaysPriceHistory');
const getBrokersFromDb = require('./getBrokersFromDb');
const brokers = require('./brokers');
const getTodaysPriceFromDb = require('./getTodaysPriceFromDb');
const companies = require('./companies');
const updateExistingData = require('./updateExistingData');
const getHistoryBySymbol = require('./getHistoryBySymbol');
const deleteUnwantedData = require('./deleteUnwantedData');
const getCompanyFromDb = require('./getCompaniesFromDb');
const hiUsers = require('./hiUsers');
const signUp = require('./signUp');


module.exports = {
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
}