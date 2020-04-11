

const hiUsers = (event, context,callback) => {

    const response =  {
        statusCode: 200,
        headers:{
          "Access-Control-Allow-Origin": "*" 
        },
        body: JSON.stringify(
          {
            message: "you are authorised",
          })
      };
    callback(null,response);
    

  
  
};

module.exports = hiUsers;