const winston = require('winston');
//require mongoose for DB connection
const mongoose = require ('mongoose');

module.exports = function(){
    //connecting to MongoDB
mongoose.connect('mongodb://localhost/jasflix')
//return a promise if connected
.then(() => winston.info('connected to MongoDB..'))

}