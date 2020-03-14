# serverless


- sudo apt install awscli

- aws configure

- sudo npm install -g serverless

- npm install

- npm run offline

Endpoints:

GET a list of brokers from Database:
https://g1y4zxy8vf.execute-api.us-east-2.amazonaws.com/dev/getBrokers

Update brokers in Database from nepalstock.com.np
https://g1y4zxy8vf.execute-api.us-east-2.amazonaws.com/dev/brokers


Update todaysPrice in Database from nepalstock.com.np todaysPrice:
https://g1y4zxy8vf.execute-api.us-east-2.amazonaws.com/dev/todaysPrice

Update todaysPriceHistory in Database from nepalstock.com.np todaysPrice:
https://g1y4zxy8vf.execute-api.us-east-2.amazonaws.com/dev/todaysPriceHistory

GET todaysPrice from Database:
https://g1y4zxy8vf.execute-api.us-east-2.amazonaws.com/dev/getTodaysPrice

Update Companies in Database from nepalstock.com.np:
https://g1y4zxy8vf.execute-api.us-east-2.amazonaws.com/dev/companies

GET price history of a particular company by Symbol
https://g1y4zxy8vf.execute-api.us-east-2.amazonaws.com/dev/getHistoryBySymbol/{symbol}

GET companies from Database:
https://g1y4zxy8vf.execute-api.us-east-2.amazonaws.com/dev/getCompanyFromDb
