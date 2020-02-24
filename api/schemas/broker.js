var mongoose = reuire('mongoose');

var brokerSchema = new mongoose.Schema({
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

module.exports = brokerSchema;