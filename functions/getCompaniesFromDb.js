const connectToDatabase = require('../db.js');
const companyModel = require('../api/schemas/company.js');

const getCompanyFromDb = (event, context,callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase().then(() => {
    companyModel.find({})
      .then((result) => {
      const response =  {
        statusCode: 200,
        headers:{
          "Access-Control-Allow-Origin": "*" 
        },
        body: JSON.stringify(
          {
            company: result,
          })
      };
        callback(null,response);
      }
    ).catch(err => 
        callback(null,{
          statusCode: err.statusCode || 500,
          headers:{ 'Content-Type': 'text/plain' },
          body: 'Could not get companies'
        })
      ); 
  });
};

module.exports = getCompanyFromDb;