const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const  moment = require('moment');

const mongoose = require('mongoose');
//creating a rental schema 
const rentalSchema = new mongoose.Schema({
  customer: { 
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      isGold: {
        type: Boolean,
        default: false
      },
      phone: {
        type: String,
        required: true,
        minlength: 11,
       
      }      
    }),  
    required: true
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true, 
        minlength: 5,
        maxlength: 255
      },
      dailyRentalRate: { 
        type: Number, 
        required: true,
        min: 0,
        max: 255
      }   
    }),
    required: true
  },
  dateOut: { 
    type: Date, 
    required: true,
    default: Date.now
  },
  dateReturned: { 
    type: Date
  },
  rentalFee: { 
    type: Number, 
    min: 0
  }
})

//creating a static method lookup to the rental class 

rentalSchema.statics.lookup = function(customerId, movieId){
  return  this.findOne({
    'customer._id':customerId,
    'movie._id':movieId
})
} 

//creating an instance method return that sets return date and rental fee
rentalSchema.methods.return = function(){ 
  this.dateReturned = new Date(); 

   //cal the number of days the movie been out 
   const rentalDays = moment().diff(this.dateOut,'days');
   this.rentalFee = rentalDays * this.movie.dailyRentalRate;

}

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };

  return Joi.validate(rental, schema);
}

exports.Rental = Rental; 
exports.validate = validateRental;