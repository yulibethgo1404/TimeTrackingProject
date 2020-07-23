'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// model scema
var TaskSchema = new Schema({
  name: String, 
  totalTime : {
    type: Number,
    default: 0
  }, 
    status: {
      type: [{
        type: String,
        enum: ['pending',  'completed']
      }],
      default: ['pending']
    }, 
    Times: [{ type: Schema.Types.ObjectId, ref: 'timeTasks' }],
    User: { type: Schema.Types.ObjectId, ref: 'Users',required:true },
    Project: { type: Schema.Types.ObjectId, ref: 'Projects', default: null },  
    Created_date: {
      type: Date,
      default: Date.now
    }
  });

  module.exports = mongoose.model('Tasks', TaskSchema);