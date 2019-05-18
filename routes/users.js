const auth = require('../middleware/auth');
const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require ('mongoose');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router(); 

//Endpoint to get current user
//me is used to get a specfiic user in a secured manner to protect the id.
router.get('/me', auth, async (req, res) =>{
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);

});


//endpoint to create and register new users..
router.post('/', async (req, res) =>{
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

   let user = await User.findOne({email: req.body.email});
   if(user) return res.status(400).send('User already registered'); 

   //using the lodash package 
   //the _pick()
   user = new User(_.pick(req.body, ['name', 'email', 'password']));
   const salt = await bcrypt.genSalt(10);
   user.password = await bcrypt.hash(user.password, salt);

   //sorry taking yhu out! pick makes the code look sexy dear.
   //user =  new User({
       //name:req.body.name,
       //email:req.body.email,
      // password:req.body.password
   //});
   await user.save();
//generate token before sending response to the user

const token = user.generateAuthToken()
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
}); 

module.exports = router;

