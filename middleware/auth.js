const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function auth(req, res, next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access Denided...no token provided');

    //if token is provided, verify if its a valid token
    try{
        const decoded =  jwt.verify(token, process.env.JWT_KEY );
        req.user = decoded;
        next()
    }
    catch(ex){
        res.status(400).send('Invalid Token')
    }
}

module.exports = auth