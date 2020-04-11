
const connectToDatabase = require('../db.js');
const userModel = require('../api/schemas/user.js');

const signUp =  (event, context,callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        connectToDatabase().then(async () => {
            console.log(event.request.userAttributes)
            let user = new userModel({
                email:event.request.userAttributes.email || 'z',
            })
            const response = await user.save()
            callback(null,event);
        })
    } catch  (err) {
        callback(err);
    }   
};

module.exports = signUp;