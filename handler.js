'use strict';

const functions = require('./functions/index');
let { hello, todaysPrice } = functions

module.exports.hello =  hello;
module.exports.todaysPrice = todaysPrice

var mongoose = require("mongoose");
mongoose.connect('mongodb+srv://lambdaUser:QgMRnjF0EzSYhj2h@cluster0-tcgij.mongodb.net/test?retryWrites=true&w=majority',
 { useNewUrlParser: true });
var brokerModel = require('./api/schemas/broker.js');



module.exports.brokers =  (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
    const db = mongoose.connection
    db.once('open', _ => {
      console.log('Database connected:')
    })
    db.on('error', err => {
      console.error('connection error:', err)
      callback(null,'failure')
    })
  
  
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
                        let [address,code,telephone,email,website,person] = details  
                        brokerList.push({ name,address,code,telephone,email,website,person });
                    })
                    resolve(html)
                } else {
                    reject(error)
                }
            })
            })
        })
        await Promise.all(promises)
        const brokerPromise = brokerList.map((brokerinfo) => {
          return new Promise((resolve,reject) =>{
            let query = { code: brokerinfo.code };
            let update = brokerinfo;
            let options = {upsert: true, new: true, setDefaultsOnInsert: true};
            brokerModel.findOneAndUpdate(query, update, options).then((data)=>{
              resolve(data)
            }). catch(()=>{
              reject(err)
            })
          })
        })
        await Promise.all(brokerPromise)
        mongoose.connection.close();
        const response =  {
          statusCode: 200,
          headers:{
            "Access-Control-Allow-Origin": "*" 
          },
          body: JSON.stringify(
            {
              status: "success",
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
