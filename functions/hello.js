

const hello = (event, context,callback) => {
    

    
    /* connectorMongodb.then(()=>{
      brokerModel.findOne({},(err,result) => {
        callback(null,result);
        mongoose.connection.close();

      })
    }) */
  
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports = hello;