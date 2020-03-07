const connectToDatabase = require('../db.js');
const companyModel = require('../api/schemas/company.js');
const todaysPriceHistoryModel = require('../api/schemas/todaysPriceHistory.js');

const updateExistingData = (event, context,callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase().then(() => {
    companyModel.find({})
      .then((result) => {
        const promises = result.map((company) => {
         return new Promise((resolve,reject)=>{
          todaysPriceHistoryModel.update({"name": company.name},{"$set":{"symbol": company.symbol}},{"multi": true},
            (err, writeResult) => {
              if(err){
                reject(err)
                return
              } else {
                console.log(writeResult)
                resolve(writeResult)
              }     
            })
         }) 
        })
        Promise.all(promises).then(()=>{           
          const response =  {
            statusCode: 200,
            headers:{
              "Access-Control-Allow-Origin": "*" 
            },
            body: JSON.stringify(
              {
                status:"success",
              })
          };
          callback(null,response);
        })
       
      }
    ).catch(err => {
      callback(null,{
        statusCode: err.statusCode || 500,
        headers:{ 'Content-Type': 'text/plain' },
        body: 'error'
      }) 
    }     
      ); 
  });
};

module.exports = updateExistingData;