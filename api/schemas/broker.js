const mongoose = require("mongoose");
var Schema = mongoose.Schema;



const brokerSchema = new Schema({
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

},{ timestamps: true});

module.exports = mongoose.model('Broker',brokerSchema);