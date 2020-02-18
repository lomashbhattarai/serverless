const todaysPrice = (event, context, callback) => {
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
          //console.log(iterableArray);
          const promises = iterableArray.map( (i,value)=>{
              return new Promise((resolve,reject) =>{
                  request(`http://www.nepalstock.com.np/main/todays_price/index/${i+1}/`,
              (error,response,html) =>{
                  if(!error && response.statusCode ==200){
                      const $ = cheerio.load(html);
                      //console.log(html)
                      const companies = $('#home-contents .table tr')
                        companies.each((i,el) =>{  
                        const info = $(el).text();
                        let details = info.trim().split('\n');
                        details = details.map(detail => detail.trim() )  
                        let [
                            sn,
                            name,
                            noOfTransactions,
                            maxPrice,
                            minPrice,
                            closingPrice,
                            tradedShares,
                            Amount,
                            prevClosing,
                            difference
                        ] = details  
                        CompaniesWithTradingData.push({ 
                            sn,
                            name,
                            noOfTransactions,
                            maxPrice,
                            minPrice,
                            closingPrice,
                            tradedShares,
                            Amount,
                            prevClosing,
                            difference });
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
                brokers: CompaniesWithTradingData.slice(2,CompaniesWithTradingData.length-4),
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

  module.exports = todaysPrice