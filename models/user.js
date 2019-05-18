//require mongoose to connect to db
const mongoose = require('mongoose');
//require Joi for validation 
const Joi = require('joi');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
//create a schema
const userSchema =  new mongoose.Schema({
  name:{
    type: String,
    required: true,
    minlength:5,
    maxlength: 50
  },

  email:{
      type: String,
      required: true,
      minlength:5,
      maxlength: 255,
      unique:true,

    },

    password:{
      type: String,
      required: true,
      minlength:5,
      maxlength: 1024
    },

    isAdmin: Boolean
  }) 

  userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, process.env.JWT_KEY);
    return token; 
  }

///Create model for user
const User =  mongoose.model('User', userSchema);

   //We are going to write a function for our validation so we don't keep writing validation for all request
   function validateUser(user) {
    const schema = {
      name: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(225).required().email(),
      password: Joi.string().min(5).max(1024).required()
    };
  
    return Joi.validate(user, schema);
  } 

  exports.User = User;
  exports.validate = validateUser;