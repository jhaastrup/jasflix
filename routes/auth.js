const bcrypt =  require('bcrypt');
const mongoose = require ('mongoose');
const _ = require('lodash');
const {User} = require('../models/user');
const express = require('express');
const router = express.Router(); 
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const dotenv = require('dotenv');

dotenv.config();

//endpoint to authenticate users.
router.post('/', async (req, res) =>{
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

   let user = await User.findOne({email: req.body.email});
   if(!user) return res.status(400).send('Invalid email or password'); 

   //compare to unhash the hash password.
  const validpassword = await bcrypt.compare(req.body.password, user.password);
  if(!validpassword) return res.status(400).send('Invalid email or password'); 

  //generateAuth()method
  const token = user.generateAuthToken()
  //using jsonwebtoken 
 
  res.send(token);
}); 

function validate(req) {
    const schema = {
      email: Joi.string().min(5).max(225).required().email(),
      password: Joi.string().min(5).max(1024).required()
    };
  
    return Joi.validate(req, schema);
  } 

module.exports = router;

