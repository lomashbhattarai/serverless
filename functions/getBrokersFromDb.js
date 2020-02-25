const connectToDatabase = require('../db.js');
const brokerModel = require('../api/schemas/broker.js');

const getBrokersFromDb = (event, context,callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase().then(() => {
    brokerModel.find({})
      .then((result) => {
      const response =  {
        statusCode: 200,
        headers:{
          "Access-Control-Allow-Origin": "*" 
        },
        body: JSON.stringify(
          {
            brokers: result,
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

module.exports = getBrokersFromDb;