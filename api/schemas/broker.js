var mongoose = require("mongoose");
var Schema = mongoose.Schema;



var brokerSchema = new Schema({
    name:{
        type: String,
        required:['true','Name field is required']
    },
    code:{
        type: String,
        required:['true','Code field is required']
    },
    address:{
        type: String,
    },
    telephone:{
        type: String,
    },
    email:{
        type: String,
    },
    website:{
        type: String,
    },
    person:{
        type: String,
    }

});

module.exports = mongoose.model('Broker',brokerSchema);