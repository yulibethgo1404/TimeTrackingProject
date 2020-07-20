'use strict';
module.exports = function(app) {
  var taskList = require('../controllers/timeTrackingController');

  // taskList Routes
  app.route('/tasks')
    .get(taskList.list_all_tasks)
    .post(taskList.create_a_task);


  app.route('/tasks/:taskId')
    .get(taskList.read_a_task)
    .put(taskList.update_a_task)
    .delete(taskList.delete_a_task);
};
