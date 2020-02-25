var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb+srv://lambdaUser:QgMRnjF0EzSYhj2h@cluster0-tcgij.mongodb.net/test?retryWrites=true&w=majority');
var brokerModel = require('../api/schemas/broker.js');



const getBrokersFromDb = (event, context,callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  brokerModel.find({}).then((result) => {
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
    
      mongoose.connection.close();
      callback(null,response);
    
    }); 
    
};

module.exports = getBrokersFromDb;