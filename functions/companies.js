const connectToDatabase = require('../db.js');
const companyModel = require('../api/schemas/company.js');


const companies =  (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    connectToDatabase();
    const request = require('request');
    const cheerio = require('cheerio');
    try {
      request('http://www.nepalstock.com/company/', async (error, response,html)=>{
      if(!error && response.statusCode ==200){
          const $ = cheerio.load(html);
          const pager = $('.pager a').first().text();
          const totalPages = pager.split('/')[1]
          let companyList = []
          const iterableArray = [...Array(+totalPages).keys()]
          const promises = iterableArray.map( (i,value)=>{
              return new Promise((resolve,reject) =>{
                  request(`http://www.nepalstock.com/company/index/${i+1}/`,
              (error,response,html) =>{
                  if(!error && response.statusCode ==200){
                      const $ = cheerio.load(html);
                      const companies = $('#company-list .table tr');
                      companies.each((i,el) =>{

                       const info = $(el).text();
                       let sn, logo, name, symbol, sector;
                       $(el).find('td').each((i,td)=>{
                            switch (i) {
                                case 0:
                                    sn= $(td).text().trim()
                                case 1:
                                    logo = $(td).text().trim()
                                case 2:
                                    name = $(td).text().trim()
                                case 3:
                                    symbol = $(td).text().trim()
                                case 4: 
                                    sector = $(td).text().trim()
                            }
                       })
                       sn = +sn
                       if(sn){
                        companyList.push({
                            name,
                            symbol,
                            sector
                        });

                       }
                      })
                      resolve(html)
                  } else {
                      reject(error)
                  }
              })
              })
          })
         await Promise.all(promises)
          const companyPromise = companyList.map((companyinfo) => {
            return new Promise((resolve,reject) =>{
              let query = { symbol: companyinfo.symbol };
              let update = companyinfo;
              let options = {upsert: true, new: true, setDefaultsOnInsert: true};
              companyModel.findOneAndUpdate(query, update, options).then((data)=>{
                resolve(data)
              }). catch(()=>{
                reject(err)
              })
            })
          })
          await Promise.all(companyPromise) 
          const response =  {
            statusCode: 200,
            headers:{
              "Access-Control-Allow-Origin": "*" 
            },
            body: JSON.stringify(
              {
                status: "success",
                brokers: companyList
              }),
          };
          callback(null,response);
      }
    });
  
    }
    catch(error) {
      callback(error)
    }
    
  
  
  }

  module.exports = companies