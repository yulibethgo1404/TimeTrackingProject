'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// save all de time tracking for task
var timeTaskSchema = new Schema({  
  task_id: String, 
  start_time: {
    type: Date,
    default: Date.now
  },
  end_time: Date,
  diffTime: Number
  });
  
  module.exports = mongoose.model('timeTasks', timeTaskSchema);