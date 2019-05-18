//require mongoose to connect to db
const mongoose = require('mongoose');
//require Joi for validation 
const Joi = require('joi');

//create a schema/ model for customers
const Customer =  mongoose.model('Customer', new mongoose.Schema({
    name:{
      type: String,
      required: true,
      minlength:5,
      maxlength: 50
    } ,

    phone:{
        type:Number,
        required: true,
        minlength:11,

    } ,

    isGold:{
        type: Boolean,
        default: false
    }
  
  })); 

   //We are going to write a function for our validation so we don't keep writing validation for all request
 function validateCustomer(customer) {
    const schema = {
      name: Joi.string().min(5).max(50).required(),
      phone: Joi.number().min(11).required(),
      isGold: Joi.boolean()
    };
  
    return Joi.validate(customer, schema);
  } 

  exports.Customer = Customer;
  exports.validate = validateCustomer;