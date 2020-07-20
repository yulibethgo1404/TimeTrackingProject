'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// model scema
var TaskSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
    Created_date: {
      type: Date,
      default: Date.now
    },
    status: {
      type: [{
        type: String,
        enum: ['pending', 'restart', 'completed']
      }],
      default: ['pending']
    }
  });
  
  module.exports = mongoose.model('Tasks', TaskSchema);