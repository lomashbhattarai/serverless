var mongoose = require("mongoose");
mongoose.connect('mongodb+srv://lambdaUser:QgMRnjF0EzSYhj2h@cluster0-tcgij.mongodb.net/test?retryWrites=true&w=majority',
 { useNewUrlParser: true,
useUnifiedTopology: true,
});
var brokerModel = require('../api/schemas/broker.js');



const getBrokersFromDb = (event, context,callback) => {
    brokerModel.find({}).then((result) => {
        const response =  {
            statusCode: 200,
            headers:{
              "Access-Control-Allow-Origin": "*" 
            },
            body: JSON.stringify(
              {
                brokers: result,
              }),
          };
          mongoose.connection.close();
          callback(null,response);
    })
    
};

module.exports = getBrokersFromDb;