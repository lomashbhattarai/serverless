const connectToDatabase = require('../db.js');
const todaysPriceHistoryModel = require('../api/schemas/todaysPriceHistory.js');

const getHistoryBySymbol = (event, context,callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase().then(() => {
    const symbol = event.pathParameters.symbol;
    console.log(symbol);
    todaysPriceHistoryModel.find({symbol})
      .then((result) => {
          console.log(result)
      const response =  {
        statusCode: 200,
        headers:{
          "Access-Control-Allow-Origin": "*" 
        },
        body: JSON.stringify(
          {
            history: result,
          })
      };
        callback(null,response);
      }
    ).catch(err => 
        callback(null,{
          statusCode: err.statusCode || 500,
          headers:{ 'Content-Type': 'text/plain' },
          body: 'Could not get history'
        })
      ); 
  });
};

module.exports = getHistoryBySymbol;