const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.Promise = global.Promise;
let isConnected;
module.exports = connectToDatabase = () => {
    if(isConnected){
        console.log('using existing database connection');
        return Promise.resolve();
    }
    console.log('using new database connection');
    return mongoose.connect('mongodb+srv://lambdaUser:QgMRnjF0EzSYhj2h@cluster0-tcgij.mongodb.net/test?retryWrites=true&w=majority')
    .then(db =>{
        isConnected = db.connections[0].readyState;
    });
}
