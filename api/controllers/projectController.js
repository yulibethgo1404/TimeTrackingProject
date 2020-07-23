'use strict';
var mongoose = require('mongoose'),
  resultObject = require("../helpers/response.class"),
  Task = mongoose.model('Tasks'),
  User = mongoose.model('Users'),
  Project = mongoose.model('Projects');

//show the list the all projects that all user and the total time
exports.list_all_project = function (req, res) {

  const aggregate = Task.aggregate([
    {
      // for some reason the lookup dont populate the data into user and project -- search later
      $group: {
        _id: '$Project',
        user: { '$first': '$User' },
        project: { '$first': '$Project' },
        totalTime: {
          $sum: '$totalTime'
        }
      }
    },
    { $project: { _id: 0, user: 1, project: 1, totalTime: 1 } }
  ]).then(function (rows) {
    Project.populate(rows, { path: 'project' }, function (err, list) {
      if (list)
        User.populate(list, { path: 'user' }, function (err, userl) {
          res.json(userl);
        });
    });

  });
};

// display all proyect by an user
// params body User = UserId required
exports.list_all_project_by_user = function (req, res) {
  Project.find({ User: req.body.User }, null, { sort: { Created_date: -1 } }, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  }).populate("User");
};


// permite crear un projecto, no es necesario tener una tarea asociada
//pero es obligatorio que el usuario exista para poder crearse
// params Tasks = array of id the task
exports.create_a_project = function (req, res) {
  // find the user before insert the project 
  var model = req.body;
  var UserId = req.body.User;
  
  User.findOne({ _id: UserId }, function (err, user) {
    if (err)
    res.send(resultObject.error("User not found."));
    // if exist 
    if (user) {
      // create the project 
      var projectObject = {};
      projectObject.User = UserId;
      projectObject.name = model.name;

      var newProject = new Project(projectObject);

      newProject.save(function (err, project) {
        if (err)
          res.send(resultObject.error(err));

        if (model.Task) {         
          // set the project to task         
          Task.findOneAndUpdate({ _id: model.Task }, { Project: project._id }, { new: true }, function (err, task) {
            if (err)
            res.send(resultObject.error(err));
           
            if (task)
              res.json(resultObject.Success(project));
          });
        }
      });
    } //else
      //res.json(resultObject.error("User not found."));

  });

};

// set to project to task, receive two params from body
// the UI must be validate that project and task  are the same user
// Task = id the task to update
// Project = id the project to set to Task
exports.set_project_to_task = function (req, res) {

  var model = req.body;

  Task.findOne({ _id: model.Task }, function (err, task) {
    if (err)
      res.send(resultObject.error("Task not found."));
    // if exist 
    if (task) {
      Task.findOneAndUpdate({ _id: model.Task }, { Project: model.Project }, { new: true }, function (err, task) {
        if (task)
          res.send(resultObject.Success(task));
      });
    } 

  });

};


