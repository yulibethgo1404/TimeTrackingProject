var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  parameters = require("./package.json"),
  // init model loading
  Task = require('./api/models/taskModel'), //created model loading here,
  User = require('./api/models/userModel'),
  Project = require('./api/models/projectModel'),
  TimeTask = require('./api/models/timeTaskModel'), 
  // end model loading
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(parameters.settingsGlobal.urlDatabase); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/timeTrackingRoutes'); //importing route

routes(app); //register the route


app.listen(port);


console.log('TimeTrackingProject  API server started on: ' + port);





