# TimeTrackingProject
API project that allows to track time for task projects 

Use the last version of mongodb and mongoose
---Por unit test purposes you have to use Mocha and chai- chai-http 
-- And as a unit test server you would need Nodemon

You will find all the routes on folder /routes to use such as get, post, etc.

// In controllers folder you will find the methods which are called because of the header on the route. Each method has its input parameters and what it does.

// In models folder you will find the models to use in the API
user = users of the app
projects = projects associated to a user of the app
task = tasks associated to a user
timeTask = log time associated to a task

// For a successful launch of the system you will have to modify in package.json file the following settings:
"settingsGlobal":{
      "urlDatabase": "mongodb://localhost:27017/TaskTrackingdb", --> Database for the application
      "urlServer": "http://localhost:3000"--> Release API URL

  } 

Unit Test
// For unit testing purposes you have to previously start mongo database server and nodemon 
There is a file called starting.spect.js in folder test/ which determines the unit test files to execute
