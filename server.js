
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/TaskTrackingdb"; // create database if exist
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
console.log("Database created!");
  db.close();
});

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/timeTrackingModel'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TaskTrackingdb'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/timeTrackingRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
