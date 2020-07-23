'use strict';
module.exports = function(app) {
  var taskList = require('../controllers/taskController');
  

//////////////////////////////////////////////////////////
  // begin block - TaskList Routes
  app.route('/tasks')
    .get(taskList.list_all_tasks)
    .post(taskList.create_a_task);


  app.route('/tasks/:taskId')
    .get(taskList.read_a_task)   
    .put(taskList.update_a_task)
    .delete(taskList.delete_a_task);

    app.route('/tasks/timetask').post(taskList.create_time_task);
    // end lock  TaskList Routes
//////////////////////////////////////////////////////////

 //////////////////////////////////////////////////////////
 // begin block - userList Routes

 var UserList = require('../controllers/userController');
 app.route('/users')
 .post(UserList.create_user);


app.route('/users/:userId')
 .get(UserList.read_user);
 // end lock  userList Routes
//////////////////////////////////////////////////////////

 //////////////////////////////////////////////////////////
 // begin block - userList Routes

 var projectController = require('../controllers/projectController');
 app.route('/projects')
 .get(projectController.list_all_project)
 .post(projectController.create_a_project)


 app.route('/projects/setTask')
 .post(projectController.set_project_to_task);

/*
app.route('/projects/')
 .get(UserList.read_user)
 .put(UserList.update_user);*/
 // end block  userList Routes
  //////////////////////////////////////////////////////////
};
