const connectToDatabase = require('../db.js');
const todaysPriceHistoryModel = require('../api/schemas/todaysPriceHistory.js');


const brokers =  (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try{
        connectToDatabase().then(()=>{
            todaysPriceHistoryModel.deleteMany({ dayOfMonth: 11, month: 3 }, function(err) {
                if(err){
                    console.log(err)
                    callback(null)
                } else {
                    callback(null,{
                        statusCode: 200,
                        body: JSON.stringify("Success")
                    })
                }
            })
        })

    }
    catch(error) {
      //callback(error)
    }
    
  
  
  }

  module.exports = brokers