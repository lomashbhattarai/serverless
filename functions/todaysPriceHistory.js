const connectToDatabase = require('../db.js');
const todaysPriceHistoryModel = require('../api/schemas/todaysPriceHistory.js');
const companiesModel = require('../api/schemas/company.js')


const todaysPriceHistory = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    connectToDatabase();
    const request = require('request');
    const cheerio = require('cheerio');
    try {
      request('http://www.nepalstock.com.np/todaysprice', async (error, response,html)=>{
      if(!error && response.statusCode ==200){
          const $ = cheerio.load(html);
          const pager = $('.pager a').first().text();
          const totalPages = pager.split('/')[1]
          let CompaniesWithTradingData = []
          const iterableArray = [...Array(+totalPages).keys()]
          const promises = iterableArray.map( (i,value)=>{
              return new Promise((resolve,reject) =>{
                  request(`http://www.nepalstock.com.np/main/todays_price/index/${i+1}/`,
              (error,response,html) =>{
                  if(!error && response.statusCode ==200){
                      const $ = cheerio.load(html);
                      const todayText = $('#date').text().trim()
                      const todayArray = todayText.split(/\s+/) 
                      const day = todayArray[2];
                      const time = todayArray[3];
                      const today= day + '-' + time;
                      const year= day.split('-')[0].trim()
                      const month = day.split('-')[1].trim()
                      const dayOfMonth = day.split('-')[2].trim()
                      const companies = $('#home-contents .table tr')
                        companies.each((i,el) =>{  
                        const info = $(el).text();
                        let details = info.trim().split('\n');
                        details = details.map(detail => detail.trim() )  
                        let [
                            sn,
                            name,
                            transactionCount,
                            maxPrice,
                            minPrice,
                            closingPrice,
                            tradedShares,
                            amount,
                            prevClosingPrice,
                            difference
                        ] = details
                        
                        sn = +sn
                        maxPrice = +maxPrice
                        minPrice = +minPrice
                        closingPrice = +closingPrice
                        amount = +amount
                        prevClosingPrice = +prevClosingPrice

                        let isValidEntry = sn && maxPrice
                        && minPrice && closingPrice
                        && amount && 
                        prevClosingPrice
                         
                        if(isValidEntry){
                          name = name.trim()
                          CompaniesWithTradingData.push({ 
                            sn,
                            name,
                            transactionCount,
                            maxPrice,
                            minPrice,
                            closingPrice,
                            tradedShares,
                            amount,
                            prevClosingPrice,
                            difference,
                            today,
                            year,
                            month,
                            dayOfMonth
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
          const tradingPromise = CompaniesWithTradingData.map((tradinginfo) => {
            return new Promise((resolve,reject) =>{
              let query = { name: tradinginfo.name, today: tradinginfo.today };
              companiesModel.findOne({name: tradinginfo.name },
                (err,requiredCompany)=>{
                  if(err){
                    reject(err)
                    return
                  } else {
                    let update = {...tradinginfo, symbol: requiredCompany ? requiredCompany.symbol: ''};
                    let options = {upsert: true, new: true, setDefaultsOnInsert: true};

                    todaysPriceHistoryModel.findOneAndUpdate(query, update, options).then((data)=>{
                      resolve(data)
                    }). catch(()=>{
                      reject(err)
                    })

                  }

                })
            })
          })
          await Promise.all(tradingPromise)
          const response =  {
            statusCode: 200,
            headers:{
              "Access-Control-Allow-Origin": "*" 
            },
            body: JSON.stringify(
              {
                status:"success",
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

  module.exports = todaysPriceHistory