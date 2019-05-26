//const winston = require('winston');
//require mongoose for DB connection
const mongoose = require("mongoose"); 
const express = require("express");
const cors = require ('cors');
const app = express(); 

//Access control to fix cors issue
app.use(cors());

//require('./startup/logging')();
require("./startup/routes")(app);
//require('./startup/db')();
require("./startup/validation")();
require("./startup/prod")(app);

app.get("/test", (req, res, next) => res.send("Testing")) 

//Access-control to fix cors error issue
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'OPTIONS, GET, POST, PUT, PATCH, DELETE'
//   );
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });


mongoose
  .connect("mongodb+srv://jastrup:haastrup002@joke-b1rpb.mongodb.net/jasflix", {
    useNewUrlParser: true
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => {
    console.error("Could not connect to MongoDB...");
    console.error(err);
  });
 


const port = process.env.PORT || 8080; //
app.listen(port, () => console.log(`Listening on port ${port}...`));
