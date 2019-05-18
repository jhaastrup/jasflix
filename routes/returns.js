const Joi = require('joi');
const {Rental} = require('../models/rental');
const {movie} = require('../models/movie');
const auth = require ('../middleware/auth');
const validate = require('../middleware/validate');

const express = require('express');
const router = express.Router(); 


router.post('/', [auth, validate(validateReturn)], async (req, res) =>{ 
    const rental = await Rental.lookup(req.body.customerId, req.body.movieId)

    if(!rental) return res.status(404).send('Rental not found');
    if(rental.dateReturned) return res.status(400).send('Return already processed');  

    rental.return();
    await rental.save() 

    await Movie.update({_id: rental.movie._id}, {$inc:{numberInStock:1}});

   
    return res.status(200).send(rental); 

  
}); 

   //We are going to write a function for our validation so we don't keep writing validation for all request
   function validateReturn(req) {
    const schema = {
      customerId: Joi.objectId.required(),
      customerId: Joi.objectId.required()
    };
  
    return Joi.validate(req, schema);
  } 

module.exports = router;
