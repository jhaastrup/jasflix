//const winston = require('winston');
//require mongoose for DB connection
const mongoose = require ('mongoose');
const express = require('express');
const app = express();


//require('./startup/logging')();
require('./startup/routes')(app);
//require('./startup/db')();
require('./startup/validation')();
require('./startup/prod')(app); 

mongoose.connect('mongodb://localhost/jasflix')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));