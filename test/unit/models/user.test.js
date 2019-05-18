const {User} = require('../../../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


describe('user.generateAuthToken', () =>{
  it('should return a valid JWT', () =>{
      const payload ={_id: new mongoose.Types.ObjectId(), isAdmin: true}
      const user = new User(payload);
      const token = user.generateAuthToken();
      const decoded = jwt.verify(token,  process.env.JWT_KEY);
      expect(decoded).toMatchObject(payload);
  })
})