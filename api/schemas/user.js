const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const portfolioSchema = new Schema({
    symbol: {
        type: String
    },
    companyId: {
        type : String
    },
    numOfShares:{
        type: Number
    },
    costPrice:{
        type: Number
    }
})

const userSchema = new Schema({
    firstName: {
        type: String
    },
    lastName:{
        type:String
    },
    userNamee:{
        type: String
    },
    password:{
        type: String
    },
    email:{
        type: String
    },
    phoneNumber:{
        type: String
    },
    portfolio:[portfolioSchema]

},{ timestamps: true});

module.exports = mongoose.model('User',userSchema);

