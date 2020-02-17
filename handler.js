'use strict';



module.exports.hello =  (event, context,callback) => {
  
  const response =  {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `hello ${event.pathParameters.name}`,
      }),
  };
  callback(null,response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.brokers =  (event, context, callback) => {
  const request = require('request');
  const cheerio = require('cheerio');
  try {
    request('http://www.nepalstock.com/brokers', async (error, response,html)=>{
    if(!error && response.statusCode ==200){
        const $ = cheerio.load(html);
        const pager = $('.pager a').first().text();
        const totalPages = pager.split('/')[1]
        let brokerList = []
        const iterableArray = [...Array(+totalPages).keys()]
        console.log(iterableArray);
        const promises = iterableArray.map( (i,value)=>{
            return new Promise((resolve,reject) =>{
                request(`http://www.nepalstock.com/brokers/index/${i+1}/`,
            (error,response,html) =>{
                if(!error && response.statusCode ==200){
                    const $ = cheerio.load(html);
                    const brokers = $('.content');    
                    brokers.each((i,el) =>{
                        const name = $(el).children('h4').text();
                        const info = $(el).find('.row-content').text();
                        let details = info.trim().split('\n');
                        details = details.map(detail => detail.trim() )
                        console.log(details)
                        let [adress,code,telephone,email,website,person] = details  
                        brokerList.push({ name,adress,code,telephone,email,website,person });
                    })
                    resolve(html)
                } else {
                    reject(error)
                }
            })
            })
        })
        await Promise.all(promises)
        const response =  {
          statusCode: 200,
          body: JSON.stringify(
            {
              brokers: brokerList,
            }),
        };
        callback(null,response);
    }
  });

  }
  catch(error) {
    //callback(error)
  }
  


}
