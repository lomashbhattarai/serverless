const connectToDatabase = require('../db.js');
const todaysPriceModel = require('../api/schemas/todaysPrice.js');

const getTodaysPriceFromDb = (event, context,callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase().then(() => {
    todaysPriceModel.find({})
      .then((result) => {
      const response =  {
        statusCode: 200,
        headers:{
          "Access-Control-Allow-Origin": "*" 
        },
        body: JSON.stringify(
          {
            prices: result,
          })
      };
        callback(null,response);
      }
    ).catch(err => 
        callback(null,{
          statusCode: err.statusCode || 500,
          headers:{ 'Content-Type': 'text/plain' },
          body: 'Could not get brokers'
        })
      ); 
  });
};

module.exports = getTodaysPriceFromDb;