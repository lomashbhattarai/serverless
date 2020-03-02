const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const companySchema = new Schema({
    name:{
        type: String,
        required:['true','Name field is required']
    },
    symbol:{
        type: String,
        required:['true','Symobol field is required']
    },
    sector:{
        type: String,
    }
});


module.exports = mongoose.model('Company',companySchema);