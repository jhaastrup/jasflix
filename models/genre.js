//require mongoose to connect to db
const mongoose = require('mongoose');
//require Joi for validation 
const Joi = require('joi');

//create a schema for genre 
const genreSchema =  new mongoose.Schema({
    name:{
      type: String,
      required: true,
      minlength:5,
      maxlength: 50
    }
    });

const Genre =  mongoose.model('Genre', genreSchema);

   //We are going to write a function for our validation so we don't keep writing validation for all request
   function validateGenre(genre) {
    const schema = {
      name: Joi.string().min(3).required()
    };
  
    return Joi.validate(genre, schema);
  } 
  exports.genreSchema = genreSchema;
  exports.Genre = Genre;
  exports.validate = validateGenre;