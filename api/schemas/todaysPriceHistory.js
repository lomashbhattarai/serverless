const mongoose = require("mongoose");

var Schema = mongoose.Schema;

const todaysPriceHistorySchema = new Schema({
    name:{
        type: String,
        required:['true','Name field is required']
    },
    maxPrice:{
      type: Number  
    },
    minPrice:{
        type: Number
    },
    closingPrice:{
        type:Number
    },
    tradedShares:{
        type:Number
    },
    difference:{
        type: Number
    },
    prevClosingPrice:{
        type: Number
    },
    transactionCount:{
        type: Number
    },
    amount:{
        type: Number
    },
    today:{
        type: String
    },
    dayOfMonth:{
        type: Number
    },
    month:{
        type: Number
    },
    year:{
        type: Number
    }
});

module.exports = mongoose.model('TodaysPriceHistory',todaysPriceHistorySchema);