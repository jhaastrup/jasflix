const winston = require('winston');

function error (err, req, res, next){
    winston.error(err.message, err);
    //error
    //warn
    //debug
    //silly
    //info
    res.status(500).send('Wowza Something failed :(');
} 


module.exports = error;