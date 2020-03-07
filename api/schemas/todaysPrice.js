const mongoose = require("mongoose");

var Schema = mongoose.Schema;

const todaysPriceSchema = new Schema({
    name:{
        type: String,
        required:['true','Name field is required']
    },
    symbol:{
        type: String,
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
    }
},{ timestamps: true});

module.exports = mongoose.model('TodaysPrice',todaysPriceSchema);