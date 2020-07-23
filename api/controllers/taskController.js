'use strict';
var parameters = require("../../package.json");
var mongoose = require('mongoose'),
  resultObject = require("../helpers/response.class"),
  Task = mongoose.model('Tasks'),
  User = mongoose.model('Users'),
  timeTasks = mongoose.model('timeTasks');

// list all task by user order descendent, recibe User param by Body request
// show all times, project object and user object
exports.list_all_tasks = function (req, res) {


  Task.find({ User: req.body.User }, null, { sort: { Created_date: -1 } }, function (err, task) {
    if (err)
      res.json(resultObject.error(err, req.body));

    res.json(resultObject.Success(task));

  }).populate("Times").populate("User").populate("Project");

};
// create a new task, 
//receive parameters User,and task model  by Body request
// name, Project, Time (collections of times by task init null) are optionals
// must be send the property timeTotal (seconds): 0 by defautl if not entry time manually

exports.create_a_task = function (req, res) {
  // find the user before insert the taks
  var model = req.body;
  User.findOne({ _id: model.User }, function (err, user) {
    if (err)
      res.send(resultObject.error('error don\'t find the user ', req.body));
    // if exist 
    if (user) {
      var new_task = new Task(model);

      // new_task.user_id = req.params.userId;// asociamos el id del usuario
      new_task.save(function (err, task) {
        if (err)
          res.send(resultObject.error(err, req.body));

        // if exists manual time create the manual time for the new task
        if (model.totalTime > 0) {
          var startDate = new Date();
          // convertimos los segundos a milisegundos para crear la nueva fecha     
          var endDate = new Date(startDate.getTime() + (model.totalTime * 1000));

          var timeTaskObj = { task_id: task._id, start_time: startDate, end_time: endDate, diffTime: model.totalTime };
          var modelTime = timeTasks(timeTaskObj);

          modelTime.save(function (err, time) {
            if (err)
              res.json(resultObject.error(err));

            // update the current task for associate the time created

            // add reference to task
            task.Times.push(time._id);
            task.save();
            // send response
            res.json(resultObject.Success(time));

          });

        } else
          res.json(resultObject.Success(task));
      });
    } else
      res.send(resultObject.error("User not found."));

  });


};

// this method permite guardarlos tiempos de las tareas como lista de ellas, con esto podremos saber 
// el total de tiempo empleado en una tarea
//receive parameters by Request.body  
//Task = taskid to add time, if not exist record he created and set by default star_date
// if exist a record that have star_date but has not end_date the system set end_date
//if exixts records but all have star_date and end_date, the system create a  new record by default start_date

exports.create_time_task = function (req, res) {
  // find a task and add a time o close some open
  var obj = req.body;
  Task.findOne({ _id: obj.Task }, function (err, task) {
    if (err)
      res.send(resultObject.error("Task not found"));
    // if exist 
    if (task) {
      // find if exist a document when the end_time is empty, if empty update the end_time, if not 
      // create a new record with star_time by defautl.

      var query = { task_id: obj.task_id, end_time: "" },
        options = { new: true };
        
      timeTasks.findOne(query, function (err, data) {
        // if not exists  add new timeTask
        if (!data) {
          var model = new timeTasks({ task_id: obj.task_id })

          model.save(function (err, data) {
            // add reference to task
            task.Times.push(model._id);
            task.save();
            // send response
            res.json(resultObject.Success(data, "Create time task success"));

          });

        }
        else {
          // if existe a document with end_time empty here closed them          
          var startDate = data.start_time;
          // Do your operations
          var endDate = new Date();
          // convert in secods 
          var int_Time = parseInt((endDate.getTime() - startDate.getTime()) / 1000);

          data.end_time = endDate;
          data.diffTime = int_Time;

          timeTasks.findOneAndUpdate(query, data, options, function (err, time) {
            if (err)
              res.send(resultObject.error(err));

            // update te total time from task
            task.totalTime += int_Time;
            task.save();

            res.json(resultObject.Success(time, "Update time task success"));
          });
        }
      });
    } else
      res.json(resultObject.error("Task not found"));

  });
};



// return the object task by id and times populated
exports.read_a_task = function (req, res) {
  Task.findById(req.params.Task, function (err, task) {
    if (err)
      res.send(resultObject.error(err));
    res.json(resultObject.Success(task));
  }).populate("Times");
};

// update a task, without touch the Times collections 
// paramas =taskId
// request body = Task model, without property Times and totalTimes
exports.update_a_task = function (req, res) {
  Task.findOneAndUpdate({ _id: req.params.taskId }, { $set: req.body }, { new: true }, function (err, task) {
    if (err)
      res.send(resultObject.error(err));
    res.json(resultObject.Success(task));
  });
};

// delete a determinate task
// params request = taskId
exports.delete_a_task = function (req, res) {
  Task.remove({
    _id: req.params.taskId
  }, function (err, task) {
    if (err)
      res.send(resultObject.error(err));
    res.json(resultObject.Success(task, 'Task successfully deleted'));
  });
};


